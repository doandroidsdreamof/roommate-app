import { Conversation } from '@/api';
import ConversationItem from '@/components/message/conversationItem/ConversationItem';
import Loading from '@/components/primitives/loading/Loading';
import { useConversations } from '@/hooks/useConversation';
import { MessagesStackParamList } from '@/navigation/MessagesStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createStyles } from './MessagesListScreen.styles';

type NavigationProp = NativeStackNavigationProp<MessagesStackParamList>;

const MessagesListScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const { data: conversations, isLoading, error } = useConversations();

  const handleConversationPress = useCallback(
    (conversation: Conversation) => {
      navigation.navigate('Message', {
        conversationId: conversation.id,
        recipientId: conversation.otherUserId,
        recipientName: conversation.otherUserName,
      });
    },
    [navigation]
  );

  const renderConversation = useCallback(
    ({ item }: { item: Conversation }) => (
      <ConversationItem conversation={item} onPress={handleConversationPress} />
    ),
    [handleConversationPress]
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [styles]
  );

  if (isLoading) {
    return <Loading size="large" />;
  }

  if (error) {
    return (
      <>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Mesajlar yüklenemedi</Text>
        </View>
      </>
    );
  }

  if (!conversations || conversations.length === 0) {
    return (
      <>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Henüz mesajınız yok</Text>
          <Text style={styles.emptySubtext}>
            Eşleşmelerinizle konuşmaya başlayın
          </Text>
        </View>
      </>
    );
  }

  return (
    <>
      <FlatList
        data={conversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={renderSeparator}
      />
    </>
  );
};

export default MessagesListScreen;
