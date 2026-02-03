import Stepper from '@/components/search/stepper/Stepper';
import { CreatePostingFormData } from '@/schemas/postingSchema';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Checkbox, HelperText, Text, TextInput } from 'react-native-paper';
import { styles } from './SpecsStepFields.styles';

const SpecsStepFields = () => {
  const { control } = useFormContext<CreatePostingFormData>();

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="specs.depositAmount"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <TextInput
              label="Depozito Tutarı (₺) *"
              value={value?.toString()}
              onChangeText={(text) => onChange(Number(text))}
              error={!!error}
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
        Yaş Aralığı *
      </Text>
      <View style={styles.ageRow}>
        <Controller
          control={control}
          name="specs.ageMin"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View style={styles.ageMin}>
              <TextInput
                label="Min Yaş"
                value={value?.toString()}
                onChangeText={(text) => onChange(Number(text))}
                error={!!error}
                mode="outlined"
                keyboardType="numeric"
                style={styles.ageInput}
              />
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            </View>
          )}
        />
        <Controller
          control={control}
          name="specs.ageMax"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View>
              <TextInput
                label="Max Yaş"
                value={value?.toString()}
                onChangeText={(text) => onChange(Number(text))}
                error={!!error}
                mode="outlined"
                keyboardType="numeric"
                style={styles.ageInput}
              />
              <HelperText type="error" visible={!!error}>
                {error?.message}
              </HelperText>
            </View>
          )}
        />
      </View>

      <Controller
        control={control}
        name="specs.billsIncluded"
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Faturalar Dahil"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
      />

      <Controller
        control={control}
        name="specs.hasBalcony"
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Balkon"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
      />

      <Controller
        control={control}
        name="specs.hasParking"
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Otopark"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
      />

      <Controller
        control={control}
        name="specs.hasElevator"
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Asansör"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
      />

      <Controller
        control={control}
        name="specs.smokingAllowed"
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Sigara İçilebilir"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
      />

      <Controller
        control={control}
        name="specs.alcoholFriendly"
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Alkol Serbest"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
      />

      <Controller
        control={control}
        name="specs.hasPets"
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Evcil Hayvan Var"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
      />
      <Controller
        control={control}
        name="specs.floor"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            <Stepper
              label="Kat"
              value={value ?? 0}
              min={0}
              max={50}
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
              value={value ?? 1}
              min={1}
              max={50}
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
