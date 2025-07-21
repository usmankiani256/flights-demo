import { FlightItinerary, Flight, LayoverInfo } from '@/interfaces';

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const generateLayovers = (segments: any[]): LayoverInfo[] => {
  if (segments.length <= 1) return [];

  const layovers: LayoverInfo[] = [];

  for (let i = 0; i < segments.length - 1; i++) {
    const currentSegment = segments[i];
    const nextSegment = segments[i + 1];

    const layoverStart = new Date(currentSegment.arrival);
    const layoverEnd = new Date(nextSegment.departure);
    const layoverDuration = Math.round(
      (layoverEnd.getTime() - layoverStart.getTime()) / (1000 * 60),
    );

    layovers.push({
      airport: currentSegment.destination.displayCode,
      city: currentSegment.destination.name,
      duration: formatDuration(layoverDuration),
    });
  }

  return layovers;
};

export const transformItineraryToFlights = (
  itinerary: FlightItinerary,
): Flight[] => {
  return itinerary.legs.map((leg, index) => {
    const firstSegment = leg.segments[0];
    const airline = firstSegment.marketingCarrier.name;
    const flightNumber = firstSegment.flightNumber;
    const carrierLogo = firstSegment.marketingCarrier.logoUrl;
    const aircraft = `${firstSegment.marketingCarrier.alternateId || ''} ${
      firstSegment.flightNumber
    }`.trim();
    const layovers = generateLayovers(leg.segments);

    return {
      id: `${itinerary.id}-leg-${index}`,
      airline,
      flightNumber,
      departTime: formatTime(leg.departure),
      arrivalTime: formatTime(leg.arrival),
      from: {
        code: leg.origin.displayCode,
        city: leg.origin.city,
      },
      to: {
        code: leg.destination.displayCode,
        city: leg.destination.city,
      },
      duration: formatDuration(leg.durationInMinutes),
      stops: leg.stopCount,
      price: itinerary.price.raw,
      priceFormatted: itinerary.price.formatted,
      aircraft,
      carrierLogo,
      timeDeltaInDays: leg.timeDeltaInDays,
      layovers,
      farePolicy: {
        isChangeable:
          itinerary.farePolicy.isChangeAllowed ||
          itinerary.farePolicy.isPartiallyChangeable,
        isRefundable: itinerary.farePolicy.isPartiallyRefundable,
        hasFlexibleOptions: itinerary.hasFlexibleOptions,
      },
      tags: itinerary.tags,
      cabinClass: 'Economy',
      eco: itinerary.eco,
    };
  });
};

export const transformItinerariesToFlights = (
  itineraries: FlightItinerary[],
): Flight[] => {
  const flights: Flight[] = [];

  itineraries.forEach(itinerary => {
    const outboundLeg = itinerary.legs[0];
    const firstSegment = outboundLeg.segments[0];
    const airline = firstSegment.marketingCarrier.name;
    const flightNumber = firstSegment.flightNumber;
    const carrierLogo = firstSegment.marketingCarrier.logoUrl;
    const aircraft = `${firstSegment.marketingCarrier.alternateId || ''} ${
      firstSegment.flightNumber
    }`.trim();
    const layovers = generateLayovers(outboundLeg.segments);

    flights.push({
      id: `${itinerary.id}-summary`,
      airline,
      flightNumber,
      departTime: formatTime(outboundLeg.departure),
      arrivalTime: formatTime(outboundLeg.arrival),
      from: {
        code: outboundLeg.origin.displayCode,
        city: outboundLeg.origin.city,
      },
      to: {
        code: outboundLeg.destination.displayCode,
        city: outboundLeg.destination.city,
      },
      duration: formatDuration(outboundLeg.durationInMinutes),
      stops: outboundLeg.stopCount,
      price: itinerary.price.raw,
      priceFormatted: itinerary.price.formatted,
      aircraft,
      carrierLogo,
      timeDeltaInDays: outboundLeg.timeDeltaInDays,
      layovers,
      farePolicy: {
        isChangeable:
          itinerary.farePolicy.isChangeAllowed ||
          itinerary.farePolicy.isPartiallyChangeable,
        isRefundable: itinerary.farePolicy.isPartiallyRefundable,
        hasFlexibleOptions: itinerary.hasFlexibleOptions,
      },
      tags: itinerary.tags,
      cabinClass: 'Economy',
      eco: itinerary.eco,
    });
  });

  return flights;
};
