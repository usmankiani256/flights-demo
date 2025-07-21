import apiClient from './ApiClient';
import { AirportSearchParams, AirportSearchResponse } from '@/interfaces';
import { MOCK_DATA } from '@env';

export const searchAirport = async (
  params: AirportSearchParams,
): Promise<AirportSearchResponse> => {
  if (MOCK_DATA === 'true') {
    console.log('API:searchAirport [MOCK MODE]', { params });
    return mockData;
  }

  try {
    console.log('API:searchAirport [LIVE MODE]', { params });
    const response = await apiClient.get('/searchAirport', { params });

    return response.data;
  } catch (error: any) {
    console.error(
      'Airport search error:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

/**
 * ------------------------------------------------------------
 * MOCK DATA
 * ------------------------------------------------------------
 */
const mockData: AirportSearchResponse = {
  status: true,
  timestamp: 1691008938320,
  data: [
    {
      presentation: {
        title: 'New York',
        suggestionTitle: 'New York (Any)',
        subtitle: 'United States',
      },
      navigation: {
        entityId: '27537542',
        entityType: 'CITY',
        localizedName: 'New York',
        relevantFlightParams: {
          skyId: 'NYCA',
          entityId: '27537542',
          flightPlaceType: 'CITY',
          localizedName: 'New York',
        },
      },
    },
    {
      presentation: {
        title: 'New York Newark',
        suggestionTitle: 'New York Newark (EWR)',
        subtitle: 'United States',
      },
      navigation: {
        entityId: '95565059',
        entityType: 'AIRPORT',
        localizedName: 'New York Newark',
        relevantFlightParams: {
          skyId: 'EWR',
          entityId: '95565059',
          flightPlaceType: 'AIRPORT',
          localizedName: 'New York Newark',
        },
      },
    },
    {
      presentation: {
        title: 'New York John F. Kennedy',
        suggestionTitle: 'New York John F. Kennedy (JFK)',
        subtitle: 'United States',
      },
      navigation: {
        entityId: '95565058',
        entityType: 'AIRPORT',
        localizedName: 'New York John F. Kennedy',
        relevantFlightParams: {
          skyId: 'JFK',
          entityId: '95565058',
          flightPlaceType: 'AIRPORT',
          localizedName: 'New York John F. Kennedy',
        },
      },
    },
    {
      presentation: {
        title: 'New York LaGuardia',
        suggestionTitle: 'New York LaGuardia (LGA)',
        subtitle: 'United States',
      },
      navigation: {
        entityId: '95565057',
        entityType: 'AIRPORT',
        localizedName: 'New York LaGuardia',
        relevantFlightParams: {
          skyId: 'LGA',
          entityId: '95565057',
          flightPlaceType: 'AIRPORT',
          localizedName: 'New York LaGuardia',
        },
      },
    },
    {
      presentation: {
        title: 'Stewart International',
        suggestionTitle: 'Stewart International (SWF)',
        subtitle: 'United States',
      },
      navigation: {
        entityId: '95566280',
        entityType: 'AIRPORT',
        localizedName: 'Stewart International',
        relevantFlightParams: {
          skyId: 'SWF',
          entityId: '95566280',
          flightPlaceType: 'AIRPORT',
          localizedName: 'Stewart International',
        },
      },
    },
  ],
};
