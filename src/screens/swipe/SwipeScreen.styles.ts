
import { Dimensions, StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

const { height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.75;

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: 25,
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    cardStyle: {
      alignItems: 'center',
      height: CARD_HEIGHT,
      justifyContent: 'center',
      width: '100%',
    },
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleButton: {
      backgroundColor: theme.colors.surface,
      borderRadius: 30,
      elevation: 4,
      height: 60,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      width: 60,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
    },
  });
