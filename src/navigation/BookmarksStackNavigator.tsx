import BookmarksScreen from '@/screens/bookmark/BookmarksScreen';
import PostingDetailScreen from '@/screens/home/postingDetailScreen/PostingDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type BookmarksStackParamList = {
  Bookmarks: undefined;
  PostingDetail: { postingId: string };
};

const Stack = createNativeStackNavigator<BookmarksStackParamList>();

const BookmarksStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="PostingDetail" component={PostingDetailScreen} />
    </Stack.Navigator>
  );
};

export default BookmarksStackNavigator;
