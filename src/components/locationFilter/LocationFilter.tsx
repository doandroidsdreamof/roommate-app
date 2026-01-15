import Dropdown from '@/components/dropdown/Dropdown';
import useDistricts from '@/hooks/useDistricts';
import { useDropdownState } from '@/hooks/useDropdownState';
import { useProvinces } from '@/hooks/useProvinces';
import React, { useRef } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createStyles } from './LocationFilter.styles';

interface LocationFilterProps {
  city: string;
  district: string;
  onCityChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
}

const LocationFilter = ({
  city,
  district,
  onCityChange,
  onDistrictChange,
}: LocationFilterProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

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
          placeholder="Şehri seçin"
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
            onCityChange(text);
            onDistrictChange('');
            cityDropdown.open();
          }}
          onSelect={(item) => {
            onCityChange(item.name);
            onDistrictChange('');
            cityDropdown.close();
          }}
          inputRef={cityInputRef}
          returnKeyType="next"
          onSubmitEditing={() => districtInputRef.current?.focus()}
          accessibilityLabel="Select city for filtering"
        />
      </View>

      <View>
        <Dropdown
          label="İlçe"
          value={district}
          placeholder={city ? 'Select district' : 'Select city first'}
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
            onDistrictChange(text);
          }}
          onSelect={(item) => {
            onDistrictChange(item.name);
            districtDropdown.close();
          }}
          inputRef={districtInputRef}
          returnKeyType="done"
          accessibilityLabel="Select district for filtering"
        />
      </View>
    </View>
  );
};

export default LocationFilter;
