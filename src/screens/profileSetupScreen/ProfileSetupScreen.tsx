import { profileApi } from '@/api';
import PreferencesForm from '@/components/preferencesForm/PreferencesForm';
import ProfileForm from '@/components/profileForm/ProfileForm';
import type {
  PreferencesSetupForm,
  ProfileSetupForm,
} from '@/schemas/profileSchema';
import {
  preferencesSetupSchema,
  profileSetupSchema,
} from '@/schemas/profileSchema';
import { useStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { createStyles } from './ProfileSetupScreen.styles';

const ProfileSetupScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [step, setStep] = useState<'profile' | 'preferences'>('profile');
  const [profileData, setProfileData] = useState<ProfileSetupForm | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setHasProfile = useStore((state) => state.setHasProfile);
  const setProfile = useStore((state) => state.setProfile);

  const profileForm = useForm<ProfileSetupForm>({
    resolver: zodResolver(profileSetupSchema),
  });

  const preferencesForm = useForm<PreferencesSetupForm>({
    resolver: zodResolver(preferencesSetupSchema),
    defaultValues: {
      ageMin: 18,
      ageMax: 35,
    },
  });

  const onSubmitProfile = (data: ProfileSetupForm) => {
    setProfileData(data);
    setStep('preferences');
  };

  const onSubmitPreferences = async (data: PreferencesSetupForm) => {
    if (!profileData) return;

    setIsLoading(true);
    try {
      const profileResponse = await profileApi.createProfile(profileData);

      await profileApi.createPreferences(data);

      await setProfile(profileResponse.data);
      setHasProfile(true);

      console.log('Profile created successfully');
    } catch (error) {
      console.error('Failed to create profile:', error);
      // TODO: Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          {step === 'profile' ? 'Create Your Profile' : 'Set Your Preferences'}
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {step === 'profile'
            ? 'Tell us about yourself'
            : 'Help us find your perfect roommate'}
        </Text>
      </View>

      {step === 'profile' ? (
        <ProfileForm
          form={profileForm}
          onSubmit={onSubmitProfile}
        />
      ) : (
        <PreferencesForm
          form={preferencesForm}
          onSubmit={() => onSubmitPreferences}
          onBack={() => setStep('profile')}
          isLoading={isLoading}
        />
      )}
    </ScrollView>
  );
};

export default ProfileSetupScreen;
