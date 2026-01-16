import { MD3Theme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      gap: 12,
    },
    iconWrapper: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: theme.colors.surfaceVariant,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textWrapper: {
      flex: 1,
    },
    primaryText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    secondaryText: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
  });
