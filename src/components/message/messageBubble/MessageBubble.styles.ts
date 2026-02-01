import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    messageBubble: {
      borderRadius: 16,
      padding: spacing.md,
    },
    messageContainer: {
      marginBottom: spacing.sm,
      maxWidth: '80%',
    },
    messageFooter: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
      justifyContent: 'flex-end',
      marginTop: spacing.xs,
    },
    messageText: {
      color: theme.colors.onSurface,
      fontSize: 16,
    },
    otherBubble: {
      backgroundColor: theme.colors.surfaceVariant,
      borderBottomLeftRadius: 4,
    },
    otherMessage: {
      alignSelf: 'flex-start',
    },
    ownBubble: {
      backgroundColor: theme.colors.primaryContainer,
      borderBottomRightRadius: 4,
    },
    ownMessage: {
      alignSelf: 'flex-end',
    },
    timestamp: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 11,
    },
  });
