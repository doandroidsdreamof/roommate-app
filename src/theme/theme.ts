import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Supabase color palette
const baseColors = {
  brand: '#3ECF8E',
  brandAccent: '#24B47E',
  alternative: '#1F1F1F',
  surface: '#FAFAFA',
  border: '#E8E8E8',
  text: '#1F1F1F',
  textMuted: '#6B7280',
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: baseColors.brand,
    primaryContainer: baseColors.brandAccent,
    secondary: baseColors.alternative,
    background: '#FFFFFF',
    surface: baseColors.surface,
    error: '#EF4444',
    onPrimary: '#FFFFFF',
    onBackground: baseColors.text,
    onSurface: baseColors.text,
    outline: baseColors.border,
  },
  roundness: 8,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: baseColors.brand,
    primaryContainer: baseColors.brandAccent,
    secondary: '#FFFFFF',
    background: '#0F0F0F',
    surface: '#1A1A1A',
    error: '#EF4444',
    onPrimary: '#FFFFFF',
    onBackground: '#FFFFFF',
    onSurface: '#FFFFFF',
    outline: '#333333',
  },
  roundness: 8,
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
  h1: { fontSize: 32, fontWeight: '700' as const },
  h2: { fontSize: 24, fontWeight: '600' as const },
  h3: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 14, fontWeight: '400' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
};