import { useAuthStore } from '@/store/authStore';
import { containerStyle } from '@/style/main.style';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator = () => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

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
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
