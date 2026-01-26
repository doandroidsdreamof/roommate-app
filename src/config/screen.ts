import MessagesStackNavigator from '@/components/swipe/matchModal/MessagesStackNavigator';
import BookmarksStackNavigator from '@/navigation/BookmarksStackNavigator';
import HomeStackNavigator from '@/navigation/HomeStackNavigator';
import ProfileScreen from '@/screens/profile/main/ProfileScreen';
import SwipeScreen from '@/screens/swipe/SwipeScreen';

export const SCREEN_CONFIG = {
  0: { component: BookmarksStackNavigator, scrollable: false, hasLayout: true },
  1: { component: SwipeScreen, scrollable: false, hasLayout: false },
  2: { component: HomeStackNavigator, scrollable: false, hasLayout: true },
  3: {
    component: MessagesStackNavigator,
    hasLayout: true,
    scrollable: false,
  },
  4: { component: ProfileScreen, scrollable: true, hasLayout: true },
};
