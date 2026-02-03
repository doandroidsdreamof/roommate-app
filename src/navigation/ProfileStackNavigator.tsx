import BookmarksScreen from '@/screens/bookmark/BookmarksScreen';
import PostingDetailScreen from '@/screens/home/postingDetailScreen/PostingDetailScreen';
import ProfileScreen from '@/screens/profile/main/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ProfileStackParamList = {
  Profile: undefined;
  Bookmarks: undefined;
  PostingDetail: { postingId: string };
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="PostingDetail" component={PostingDetailScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
