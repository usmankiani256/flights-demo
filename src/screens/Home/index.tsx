import { AppTheme } from '@/theme';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useAuthService, useFlightService } from '@/hooks';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen() {
  const { user } = useAuthService();
  const {
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
    isSearchingFlights,
  } = useFlightService();

  const renderSuggestion = (item: any, type: 'from' | 'to') => {
    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => selectAirport(item, type)}
      >
        <Text style={styles.suggestionTitle}>{item.presentation.title}</Text>
        <Text style={styles.suggestionSubtitle}>
          {item.presentation.subtitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Flights</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Icon name="logout" size={24} color={AppTheme.colors.destructive} />
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome, {user?.email}</Text>
      </View>

      <View style={styles.searchContainer}>
        {/* Trip Type Selector */}
        <View style={styles.tripTypeContainer}>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              searchParams.tripType === 'one-way' && styles.tripTypeActive,
            ]}
            onPress={() =>
              setSearchParams(prev => ({ ...prev, tripType: 'one-way' }))
            }
          >
            <Text
              style={[
                styles.tripTypeText,
                searchParams.tripType === 'one-way' &&
                  styles.tripTypeTextActive,
              ]}
            >
              One way
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tripTypeButton,
              searchParams.tripType === 'round-trip' && styles.tripTypeActive,
            ]}
            onPress={() =>
              setSearchParams(prev => ({ ...prev, tripType: 'round-trip' }))
            }
          >
            <Text
              style={[
                styles.tripTypeText,
                searchParams.tripType === 'round-trip' &&
                  styles.tripTypeTextActive,
              ]}
            >
              Round trip
            </Text>
          </TouchableOpacity>
        </View>

        {/* From/To Inputs with Suggestions */}
        <View>
          {/* From Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>From</Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.input}
                value={fromQuery}
                onChangeText={setFromQuery}
                placeholder="Origin city or airport"
                autoCapitalize="words"
              />
              {isSearchingFrom && (
                <ActivityIndicator
                  size="small"
                  color={AppTheme.colors.primary}
                  style={styles.loadingIndicator}
                />
              )}
            </View>
            {fromSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={fromSuggestions}
                  keyExtractor={item => item.navigation.entityId}
                  renderItem={({ item }) => renderSuggestion(item, 'from')}
                  style={styles.suggestionsList}
                  nestedScrollEnabled
                />
              </View>
            )}
          </View>

          {/* To Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>To</Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.input}
                value={toQuery}
                onChangeText={setToQuery}
                placeholder="Destination city or airport"
                autoCapitalize="words"
              />
              {isSearchingTo && (
                <ActivityIndicator
                  size="small"
                  color={AppTheme.colors.primary}
                  style={styles.loadingIndicator}
                />
              )}
            </View>
            {toSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                <FlatList
                  data={toSuggestions}
                  keyExtractor={item => item.navigation.entityId}
                  renderItem={({ item }) => renderSuggestion(item, 'to')}
                  style={styles.suggestionsList}
                  nestedScrollEnabled
                />
              </View>
            )}
          </View>
        </View>

        {/* Date Selectors */}
        <View style={styles.dateContainer}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Departure</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDepartureDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {searchParams.departDate
                  ? formatDateDisplay(departureDate)
                  : 'Select date'}
              </Text>
            </TouchableOpacity>
          </View>

          {searchParams.tripType === 'round-trip' && (
            <View style={[styles.inputContainer, { flex: 1 }]}>
              <Text style={styles.label}>Return</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowReturnDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {searchParams.returnDate
                    ? formatDateDisplay(returnDate)
                    : 'Select date'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Passengers */}
        <View style={styles.optionsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Passengers</Text>
            <View style={styles.passengerContainer}>
              <TouchableOpacity
                style={styles.passengerButton}
                onPress={() =>
                  setSearchParams(prev => ({
                    ...prev,
                    passengers: Math.max(1, prev.passengers - 1),
                  }))
                }
              >
                <Text style={styles.passengerButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.passengerCount}>
                {searchParams.passengers}
              </Text>
              <TouchableOpacity
                style={styles.passengerButton}
                onPress={() =>
                  setSearchParams(prev => ({
                    ...prev,
                    passengers: Math.min(9, prev.passengers + 1),
                  }))
                }
              >
                <Text style={styles.passengerButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity
          style={[
            styles.searchButton,
            isSearchingFlights && styles.searchButtonDisabled,
          ]}
          onPress={handleSearch}
          disabled={isSearchingFlights}
        >
          {isSearchingFlights ? (
            <View style={styles.searchButtonContent}>
              <ActivityIndicator
                size="small"
                color={AppTheme.colors.background}
              />
              <Text
                style={[
                  styles.searchButtonText,
                  styles.searchButtonTextLoading,
                ]}
              >
                Searching...
              </Text>
            </View>
          ) : (
            <Text style={styles.searchButtonText}>Search Flights</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Date Picker Modals */}
      <DatePicker
        modal
        open={showDepartureDatePicker}
        date={departureDate}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleDepartureDateConfirm}
        onCancel={() => setShowDepartureDatePicker(false)}
        title="Select Departure Date"
      />

      <DatePicker
        modal
        open={showReturnDatePicker}
        date={returnDate}
        mode="date"
        minimumDate={new Date(departureDate.getTime() + 24 * 60 * 60 * 1000)}
        onConfirm={handleReturnDateConfirm}
        onCancel={() => setShowReturnDatePicker(false)}
        title="Select Return Date"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: AppTheme.spacing.xl,
    backgroundColor: AppTheme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  title: {
    fontSize: AppTheme.fonts.size.heading,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.text,
  },
  signOutButton: {
    paddingHorizontal: AppTheme.spacing.sm,
    paddingVertical: AppTheme.spacing.sm,
    borderRadius: AppTheme.spacing.sm,
  },
  signOutText: {
    color: AppTheme.colors.background,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
  welcomeContainer: {
    padding: AppTheme.spacing.xl,
    backgroundColor: AppTheme.colors.background,
  },
  welcomeText: {
    fontSize: AppTheme.fonts.size.subtitle,
    color: AppTheme.colors.textSecondary,
  },
  searchContainer: {
    marginTop: 0,
    margin: AppTheme.spacing.xl,
    padding: AppTheme.spacing.xl,
    backgroundColor: AppTheme.colors.background,
    borderRadius: AppTheme.spacing.md,
    elevation: 2,
    shadowColor: AppTheme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: AppTheme.spacing.sm,
  },
  tripTypeContainer: {
    flexDirection: 'row',
    marginBottom: AppTheme.spacing.xl,
  },
  tripTypeButton: {
    flex: 1,
    padding: AppTheme.spacing.md,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.spacing.sm,
    alignItems: 'center',
    marginRight: AppTheme.spacing.sm,
  },
  tripTypeActive: {
    backgroundColor: AppTheme.colors.primary,
    borderColor: AppTheme.colors.primary,
  },
  tripTypeText: {
    fontSize: AppTheme.fonts.size.subtitle,
    color: AppTheme.colors.textSecondary,
  },
  tripTypeTextActive: {
    color: AppTheme.colors.background,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
  inputContainer: {
    marginBottom: AppTheme.spacing.md,
  },
  label: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.semibold,
    color: AppTheme.colors.textSecondary,
    marginBottom: AppTheme.spacing.sm,
  },
  searchInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.md,
    fontSize: AppTheme.fonts.size.subtitle,
    backgroundColor: AppTheme.colors.secondary,
  },
  loadingIndicator: {
    position: 'absolute',
    right: AppTheme.spacing.md,
  },
  suggestionsContainer: {
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderTopWidth: 0,
    borderRadius: AppTheme.spacing.sm,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: AppTheme.colors.background,
    maxHeight: 200,
  },
  suggestionsList: {
    maxHeight: 200,
  },
  suggestionItem: {
    padding: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  suggestionTitle: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.semibold,
    color: AppTheme.colors.text,
  },
  suggestionSubtitle: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: AppTheme.spacing.md,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.md,
    backgroundColor: AppTheme.colors.secondary,
    justifyContent: 'center',
    minHeight: 50,
  },
  dateButtonText: {
    fontSize: AppTheme.fonts.size.subtitle,
    color: AppTheme.colors.text,
  },
  optionsContainer: {
    marginBottom: AppTheme.spacing.xl,
  },
  passengerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.md,
  },
  passengerButton: {
    width: AppTheme.spacing['4xl'],
    height: AppTheme.spacing['4xl'],
    borderRadius: AppTheme.spacing.sm,
    backgroundColor: AppTheme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passengerButtonText: {
    color: AppTheme.colors.background,
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
  passengerCount: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.semibold,
    marginHorizontal: AppTheme.spacing.xl,
  },
  resultsInfo: {
    backgroundColor: AppTheme.colors.secondary,
    padding: AppTheme.spacing.md,
    borderRadius: AppTheme.spacing.sm,
    marginBottom: AppTheme.spacing.xl,
    alignItems: 'center',
  },
  resultsText: {
    fontSize: AppTheme.fonts.size.subtitle,
    color: AppTheme.colors.text,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
  cheapestPrice: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
    marginTop: AppTheme.spacing.sm,
  },
  searchButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.lg,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: AppTheme.colors.textSecondary,
  },
  searchButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchButtonText: {
    color: AppTheme.colors.background,
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
  searchButtonTextLoading: {
    marginLeft: AppTheme.spacing.sm,
  },
});
