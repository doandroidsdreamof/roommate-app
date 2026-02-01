import { ROUTES } from '@/config/routes';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MessageIconNotification from '../message/messageIconNotification/MessageIconNotification';
import { createStyles } from './TabBar.styles';

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const index = state.index;

  const tabBarHeight = 60 + insets.bottom;

  const handleTabPress = (i: number) => {
    if (i === state.index) return;
    navigation.navigate(state.routes[i].name);
  };

  return (
    <View style={[styles.container, { height: tabBarHeight }]}>
      <View style={[styles.tabsContainer, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, i) => {
          const isFocused = index === i;
          const routeConfig = ROUTES[i];
          const isMessageTab = route.name === 'MessagesList';

          return (
            <View key={route.key} style={styles.tabWrapper}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  isFocused && {
                    borderColor: theme.colors.primary,
                  },
                ]}
                onPress={() => handleTabPress(i)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                delayPressIn={0}
                activeOpacity={0.7}
              >
                {isMessageTab ? (
                  <MessageIconNotification
                    size={24}
                    color={
                      isFocused
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant
                    }
                    unreadCount={2}
                    icon="message-outline"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={routeConfig.icon}
                    size={24}
                    color={
                      isFocused
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant
                    }
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
