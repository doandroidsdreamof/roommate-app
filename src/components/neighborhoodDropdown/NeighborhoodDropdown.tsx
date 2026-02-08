import Dropdown from '@/components/dropdown/Dropdown';
import { useDropdownState } from '@/hooks/useDropdownState';
import { useNeighborhoods } from '@/hooks/useNeighborhoods';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput as RNTextInput, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { styles } from './NeighborhoodDropdown.styles';

interface NeighborhoodDropdownProps {
  districtId?: number;
  value?: number;
  onChange: (neighborhoodId: number) => void;
  error?: string;
}

const NeighborhoodDropdown = ({
  districtId,
  value,
  onChange,
  error,
}: NeighborhoodDropdownProps) => {
  const dropdown = useDropdownState();
  const inputRef = useRef<RNTextInput>(null);
  const [searchText, setSearchText] = useState('');

  const { isLoading, filterNeighborhoods, getNeighborhoodById } =
    useNeighborhoods(districtId);

  const selectedNeighborhood = value ? getNeighborhoodById(value) : null;
  
  // Use selected neighborhood name or search text
  const displayValue = selectedNeighborhood?.name || searchText;

  const filteredNeighborhoods = filterNeighborhoods(displayValue);

  // Clear search text when a neighborhood is selected
  useEffect(() => {
    if (selectedNeighborhood) {
      setSearchText('');
    }
  }, [selectedNeighborhood]);

  // Clear value when district changes
  useEffect(() => {
    if (!districtId && value) {
      onChange(0);
    }
  }, [districtId, value, onChange]);

  const handleChange = (text: string) => {
    setSearchText(text);
    dropdown.open();
  };

  const handleSelect = (item: { id: number; name: string }) => {
    onChange(item.id);
    setSearchText('');
    dropdown.close();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Dropdown
        label="Mahalle *"
        value={displayValue}
        placeholder={!districtId ? 'Önce şehir ve ilçe seçin' : 'Mahalle seçin'}
        disabled={!districtId}
        isLoading={isLoading}
        isOpen={dropdown.isOpen}
        items={filteredNeighborhoods}
        getKey={(item) => item.id.toString()}
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