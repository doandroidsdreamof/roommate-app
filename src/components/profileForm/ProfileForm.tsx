import React, { useRef } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  View,
} from 'react-native';
import { Button, Chip, Text, TextInput, useTheme } from 'react-native-paper';

import useDistricts from '@/hooks/useDistricts';
import { useDropdownState } from '@/hooks/useDropdownState';
import { useProvinces } from '@/hooks/useProvinces';
import { ProfileSetupForm } from '@/schemas/profileSchema';
import Dropdown from '../dropdown/Dropdown';
import FormErrorMessage from '../formErrorMessage/FormErrorMessage';
import { createStyles } from './ProfileForm.styles';

// TODO format locale uppercase
interface ProfileFormProps {
  form: UseFormReturn<ProfileSetupForm>;
  onSubmit: (data: ProfileSetupForm) => void;
}

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

  const cityDropdown = useDropdownState();
  const districtDropdown = useDropdownState();

  const cityInputRef = useRef<RNTextInput>(null);
  const districtInputRef = useRef<RNTextInput>(null);

  const {
    filterProvinces,
    getProvinceByValue,
    isLoading: loadingProvinces,
  } = useProvinces();

  const selectedCity = watch('city') || '';
  const selectedProvinceData = getProvinceByValue(selectedCity);

  const {
    filterDistricts,
    getDistrictByValue,
    isFetching: loadingDistricts,
  } = useDistricts(selectedProvinceData);

  const selectedDistrict = watch('district') || '';
  const selectedDistrictData = getDistrictByValue(selectedDistrict);

  const handleFormSubmit = (): void => {
    void handleSubmit(onSubmit)();
  };
  // * it make sures dropdown value corresponds to values of API response
  // TODO move it to zod refine func 
  const isFormValid = Boolean(
    watch('name') &&
    watch('gender') &&
    selectedProvinceData &&
    selectedDistrictData
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollViewContent}
      >
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
                  accessibilityLabel="Enter your name"
                  returnKeyType="next"
                  onSubmitEditing={() => cityInputRef.current?.focus()}
                />
              )}
            />
            <FormErrorMessage error={errors.name} />
          </View>
          <View>
            <Text variant="bodyMedium" style={styles.label}>
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
                      accessibilityLabel={`Select ${gender}`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </Chip>
                  ))}
                </View>
              )}
            />
          </View>
          <View style={styles.cityContainer}>
            <Controller
              control={control}
              name="city"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="City"
                  value={value}
                  placeholder="Select city"
                  error={!!errors.city}
                  isLoading={loadingProvinces}
                  isOpen={cityDropdown.isOpen}
                  items={filterProvinces(value)}
                  getKey={(item) => item.plateCode}
                  getLabel={(item) => item.name}
                  onFocus={() => {
                    cityDropdown.open();
                    districtDropdown.close();
                  }}
                  onChange={(text) => {
                    onChange(text);
                    setValue('district', '');
                    cityDropdown.open();
                  }}
                  onSelect={(item) => {
                    onChange(item.name);
                    setValue('district', '');
                    cityDropdown.close();
                    Keyboard.dismiss();
                  }}
                  inputRef={cityInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() => districtInputRef.current?.focus()}
                  accessibilityLabel="Select your city"
                />
              )}
            />
            <FormErrorMessage error={errors.city} />
          </View>
          <View style={styles.districtContainer}>
            <Controller
              control={control}
              name="district"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="District"
                  value={value}
                  placeholder={
                    selectedCity ? 'Select district' : 'Select city first'
                  }
                  disabled={!selectedProvinceData}
                  error={!!errors.district}
                  isLoading={loadingDistricts}
                  isOpen={districtDropdown.isOpen}
                  items={filterDistricts(value)}
                  getKey={(item) => item.id}
                  getLabel={(item) => item.name}
                  onFocus={() => {
                    districtDropdown.open();
                    cityDropdown.close();
                  }}
                  onChange={onChange}
                  onSelect={(item) => {
                    onChange(item.name);
                    districtDropdown.close();
                    Keyboard.dismiss();
                  }}
                  inputRef={districtInputRef}
                  returnKeyType="done"
                  accessibilityLabel="Select your district"
                />
              )}
            />
            <FormErrorMessage error={errors.district} />
          </View>

          <Button
            mode="contained"
            disabled={!isFormValid}
            onPress={handleFormSubmit}
            style={styles.button}
          >
            Next
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileForm;
