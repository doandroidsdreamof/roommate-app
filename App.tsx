import { useThemeMode } from '@/hooks/useThemeMode';
import RootNavigator from '@/navigation/RootNavigator';
import { secureStorage } from '@/storage/storage';
import { useThemeStore } from '@/store/themeStore';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/theme/theme';

export default function App() {
  const { isDarkMode } = useThemeMode();
  const loadTheme = useThemeStore((state) => state.loadTheme);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadTheme();
    secureStorage.clearTokens();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <RootNavigator />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </PaperProvider>
  );
}
