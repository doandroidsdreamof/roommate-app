import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    input: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 20,
      color: theme.colors.onSurface,
      flex: 1,
      maxHeight: 100,
      padding: spacing.md,
    },
    inputContainer: {
      alignItems: 'flex-end',
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.outlineVariant,
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: spacing.sm,
      padding: spacing.md,
    },

    messagesList: {
      gap: spacing.sm,
      padding: spacing.md,
    },
    sendButton: {
      alignItems: 'center',
      borderRadius: 22,
      height: 44,
      justifyContent: 'center',
      width: 44,
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
    statusContainer: {
      alignItems: 'center',
      marginRight: spacing.md,
    },
    statusDot: {
      borderRadius: 4,
      height: 8,
      width: 8,
    },
    timestamp: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 11,
    },
  });
