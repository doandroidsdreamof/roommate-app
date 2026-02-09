import Stepper from '@/components/search/stepper/Stepper';
import RangeSlider from '@/components/search/rangeSlider/RangeSlider';
import { CreatePostingFormData } from '@/schemas/postingSchema';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Checkbox, HelperText, Text } from 'react-native-paper';
import { styles } from './SpecsStepFields.styles';

const SpecsStepFields = () => {
  const { control, watch, setValue } = useFormContext<CreatePostingFormData>();

  const ageMin = watch('specs.ageMin') ?? 18;
  const ageMax = watch('specs.ageMax') ?? 100;

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="specs.depositAmount"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Text variant="labelLarge" style={styles.label}>
              Depozito Tutarı (₺) *
            </Text>
            <RangeSlider
              isSingle
              value={value ?? 0}
              onValueChange={onChange}
              min={0}
              max={50000}
              step={500}
              formatLabel={(val) => `₺${val.toLocaleString('tr-TR')}`}
            />
            <HelperText type="error" visible={!!error}>
              {error?.message}
            </HelperText>
          </View>
        )}
      />

      <Text variant="labelLarge" style={styles.label}>
        Yaş Aralığı *
      </Text>
      <Controller
        control={control}
        name="specs.ageMin"
        render={({ fieldState: { error: ageMinError } }) => (
          <Controller
            control={control}
            name="specs.ageMax"
            render={({ fieldState: { error: ageMaxError } }) => (
              <View>
                <RangeSlider
                  lowValue={ageMin}
                  highValue={ageMax}
                  onLowChange={(val) =>
                    setValue('specs.ageMin', val, { shouldValidate: true })
                  }
                  onHighChange={(val) =>
                    setValue('specs.ageMax', val, { shouldValidate: true })
                  }
                  min={18}
                  max={100}
                  step={1}
                  formatLabel={(val) => `${val} yaş`}
                />
                {(ageMinError || ageMaxError) && (
                  <HelperText type="error" visible>
                    {ageMinError?.message || ageMaxError?.message}
                  </HelperText>
                )}
              </View>
            )}
          />
        )}
      />

      <Controller
        control={control}
        name="specs.billsIncluded"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Faturalar Dahil"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            {error && (
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.hasBalcony"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Balkon"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            {error && (
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.hasParking"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Otopark"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            {error && (
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.hasElevator"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Asansör"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            {error && (
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.smokingAllowed"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Sigara İçilebilir"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            {error && (
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.alcoholFriendly"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Alkol Serbest"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            {error && (
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.hasPets"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Checkbox.Item
              label="Evcil Hayvan Var"
              status={value ? 'checked' : 'unchecked'}
              onPress={() => onChange(!value)}
            />
            {error && (
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="specs.floor"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Stepper
              label="Kat"
              value={value}
              min={-5}
              max={100}
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
        name="specs.totalFloors"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Stepper
              label="Toplam Kat *"
              value={value}
              min={1}
              max={100}
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

export default SpecsStepFields;