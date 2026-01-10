import { apiClientManager } from '@/api/apiClient';
import TabBar from '@/components/tabBar/TabBar';
import { ROUTES } from '@/config/routes';
import BookmarksScreen from '@/screens/BookmarksScreen';
import HomeScreen from '@/screens/HomeScreen';
import MessageScreen from '@/screens/MessageScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SwipeScreen from '@/screens/swipe/SwipeScreen';
import { useAuthStore } from '@/store/authStore';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const MainNavigator = () => {
  const [index, setIndex] = useState(2); // Start at Home (middle)
  const logout = useAuthStore((state) => state.logout);

  const [routes] = useState(ROUTES);
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
      <TabBar
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
