import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';
import {
  TextInput,
  List,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { createStyles } from './Dropdown.styles';

interface DropdownProps<T> {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  isLoading?: boolean;
  isOpen: boolean;
  items: T[];
  getKey: (item: T) => string | number;
  getLabel: (item: T) => string;
  getDescription?: (item: T) => string;
  onFocus: () => void;
  onChange: (text: string) => void;
  onSelect: (item: T) => void;
  inputRef?: React.RefObject<RNTextInput | null>;
  returnKeyType?: 'done' | 'next';
  onSubmitEditing?: () => void;
  accessibilityLabel?: string;
  containerStyle?: object;
}

function Dropdown<T>({
  label,
  value,
  placeholder,
  disabled = false,
  error = false,
  isLoading = false,
  isOpen,
  items,
  getKey,
  getLabel,
  getDescription,
  onFocus,
  onChange,
  onSelect,
  inputRef,
  returnKeyType = 'done',
  onSubmitEditing,
  accessibilityLabel,
  containerStyle,
}: DropdownProps<T>) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={containerStyle}>
      <TextInput
        ref={inputRef}
        label={label}
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        mode="outlined"
        style={styles.input}
        error={error}
        disabled={disabled}
        placeholder={placeholder}
        accessibilityLabel={accessibilityLabel}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        right={
          isLoading ? (
            <TextInput.Icon icon={() => <ActivityIndicator size={20} />} />
          ) : (
            <TextInput.Icon icon="chevron-down" />
          )
        }
      />
      {isOpen && items.length > 0 && (
        <View style={styles.dropdown}>
          <ScrollView
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <TouchableOpacity
                key={getKey(item)}
                onPress={() => onSelect(item)}
                activeOpacity={0.7}
              >
                <List.Item
                  title={getLabel(item)}
                  description={getDescription?.(item)}
                  style={styles.dropdownItem}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
export default Dropdown;