import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuthService } from './Auth/AuthContext';
import { searchAirport, searchFlights } from '@/api';
import {
  MainSearchParams,
  AirportSearchResponse,
  FlightSearchResponse,
  FlightSearchParams,
} from '@/interfaces';
import { RootStackParamList, AppScreens } from '@/interfaces/navigation';
import { useDebounce } from './useDebounce';
import { formatDate, formatDateDisplay } from '@/utils/date';

export const useFlightService = () => {
  const { signOut } = useAuthService();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchParams, setSearchParams] = useState<MainSearchParams>({
    from: '',
    to: '',
    fromEntityId: '',
    toEntityId: '',
    departDate: formatDate(new Date()),
    returnDate: '',
    passengers: 1,
    tripType: 'one-way',
  });

  // Airport search states
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState<
    AirportSearchResponse['data']
  >([]);
  const [toSuggestions, setToSuggestions] = useState<
    AirportSearchResponse['data']
  >([]);
  const [isSearchingFrom, setIsSearchingFrom] = useState(false);
  const [isSearchingTo, setIsSearchingTo] = useState(false);

  // Flight search states
  const [flightResults, setFlightResults] =
    useState<FlightSearchResponse | null>(null);
  const [isSearchingFlights, setIsSearchingFlights] = useState(false);

  // Date picker states
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showReturnDatePicker, setShowReturnDatePicker] = useState(false);
  const [departureDate, setDepartureDate] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  );

  // Debounce the search queries
  const debouncedFromQuery = useDebounce(fromQuery, 300);
  const debouncedToQuery = useDebounce(toQuery, 300);

  // Search airports when debounced query changes
  useEffect(() => {
    if (debouncedFromQuery.length >= 2) {
      handleAirportSearch(debouncedFromQuery, 'from');
    } else {
      setFromSuggestions([]);
    }
  }, [debouncedFromQuery]);

  useEffect(() => {
    if (debouncedToQuery.length >= 2) {
      handleAirportSearch(debouncedToQuery, 'to');
    } else {
      setToSuggestions([]);
    }
  }, [debouncedToQuery]);

  const handleAirportSearch = async (query: string, type: 'from' | 'to') => {
    try {
      if (type === 'from') setIsSearchingFrom(true);
      else setIsSearchingTo(true);

      const response = await searchAirport({
        query,
        locale: 'en-US',
      });

      const hasExactMatch =
        response.data.filter(item => {
          const airportName = item.navigation.localizedName;
          const skyId = item.navigation.relevantFlightParams.skyId;
          return `${airportName} (${skyId})` === query;
        }).length > 0;

      if (hasExactMatch) {
        return;
      }

      if (type === 'from') {
        setFromSuggestions(response.data);
      } else {
        setToSuggestions(response.data);
      }
    } catch (error) {
      console.error('Airport search error:', error);
    } finally {
      if (type === 'from') setIsSearchingFrom(false);
      else setIsSearchingTo(false);
    }
  };

  const selectAirport = (
    airport: AirportSearchResponse['data'][0],
    type: 'from' | 'to',
  ) => {
    const airportName = airport.navigation.localizedName;
    const skyId = airport.navigation.relevantFlightParams.skyId;
    const entityId = airport.navigation.relevantFlightParams.entityId;
    const displayText = `${airportName} (${skyId})`;

    if (type === 'from') {
      setFromQuery(displayText);
      setSearchParams(prev => ({
        ...prev,
        from: skyId,
        fromEntityId: entityId,
      }));
      setFromSuggestions([]);
    } else {
      setToQuery(displayText);
      setSearchParams(prev => ({
        ...prev,
        to: skyId,
        toEntityId: entityId,
      }));
      setToSuggestions([]);
    }
  };

  const handleDepartureDateConfirm = (date: Date) => {
    setDepartureDate(date);
    setSearchParams(prev => ({ ...prev, departDate: formatDate(date) }));
    setShowDepartureDatePicker(false);

    // If return date is before departure date, adjust it
    if (returnDate <= date && searchParams.tripType === 'round-trip') {
      const newReturnDate = new Date(date.getTime() + 24 * 60 * 60 * 1000); // Next day
      setReturnDate(newReturnDate);
      setSearchParams(prev => ({
        ...prev,
        returnDate: formatDate(newReturnDate),
      }));
    }
  };

  const handleReturnDateConfirm = (date: Date) => {
    setReturnDate(date);
    setSearchParams(prev => ({ ...prev, returnDate: formatDate(date) }));
    setShowReturnDatePicker(false);
  };

  // Flight search function
  const performFlightSearch = async () => {
    if (!searchParams.from || !searchParams.to || !searchParams.departDate) {
      Alert.alert(
        'Error',
        'Please fill in origin, destination, and departure date',
      );
      return;
    }

    if (searchParams.tripType === 'round-trip' && !searchParams.returnDate) {
      Alert.alert(
        'Error',
        'Please select a return date for round-trip flights',
      );
      return;
    }

    if (!searchParams.fromEntityId || !searchParams.toEntityId) {
      Alert.alert('Error', 'Please select airports from the suggestions');
      return;
    }

    try {
      setIsSearchingFlights(true);

      const flightSearchParams: FlightSearchParams = {
        originSkyId: searchParams.from,
        destinationSkyId: searchParams.to,
        originEntityId: searchParams.fromEntityId,
        destinationEntityId: searchParams.toEntityId,
        date: searchParams.departDate,
        ...(searchParams.tripType === 'round-trip' &&
          searchParams.returnDate && {
            returnDate: searchParams.returnDate,
          }),
        adults: searchParams.passengers.toString(),
      };

      const results = await searchFlights(flightSearchParams);
      console.log('Flight Results:', results);
      setFlightResults(results);

      // Navigate to results screen
      navigation.navigate(AppScreens.FlightsResults, {
        flightResults: results,
        searchParams: searchParams,
      });
    } catch (error) {
      console.error('Flight search error:', error);
      Alert.alert(
        'Search Error',
        'Failed to search for flights. Please try again.',
      );
    } finally {
      setIsSearchingFlights(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          navigation.reset({
            index: 0,
            routes: [{ name: AppScreens.Login }],
          });
        },
      },
    ]);
  };

  const handleSearch = () => {
    performFlightSearch();
  };

  return {
    searchParams,
    setSearchParams,
    handleSearch,
    handleSignOut,
    fromQuery,
    setFromQuery,
    toQuery,
    setToQuery,
    fromSuggestions,
    toSuggestions,
    isSearchingFrom,
    isSearchingTo,
    selectAirport,
    showDepartureDatePicker,
    setShowDepartureDatePicker,
    showReturnDatePicker,
    setShowReturnDatePicker,
    departureDate,
    returnDate,
    handleDepartureDateConfirm,
    handleReturnDateConfirm,
    formatDateDisplay,
    flightResults,
    isSearchingFlights,
    performFlightSearch,
  };
};
