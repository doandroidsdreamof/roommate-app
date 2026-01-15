// navigation/RootNavigator.tsx
import { useProfile } from '@/hooks/useProfile';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useStore } from '@/store/index';
import { containerStyle } from '@/styles/main.style';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { combinedDarkTheme, combinedLightTheme } from '../theme/theme';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import ProfileSetupNavigator from './ProfileSetupNavigator';

const RootNavigator = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    checkAuth,
    profile,
    isProfileLoaded,
  } = useStore();
  const { isDarkMode } = useThemeMode();
  const navigationTheme = isDarkMode ? combinedDarkTheme : combinedLightTheme;

  const { isFetched: isProfileFetched } = useProfile();

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  // Wait for auth check AND profile fetch to complete
  const isInitializing =
    isAuthLoading || (isAuthenticated && !isProfileFetched);

  if (isInitializing || !isProfileLoaded) {
    return (
      <View style={containerStyle.container}>
        <ActivityIndicator size="large" color="#3ECF8E" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : !profile ? (
        <ProfileSetupNavigator />
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
