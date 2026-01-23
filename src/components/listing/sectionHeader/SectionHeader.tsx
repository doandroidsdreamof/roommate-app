import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStyles } from './SectionHeader.styles';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

const SectionHeader = ({ title, onSeeAll }: SectionHeaderProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} style={styles.button}>
          <Text style={styles.title}>{title}</Text>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={32}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;
