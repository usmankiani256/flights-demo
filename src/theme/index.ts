import { AppThemeType } from '@/interfaces';

export const AppTheme: AppThemeType = {
  colors: {
    primary: '#030213',
    secondary: '#f1f1f3',
    background: '#ffffff',
    text: '#242424',
    card: '#ffffff',
    muted: '#717182',
    destructive: '#d4183d',
    border: 'rgba(0, 0, 0, 0.1)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  fonts: {
    size: {
      caption: 10,
      body: 12,
      default: 14,
      subtitle: 16,
      title: 20,
      heading: 24,
    },
    weight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
};
