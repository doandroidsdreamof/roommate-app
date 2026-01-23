import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: 32,
      elevation: 3,
      marginTop: '20%',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      width: '100%',
    },
    content: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
    },
    placeholder: {
      color: theme.colors.onSurface,
      fontWeight: '600',
    },
    wrapper: {
      paddingBottom: spacing.lg,
      paddingHorizontal: spacing.sm,
    },
  });
