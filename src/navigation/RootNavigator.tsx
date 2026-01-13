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
  const { isAuthenticated, isLoading, checkAuth, hasProfile } = useStore();
  const { isDarkMode } = useThemeMode();
  const navigationTheme = isDarkMode ? combinedDarkTheme : combinedLightTheme;

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  if (isLoading) {
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
      ) : !hasProfile ? (
        <ProfileSetupNavigator />
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;