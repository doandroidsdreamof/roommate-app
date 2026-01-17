import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from './SwipeOverlay.styles';

interface SwipeOverlayProps {
  type: 'PASS' | 'LIKE';
}
const SwipeOverlay = ({ type }: SwipeOverlayProps) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.overlayLabel,
          type === 'LIKE' ? styles.likeOverlay : styles.passOverlay,
        ]}
      >
        <Text
          style={[
            styles.overlayText,
            type === 'LIKE' ? styles.likeTextColor : styles.passTextColor,
          ]}
        >
          {type}
        </Text>
      </View>
    </View>
  );
};

export default SwipeOverlay;
