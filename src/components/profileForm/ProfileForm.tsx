import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Chip,
  List,
  Text,
  TextInput,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { Controller, UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { locationApi } from '@/api';
import { ProfileSetupForm } from '@/schemas/profileSchema';
import { createStyles } from './ProfileForm.styles';
import { Province } from '@/api/locationApi';

interface ProfileFormProps {
  form: UseFormReturn<ProfileSetupForm>;
  onSubmit: (data: ProfileSetupForm) => void;
}
// TODO city on press bug
// TODO district bug
const ProfileForm = ({ form, onSubmit }: ProfileFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const theme = useTheme();
  const styles = createStyles(theme);

  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [districtQuery, setDistrictQuery] = useState('');

  const selectedCity = watch('city') || '';

  const { data: provinces = [], isLoading: isLoadingProvinces } = useQuery({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await locationApi.getProvinces();
      return Array.isArray(response) ? response : response || [];
    },
  });

  const { data: districts = [], isFetching: isSearchingDistricts } = useQuery({
    queryKey: ['districts', selectedCity, districtQuery],
    queryFn: () =>
      locationApi.searchNeighborhoods({
        query: districtQuery,
        cityId: selectedCity,
      }),
    enabled: !!selectedCity && districtQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  const filteredProvinces = useMemo(() => {
    if (!selectedCity) return provinces;
    // TODO type safety
    const search = selectedCity.toLocaleLowerCase('tr');
    const results = provinces.filter((item: Province) =>
      item.name.toLocaleLowerCase('tr').startsWith(search)
    );
    return results;
  }, [provinces, selectedCity]);

  return (
    <View style={styles.formContainer}>
      <View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Name"
              value={value}
              onChangeText={onChange}
              mode="outlined"
              style={styles.input}
              error={!!errors.name}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
      </View>

      <View>
        <Text variant="bodyMedium" style={styles.ageLabel}>
          Gender
        </Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View style={styles.genderChips}>
              {(['male', 'female', 'other'] as const).map((gender) => (
                <Chip
                  key={gender}
                  selected={value === gender}
                  onPress={() => onChange(gender)}
                  mode="outlined"
                  style={styles.genderChip}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>
      <View>
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="City"
                value={value}
                onFocus={() => setShowCityDropdown(true)} 
                onBlur={() => setShowCityDropdown(false)}
                mode="outlined"
                style={styles.input}
                error={!!errors.city}
                onChangeText={(text) => {
                  onChange(text);
                  setValue('district', '');
                }}
                right={
                  isLoadingProvinces ? (
                    <TextInput.Icon
                      icon={() => <ActivityIndicator size={20} />}
                    />
                  ) : (
                    <TextInput.Icon icon="chevron-down" />
                  )
                }
              />
              {showCityDropdown && filteredProvinces.length > 0 && (
                <View style={styles.dropdown}>
                  {filteredProvinces.map((item: Province) => (
                    <List.Item
                      key={item.plateCode}
                      title={item.name.toLocaleLowerCase()}
                      onPress={() => {
                        onChange(item.name);
                        setShowCityDropdown(false);
                      }}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        />
      </View>

      <View>
        <Controller
          control={control}
          name="district"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="District"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  setDistrictQuery(text);
                  setShowDistrictDropdown(true);
                }}
                onFocus={() => setShowDistrictDropdown(true)}
                mode="outlined"
                style={styles.input}
                error={!!errors.district}
                disabled={!selectedCity}
                placeholder={
                  selectedCity ? 'Start typing...' : 'Select city first'
                }
                right={
                  isSearchingDistricts ? (
                    <TextInput.Icon
                      icon={() => <ActivityIndicator size={20} />}
                    />
                  ) : null
                }
              />
              {showDistrictDropdown && districts.length > 0 && (
                <View style={styles.dropdown}>
                  {districts?.map((item) => (
                    <List.Item
                      key={item.id}
                      title={item.district}
                      description={item.name}
                      onPress={() => {
                        onChange(item.district);
                        setShowDistrictDropdown(false);
                      }}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        />
      </View>

      <Button
        mode="contained"
        onPress={void handleSubmit(onSubmit)}
        style={styles.button}
      >
        Next
      </Button>
    </View>
  );
};

export default ProfileForm;
