import { shadows } from '@/theme/theme';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import MessageIconNotification from '../message/messageIconNotification/MessageIconNotification';
import { createStyles } from './TabBar.styles';
import { ROUTES } from '@/config/routes';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5;

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const index = state.index;

  const tabBarHeight = 60 + insets.bottom;

  const svgPath = useMemo(() => {
    const centerX = index * TAB_WIDTH + TAB_WIDTH / 2;
    return `
      M 0,20
      L ${centerX - 40},20
      Q ${centerX - 20},20 ${centerX - 10},10
      Q ${centerX},0 ${centerX + 10},10
      Q ${centerX + 20},20 ${centerX + 40},20
      L ${width},20
      L ${width},${tabBarHeight + 20}
      L 0,${tabBarHeight + 20}
      Z
    `;
  }, [index, tabBarHeight]);

  const handleTabPress = (i: number) => {
    if (i === state.index) return;
    navigation.navigate(state.routes[i].name);
  };

  return (
    <View style={[styles.container, { height: tabBarHeight }]}>
      <View style={styles.background}>
        <Svg width={width} height={80} style={StyleSheet.absoluteFillObject}>
          <Path d={svgPath} fill={theme.colors.surface} />
        </Svg>
      </View>

      <View style={[styles.tabsContainer, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, i) => {
          const isFocused = index === i;
          const routeConfig = ROUTES[i];
          const isMessageTab = route.name === 'MessagesList';

          return (
            <View key={route.key} style={styles.tabWrapper}>
              {isFocused && (
                <View
                  style={[
                    styles.activeCircle,
                    shadows.lg,
                    { backgroundColor: theme.colors.primary },
                  ]}
                >
                  {isMessageTab ? (
                    <MessageIconNotification
                      size={28}
                      color={theme.colors.onPrimary}
                      unreadCount={2}
                      icon="message"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={routeConfig.focusedIcon}
                      size={28}
                      color={theme.colors.onPrimary}
                    />
                  )}
                </View>
              )}

              {!isFocused && (
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => handleTabPress(i)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  delayPressIn={0}
                  activeOpacity={0.7}
                >
                  {isMessageTab ? (
                    <MessageIconNotification
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                      unreadCount={2}
                      icon="message-outline"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={routeConfig.unfocusedIcon}
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
