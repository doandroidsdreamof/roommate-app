import { shadows } from '@/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import MessageIconNotification from '../messageIconNotification/MessageIconNotification';
import { createStyles } from './TabBar.styles';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5;

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Route {
  key: string;
  title: string;
  focusedIcon: IconName;
  unfocusedIcon: IconName;
}

interface TabBarBarProps {
  navigationState: { index: number; routes: Route[] };
  onIndexChange: (index: number) => void;
}

const TabBar = ({ navigationState, onIndexChange }: TabBarBarProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();
  const { index, routes } = navigationState;

  const scaleAnims = useRef(routes.map(() => new Animated.Value(1))).current;

  const handleTabPress = (i: number) => {
    if (i === index) return;

    Animated.sequence([
      Animated.timing(scaleAnims[i], {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[i], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    onIndexChange(i);
  };

  const tabBarHeight = 60 + insets.bottom;

  return (
    <View style={[styles.container, { height: tabBarHeight }]}>
      <View style={styles.background}>
        <Svg width={width} height={80} style={StyleSheet.absoluteFillObject}>
          <Path
            d={`
              M 0,20
              L ${index * TAB_WIDTH + TAB_WIDTH / 2 - 40},20
              Q ${index * TAB_WIDTH + TAB_WIDTH / 2 - 20},20 ${index * TAB_WIDTH + TAB_WIDTH / 2 - 10},10
              Q ${index * TAB_WIDTH + TAB_WIDTH / 2},0 ${index * TAB_WIDTH + TAB_WIDTH / 2 + 10},10
              Q ${index * TAB_WIDTH + TAB_WIDTH / 2 + 20},20 ${index * TAB_WIDTH + TAB_WIDTH / 2 + 40},20
              L ${width},20
              L ${width},${tabBarHeight + 20}
              L 0,${tabBarHeight + 20}
              Z
            `}
            fill={theme.colors.surface}
          />
        </Svg>
      </View>

      <View style={[styles.tabsContainer, { paddingBottom: insets.bottom }]}>
        {routes.map((route, i) => {
          const isFocused = index === i;
          const isMessageTab = route.key === 'messages';

          return (
            <View key={route.key} style={styles.tabWrapper}>
              {isFocused && (
                <Animated.View
                  style={[
                    styles.activeCircle,
                    shadows.lg,
                    {
                      backgroundColor: theme.colors.primary,
                      transform: [{ scale: scaleAnims[i] }],
                    },
                  ]}
                >
                  {isMessageTab ? (
                    <MessageIconNotification
                      size={28}
                      color={theme.colors.onPrimary}
                      unreadCount={2}
                      icon='message'
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={route.focusedIcon}
                      size={28}
                      color={theme.colors.onPrimary}
                    />
                  )}
                </Animated.View>
              )}

              {!isFocused && (
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => handleTabPress(i)}
                  activeOpacity={0.7}
                >
                  {isMessageTab ? (
                    <MessageIconNotification
                      size={24}
                      color={theme.colors.onSurfaceVariant}
                      unreadCount={2}
                      icon='message-outline'
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={route.unfocusedIcon}
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
