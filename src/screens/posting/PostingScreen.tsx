import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import { LocationData } from '@/components/location/locationPicker/LocationPicker';
import { STEP_CONFIGS, Step } from '@/components/posting/Stepconfig';
import {
  CreatePostingFormData,
  createPostingSchema,
} from '@/schemas/postingSchema';
import { createStyles } from './PostingScreen.styles';

const PostingScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [currentStep, setCurrentStep] = useState<Step>('specs');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  const methods = useForm<CreatePostingFormData>({
    resolver: zodResolver(createPostingSchema),
    defaultValues: {
      isFurnished: false,
      specs: {
        description: '',
        ageMin: 18,
        ageMax: 99,
        depositAmount: 0,
        billsIncluded: false,
        floor: 0,
        totalFloors: 1,
        hasBalcony: false,
        hasParking: false,
        hasElevator: false,
        smokingAllowed: false,
        hasPets: false,
        alcoholFriendly: false,
      },
    },
    mode: 'onChange',
  });

  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methods;
  const formData = watch();
  console.log('🚀 ~ errors:', errors);

  const currentIndex = STEP_CONFIGS.findIndex((s) => s.id === currentStep);
  const currentConfig = STEP_CONFIGS[currentIndex];

  const handleFieldChange = (field: unknown, value: unknown) => {
    console.log('🚀 ~ value:', value);
    console.log('🚀 ~ field:', field);
  };

  const handleSpecsChange = (field: unknown, value: unknown) => {
    console.log('🚀 ~ value:', value);
    console.log('🚀 ~ field:', field);
  };

  const handleLocationSelect = (location: LocationData) => {
    if (location.province) setValue('city', location.province);
    if (location.district) setValue('district', location.district);
    if (location.latitude && location.longitude) {
      setValue(
        'latitude',
        typeof location.latitude === 'string'
          ? parseFloat(location.latitude)
          : location.latitude
      );
      setValue(
        'longitude',
        typeof location.longitude === 'string'
          ? parseFloat(location.longitude)
          : location.longitude
      );
    }
  };

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setCoverImage(result.assets[0].uri);
      setValue('coverImageUrl', result.assets[0].uri, { shouldValidate: true });
    }
  };

  const pickAdditionalImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setAdditionalImages((prev) => [...prev, ...uris].slice(0, 5));
    }
  };

  const handleNext = async () => {
    const isFirstStepValid = await trigger([...STEP_CONFIGS[0].requiredFields]);
    console.log('🚀 ~ isFirstStepValid:', isFirstStepValid);
    if (isFirstStepValid) {
      setCurrentStep('specs');
      const isSecondStepValid = await trigger([
        ...STEP_CONFIGS[1].requiredFields,
      ]);
      if (isSecondStepValid) {
        setCurrentStep('images');
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentStep(STEP_CONFIGS[currentIndex - 1].id);
  };

  const StepComponent = currentConfig.component;

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text variant="headlineSmall" style={styles.stepTitle}>
            {currentConfig.title}
          </Text>
          <StepComponent
            formData={formData}
            onFieldChange={handleFieldChange}
            onSpecsChange={handleSpecsChange}
            onLocationSelect={handleLocationSelect}
            coverImage={coverImage}
            additionalImages={additionalImages}
            pickCoverImage={pickCoverImage}
            pickAdditionalImages={pickAdditionalImages}
            removeAdditionalImage={(index: number) =>
              setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
            }
            removeCoverImage={() => {
              setCoverImage(null);
              setValue('coverImageUrl', '');
            }}
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            {currentIndex > 0 && (
              <Button
                mode="outlined"
                onPress={handleBack}
                style={styles.button}
              >
                Geri
              </Button>
            )}
            <Button mode="contained" onPress={handleNext} style={styles.button}>
              {currentIndex === STEP_CONFIGS.length - 1 ? 'Oluştur' : 'İleri'}
            </Button>
          </View>
        </View>
      </View>
    </FormProvider>
  );
};

export default PostingScreen;
