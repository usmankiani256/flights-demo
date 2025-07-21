import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppTheme } from '@/theme';
import { RootStackParamList, AppScreens } from '@/interfaces/navigation';
import { Flight } from '@/interfaces';
import FlightCard from '@/components/FlightCard';
import { transformItinerariesToFlights } from '@/utils/flightTransform';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FlightsResultsRouteProp = RouteProp<
  RootStackParamList,
  AppScreens.FlightsResults
>;
type FlightsResultsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  AppScreens.FlightsResults
>;

const FlightsResultsScreen = () => {
  const route = useRoute<FlightsResultsRouteProp>();
  const navigation = useNavigation<FlightsResultsNavigationProp>();

  const { flightResults, searchParams } = route.params;
  const flights = transformItinerariesToFlights(flightResults.data.itineraries);

  const handleFlightSelect = (flight: Flight) => {
    const fareDetails = [];
    if (flight.farePolicy.isChangeable) fareDetails.push('Changeable');
    if (flight.farePolicy.isRefundable) fareDetails.push('Refundable');
    if (flight.farePolicy.hasFlexibleOptions)
      fareDetails.push('Flexible options');

    const layoverInfo =
      flight.layovers && flight.layovers.length > 0
        ? `\n\nLayovers: ${flight.layovers
            .map(l => `${l.duration} in ${l.airport}`)
            .join(', ')}`
        : '';

    const fareInfo =
      fareDetails.length > 0
        ? `\n\nFare policy: ${fareDetails.join(', ')}`
        : '';
    const ecoInfo = flight.eco
      ? `\n\nEco-friendly flight with ${flight.eco.ecoContenderDelta.toFixed(
          1,
        )}% less CO₂`
      : '';

    Alert.alert(
      `${flight.airline} Flight ${flight.flightNumber}`,
      `${flight.from.code} → ${flight.to.code}\n` +
        `Departure: ${flight.departTime}\n` +
        `Arrival: ${flight.arrivalTime}${
          flight.timeDeltaInDays > 0 ? ` (+${flight.timeDeltaInDays}d)` : ''
        }\n` +
        `Duration: ${flight.duration}\n` +
        `Stops: ${
          flight.stops === 0
            ? 'Nonstop'
            : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`
        }\n` +
        `Price: ${flight.priceFormatted}${layoverInfo}${fareInfo}${ecoInfo}`,
      [{ text: 'Close', style: 'cancel' }],
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={AppTheme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Results</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchSummary}>
        <Text style={styles.routeText}>
          {searchParams.from} → {searchParams.to}
        </Text>
        <Text style={styles.dateText}>
          {searchParams.departDate}
          {searchParams.tripType === 'round-trip' &&
            searchParams.returnDate &&
            ` • ${searchParams.returnDate}`}
        </Text>
        <Text style={styles.passengersText}>
          {searchParams.passengers} passenger
          {searchParams.passengers > 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.resultsCount}>
        <Text style={styles.countText}>
          {flights.length} flight{flights.length > 1 ? 's' : ''} found
        </Text>
        <Text style={styles.sortText}>Sorted by Best Value</Text>
      </View>

      <View style={styles.resultsSummary}>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {flights.filter(f => f.stops === 0).length}
            </Text>
            <Text style={styles.statLabel}>Nonstop</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {flights.filter(f => f.tags.includes('cheapest')).length}
            </Text>
            <Text style={styles.statLabel}>Best Price</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {flights.filter(f => f.farePolicy.isRefundable).length}
            </Text>
            <Text style={styles.statLabel}>Refundable</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon
        name="flight-takeoff"
        size={64}
        color={AppTheme.colors.textSecondary}
      />
      <Text style={styles.emptyTitle}>No Flights Found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search criteria or dates
      </Text>
      <TouchableOpacity
        style={styles.backToSearchButton}
        onPress={handleBackPress}
      >
        <Text style={styles.backToSearchText}>Back to Search</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFlight = ({ item }: { item: Flight }) => (
    <FlightCard flight={item} onSelect={() => handleFlightSelect(item)} />
  );

  if (flights.length === 0) {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderEmptyState()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        renderItem={renderFlight}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  listContainer: {
    paddingBottom: AppTheme.spacing.xl,
  },
  headerContainer: {
    backgroundColor: AppTheme.colors.background,
    paddingTop: AppTheme.spacing.xl,
    paddingHorizontal: AppTheme.spacing.xl,
    paddingBottom: AppTheme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
    marginBottom: AppTheme.spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: AppTheme.spacing.md,
  },
  backButton: {
    padding: AppTheme.spacing.sm,
  },
  headerTitle: {
    fontSize: AppTheme.fonts.size.heading,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.text,
  },
  placeholder: {
    width: 40,
  },
  searchSummary: {
    alignItems: 'center',
    marginBottom: AppTheme.spacing.md,
  },
  routeText: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.semibold,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.xs,
  },
  dateText: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
    marginBottom: AppTheme.spacing.xs,
  },
  passengersText: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
  },
  resultsCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: AppTheme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: AppTheme.colors.border,
    marginBottom: AppTheme.spacing.md,
  },
  countText: {
    fontSize: AppTheme.fonts.size.default,
    fontWeight: AppTheme.fonts.weight.semibold,
    color: AppTheme.colors.text,
  },
  sortText: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
  },
  resultsSummary: {
    backgroundColor: AppTheme.colors.secondary,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.md,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.primary,
  },
  statLabel: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: AppTheme.spacing.xl,
  },
  emptyTitle: {
    fontSize: AppTheme.fonts.size.heading,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.text,
    marginTop: AppTheme.spacing.lg,
    marginBottom: AppTheme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: AppTheme.spacing.xl,
  },
  backToSearchButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingHorizontal: AppTheme.spacing.xl,
    paddingVertical: AppTheme.spacing.md,
    borderRadius: AppTheme.spacing.sm,
  },
  backToSearchText: {
    color: AppTheme.colors.background,
    fontSize: AppTheme.fonts.size.default,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
});

export default FlightsResultsScreen;
