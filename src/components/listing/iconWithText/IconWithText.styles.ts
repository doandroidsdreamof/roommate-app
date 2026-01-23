import { StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { spacing } from '@/theme/theme';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
    },
    text: {
      color: theme.colors.onSurfaceVariant,
    },
  });
