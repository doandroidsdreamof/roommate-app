import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { styles } from './MenuItem.styles';

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
  danger?: boolean;
}

const MenuItem = ({ icon, title, onPress, danger = false }: MenuItemProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <MaterialCommunityIcons
          name={icon as never}
          size={24}
          color={danger ? theme.colors.error : theme.colors.onSurface}
        />
        <Text
          style={[styles.menuItemText, danger && { color: theme.colors.error }]}
        >
          {title}
        </Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={theme.colors.outline}
      />
    </TouchableOpacity>
  );
};

export default MenuItem;
