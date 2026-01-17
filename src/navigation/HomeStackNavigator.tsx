import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/home/HomeScreen';
import PostingDetailScreen from '@/screens/postingDetailScreen/PostingDetailScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  PostingDetail: { postingId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PostingDetail" component={PostingDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
