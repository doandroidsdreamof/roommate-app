import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import {
  Checkbox,
  Chip,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';

import LocationFilter from '@/components/location/locationFilter/LocationFilter';
import LocationPicker, {
  LocationData,
} from '@/components/location/locationPicker/LocationPicker';
import DatePicker from '@/components/search/datePicker/DatePicker';
import Stepper from '@/components/search/stepper/Stepper';
import { GENDER_OPTIONS } from '@/constants/formConstants';
import { CreatePostingFormData } from '@/schemas/postingSchema';
import { styles } from './Detailsstepfields.styles';

// TODO map picker

interface DetailsStepFieldsProps {
  onLocationSelect: (location: LocationData) => void;
}

const DetailsStepFields = ({ onLocationSelect }: DetailsStepFieldsProps) => {
  const { control, setValue, watch } = useFormContext<CreatePostingFormData>();

  const city = watch('city');
  const district = watch('district');

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              label="Başlık *"
              value={value}
              onChangeText={onChange}
              error={!!error}
              mode="outlined"
              placeholder="Örn: Kadıköy'de Ferah Oda"
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.description"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              label="Açıklama *"
              value={value}
              onChangeText={onChange}
              error={!!error}
              mode="outlined"
              multiline
              numberOfLines={6}
              placeholder="Evinizi tanıtın (min 50 karakter)"
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <LocationPicker onLocationSelect={onLocationSelect} />

      <LocationFilter // TODO handle error messages and validation
        initialCity={city}
        initialDistrict={district}
        onCityChange={(val) => setValue('city', val, { shouldValidate: true })}
        onDistrictChange={(val) =>
          setValue('district', val, { shouldValidate: true })
        }
      />

      <Controller // TODO handle it implicitly
        control={control}
        name="neighborhoodId"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              label="Mahalle ID *"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="rentAmount"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              label="Kira Bedeli (₺) *"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="squareMeters"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              label="Metrekare *"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Text variant="labelLarge" style={styles.label}>
        Ev Arkadaşının Cinsiyeti *
      </Text>
      <Controller
        control={control}
        name="preferredRoommateGender"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View style={styles.chipRow}>
            {GENDER_OPTIONS.map((option) => (
              <Chip
                key={option.value}
                selected={value === option.value}
                onPress={() => onChange(option.value)}
              >
                {option.label}
              </Chip>
            ))}
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller // TODO look better UX
        control={control}
        name="isFurnished"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Mobilyalı"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="availableFrom"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <DatePicker
              value={value}
              onChange={(date) => onChange(date ?? '')}
              placeholder="Müsaitlik Tarihi *"
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="roomCount"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Stepper
              label="Oda Sayısı *"
              value={value ?? 1}
              min={1}
              max={10}
              onChange={onChange}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="bathroomCount"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Stepper
              label="Banyo Sayısı *"
              value={value ?? 1}
              min={1}
              max={5}
              onChange={onChange}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />
    </View>
  );
};

export default DetailsStepFields;
