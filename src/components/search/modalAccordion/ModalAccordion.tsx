import { TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { createStyles } from './ModalAccordion.styles';
import { ReactElement, useMemo, useState } from 'react';

export type ExpandedSection =
  | 'rent'
  | 'rooms'
  | 'size'
  | 'gender'
  | 'furnished'
  | 'availableFrom'
  | 'location'
  | 'amenities';

interface ModalAccordionProps {
  title: string;
  children?: ReactElement;
}

const ModalAccordion = ({ title, children }: ModalAccordionProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={styles.filterSection}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>{title}</Text>
      </View>
      {isExpanded && (
        <View style={styles.filterExpandedContent}>{children}</View>
      )}
    </TouchableOpacity>
  );
};

export default ModalAccordion;
