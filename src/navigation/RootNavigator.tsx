import { messagingSync, resetMessagingSync } from '@/api/local/messagingSync';
import ErrorScreen from '@/components/errors/ErrorScreen';
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
import { clearAllMessages } from '@/api/local/messageLocalApi';

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
  const profileError = useStore((state) => state.profileError);

  const { isFetched: isProfileFetched, refetch, isRefetching } = useProfile();

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // void clearAllMessages();
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
    isAuthLoading || (isAuthenticated && !isProfileFetched);

  if (isInitializing) {
    return (
      <View style={containerStyle.container}>
        <ActivityIndicator size="large" color="#3ECF8E" />
      </View>
    );
  }

  if (isAuthenticated && profileError === 'NETWORK_ERROR') {
    return (
      <ErrorScreen
        icon="wifi-off"
        title="Bağlantı Hatası"
        message="Bir sorun yaşanıyor"
        actionLabel="Tekrar Dene"
        onAction={() => refetch()}
        isLoading={isRefetching}
      />
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : !profile ? (
        <ProfileSetupNavigator /> // TODO glitch bug check online status too
      ) : (
        <MainNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
