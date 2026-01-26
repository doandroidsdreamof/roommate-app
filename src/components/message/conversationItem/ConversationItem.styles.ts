import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { spacing, borderRadius } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    avatar: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: borderRadius.full,
      height: 56,
      width: 56,
    },
    avatarContainer: {
      marginRight: spacing.md,
    },
    avatarPlaceholder: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: borderRadius.full,
      height: 56,
      justifyContent: 'center',
      width: 56,
    },
    avatarText: {
      color: theme.colors.onPrimary,
      fontSize: 24,
      fontWeight: '600',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      padding: spacing.md,
    },
    containerPressed: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.xs,
    },
    lastMessage: {
      color: theme.colors.onSurfaceVariant,
      flex: 1,
      fontSize: 14,
    },
    messagePreview: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    time: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 13,
    },
    userName: {
      color: theme.colors.onSurface,
      flex: 1,
      fontSize: 16,
      fontWeight: '600',
      marginRight: spacing.sm,
    },
  });