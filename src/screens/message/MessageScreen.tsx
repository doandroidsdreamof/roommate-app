import socketService from '@/api/socket/socketService';
import { useProfile } from '@/hooks/useProfile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { createStyles } from './MessageScreen.styles';
import { MessagesStackParamList } from '@/components/swipe/matchModal/MessagesStackNavigator';

type MessageScreenRouteProp = RouteProp<MessagesStackParamList, 'Message'>;
type MessageScreenNavigationProp =
  NativeStackNavigationProp<MessagesStackParamList>;

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const MessageScreen = () => {
  const { profile: user } = useProfile();
  const route = useRoute<MessageScreenRouteProp>();
  const navigation = useNavigation<MessageScreenNavigationProp>();
  const theme = useTheme();
  const styles = createStyles(theme);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const isSetup = useRef(false);
  const flatListRef = useRef<FlatList>(null);

  const { recipientId, recipientName } = route.params;

  useEffect(() => {
    if (!user?.id || isSetup.current) return;

    isSetup.current = true;

    const handleMessage = (data: unknown) => {
      const payload = data as { message: string };
      const newMessage: Message = {
        id: Date.now().toString(),
        content: payload.message,
        timestamp: new Date().toISOString(),
        isOwn: false,
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    socketService
      .connect()
      .then(() => {
        socketService.onMessage(handleMessage);
      })
      .catch(console.error);

    return () => {
      socketService.offMessage(handleMessage);
      socketService.disconnect();
      isSetup.current = false;
    };
  }, [user?.id]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    socketService.sendMessage(recipientId, inputText.trim());
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.isOwn ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>
            {new Date(item.timestamp).toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          {item.isOwn && (
            <MaterialCommunityIcons
              name="check-all"
              size={16}
              color={theme.colors.primary}
            />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={recipientName} />
      </Appbar.Header>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
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
