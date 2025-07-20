import { AppTheme } from '@/theme';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthService } from '@/hooks/Auth/AuthContext';

export default function HomeScreen() {
  const { user } = useAuthService();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome{'\n'}
        <Text style={styles.emphasis}>{user?.email}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: AppTheme.fonts.size.subtitle,
    fontWeight: AppTheme.fonts.weight.medium,
    letterSpacing: 0.5,
    color: AppTheme.colors.text,
    textAlign: 'center',
  },
  emphasis: {
    color: AppTheme.colors.primary,
    fontSize: AppTheme.fonts.size.heading,
    fontWeight: AppTheme.fonts.weight.semibold,
  },
});
