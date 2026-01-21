import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
    },
    labelsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    sliderContainer: {
      alignSelf: 'center',
    },
    track: {
      height: 4,
      borderRadius: 2,
    },
    selectedTrack: {
      backgroundColor: theme.colors.primary,
    },
    unselectedTrack: {
      backgroundColor: theme.colors.surfaceVariant,
    },
    marker: {
      backgroundColor: theme.colors.primary,
      height: 24,
      width: 24,
      borderRadius: 12,
    },
    pressedMarker: {
      backgroundColor: theme.colors.primary,
      height: 28,
      width: 28,
      borderRadius: 14,
    },
  });
