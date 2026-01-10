import { useThemeMode } from '@/hooks/useThemeMode';
import RootNavigator from '@/navigation/RootNavigator';
import { useThemeStore } from '@/store/themeStore';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/theme/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/queryClient';

export default function App() {
  const { isDarkMode } = useThemeMode();
  const loadTheme = useThemeStore((state) => state.loadTheme);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootNavigator />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
