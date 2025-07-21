import { FlightSearchResponse, MainSearchParams } from './flights';

export enum AppScreens {
  Splash = 'Splash',
  Login = 'Login',
  SignUp = 'SignUp',
  Home = 'Home',
  FlightsResults = 'FlightsResults',
}

export type RootStackParamList = {
  [AppScreens.Splash]: undefined;
  [AppScreens.Login]: { email?: string; password?: string };
  [AppScreens.SignUp]: { email?: string };
  [AppScreens.Home]: undefined;
  [AppScreens.FlightsResults]: {
    flightResults: FlightSearchResponse;
    searchParams: MainSearchParams;
  };
};
