import React, { useMemo } from 'react';
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
import MapPicker from '@/components/location/mapPicker/MapPicker';
import NeighborhoodDropdown from '@/components/neighborhoodDropdown/NeighborhoodDropdown';
import DatePicker from '@/components/search/datePicker/DatePicker';
import Stepper from '@/components/search/stepper/Stepper';
import { GENDER_OPTIONS } from '@/constants/formConstants';
import { useDistricts } from '@/hooks/useDistricts';
import { useProvinces } from '@/hooks/useProvinces';
import { CreatePostingFormData } from '@/schemas/postingSchema';
import { styles } from './DetailStepfields.styles';

interface DetailsStepFieldsProps {
  onLocationSelect: (location: LocationData) => void;
}

// TODO  Neighborhood population bug

const DetailsStepFields = ({ onLocationSelect }: DetailsStepFieldsProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreatePostingFormData>();

  const city = watch('city');
  const district = watch('district');
  const latitude = watch('latitude');
  const longitude = watch('longitude');

  const { getProvinceByValue } = useProvinces();
  const selectedProvince = useMemo(
    () => getProvinceByValue(city),
    [city, getProvinceByValue]
  );

  const { getDistrictByValue } = useDistricts(selectedProvince);
  const selectedDistrict = useMemo(
    () => (district ? getDistrictByValue(district) : null),
    [district, getDistrictByValue]
  );

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

      <MapPicker
        value={
          latitude !== undefined && longitude !== undefined
            ? { latitude, longitude }
            : null
        }
        onChange={(location) => {
          setValue('latitude', location.latitude, { shouldValidate: true });
          setValue('longitude', location.longitude, { shouldValidate: true });
        }}
        onLocationDataChange={(locationData) => {
          if (locationData.province) {
            setValue('city', locationData.province, { shouldValidate: true });
          }
          if (locationData.district) {
            setValue('district', locationData.district, {
              shouldValidate: true,
            });
          }
          if (locationData.neighborhoodId) {
            setValue('neighborhoodId', locationData.neighborhoodId, {
              shouldValidate: true,
            });
          }
        }}
        error={errors.latitude?.message || errors.longitude?.message}
        label="Harita Konumu"
      />

      <LocationFilter
        initialCity={city}
        initialDistrict={district}
        onCityChange={(val) => {
          setValue('city', val, { shouldValidate: true });
          setValue('neighborhoodId', 0, { shouldValidate: false });
        }}
        onDistrictChange={(val) => {
          setValue('district', val, { shouldValidate: true });
          setValue('neighborhoodId', 0, { shouldValidate: false });
        }}
        cityError={errors.city?.message}
        districtError={errors.district?.message}
      />

      <NeighborhoodDropdown
        districtId={selectedDistrict?.id}
        value={watch('neighborhoodId')}
        onChange={(id) =>
          setValue('neighborhoodId', id, { shouldValidate: true })
        }
        error={errors.neighborhoodId?.message}
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
              error={!!error}
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
              error={!!error}
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
          <View>
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
            </View>
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="isFurnished"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Mobilyalı *"
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
