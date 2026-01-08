import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { Text } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  }, [index]);

  return (
    <View style={styles.container}>
      {/* White background with curve */}
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
              L ${width},80
              L 0,80
              Z
            `}
            fill="#FFFFFF"
          />
        </Svg>
      </View>

      {/* Tab buttons */}
      <View style={styles.tabsContainer}>
        {routes.map((route, i) => {
          const isFocused = index === i;

          return (
            <View key={route.key} style={styles.tabWrapper}>
              {isFocused && (
                <Animated.View
                  style={[
                    styles.activeCircle,
                    {
                      transform: [{ scale: scaleAnim }],
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={route.focusedIcon}
                    size={32}
                    color="#FFFFFF"
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
                    color="#666"
                  />
                  {route.title && (
                    <Text style={styles.label} numberOfLines={1}>
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
    backgroundColor: '#3ECF8E',
    borderRadius: 30,
    elevation: 8,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    top: -10,
    width: 60,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    bottom: 20,
    height: 90,
    left: 0,
    paddingBottom: 0,
    position: 'absolute',
    right: 0,
  },
  label: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  tab: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  tabWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 100,
  },
});

export default CurvedTabBar;
