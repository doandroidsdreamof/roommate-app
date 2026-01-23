import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      paddingVertical: 12,
    },
    iconWrapper: {
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      width: 56,
    },
    primaryText: {
      color: theme.colors.onSurface,
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 4,
    },
    secondaryText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
    },
    textWrapper: {
      flex: 1,
    },
  });
