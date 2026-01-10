import { shadows, spacing } from '@/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 5;

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Route {
  key: string;
  title: string;
  focusedIcon: IconName;
  unfocusedIcon: IconName;
}

interface CurvedTabBarProps {
  navigationState: { index: number; routes: Route[] };
  onIndexChange: (index: number) => void;
}

const CurvedTabBar = ({
  navigationState,
  onIndexChange,
}: CurvedTabBarProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { index, routes } = navigationState;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, scaleAnim]);

  const tabBarHeight = 60 + insets.bottom;

  return (
    <View style={[styles.container, { height: tabBarHeight }]}>
      {/* Background with curve */}
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

      {/* Tab buttons */}
      <View style={[styles.tabsContainer, { paddingBottom: insets.bottom }]}>
        {routes.map((route, i) => {
          const isFocused = index === i;

          return (
            <View key={route.key} style={styles.tabWrapper}>
              {isFocused && (
                <Animated.View
                  style={[
                    styles.activeCircle,
                    shadows.lg,
                    {
                      backgroundColor: theme.colors.primary,
                      transform: [{ scale: scaleAnim }],
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={route.focusedIcon}
                    size={28}
                    color={theme.colors.onPrimary}
                  />
                </Animated.View>
              )}

              {!isFocused && (
                <TouchableOpacity
                  style={styles.tab}
                  onPress={() => onIndexChange(i)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name={route.unfocusedIcon}
                    size={24}
                    color={theme.colors.onSurfaceVariant}
                  />
                  {route.title && (
                    <Text
                      style={[
                        styles.label,
                        { color: theme.colors.onSurfaceVariant },
                      ]}
                      numberOfLines={1}
                    >
                      {route.title}
                    </Text>
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

const styles = StyleSheet.create({
  activeCircle: {
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    width: 60,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    },
  tabWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: spacing.md,
  },
});

export default CurvedTabBar;
