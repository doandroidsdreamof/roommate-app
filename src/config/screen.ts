import BookmarksScreen from '@/screens/bookmark/BookmarksScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import MessageScreen from '@/screens/message/MessageScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import SwipeScreen from '@/screens/swipe/SwipeScreen';

export const SCREEN_CONFIG = {
  0: { component: BookmarksScreen, scrollable: false, hasLayout: true },
  1: { component: SwipeScreen, scrollable: false, hasLayout: false },
  2: { component: HomeScreen, scrollable: false, hasLayout: true },
  3: { component: MessageScreen, scrollable: false, hasLayout: true },
  4: { component: ProfileScreen, scrollable: true, hasLayout: true },
};
