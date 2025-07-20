import { AppTheme } from '@/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppScreens, RootStackParamList } from '@/interfaces/navigation';
import { useAuthService } from '@/hooks/Auth/AuthContext';

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isLoggedIn, isInitialized } = useAuthService();

  const handleNavigation = useCallback(async () => {
    if (isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: AppScreens.Home }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: AppScreens.Login }],
      });
    }
  }, [navigation, isLoggedIn]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isInitialized) {
        handleNavigation();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [handleNavigation, isInitialized]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to{'\n'}
        <Text style={styles.emphasis}>Flights App</Text>
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
