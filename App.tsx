import Loading from '@/components/primitives/loading/Loading';
import { queryClient } from '@/config/queryClient';
import { useThemeMode } from '@/hooks/useThemeMode';
import RootNavigator from '@/navigation/RootNavigator';
import { QueryClientProvider } from '@tanstack/react-query';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { db } from './db';
import migrations from './drizzle/migrations';

if (__DEV__) {
  void import('./ReactotronConfig').then(() =>
    console.log('Reactotron Configured')
  );
}
export default function App() {
  const { theme, isDarkMode } = useThemeMode();
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.error('Migration error:', error);
  }

  if (!success) {
    return <Loading />;
  }

  

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootNavigator />
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
