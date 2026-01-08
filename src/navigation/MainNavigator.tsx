import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from '@/screens/HomeScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SwipeScreen from '@/screens/SwipeScreen';
import MessageScreen from '@/screens/MessageScreen';
import BookmarksScreen from '@/screens/BookmarksScreen';
import CurvedTabBar from '@/components/CurvedTabBar';
import { apiClientManager } from '@/api/apiClient';
import { useAuthStore } from '@/store/authStore';

const MainNavigator = () => {
  const [index, setIndex] = useState(2); // Start at Home (middle)
  const logout = useAuthStore((state) => state.logout);

  const [routes] = useState([
    {
      key: 'bookmarks',
      title: 'Saved',
      focusedIcon: 'bookmark' as const,
      unfocusedIcon: 'bookmark-outline' as const,
    },
    {
      key: 'swipe',
      title: 'Swipe',
      focusedIcon: 'cards' as const,
      unfocusedIcon: 'cards-outline' as const,
    },
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home' as const,
      unfocusedIcon: 'home-outline' as const,
    },
    {
      key: 'messages',
      title: 'Messages',
      focusedIcon: 'message' as const,
      unfocusedIcon: 'message-outline' as const,
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account' as const,
      unfocusedIcon: 'account-outline' as const,
    },
  ]);
  useEffect(() => {
    apiClientManager.onTokenRefreshFailed(() => {
      logout();
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
