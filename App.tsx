import { queryClient } from '@/config/queryClient';
import { useThemeMode } from '@/hooks/useThemeMode';
import RootNavigator from '@/navigation/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { darkTheme, lightTheme } from './src/theme/theme';

if (__DEV__) {
  void import('./ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}

export default function App() {
  const { isDarkMode } = useThemeMode();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootNavigator />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
