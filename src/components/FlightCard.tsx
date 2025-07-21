import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { AppTheme } from '@/theme';
import { Flight } from '@/interfaces';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FlightCardProps {
  flight: Flight;
  onSelect: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelect }) => {
  const handleBookNow = async () => {
    Alert.alert('Booking', 'Booking feature coming soon!');
  };

  const renderTags = () => {
    if (!flight.tags || flight.tags.length === 0) return null;

    return (
      <View style={styles.tagsContainer}>
        {flight.tags.slice(0, 2).map((tag, index) => (
          <View key={index} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag.replace('_', ' ')}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderLayovers = () => {
    if (!flight.layovers || flight.layovers.length === 0) return null;

    return (
      <View style={styles.layoverContainer}>
        <Text style={styles.layoverTitle}>Layovers:</Text>
        {flight.layovers.map((layover, index) => (
          <Text key={index} style={styles.layoverText}>
            {layover.duration} in {layover.airport}
          </Text>
        ))}
      </View>
    );
  };

  const renderFarePolicy = () => {
    const policies = [];
    if (flight.farePolicy.isChangeable) policies.push('Changeable');
    if (flight.farePolicy.isRefundable) policies.push('Refundable');
    if (flight.farePolicy.hasFlexibleOptions) policies.push('Flexible');

    if (policies.length === 0) return null;

    return (
      <View style={styles.farePolicyContainer}>
        {policies.map((policy, index) => (
          <View key={index} style={styles.policyBadge}>
            <Icon
              name="check-circle"
              size={12}
              color={AppTheme.colors.primary}
            />
            <Text style={styles.policyText}>{policy}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.flightCard} onPress={onSelect}>
      <View style={styles.flightHeader}>
        <View style={styles.airlineInfo}>
          {flight.carrierLogo && (
            <Image
              source={{ uri: flight.carrierLogo }}
              style={styles.carrierLogo}
              resizeMode="contain"
            />
          )}
          <View style={styles.airlineDetails}>
            <Text style={styles.airline}>{flight.airline}</Text>
            <Text style={styles.flightNumber}>
              {flight.flightNumber} • {flight.cabinClass}
            </Text>
          </View>
        </View>
        {renderTags()}
      </View>

      <View style={styles.flightDetails}>
        <View style={styles.timeSection}>
          <Text style={styles.time}>{flight.departTime}</Text>
          <Text style={styles.airport}>{flight.from.code}</Text>
          <Text style={styles.city}>{flight.from.city}</Text>
        </View>

        <View style={styles.durationSection}>
          <Text style={styles.duration}>{flight.duration}</Text>
          <View style={styles.flightLine}>
            <View style={styles.dot} />
            <View style={styles.line} />
            {flight.stops > 0 && <View style={styles.stopDot} />}
            <View style={styles.line} />
            <View style={styles.dot} />
          </View>
          <Text style={styles.stops}>
            {flight.stops === 0
              ? 'Nonstop'
              : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
          </Text>
        </View>

        <View style={styles.timeSection}>
          <View style={styles.arrivalContainer}>
            <Text style={styles.time}>{flight.arrivalTime}</Text>
            {flight.timeDeltaInDays > 0 && (
              <Text style={styles.nextDayIndicator}>
                +{flight.timeDeltaInDays}d
              </Text>
            )}
          </View>
          <Text style={styles.airport}>{flight.to.code}</Text>
          <Text style={styles.city}>{flight.to.city}</Text>
        </View>
      </View>

      {renderLayovers()}

      <View style={styles.priceSection}>
        <View style={styles.priceInfo}>
          <Text style={styles.price}>{flight.priceFormatted}</Text>
          <Text style={styles.currency}>per person</Text>
          {flight.eco && (
            <Text style={styles.ecoInfo}>
              Eco-friendly • {flight.eco.ecoContenderDelta.toFixed(1)}% less CO₂
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Icon
            name="arrow-forward"
            size={16}
            color={AppTheme.colors.background}
          />
        </TouchableOpacity>
      </View>

      {renderFarePolicy()}

      <View style={styles.flightFooter}>
        <Text style={styles.aircraft}>{flight.aircraft}</Text>
        <Text style={styles.flightId}>
          Flight ID: {flight.id.split('-')[0]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flightCard: {
    backgroundColor: AppTheme.colors.background,
    marginHorizontal: AppTheme.spacing.xl,
    marginBottom: AppTheme.spacing.md,
    borderRadius: AppTheme.spacing.sm,
    padding: AppTheme.spacing.xl,
    elevation: 2,
    shadowColor: AppTheme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: AppTheme.spacing.sm,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: AppTheme.spacing.md,
  },
  airlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  carrierLogo: {
    width: 32,
    height: 32,
    marginRight: AppTheme.spacing.sm,
    borderRadius: AppTheme.spacing.xs,
  },
  airlineDetails: {
    flex: 1,
  },
  airline: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.text,
  },
  flightNumber: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AppTheme.spacing.xs,
  },
  tagBadge: {
    backgroundColor: AppTheme.colors.primary,
    paddingHorizontal: AppTheme.spacing.sm,
    paddingVertical: AppTheme.spacing.xs,
    borderRadius: AppTheme.spacing.xs,
  },
  tagText: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.background,
    fontWeight: AppTheme.fonts.weight.semibold,
    textTransform: 'capitalize',
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.md,
  },
  timeSection: {
    alignItems: 'center',
    flex: 1,
  },
  arrivalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppTheme.spacing.xs,
  },
  time: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.text,
  },
  nextDayIndicator: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.accent,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
  airport: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
    marginTop: AppTheme.spacing.xs,
  },
  city: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
  },
  durationSection: {
    alignItems: 'center',
    flex: 1,
  },
  duration: {
    fontSize: AppTheme.fonts.size.default,
    color: AppTheme.colors.textSecondary,
    marginBottom: AppTheme.spacing.xs,
  },
  flightLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.xs,
    width: '100%',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AppTheme.colors.primary,
  },
  line: {
    height: 1,
    backgroundColor: AppTheme.colors.border,
    flex: 1,
  },
  stopDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: AppTheme.colors.accent,
  },
  stops: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
  },
  layoverContainer: {
    backgroundColor: AppTheme.colors.secondary,
    padding: AppTheme.spacing.sm,
    borderRadius: AppTheme.spacing.xs,
    marginBottom: AppTheme.spacing.md,
  },
  layoverTitle: {
    fontSize: AppTheme.fonts.size.body,
    fontWeight: AppTheme.fonts.weight.semibold,
    color: AppTheme.colors.text,
    marginBottom: AppTheme.spacing.xs,
  },
  layoverText: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppTheme.spacing.sm,
  },
  priceInfo: {
    flex: 1,
  },
  price: {
    fontSize: AppTheme.fonts.size.heading,
    fontWeight: AppTheme.fonts.weight.bold,
    color: AppTheme.colors.primary,
  },
  currency: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  ecoInfo: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.primary,
    marginTop: AppTheme.spacing.xs,
  },
  bookButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingHorizontal: AppTheme.spacing.lg,
    paddingVertical: AppTheme.spacing.md,
    borderRadius: AppTheme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppTheme.spacing.xs,
  },
  bookButtonText: {
    color: AppTheme.colors.background,
    fontSize: AppTheme.fonts.size.default,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
  farePolicyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: AppTheme.spacing.sm,
    marginBottom: AppTheme.spacing.sm,
  },
  policyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppTheme.spacing.xs,
  },
  policyText: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
  },
  flightFooter: {
    borderTopWidth: 1,
    borderTopColor: AppTheme.colors.border,
    paddingTop: AppTheme.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aircraft: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
  },
  flightId: {
    fontSize: AppTheme.fonts.size.body,
    color: AppTheme.colors.textSecondary,
  },
});

export default FlightCard;
