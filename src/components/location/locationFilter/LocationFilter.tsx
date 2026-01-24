import Dropdown from '@/components/dropdown/Dropdown';
import { useDistricts } from '@/hooks/useDistricts';
import { useDropdownState } from '@/hooks/useDropdownState';
import { useProvinces } from '@/hooks/useProvinces';
import React, { useRef } from 'react';
import { Keyboard, TextInput as RNTextInput, View } from 'react-native';
import { styles } from './LocationFilter.styles';

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
  const cityDropdown = useDropdownState();
  const districtDropdown = useDropdownState();

  const cityInputRef = useRef<RNTextInput>(null);
  const districtInputRef = useRef<RNTextInput>(null);

  const {
    filterProvinces,
    getProvinceByValue,
    isLoading: loadingProvinces,
  } = useProvinces();

  const selectedProvinceData = getProvinceByValue(initialCity);

  const { filterDistricts, isFetching: loadingDistricts } =
    useDistricts(selectedProvinceData);

  return (
    <View style={styles.container}>
      <View>
        <Dropdown
          label="Şehir"
          value={initialCity}
          placeholder="Şehir seçin"
          isLoading={loadingProvinces}
          isOpen={cityDropdown.isOpen}
          items={filterProvinces(initialCity)}
          getKey={(item) => item.plateCode}
          getLabel={(item) => item.name}
          onFocus={() => {
            cityDropdown.open();
            districtDropdown.close();
          }}
          onChange={(text) => {
            onCityChange(text);
            onDistrictChange('');
            cityDropdown.open();
          }}
          onSelect={(item) => {
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
          value={initialDistrict}
          placeholder={initialCity ? 'İlçe seçin' : 'Önce şehir seçin'}
          disabled={!selectedProvinceData}
          isLoading={loadingDistricts}
          isOpen={districtDropdown.isOpen}
          items={filterDistricts(initialDistrict)}
          getKey={(item) => item.id}
          getLabel={(item) => item.name}
          onFocus={() => {
            districtDropdown.open();
            cityDropdown.close();
          }}
          onChange={(text) => {
            onDistrictChange(text);
          }}
          onSelect={(item) => {
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
