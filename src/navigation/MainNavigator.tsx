import { apiClientManager } from '@/api/apiClient';
import ScreenWithLayout from '@/components/layouts/screenWithLayout/ScreenWithLayout';
import TabBar from '@/components/tabBar/TabBar';
import { ROUTES } from '@/config/routes';
import { SCREEN_CONFIG } from '@/config/screen';
import { useStore } from '@/store/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    apiClientManager.onTokenRefreshFailed(() => {
      void logout();
    });
  }, [logout]);

  return (
    <Tab.Navigator
      initialRouteName={ROUTES[2].key}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: false,
      }}
    >
      {ROUTES.map((route, index) => {
        const config = SCREEN_CONFIG[index as keyof typeof SCREEN_CONFIG];

        return (
          <Tab.Screen
            key={route.key}
            name={route.key}
            options={{
              title: route.title,
            }}
          >
            {() =>
              config.hasLayout ? (
                <ScreenWithLayout
                  component={config.component}
                  scrollable={config.scrollable}
                />
              ) : (
                <config.component />
              )
            }
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

export default MainNavigator;
