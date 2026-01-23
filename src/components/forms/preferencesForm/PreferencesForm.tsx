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
  onSubmit: (data: PreferencesSetupForm) => Promise<void>;
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
    setValue,
    formState: { errors },
  } = form;
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleFormSubmit = (): void => {
    void handleSubmit(onSubmit)();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Tercihlerinizi Belirleyin
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Mükemmel ev arkadaşınızı bulmamıza yardımcı olun
      </Text>

      <View style={styles.section}>
        <Controller
          control={control}
          name="ageMin"
          render={({ field: { value: ageMin } }) => (
            <Controller
              control={control}
              name="ageMax"
              render={({ field: { value: ageMax } }) => (
                <>
                  <Text variant="bodyMedium" style={styles.label}>
                    Yaş Aralığı: {ageMin} - {ageMax}
                  </Text>
                  <MultiSlider
                    values={[ageMin, ageMax]}
                    min={18}
                    max={100}
                    step={1}
                    onValuesChange={(values) => {
                      setValue('ageMin', values[0], { shouldValidate: false });
                      setValue('ageMax', values[1], { shouldValidate: false });
                    }}
                    selectedStyle={{ backgroundColor: theme.colors.primary }}
                    unselectedStyle={{
                      backgroundColor: theme.colors.surfaceVariant,
                    }}
                    markerStyle={styles.markerStyles}
                    containerStyle={styles.sliderContainer}
                    trackStyle={styles.sliderTrack}
                  />
                </>
              )}
            />
          )}
        />
        <FormErrorMessage error={errors.ageMin || errors.ageMax} />
      </View>
      <View style={styles.section}>
        <Controller
          control={control}
          name="budgetMin"
          render={({ field: { value: budgetMin } }) => (
            <Controller
              control={control}
              name="budgetMax"
              render={({ field: { value: budgetMax } }) => (
                <>
                  <Text variant="bodyMedium" style={styles.label}>
                    Bütçe Aralığı (Opsiyonel):
                    {budgetMin
                      ? ` ₺${budgetMin.toLocaleString('tr-TR')}`
                      : ' '}{' '}
                    - {budgetMax ? `₺${budgetMax.toLocaleString('tr-TR')}` : ''}
                  </Text>
                  <MultiSlider
                    values={[budgetMin || 0, budgetMax || 50000]}
                    min={0}
                    max={1000000}
                    step={500}
                    onValuesChange={(values) => {
                      setValue(
                        'budgetMin',
                        values[0] === 0 ? undefined : values[0],
                        { shouldValidate: false }
                      );
                      setValue(
                        'budgetMax',
                        values[1] === 50000 ? undefined : values[1],
                        { shouldValidate: false }
                      );
                    }}
                    selectedStyle={{ backgroundColor: theme.colors.primary }}
                    unselectedStyle={{
                      backgroundColor: theme.colors.surfaceVariant,
                    }}
                    markerStyle={styles.markerStyles}
                    containerStyle={styles.sliderContainer}
                    trackStyle={styles.sliderTrack}
                  />
                </>
              )}
            />
          )}
        />
        <FormErrorMessage error={errors.budgetMin || errors.budgetMax} />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Cinsiyet Tercihi (Opsiyonel)
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
                    ? 'Sadece Kadın'
                    : pref === 'male_only'
                      ? 'Sadece Erkek'
                      : 'Karma'}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Sigara Tercihi (Opsiyonel)
        </Text>
        <Controller
          control={control}
          name="smokingHabit"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipContainer}>
              {(['no', 'social', 'regular'] as const).map((habit) => (
                <Chip
                  key={habit}
                  selected={value === habit}
                  onPress={() => onChange(value === habit ? undefined : habit)}
                  mode="outlined"
                  style={styles.chip}
                >
                  {habit === 'no'
                    ? 'İçmez'
                    : habit === 'social'
                      ? 'Sosyal'
                      : 'Düzenli'}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Evcil Hayvan Durumu (Opsiyonel)
        </Text>
        <Controller
          control={control}
          name="petOwnership"
          render={({ field: { onChange, value } }) => (
            <View style={styles.chipContainer}>
              {(['none', 'cat', 'dog', 'other'] as const).map((pet) => (
                <Chip
                  key={pet}
                  selected={value === pet}
                  onPress={() => onChange(value === pet ? undefined : pet)}
                  mode="outlined"
                  style={styles.chip}
                >
                  {pet === 'none'
                    ? 'Hayvan Yok'
                    : pet === 'cat'
                      ? 'Kedi'
                      : pet === 'dog'
                        ? 'Köpek'
                        : 'Diğer'}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Evcil Hayvan Uyumu (Opsiyonel)
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
                  {compat === 'not_compatible' ? 'Uyumlu Değil' : 'Uyumlu'}
                </Chip>
              ))}
            </View>
          )}
        />
      </View>

      <View style={styles.section}>
        <Text variant="bodyMedium" style={styles.label}>
          Alkol Tercihi (Opsiyonel)
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
                    {alcohol === 'never'
                      ? 'Hiç'
                      : alcohol === 'occasionally'
                        ? 'Ara Sıra'
                        : 'Düzenli'}
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
        Tercihleri Kaydet
      </Button>
    </View>
  );
};

export default PreferencesForm;
