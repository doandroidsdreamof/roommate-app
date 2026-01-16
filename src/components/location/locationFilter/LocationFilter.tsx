import Dropdown from '@/components/dropdown/Dropdown';
import { useDistricts } from '@/hooks/useDistricts';
import { useDropdownState } from '@/hooks/useDropdownState';
import { useProvinces } from '@/hooks/useProvinces';
import React, { useMemo, useRef, useState } from 'react';
import { Keyboard, TextInput as RNTextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createStyles } from './LocationFilter.styles';

interface LocationFilterProps {
  initialCity?: string;
  initialDistrict?: string;
  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}

const LocationFilter = ({
  initialCity = '',
  initialDistrict = '',
  onCityChange,
  onDistrictChange,
}: LocationFilterProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [city, setCity] = useState(initialCity);
  const [district, setDistrict] = useState(initialDistrict);

  const cityDropdown = useDropdownState();
  const districtDropdown = useDropdownState();

  const cityInputRef = useRef<RNTextInput>(null);
  const districtInputRef = useRef<RNTextInput>(null);

  const {
    filterProvinces,
    getProvinceByValue,
    isLoading: loadingProvinces,
  } = useProvinces();

  const selectedProvinceData = getProvinceByValue(city);

  const { filterDistricts, isFetching: loadingDistricts } =
    useDistricts(selectedProvinceData);

  return (
    <View style={styles.container}>
      <View>
        <Dropdown
          label="Şehir"
          value={city}
          placeholder="Şehir seçin"
          isLoading={loadingProvinces}
          isOpen={cityDropdown.isOpen}
          items={filterProvinces(city)}
          getKey={(item) => item.plateCode}
          getLabel={(item) => item.name}
          onFocus={() => {
            cityDropdown.open();
            districtDropdown.close();
          }}
          onChange={(text) => {
            setCity(text);
            setDistrict('');
            cityDropdown.open();
          }}
          onSelect={(item) => {
            setCity(item.name);
            setDistrict('');
            onCityChange(item.name);
            onDistrictChange('');
            cityDropdown.close();
            Keyboard.dismiss();
          }}
          inputRef={cityInputRef}
          returnKeyType="next"
          onSubmitEditing={() => districtInputRef.current?.focus()}
          accessibilityLabel="Şehir seçin"
        />
      </View>

      <View>
        <Dropdown
          label="İlçe"
          value={district}
          placeholder={city ? 'İlçe seçin' : 'Önce şehir seçin'}
          disabled={!selectedProvinceData}
          isLoading={loadingDistricts}
          isOpen={districtDropdown.isOpen}
          items={filterDistricts(district)}
          getKey={(item) => item.id}
          getLabel={(item) => item.name}
          onFocus={() => {
            districtDropdown.open();
            cityDropdown.close();
          }}
          onChange={(text) => {
            setDistrict(text);
          }}
          onSelect={(item) => {
            setDistrict(item.name);
            onDistrictChange(item.name);
            districtDropdown.close();
            Keyboard.dismiss();
          }}
          inputRef={districtInputRef}
          returnKeyType="done"
          accessibilityLabel="İlçe seçin"
        />
      </View>
    </View>
  );
};

export default LocationFilter;
