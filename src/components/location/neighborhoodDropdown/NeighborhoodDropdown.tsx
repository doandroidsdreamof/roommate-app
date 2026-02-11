import Dropdown from '@/components/dropdown/Dropdown';
import { useDropdownState } from '@/hooks/useDropdownState';
import React, { useRef, useState } from 'react';
import { Keyboard, TextInput as RNTextInput, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { styles } from './NeighborhoodDropdown.styles';

interface NeighborhoodDropdownProps {
  districtId?: number;
  value?: string | null;
  onChange: (neighborhoodId: string) => void;
  error?: string;
}
// TODO refactor

const NeighborhoodDropdown = ({
  districtId,
  value,
  onChange,
  error,
}: NeighborhoodDropdownProps) => {
  const dropdown = useDropdownState();
  const inputRef = useRef<RNTextInput>(null);
  const [searchText, setSearchText] = useState('');

  const handleChange = (text: string) => {
    setSearchText(text);
    dropdown.open();
  };

  const handleSelect = (item: { value: string; name: string }) => {
    onChange(item.value);
    setSearchText('');
    dropdown.close();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Dropdown
        label="Mahalle *"
        value={value ?? ''}
        items={[]}
        placeholder={!districtId ? 'Önce şehir ve ilçe seçin' : 'Mahalle seçin'}
        disabled={!districtId}
        isOpen={dropdown.isOpen}
        getKey={(item) => item.toString()}
        getLabel={(item) => item.name}
        error={!!error}
        onFocus={() => dropdown.open()}
        onChange={handleChange}
        onSelect={handleSelect}
        inputRef={inputRef}
        returnKeyType="done"
        accessibilityLabel="Mahalle seçin"
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </View>
  );
};

export default NeighborhoodDropdown;
