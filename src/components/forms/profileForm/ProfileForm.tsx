import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, Chip, Text, TextInput, useTheme } from 'react-native-paper';

import LocationFilter from '@/components/location/locationFilter/LocationFilter';
import { CreateProfileDto } from '@/schemas/profileSchema';
import FormErrorMessage from '../formErrorMessage/FormErrorMessage';
import { createStyles } from './ProfileForm.styles';

interface ProfileFormProps {
  form: UseFormReturn<CreateProfileDto>;
  onSubmit: (data: CreateProfileDto) => void;
}

const ProfileForm = ({ form, onSubmit }: ProfileFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = form;
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleFormSubmit = (): void => {
    void handleSubmit(onSubmit)();
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text variant="displaySmall" style={styles.title}>
              Profilinizi Oluşturun
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Bize kendinizden bahsedin
            </Text>
          </View>

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

          <LocationFilter
            initialCity={watch('city')}
            initialDistrict={watch('district')}
            onCityChange={(val) => {
              setValue('city', val, { shouldValidate: true });
              setValue('district', '', { shouldValidate: false });
            }}
            onDistrictChange={(val) =>
              setValue('district', val, { shouldValidate: true })
            }
            cityError={errors.city?.message}
            districtError={errors.district?.message}
          />

          <Button
            mode="contained"
            disabled={!isValid}
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
