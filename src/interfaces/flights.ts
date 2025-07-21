export interface MainSearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: number;
  tripType: 'round-trip' | 'one-way';
  fromEntityId: string;
  toEntityId: string;
}

export interface AirportSearchParams {
  query: string;
  locale: string;
}

export interface AirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: {
    presentation: {
      title: string;
      suggestionTitle: string;
      subtitle: string;
    };
    navigation: {
      entityId: string;
      entityType: 'CITY' | 'AIRPORT';
      localizedName: string;
      relevantFlightParams: {
        skyId: string;
        entityId: string;
        flightPlaceType: 'CITY' | 'AIRPORT';
        localizedName: string;
      };
    };
  }[];
}

export interface LayoverInfo {
  airport: string;
  city: string;
  duration: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departTime: string;
  arrivalTime: string;
  from: {
    code: string;
    city: string;
  };
  to: {
    code: string;
    city: string;
  };
  duration: string;
  stops: number;
  price: number;
  priceFormatted: string;
  aircraft: string;
  carrierLogo?: string;
  timeDeltaInDays: number;
  layovers?: LayoverInfo[];
  farePolicy: {
    isChangeable: boolean;
    isRefundable: boolean;
    hasFlexibleOptions: boolean;
  };
  tags: string[];
  cabinClass?: string;
  eco?: {
    ecoContenderDelta: number;
  };
}

export interface FlightSearchParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass?: 'economy' | 'business' | 'first';
  adults?: string;
  sortBy?:
    | 'best'
    | 'price_high'
    | 'fastest'
    | 'outbound_take_off_time'
    | 'outbound_landing_time'
    | 'return_take_off_time'
    | 'return_landing_time';
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface Carrier {
  id: number;
  logoUrl?: string;
  name: string;
  alternateId?: string;
  allianceId?: number;
}

export interface FlightPlace {
  flightPlaceId: string;
  displayCode: string;
  parent?: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: 'City' | 'Airport';
  };
  name: string;
  type: 'Airport' | 'City';
}

export interface FlightSegment {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
}

export interface FlightLeg {
  id: string;
  origin: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
  };
  destination: {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
  };
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operationType: string;
  };
  segments: FlightSegment[];
}

export interface FlightItinerary {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  eco?: {
    ecoContenderDelta: number;
  };
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface FlightSearchResponse {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: string;
      totalResults: number;
    };
    itineraries: FlightItinerary[];
    messages: any[];
    filterStats: {
      duration: {
        min: number;
        max: number;
      };
      airports: {
        city: string;
        airports: {
          id: string;
          name: string;
        }[];
      }[];
      carriers: Carrier[];
      stopPrices: {
        direct: {
          isPresent: boolean;
          formattedPrice?: string;
        };
        one: {
          isPresent: boolean;
          formattedPrice?: string;
        };
        twoOrMore: {
          isPresent: boolean;
          formattedPrice?: string;
        };
      };
    };
  };
}
