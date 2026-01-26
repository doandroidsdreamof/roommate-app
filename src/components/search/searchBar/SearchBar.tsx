import React from 'react';
import { Pressable, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './SearchBar.styles';

interface SearchBarProps {
  onPress: () => void;
}

const SearchBar = ({ onPress }: SearchBarProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.content}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={theme.colors.onSurfaceVariant}
          />
          <Text variant="bodyLarge" style={styles.placeholder}>
            İlanlarda ara...
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SearchBar;
