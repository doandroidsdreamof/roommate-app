import { ListsQueryParams } from '@/api';
import ListingsScreen from '@/screens/home/listings/ListingsScreen';
import HomeScreen from '@/screens/home/main/HomeScreen';
import PostingDetailScreen from '@/screens/home/postingDetailScreen/PostingDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeMain: undefined;
  HomePostingDetail: { postingId: string };
  Listings: {
    title: string;
    params: Omit<ListsQueryParams, 'cursor'>;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="HomePostingDetail" component={PostingDetailScreen} />
      <Stack.Screen name="Listings" component={ListingsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
