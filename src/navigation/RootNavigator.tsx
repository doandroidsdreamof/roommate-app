import { messagingSync, resetMessagingSync } from '@/api/local/messagingSync';
import Loading from '@/components/primitives/loading/Loading';
import { useProfile } from '@/hooks/useProfile';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useStore } from '@/store/index';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { combinedDarkTheme, combinedLightTheme } from '../theme/theme';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import ProfileSetupNavigator from './ProfileSetupNavigator';
import GlobalToast from '@/components/globalToast/GlobalToast';

const RootNavigator = () => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    checkAuth,
    profile,
  } = useStore();
  const { profile: user } = useProfile();

  const { isDarkMode } = useThemeMode();
  const navigationTheme = isDarkMode ? combinedDarkTheme : combinedLightTheme;

  const { isFetched: isFetched, profileError, isLoading } = useProfile();

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user?.id) {
      console.log('🚀 ~ user?.id:', user?.id);
      messagingSync(user.id).catch(console.error);
    }

    return () => {
      if (!user?.id) {
        resetMessagingSync();
      }
    };
  }, [user?.id]);

  const isInitializing =
    isAuthLoading || (isAuthenticated && (!isFetched || isLoading));

  if (isInitializing) {
    return <Loading />;
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : !profile &&
        profileError !== 'NETWORK_ERROR' &&
        profileError !== null ? (
        <ProfileSetupNavigator /> // TODO glitch bug check online status too
      ) : (
        <MainNavigator />
      )}
      <GlobalToast />
    </NavigationContainer>
  );
};

export default RootNavigator;
