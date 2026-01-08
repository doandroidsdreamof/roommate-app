import { spacing } from '@/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

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

const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  menuItemLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MenuItem;
