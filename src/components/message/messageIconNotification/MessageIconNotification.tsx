import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { styles } from './MessageIconNotification.styles';

interface MessageIconNotificationProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  size: number;
  color: string;
  unreadCount: number;
}

const MessageIconNotification = ({
  icon,
  size,
  color,
  unreadCount,
}: MessageIconNotificationProps) => {
  const theme = useTheme();

  const showBadge = unreadCount > 0;
  const badgeText = unreadCount > 99 ? '99+' : unreadCount.toString();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={size} color={color} />

      {showBadge && (
        <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
          <Text style={[styles.badgeText, { color: theme.colors.onError }]}>
            {badgeText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default MessageIconNotification;
