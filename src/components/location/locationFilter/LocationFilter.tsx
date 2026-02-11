import Dropdown from '@/components/dropdown/Dropdown';
import { useDistricts } from '@/hooks/useDistricts';
import { useDropdownState } from '@/hooks/useDropdownState';
import { useProvinces } from '@/hooks/useProvinces';
import React, { useRef } from 'react';
import { Keyboard, TextInput as RNTextInput, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { styles } from './LocationFilter.styles';

interface LocationFilterProps {
  initialCity?: string;
  initialDistrict?: string;
  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  cityError?: string;
  districtError?: string;
}

const LocationFilter = ({
  initialCity = '',
  initialDistrict = '',
  onCityChange,
  onDistrictChange,
  cityError,
  districtError,
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
          error={!!cityError}
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
        <HelperText type="error" visible={!!cityError}>
          {cityError}
        </HelperText>
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
          error={!!districtError}
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
        <HelperText type="error" visible={!!districtError}>
          {districtError}
        </HelperText>
      </View>
    </View>
  );
};

export default LocationFilter;
