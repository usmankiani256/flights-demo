import * as React from 'react';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '@/screens';
import { SafeAreaView, StyleSheet } from 'react-native';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screenOptions: { headerShown: false },
  screens: {
    Splash: SplashScreen,
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
  root: { flex: 1 },
});
