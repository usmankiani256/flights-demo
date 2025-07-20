import { AppTheme } from '@/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppScreens, RootStackParamList } from '@/interfaces/navigation';

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: AppScreens.Login }],
      });
    }, 1000);
  }, [navigation]);

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
