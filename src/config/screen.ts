import HomeStackNavigator from '@/navigation/HomeStackNavigator';
import MessagesStackNavigator from '@/navigation/MessagesStackNavigator';
import ProfileStackNavigator from '@/navigation/ProfileStackNavigator';
import PostingScreen from '@/screens/posting/PostingScreen';
import SwipeScreen from '@/screens/swipe/SwipeScreen';

export const SCREEN_CONFIG = {
  posting: { component: PostingScreen, scrollable: true, hasLayout: false },
  swipe: { component: SwipeScreen, scrollable: false, hasLayout: false },
  home: { component: HomeStackNavigator, scrollable: false, hasLayout: true },
  messages: {
    component: MessagesStackNavigator,
    hasLayout: true,
    scrollable: false,
  },
  profile: {
    component: ProfileStackNavigator,
    scrollable: false,
    hasLayout: true,
  },
}
