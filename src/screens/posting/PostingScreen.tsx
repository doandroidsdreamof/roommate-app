import { zodResolver } from '@hookform/resolvers/zod';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

import UserPostingsList from '@/components/listing/userPostingsList/UserPostingsList';
import Modal from '@/components/modal/Modal';
import { STEP_CONFIGS, Step } from '@/components/posting/Stepconfig';
import { useCreatePosting } from '@/hooks/useCreatePosting';
import {
  CreatePostingFormData,
  createPostingSchema,
} from '@/schemas/postingSchema';
import { useStore } from '@/store/index';
import { createStyles } from './PostingScreen.styles';
import { initialFormState } from './postingScreenConstants';

const PostingScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [isPostingModalVisible, setisPostingModalVisible] = useState(false);
  const { mutateAsync: createPosting } = useCreatePosting();
  const addToast = useStore((state) => state.addToast);

  const methods = useForm<CreatePostingFormData>({
    resolver: zodResolver(createPostingSchema, {
      error: (iss) => {
        if (iss.code === 'invalid_type') {
          return { message: 'bu alan gereklidir' };
        }
      },
    }),
    defaultValues: { ...initialFormState },
    mode: 'onChange',
  });

  const { watch, setValue, trigger, reset } = methods;
  const formData = watch();

  const currentIndex = STEP_CONFIGS.findIndex((s) => s.id === currentStep);
  const currentConfig = STEP_CONFIGS[currentIndex];

  const resetForm = () => {
    reset();
    setCoverImage(null);
    setAdditionalImages([]);
    setCurrentStep('details');
  };

  const pickCoverImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      selectionLimit: 1,
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
      selectionLimit: 5,
      quality: 0.8,
    });
    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setAdditionalImages((prev) => [...prev, ...uris]);
    }
  };

  const handleNext = async () => {
    try {
      const fields = STEP_CONFIGS[currentIndex].requiredFields;
      const isValid = await trigger(fields);

      if (!isValid) return;

      if (currentStep === 'images') {
        await createPosting(formData);
        addToast({ toastMessage: 'İlan başarı ile oluşturuldu' });
        setisPostingModalVisible(false);
        resetForm();
        return;
      }

      if (currentIndex < STEP_CONFIGS.length - 1) {
        setCurrentStep(STEP_CONFIGS[currentIndex + 1].id);
      }
    } catch (error) {
      console.error('[PostingScreen/handleNext Error]: ', error);
      addToast({ toastMessage: 'Bir hata oluştu' });
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentStep(STEP_CONFIGS[currentIndex - 1].id);
  };

  const StepComponent = currentConfig.component;

  return (
    <View style={styles.container}>
      <UserPostingsList
        onCreatePress={() => {
          setisPostingModalVisible(true);
        }}
      />

      <Modal
        showCloseButton
        visible={isPostingModalVisible}
        onDismiss={() => {
          setisPostingModalVisible(false);
          resetForm();
        }}
      >
        <FormProvider {...methods}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text variant="headlineSmall" style={styles.stepTitle}>
                {currentConfig.title}
              </Text>
              <StepComponent
                formData={formData}
                onFieldChange={() => {}}
                onSpecsChange={() => {}}
                coverImage={coverImage}
                additionalImages={additionalImages}
                pickCoverImage={pickCoverImage}
                pickAdditionalImages={pickAdditionalImages}
                removeAdditionalImage={(index: number) =>
                  setAdditionalImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
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
                <Button
                  mode="contained"
                  onPress={handleNext}
                  style={styles.button}
                >
                  {currentIndex === STEP_CONFIGS.length - 1
                    ? 'Oluştur'
                    : 'İleri'}
                </Button>
              </View>
            </View>
          </View>
        </FormProvider>
      </Modal>
    </View>
  );
};

export default PostingScreen;