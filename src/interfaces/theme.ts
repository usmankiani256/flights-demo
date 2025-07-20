import { TextStyle } from 'react-native';

export interface AppThemeType {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    card: string;
    muted: string;
    destructive: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fonts: {
    size: {
      caption: number;
      body: number;
      default: number;
      subtitle: number;
      title: number;
      heading: number;
    };
    weight: {
      light: TextStyle['fontWeight'];
      regular: TextStyle['fontWeight'];
      medium: TextStyle['fontWeight'];
      semibold: TextStyle['fontWeight'];
      bold: TextStyle['fontWeight'];
    };
  };
}
