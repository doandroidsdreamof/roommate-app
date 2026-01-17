import { queryClient } from '@/config/queryClient';
import { useThemeMode } from '@/hooks/useThemeMode';
import RootNavigator from '@/navigation/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PaperProvider } from 'react-native-paper';

if (__DEV__) {
  void import('./ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}

export default function App() {
  const { theme, isDarkMode } = useThemeMode();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootNavigator />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
