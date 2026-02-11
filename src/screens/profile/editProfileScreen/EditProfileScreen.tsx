import { profileApi } from '@/api';
import LocationFilter from '@/components/location/locationFilter/LocationFilter';
import MapPicker from '@/components/location/mapPicker/MapPicker';
import Loading from '@/components/primitives/loading/Loading';
import { useProfile } from '@/hooks/useProfile';
import {
  EditProfileFormValues,
  editProfileSchema,
} from '@/schemas/profileSchema';
import { useStore } from '@/store/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Appbar, Avatar, Button, Text, useTheme } from 'react-native-paper';
import { createStyles } from './EditProfileScreen.styles';
import { queryClient } from '@/config/queryClient';

const EditProfileScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const setProfile = useStore((state) => state.setProfile);
  const addToast = useStore((state) => state.addToast);
  const { profile, isLoading } = useProfile();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      city: '',
      district: '',
      photoUrl: '',
    },
  });

  const photoUrl = watch('photoUrl');

  useEffect(() => {
    if (profile) {
      reset({
        city: profile.city || '',
        district: profile.district || '',
        photoUrl: profile.photoUrl || '',
      });
    }
  }, [profile, reset]);

  const handlePickImage = async () => {
    // TODO code duplication & depreciated method
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setValue('photoUrl', result.assets[0].uri, { shouldValidate: true });
    }
  };

  // TODO decouple
  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      await Promise.all([
        profileApi.updateAddress({ city: data.city, district: data.district }),
        profileApi.updatePhoto({ photoUrl: data.photoUrl }),
      ]);

      const refreshed = await profileApi.getProfile();
      if (refreshed.data) setProfile(refreshed.data);

      addToast({ toastMessage: 'Profil başarıyla güncellendi' });
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
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
        <Appbar.Content
          title="Profili Düzenle"
        />
      </Appbar.Header>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <View style={styles.avatarSection}>
            <TouchableOpacity
              onPress={handlePickImage}
              style={styles.avatarWrapper}
            >
              {photoUrl ? (
                <Avatar.Image size={120} source={{ uri: photoUrl }} />
              ) : (
                <Avatar.Icon color="white" size={120} icon="camera" />
              )}
              <View style={styles.editIconBadge}>
                <Avatar.Icon
                  size={24}
                  icon="pencil"
                  color="white"
                  style={styles.editIcon}
                />
              </View>
            </TouchableOpacity>
            {errors.photoUrl && (
              <Text style={styles.photoError}>{errors.photoUrl.message}</Text>
            )}
          </View>
          <MapPicker
            buttonType="outlined"
            onLocationDataChange={(locationData) => {
              if (locationData.province) {
                setValue('city', locationData.province, {
                  shouldValidate: true,
                });
              }
              if (locationData.district) {
                setValue('district', locationData.district, {
                  shouldValidate: true,
                });
              }
            }}
          />
          <LocationFilter
            initialCity={watch('city')}
            initialDistrict={watch('district')}
            onCityChange={(val) => {
              setValue('city', val, { shouldValidate: true });
              setValue('district', '', { shouldValidate: false });
            }}
            onDistrictChange={(val) =>
              setValue('district', val, { shouldValidate: true })
            }
            cityError={errors.city?.message}
            districtError={errors.district?.message}
          />

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

export default EditProfileScreen;
