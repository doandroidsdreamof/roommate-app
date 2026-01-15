import { apiClientManager } from '@/api/apiClient';
import ScreenLayout from '@/components/screenLayout/ScreenLayout';
import TabBar from '@/components/tabBar/TabBar';
import { ROUTES } from '@/config/routes';
import { SCREEN_CONFIG } from '@/config/screen';
import { useStore } from '@/store/index';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const MainNavigator = () => {
  const [index, setIndex] = useState(2);
  const logout = useStore((state) => state.logout);
  const [routes] = useState(ROUTES);

  useEffect(() => {
    apiClientManager.onTokenRefreshFailed(() => {
      void logout();
    });
  }, [logout]);

  const currentConfig = SCREEN_CONFIG[index as keyof typeof SCREEN_CONFIG];
  const CurrentScreen = currentConfig.component;

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        {currentConfig.hasLayout ? (
          <ScreenLayout scrollable={currentConfig.scrollable}>
            <CurrentScreen />
          </ScreenLayout>
        ) : (
          <CurrentScreen />
        )}
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
