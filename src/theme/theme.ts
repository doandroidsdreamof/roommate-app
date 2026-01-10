import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const airbnbColors = {
  rausch: '#FF5A5F',
  babu: '#00A699',
  arches: '#FC642D',
  hof: '#484848',
  foggy: '#767676',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: airbnbColors.rausch,
    primaryContainer: '#FFE8E9',
    secondary: airbnbColors.babu,
    secondaryContainer: '#E0F5F3',
    tertiary: airbnbColors.arches,
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceVariant: '#F7F7F7',
    error: '#C13515',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: airbnbColors.hof,
    onSurface: airbnbColors.hof,
    onSurfaceVariant: airbnbColors.foggy,
    outline: '#DDDDDD',
    outlineVariant: '#EBEBEB',
    shadow: '#000000',
    scrim: '#000000',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: airbnbColors.rausch,
    primaryContainer: '#8C2E31',
    secondary: airbnbColors.babu,
    secondaryContainer: '#005450',
    tertiary: airbnbColors.arches,
    background: '#000000',
    surface: '#1A1A1A',
    surfaceVariant: '#222222',
    error: '#FF5449',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#AAAAAA',
    outline: '#3A3A3A',
    outlineVariant: '#2B2B2B',
    shadow: '#000000',
    scrim: '#000000',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '800' as const, letterSpacing: -0.5 },
  h2: { fontSize: 26, fontWeight: '800' as const, letterSpacing: -0.3 },
  h3: { fontSize: 22, fontWeight: '600' as const, letterSpacing: -0.2 },
  h4: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyLarge: { fontSize: 18, fontWeight: '400' as const, lineHeight: 26 },
  caption: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  button: { fontSize: 16, fontWeight: '600' as const, letterSpacing: 0.5 },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};
