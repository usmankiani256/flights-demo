import apiClient from './ApiClient';
import { FlightSearchParams, FlightSearchResponse } from '@/interfaces';
import { MOCK_DATA } from '@env';

export const searchFlights = async (
  params: FlightSearchParams,
): Promise<FlightSearchResponse> => {
  if (MOCK_DATA === 'true') {
    console.log('API:searchFlights [MOCK MODE]', { params });
    return mockFlightData;
  }

  try {
    console.log('API:searchFlights [LIVE MODE]', { params });
    const response = await apiClient.get('/searchFlights', { params });

    return response.data;
  } catch (error: any) {
    console.error(
      'Flight search error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * ------------------------------------------------------------
 * MOCK FLIGHT DATA
 * ------------------------------------------------------------
 */
const mockFlightData: FlightSearchResponse = {
  status: true,
  timestamp: 1691008981566,
  sessionId: '25cee707-a873-4d0a-aeb2-4128a7ca0258',
  data: {
    context: {
      status: 'incomplete',
      totalResults: 10,
    },
    itineraries: [
      {
        id: '13542-2402201235--30598-0-12712-2402201550|12712-2402221810--30598-0-13542-2402230600',
        price: {
          raw: 419.18,
          formatted: '$420',
        },
        legs: [
          {
            id: '13542-2402201235--30598-0-12712-2402201550',
            origin: {
              id: 'LGW',
              name: 'London Gatwick',
              displayCode: 'LGW',
              city: 'London',
              isHighlighted: false,
            },
            destination: {
              id: 'JFK',
              name: 'New York John F. Kennedy',
              displayCode: 'JFK',
              city: 'New York',
              isHighlighted: false,
            },
            durationInMinutes: 495,
            stopCount: 0,
            isSmallestStops: false,
            departure: '2024-02-20T12:35:00',
            arrival: '2024-02-20T15:50:00',
            timeDeltaInDays: 0,
            carriers: {
              marketing: [
                {
                  id: -30598,
                  logoUrl:
                    'https://logos.skyscnr.com/images/airlines/favicon/I%29.png',
                  name: 'Norse Atlantic Airways (UK)',
                },
              ],
              operationType: 'fully_operated',
            },
            segments: [
              {
                id: '13542-12712-2402201235-2402201550--30598',
                origin: {
                  flightPlaceId: 'LGW',
                  displayCode: 'LGW',
                  parent: {
                    flightPlaceId: 'LOND',
                    displayCode: 'LON',
                    name: 'London',
                    type: 'City',
                  },
                  name: 'London Gatwick',
                  type: 'Airport',
                },
                destination: {
                  flightPlaceId: 'JFK',
                  displayCode: 'JFK',
                  parent: {
                    flightPlaceId: 'NYCA',
                    displayCode: 'NYC',
                    name: 'New York',
                    type: 'City',
                  },
                  name: 'New York John F. Kennedy',
                  type: 'Airport',
                },
                departure: '2024-02-20T12:35:00',
                arrival: '2024-02-20T15:50:00',
                durationInMinutes: 495,
                flightNumber: '701',
                marketingCarrier: {
                  id: -30598,
                  name: 'Norse Atlantic Airways (UK)',
                  alternateId: 'I)',
                  allianceId: 0,
                },
                operatingCarrier: {
                  id: -30598,
                  name: 'Norse Atlantic Airways (UK)',
                  alternateId: 'I)',
                  allianceId: 0,
                },
              },
            ],
          },
          {
            id: '12712-2402221810--30598-0-13542-2402230600',
            origin: {
              id: 'JFK',
              name: 'New York John F. Kennedy',
              displayCode: 'JFK',
              city: 'New York',
              isHighlighted: false,
            },
            destination: {
              id: 'LGW',
              name: 'London Gatwick',
              displayCode: 'LGW',
              city: 'London',
              isHighlighted: false,
            },
            durationInMinutes: 410,
            stopCount: 0,
            isSmallestStops: false,
            departure: '2024-02-22T18:10:00',
            arrival: '2024-02-23T06:00:00',
            timeDeltaInDays: 1,
            carriers: {
              marketing: [
                {
                  id: -30598,
                  logoUrl:
                    'https://logos.skyscnr.com/images/airlines/favicon/I%29.png',
                  name: 'Norse Atlantic Airways (UK)',
                },
              ],
              operationType: 'fully_operated',
            },
            segments: [
              {
                id: '12712-13542-2402221810-2402230600--30598',
                origin: {
                  flightPlaceId: 'JFK',
                  displayCode: 'JFK',
                  parent: {
                    flightPlaceId: 'NYCA',
                    displayCode: 'NYC',
                    name: 'New York',
                    type: 'City',
                  },
                  name: 'New York John F. Kennedy',
                  type: 'Airport',
                },
                destination: {
                  flightPlaceId: 'LGW',
                  displayCode: 'LGW',
                  parent: {
                    flightPlaceId: 'LOND',
                    displayCode: 'LON',
                    name: 'London',
                    type: 'City',
                  },
                  name: 'London Gatwick',
                  type: 'Airport',
                },
                departure: '2024-02-22T18:10:00',
                arrival: '2024-02-23T06:00:00',
                durationInMinutes: 410,
                flightNumber: '702',
                marketingCarrier: {
                  id: -30598,
                  name: 'Norse Atlantic Airways (UK)',
                  alternateId: 'I)',
                  allianceId: 0,
                },
                operatingCarrier: {
                  id: -30598,
                  name: 'Norse Atlantic Airways (UK)',
                  alternateId: 'I)',
                  allianceId: 0,
                },
              },
            ],
          },
        ],
        isSelfTransfer: false,
        isProtectedSelfTransfer: false,
        farePolicy: {
          isChangeAllowed: false,
          isPartiallyChangeable: false,
          isCancellationAllowed: false,
          isPartiallyRefundable: false,
        },
        eco: {
          ecoContenderDelta: 13.232994,
        },
        tags: ['cheapest', 'shortest'],
        isMashUp: false,
        hasFlexibleOptions: false,
        score: 0.998502,
      },
      {
        id: '13554-2402200750--32753-1-12712-2402201355|12712-2402222110--32753-1-13554-2402231130',
        price: {
          raw: 527.97,
          formatted: '$528',
        },
        legs: [
          {
            id: '13554-2402200750--32753-1-12712-2402201355',
            origin: {
              id: 'LHR',
              name: 'London Heathrow',
              displayCode: 'LHR',
              city: 'London',
              isHighlighted: false,
            },
            destination: {
              id: 'JFK',
              name: 'New York John F. Kennedy',
              displayCode: 'JFK',
              city: 'New York',
              isHighlighted: false,
            },
            durationInMinutes: 665,
            stopCount: 1,
            isSmallestStops: false,
            departure: '2024-02-20T07:50:00',
            arrival: '2024-02-20T13:55:00',
            timeDeltaInDays: 0,
            carriers: {
              marketing: [
                {
                  id: -32753,
                  logoUrl:
                    'https://logos.skyscnr.com/images/airlines/favicon/EI.png',
                  name: 'Aer Lingus',
                },
              ],
              operationType: 'fully_operated',
            },
            segments: [
              {
                id: '13554-11154-2402200750-2402200910--32753',
                origin: {
                  flightPlaceId: 'LHR',
                  displayCode: 'LHR',
                  parent: {
                    flightPlaceId: 'LOND',
                    displayCode: 'LON',
                    name: 'London',
                    type: 'City',
                  },
                  name: 'London Heathrow',
                  type: 'Airport',
                },
                destination: {
                  flightPlaceId: 'DUB',
                  displayCode: 'DUB',
                  parent: {
                    flightPlaceId: 'DUBL',
                    displayCode: 'DUB',
                    name: 'Dublin',
                    type: 'City',
                  },
                  name: 'Dublin',
                  type: 'Airport',
                },
                departure: '2024-02-20T07:50:00',
                arrival: '2024-02-20T09:10:00',
                durationInMinutes: 80,
                flightNumber: '151',
                marketingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
                operatingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
              },
              {
                id: '11154-12712-2402201110-2402201355--32753',
                origin: {
                  flightPlaceId: 'DUB',
                  displayCode: 'DUB',
                  parent: {
                    flightPlaceId: 'DUBL',
                    displayCode: 'DUB',
                    name: 'Dublin',
                    type: 'City',
                  },
                  name: 'Dublin',
                  type: 'Airport',
                },
                destination: {
                  flightPlaceId: 'JFK',
                  displayCode: 'JFK',
                  parent: {
                    flightPlaceId: 'NYCA',
                    displayCode: 'NYC',
                    name: 'New York',
                    type: 'City',
                  },
                  name: 'New York John F. Kennedy',
                  type: 'Airport',
                },
                departure: '2024-02-20T11:10:00',
                arrival: '2024-02-20T13:55:00',
                durationInMinutes: 465,
                flightNumber: '105',
                marketingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
                operatingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
              },
            ],
          },
          {
            id: '12712-2402222110--32753-1-13554-2402231130',
            origin: {
              id: 'JFK',
              name: 'New York John F. Kennedy',
              displayCode: 'JFK',
              city: 'New York',
              isHighlighted: false,
            },
            destination: {
              id: 'LHR',
              name: 'London Heathrow',
              displayCode: 'LHR',
              city: 'London',
              isHighlighted: false,
            },
            durationInMinutes: 560,
            stopCount: 1,
            isSmallestStops: false,
            departure: '2024-02-22T21:10:00',
            arrival: '2024-02-23T11:30:00',
            timeDeltaInDays: 1,
            carriers: {
              marketing: [
                {
                  id: -32753,
                  logoUrl:
                    'https://logos.skyscnr.com/images/airlines/favicon/EI.png',
                  name: 'Aer Lingus',
                },
              ],
              operationType: 'fully_operated',
            },
            segments: [
              {
                id: '12712-11154-2402222110-2402230850--32753',
                origin: {
                  flightPlaceId: 'JFK',
                  displayCode: 'JFK',
                  parent: {
                    flightPlaceId: 'NYCA',
                    displayCode: 'NYC',
                    name: 'New York',
                    type: 'City',
                  },
                  name: 'New York John F. Kennedy',
                  type: 'Airport',
                },
                destination: {
                  flightPlaceId: 'DUB',
                  displayCode: 'DUB',
                  parent: {
                    flightPlaceId: 'DUBL',
                    displayCode: 'DUB',
                    name: 'Dublin',
                    type: 'City',
                  },
                  name: 'Dublin',
                  type: 'Airport',
                },
                departure: '2024-02-22T21:10:00',
                arrival: '2024-02-23T08:50:00',
                durationInMinutes: 400,
                flightNumber: '106',
                marketingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
                operatingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
              },
              {
                id: '11154-13554-2402231010-2402231130--32753',
                origin: {
                  flightPlaceId: 'DUB',
                  displayCode: 'DUB',
                  parent: {
                    flightPlaceId: 'DUBL',
                    displayCode: 'DUB',
                    name: 'Dublin',
                    type: 'City',
                  },
                  name: 'Dublin',
                  type: 'Airport',
                },
                destination: {
                  flightPlaceId: 'LHR',
                  displayCode: 'LHR',
                  parent: {
                    flightPlaceId: 'LOND',
                    displayCode: 'LON',
                    name: 'London',
                    type: 'City',
                  },
                  name: 'London Heathrow',
                  type: 'Airport',
                },
                departure: '2024-02-23T10:10:00',
                arrival: '2024-02-23T11:30:00',
                durationInMinutes: 80,
                flightNumber: '158',
                marketingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
                operatingCarrier: {
                  id: -32753,
                  name: 'Aer Lingus',
                  alternateId: 'EI',
                  allianceId: 0,
                },
              },
            ],
          },
        ],
        isSelfTransfer: false,
        isProtectedSelfTransfer: false,
        farePolicy: {
          isChangeAllowed: false,
          isPartiallyChangeable: false,
          isCancellationAllowed: false,
          isPartiallyRefundable: false,
        },
        tags: ['second_cheapest', 'second_shortest'],
        isMashUp: false,
        hasFlexibleOptions: false,
        score: 0.58567,
      },
    ],
    messages: [],
    filterStats: {
      duration: {
        min: 495,
        max: 815,
      },
      airports: [
        {
          city: 'New York',
          airports: [
            {
              id: 'JFK',
              name: 'New York John F. Kennedy',
            },
            {
              id: 'EWR',
              name: 'New York Newark',
            },
          ],
        },
        {
          city: 'London',
          airports: [
            {
              id: 'LGW',
              name: 'London Gatwick',
            },
            {
              id: 'LHR',
              name: 'London Heathrow',
            },
          ],
        },
      ],
      carriers: [
        {
          id: -32753,
          logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/EI.png',
          name: 'Aer Lingus',
        },
        {
          id: -30598,
          logoUrl: 'https://logos.skyscnr.com/images/airlines/favicon/I%29.png',
          name: 'Norse Atlantic Airways (UK)',
        },
      ],
      stopPrices: {
        direct: {
          isPresent: true,
          formattedPrice: '$420',
        },
        one: {
          isPresent: true,
          formattedPrice: '$528',
        },
        twoOrMore: {
          isPresent: false,
        },
      },
    },
  },
};
