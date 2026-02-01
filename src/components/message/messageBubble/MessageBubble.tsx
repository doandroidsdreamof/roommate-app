import { useTheme } from 'react-native-paper';
import { createStyles } from './MessageBubble.styles';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface MessageBubbleProps {
  id: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

const MessageBubble = ({
  id,
  content,
  timestamp,
  isOwn,
}: MessageBubbleProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View
      style={[
        styles.messageContainer,
        isOwn ? styles.ownMessage : styles.otherMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isOwn ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        <Text style={styles.messageText}>{content}</Text>
        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>
            {new Date(timestamp).toLocaleTimeString('tr-TR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          {isOwn && (
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
};

export default MessageBubble;
