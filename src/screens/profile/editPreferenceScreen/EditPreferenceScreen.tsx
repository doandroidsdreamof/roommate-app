import { profileApi } from '@/api';
import Loading from '@/components/primitives/loading/Loading';
import Stepper from '@/components/search/stepper/Stepper';
import { queryClient } from '@/config/queryClient';
import { usePreferences } from '@/hooks/usePreferences';
import {
  UpdatePreferencesDto,
  updatePreferencesSchema,
} from '@/schemas/profileSchema';
import { useStore } from '@/store/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import {
  Appbar,
  Button,
  Chip,
  SegmentedButtons,
  Text,
  useTheme,
} from 'react-native-paper';
import { createStyles } from './EditPreferenceScreen.styles';

// TODO code duplication with other preference form

const EditPreferenceScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const addToast = useStore((state) => state.addToast);
  const { preferences, isLoading } = usePreferences();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePreferencesDto>({
    resolver: zodResolver(updatePreferencesSchema),
    defaultValues: {
      ageMin: undefined,
      ageMax: undefined,
      budgetMin: undefined,
      budgetMax: undefined,
      genderPreference: undefined,
      smokingHabit: undefined,
      petOwnership: undefined,
      petCompatibility: undefined,
      alcoholConsumption: undefined,
    },
  });

  useEffect(() => {
    if (preferences) {
      reset({
        ageMin: preferences.ageMin,
        ageMax: preferences.ageMax,
        budgetMin: preferences.budgetMin ?? undefined,
        budgetMax: preferences.budgetMax ?? undefined,
        genderPreference: preferences.genderPreference ?? undefined,
        smokingHabit: preferences.smokingHabit ?? undefined,
        petOwnership: preferences.petOwnership ?? undefined,
        petCompatibility: preferences.petCompatibility ?? undefined,
        alcoholConsumption: preferences.alcoholConsumption ?? undefined,
      });
    }
  }, [preferences, reset]);

  const onSubmit = async (data: UpdatePreferencesDto) => {
    try {
      await profileApi.updatePreferences(data);
      await queryClient.invalidateQueries({ queryKey: ['preferences'] });
      addToast({ toastMessage: 'Tercihler başarıyla güncellendi' });
      navigation.goBack();
    } catch (error) {
      console.error('Update failed:', error);
      addToast({ toastMessage: 'Güncelleme sırasında bir hata oluştu' });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Tercihleri Düzenle" />
      </Appbar.Header>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <View style={styles.section}>
            <Text variant="titleMedium">Yaş Aralığı</Text>
            <Controller
              control={control}
              name="ageMin"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Stepper
                    label="Minimum Yaş"
                    value={value ?? 18}
                    onChange={onChange}
                    min={18}
                    max={100}
                    step={1}
                  />
                  {errors.ageMin && (
                    <Text style={styles.errorText}>
                      {errors.ageMin.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="ageMax"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Stepper
                    label="Maksimum Yaş"
                    value={value ?? 100}
                    onChange={onChange}
                    min={18}
                    max={100}
                    step={1}
                  />
                  {errors.ageMax && (
                    <Text style={styles.errorText}>
                      {errors.ageMax.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Bütçe Aralığı (Opsiyonel)</Text>
            <Controller
              control={control}
              name="budgetMin"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Stepper
                    label="Minimum Bütçe"
                    value={value ?? 0}
                    onChange={onChange}
                    min={0}
                    max={100000}
                    step={1000}
                  />
                  {errors.budgetMin && (
                    <Text style={styles.errorText}>
                      {errors.budgetMin.message}
                    </Text>
                  )}
                </View>
              )}
            />
            <Controller
              control={control}
              name="budgetMax"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Stepper
                    label="Maksimum Bütçe"
                    value={value ?? 0}
                    onChange={onChange}
                    min={0}
                    max={100000}
                    step={1000}
                  />
                  {errors.budgetMax && (
                    <Text style={styles.errorText}>
                      {errors.budgetMax.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Cinsiyet Tercihi</Text>
            <Controller
              control={control}
              name="genderPreference"
              render={({ field: { onChange, value } }) => (
                <SegmentedButtons
                  value={value ?? ''}
                  onValueChange={onChange}
                  buttons={[
                    { value: 'female_only', label: 'Sadece Kadın' },
                    { value: 'male_only', label: 'Sadece Erkek' },
                    { value: 'mixed', label: 'Farketmez' },
                  ]}
                />
              )}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Sigara Alışkanlığı</Text>
            <Controller
              control={control}
              name="smokingHabit"
              render={({ field: { onChange, value } }) => (
                <View style={styles.chipGroup}>
                  {[
                    { value: 'no', label: 'İçmem' },
                    { value: 'social', label: 'Sosyal' },
                    { value: 'regular', label: 'Düzenli' },
                  ].map((option) => (
                    <Chip
                      key={option.value}
                      selected={value === option.value}
                      onPress={() => onChange(option.value)}
                      mode="outlined"
                    >
                      {option.label}
                    </Chip>
                  ))}
                </View>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Evcil Hayvan</Text>
            <Controller
              control={control}
              name="petOwnership"
              render={({ field: { onChange, value } }) => (
                <View style={styles.chipGroup}>
                  {[
                    { value: 'none', label: 'Yok' },
                    { value: 'cat', label: 'Kedi' },
                    { value: 'dog', label: 'Köpek' },
                    { value: 'other', label: 'Diğer' },
                  ].map((option) => (
                    <Chip
                      key={option.value}
                      selected={value === option.value}
                      onPress={() => onChange(option.value)}
                      mode="outlined"
                    >
                      {option.label}
                    </Chip>
                  ))}
                </View>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Evcil Hayvan Uyumu</Text>
            <Controller
              control={control}
              name="petCompatibility"
              render={({ field: { onChange, value } }) => (
                <View style={styles.chipGroup}>
                  {[
                    { value: 'not_compatible', label: 'Uyumlu Değil' },
                    { value: 'compatible', label: 'Uyumlu' },
                  ].map((option) => (
                    <Chip
                      key={option.value}
                      selected={value === option.value}
                      onPress={() => onChange(option.value)}
                      mode="outlined"
                    >
                      {option.label}
                    </Chip>
                  ))}
                </View>
              )}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium">Alkol Tüketimi</Text>
            <Controller
              control={control}
              name="alcoholConsumption"
              render={({ field: { onChange, value } }) => (
                <View style={styles.chipGroup}>
                  {[
                    { value: 'never', label: 'Asla' },
                    { value: 'occasionally', label: 'Ara Sıra' },
                    { value: 'regularly', label: 'Düzenli' },
                  ].map((option) => (
                    <Chip
                      key={option.value}
                      selected={value === option.value}
                      onPress={() => onChange(option.value)}
                      mode="outlined"
                    >
                      {option.label}
                    </Chip>
                  ))}
                </View>
              )}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.button}
          >
            Değişiklikleri Kaydet
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditPreferenceScreen;
