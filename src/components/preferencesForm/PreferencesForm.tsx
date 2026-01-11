import { PreferencesSetupForm } from '@/schemas/profileSchema';
import Slider from '@react-native-community/slider';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import { createStyles } from './PreferencesForm.styles';

interface PreferencesFormProps {
  form: UseFormReturn<PreferencesSetupForm>;
  onSubmit: (data: PreferencesSetupForm) => void;
  onBack: () => void;
  isLoading: boolean;
}

const PreferencesForm = ({
  form,
  onSubmit,
  onBack,
  isLoading,
}: PreferencesFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const theme = useTheme();
  const styles = createStyles(theme);
  const ageMin = watch('ageMin');
  const ageMax = watch('ageMax');

  return (
    <View style={styles.formContainer}>
      {/* Age Range */}
      <View style={styles.ageSliderContainer}>
        <Text variant="bodyMedium" style={styles.ageLabel}>
          Age Range:{' '}
          <Text style={styles.ageValue}>
            {ageMin} - {ageMax} years
          </Text>
        </Text>

        <Controller
          control={control}
          name="ageMin"
          render={({ field: { onChange, value } }) => (
            <Slider
              value={value}
              onValueChange={onChange}
              minimumValue={18}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="#FF5A5F"
              maximumTrackTintColor="#DDDDDD"
            />
          )}
        />

        <Controller
          control={control}
          name="ageMax"
          render={({ field: { onChange, value } }) => (
            <Slider
              value={value}
              onValueChange={onChange}
              minimumValue={18}
              maximumValue={100}
              step={1}
              minimumTrackTintColor="#FF5A5F"
              maximumTrackTintColor="#DDDDDD"
            />
          )}
        />
        {errors.ageMax && (
          <Text style={styles.errorText}>{errors.ageMax.message}</Text>
        )}
      </View>

      {/* Gender Preference */}
      <View>
        <Text variant="bodyMedium" style={styles.ageLabel}>
          Gender Preference (Optional)
        </Text>
        <Controller
          control={control}
          name="genderPreference"
          render={({ field: { onChange, value } }) => (
            <View style={styles.genderChips}>
              {(['female_only', 'male_only', 'mixed'] as const).map((pref) => (
                <Chip
                  key={pref}
                  selected={value === pref}
                  onPress={() => onChange(pref)}
                  mode="outlined"
                  style={styles.genderChip}
                >
                  {pref.replace('_', ' ').charAt(0).toUpperCase() +
                    pref.replace('_', ' ').slice(1)}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={onBack} style={styles.button}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={void handleSubmit(onSubmit)}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
        >
          Complete
        </Button>
      </View>
    </View>
  );
};

export default PreferencesForm;
