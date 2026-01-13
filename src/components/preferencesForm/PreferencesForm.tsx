import { PreferencesSetupForm } from '@/schemas/profileSchema';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Chip, Text, useTheme } from 'react-native-paper';
import FormErrorMessage from '../formErrorMessage/FormErrorMessage';
import { createStyles } from './PreferencesForm.styles';

interface PreferencesFormProps {
  form: UseFormReturn<PreferencesSetupForm>;
  onSubmit: (data: PreferencesSetupForm) => void;
  isLoading?: boolean;
}

const PreferencesForm = ({
  form,
  onSubmit,
  isLoading,
}: PreferencesFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const theme = useTheme();
  const styles = createStyles(theme);

  const ageMin = watch('ageMin');
  const ageMax = watch('ageMax');
  const budgetMin = watch('budgetMin');
  const budgetMax = watch('budgetMax');

  const handleFormSubmit = (): void => {
    void handleSubmit(onSubmit)();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Set Your Preferences
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Help us find your perfect roommate
      </Text>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Age Range: {ageMin} - {ageMax}
        </Text>
        <Controller
          control={control}
          name="ageMin"
          render={() => (
            <MultiSlider
              values={[ageMin, ageMax]}
              min={18}
              max={100}
              step={1}
              onValuesChange={(values) => {
                setValue('ageMin', values[0]);
                setValue('ageMax', values[1]);
              }}
              selectedStyle={{ backgroundColor: theme.colors.primary }}
              unselectedStyle={{ backgroundColor: theme.colors.surfaceVariant }}
              markerStyle={{
                backgroundColor: theme.colors.primary,
                height: 24,
                width: 24,
              }}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.sliderTrack}
            />
          )}
        />
        <FormErrorMessage error={errors.ageMin || errors.ageMax} />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Budget Range (Optional):{' '}
          {budgetMin ? `₺${budgetMin.toLocaleString()}` : 'Not set'} -{' '}
          {budgetMax ? `₺${budgetMax.toLocaleString()}` : 'Not set'}
        </Text>
        <Controller
          control={control}
          name="budgetMin"
          render={() => (
            <MultiSlider
              values={[budgetMin || 0, budgetMax || 50000]}
              min={0}
              max={50000}
              step={500}
              onValuesChange={(values) => {
                setValue('budgetMin', values[0] === 0 ? undefined : values[0]);
                setValue(
                  'budgetMax',
                  values[1] === 50000 ? undefined : values[1]
                );
              }}
              selectedStyle={{ backgroundColor: theme.colors.primary }}
              unselectedStyle={{ backgroundColor: theme.colors.surfaceVariant }}
              markerStyle={{
                backgroundColor: theme.colors.primary,
                height: 24,
                width: 24,
              }}
              containerStyle={styles.sliderContainer}
              trackStyle={styles.sliderTrack}
            />
          )}
        />
        <FormErrorMessage error={errors.budgetMin || errors.budgetMax} />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Gender Preference (Optional)
        </Text>
        <Controller
          control={control}
          name="genderPreference"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipContainer}>
              {(['female_only', 'male_only', 'mixed'] as const).map((pref) => (
                <Chip
                  key={pref}
                  selected={value === pref}
                  onPress={() => onChange(value === pref ? undefined : pref)}
                  mode="outlined"
                  style={styles.chip}
                >
                  {pref === 'female_only'
                    ? 'Female Only'
                    : pref === 'male_only'
                      ? 'Male Only'
                      : 'Mixed'}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Smoking Preference (Optional)
        </Text>
        <Controller
          control={control}
          name="smokingHabit"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipContainer}>
              {(['non_smoker', 'occasional', 'regular'] as const).map(
                (habit) => (
                  <Chip
                    key={habit}
                    selected={value === habit}
                    onPress={() =>
                      onChange(value === habit ? undefined : habit)
                    }
                    mode="outlined"
                    style={styles.chip}
                  >
                    {habit === 'non_smoker'
                      ? 'Non-Smoker'
                      : habit === 'occasional'
                        ? 'Occasional'
                        : 'Regular'}
                  </Chip>
                )
              )}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Pet Ownership (Optional)
        </Text>
        <Controller
          control={control}
          name="petOwnership"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipContainer}>
              {(['no_pets', 'has_pets'] as const).map((pet) => (
                <Chip
                  key={pet}
                  selected={value === pet}
                  onPress={() => onChange(value === pet ? undefined : pet)}
                  mode="outlined"
                  style={styles.chip}
                >
                  {pet === 'no_pets' ? 'No Pets' : 'Has Pets'}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Pet Compatibility (Optional)
        </Text>
        <Controller
          control={control}
          name="petCompatibility"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipContainer}>
              {(['not_compatible', 'compatible'] as const).map((compat) => (
                <Chip
                  key={compat}
                  selected={value === compat}
                  onPress={() =>
                    onChange(value === compat ? undefined : compat)
                  }
                  mode="outlined"
                  style={styles.chip}
                >
                  {compat === 'not_compatible'
                    ? 'Not Compatible'
                    : 'Compatible'}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Alcohol Preference (Optional)
        </Text>
        <Controller
          control={control}
          name="alcoholConsumption"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipContainer}>
              {(['never', 'occasionally', 'regularly'] as const).map(
                (alcohol) => (
                  <Chip
                    key={alcohol}
                    selected={value === alcohol}
                    onPress={() =>
                      onChange(value === alcohol ? undefined : alcohol)
                    }
                    mode="outlined"
                    style={styles.chip}
                  >
                    {alcohol.charAt(0).toUpperCase() + alcohol.slice(1)}
                  </Chip>
                )
              )}
            </View>
          )}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleFormSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.button}
      >
        Save Preferences
      </Button>
    </View>
  );
};

export default PreferencesForm;
