import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '@/screens/HomeScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SwipeScreen from '@/screens/swipe/SwipeScreen';
import MessageScreen from '@/screens/MessageScreen';
import BookmarksScreen from '@/screens/BookmarksScreen';
import CurvedTabBar from '@/components/CurvedTabBar';
import { apiClientManager } from '@/api/apiClient';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/config/routes';

const MainNavigator = () => {
  const [index, setIndex] = useState(2); // Start at Home (middle)
  const logout = useAuthStore((state) => state.logout);

  const [routes] = useState(ROUTES);
  //! logout guard
  // TODO look better ways
  useEffect(() => {
    apiClientManager.onTokenRefreshFailed(() => {
      void logout();
    });
  }, []);

  const screens = [
    BookmarksScreen,
    SwipeScreen,
    HomeScreen,
    MessageScreen,
    ProfileScreen,
  ];
  const CurrentScreen = screens[index];

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <CurrentScreen />
      </View>
      <CurvedTabBar
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
});

export default MainNavigator;
