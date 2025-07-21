import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScreen,
  LoginScreen,
  SignUpScreen,
  SplashScreen,
  FlightsResultsScreen,
} from '@/screens';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';
import { AppScreens, RootStackParamList } from '@/interfaces';

const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: AppScreens.Splash,
  screenOptions: { headerShown: false },
  screens: {
    [AppScreens.Splash]: SplashScreen,
    [AppScreens.Login]: LoginScreen,
    [AppScreens.SignUp]: SignUpScreen,
    [AppScreens.Home]: HomeScreen,
    [AppScreens.FlightsResults]: FlightsResultsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function AppNavigator() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
});
