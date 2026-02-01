import {
  addMessage,
  getOrCreateConversation,
  MessageContent,
} from '@/api/local/messageLocalApi';
import socketService from '@/api/socket/socketService';
import MessageBubble, {
  MessageBubbleProps,
} from '@/components/message/messageBubble/MessageBubble';
import { MessagesStackParamList } from '@/components/swipe/matchModal/MessagesStackNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { createStyles } from './MessageScreen.styles';

interface LiveMessagePayload {
  from: string;
  message: string;
  conversationId: string;
  timestamp: string;
}
type MessageScreenRouteProp = RouteProp<MessagesStackParamList, 'Message'>;
type MessageScreenNavigationProp =
  NativeStackNavigationProp<MessagesStackParamList>;

const MessageScreen = () => {
  // const { profile: user } = useProfile();
  const route = useRoute<MessageScreenRouteProp>();
  const navigation = useNavigation<MessageScreenNavigationProp>();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);

  const flatListRef = useRef<FlatList>(null);

  const { recipientId, recipientName, conversationId } = route.params;

  useEffect(() => {
    console.log('🚀 ~ conversationId:', conversationId);
    if (!conversationId) return;

    // Load messages from local DB
    const loadMessages = async () => {
      const conversation = await getOrCreateConversation(conversationId);

      const existingMessages: MessageBubbleProps[] = conversation.map(
        (msg, idx) => ({
          id: `${idx}-${msg.createdAt}`,
          content: msg.message,
          timestamp: msg.createdAt,
          isOwn: false,
        })
      );

      setMessages(existingMessages);
    };

    void loadMessages();

    // Handle ONLY live messages for THIS conversation
    const handleLiveMessage = async (payload: LiveMessagePayload) => {
      console.log('📨 Received payload:', payload);

      // Only handle if it's for this conversation

      if (typeof payload.message === 'string') {
        console.log('📨 New live message for this conversation');

        const messageContent: MessageContent = {
          message: payload.message,
          createdAt: payload.timestamp,
          isOwn: false,
        };

        await addMessage(conversationId, messageContent);

        const newMessage: MessageBubbleProps = {
          id: Date.now().toString(),
          content: payload.message,
          timestamp: payload.timestamp,
          isOwn: false,
        };

        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socketService.onMessage(handleLiveMessage);

    return () => {
      console.log('closed');
      socketService.offMessage(handleLiveMessage);
    };
  }, [conversationId]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: MessageBubbleProps = {
      id: Date.now().toString(),
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    const messageContent: MessageContent = {
      message: inputText.trim(),
      createdAt: new Date().toISOString(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    await addMessage(conversationId, messageContent);

    socketService.sendMessage(recipientId, inputText.trim());
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={recipientName} />
      </Appbar.Header>

      <FlatList
        ref={flatListRef}
        data={messages.filter(Boolean)}
        renderItem={({ item }) => <MessageBubble {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Mesaj yazın..."
          placeholderTextColor={theme.colors.onSurfaceVariant}
          multiline
          maxLength={1000}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !inputText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <MaterialCommunityIcons
            name="send"
            size={24}
            color={
              inputText.trim() ? theme.colors.primary : theme.colors.outline
            }
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;
