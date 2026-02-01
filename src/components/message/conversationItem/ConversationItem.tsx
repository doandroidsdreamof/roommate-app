import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Conversation } from '@/api';
import { createStyles } from './ConversationItem.styles';
import { getOrCreateConversation } from '@/api/local/messageLocalApi';

interface ConversationItemProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}

const ConversationItem = ({ conversation, onPress }: ConversationItemProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [isPressed, setIsPressed] = useState(false);

  const avatarLetter = conversation.otherUserName.charAt(0).toUpperCase();

  useEffect(() => {
    async function createLocalChannel() {
      try {
        await getOrCreateConversation(conversation.id);
      } catch (error) {
        console.error('[ConversationItem Error]', error);
      }
    }
    void createLocalChannel();
  }, []);

  return (
    <Pressable
      style={[styles.container, isPressed && styles.containerPressed]}
      onPress={() => onPress(conversation)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={styles.avatarContainer}>
        {conversation.otherUserPhoto ? (
          <Image
            source={{ uri: conversation.otherUserPhoto }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.userName} numberOfLines={1}>
            {conversation.otherUserName}
          </Text>
        </View>

        <View style={styles.messagePreview}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            Mesajlaşmaya başlayın
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ConversationItem;
