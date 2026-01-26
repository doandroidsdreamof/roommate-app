import { MESSAGE_CONTEXT_TYPE } from '@/components/message/types';
import MessageScreen from '@/screens/message/MessageScreen';
import MessagesListScreen from '@/screens/messagesListScreen/MessagesListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type MessagesStackParamList = {
  MessagesList: undefined;
  Message: {
    conversationId?: string;
    recipientId: string;
    recipientName: string;
    contextType?: MESSAGE_CONTEXT_TYPE;
  };
};

const Stack = createNativeStackNavigator<MessagesStackParamList>();

const MessagesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MessagesList" component={MessagesListScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;
