import { apiClientManager } from '@/api/apiClient';
import TabBar from '@/components/tabBar/TabBar';
import { ROUTES } from '@/config/routes';
import BookmarksScreen from '@/screens/bookmark/BookmarksScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import MessageScreen from '@/screens/message/MessageScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import SwipeScreen from '@/screens/swipe/SwipeScreen';
import { useStore } from '@/store/index';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const MainNavigator = () => {
  const [index, setIndex] = useState(2); // Start at Home (middle)
  const logout = useStore((state) => state.logout);

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
      <TabBar navigationState={{ index, routes }} onIndexChange={setIndex} />
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
