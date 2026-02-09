import PostingDetailScreen from '@/screens/home/postingDetailScreen/PostingDetailScreen';
import PostingScreen from '@/screens/posting/PostingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type PostingStackParamList = {
  PostingList: undefined;
  PostingDetail: { postingId: string };
};

const Stack = createNativeStackNavigator<PostingStackParamList>();

const PostingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PostingList" component={PostingScreen} />
      <Stack.Screen name="PostingDetail" component={PostingDetailScreen} />
    </Stack.Navigator>
  );
};

export default PostingStackNavigator;
