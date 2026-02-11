import { profileApi } from '@/api';
import ProfileForm from '@/components/forms/profileForm/ProfileForm';
import type { CreateProfileDto } from '@/schemas/profileSchema';
import { createProfileSchema } from '@/schemas/profileSchema';
import { useStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createStyles } from './ProfileSetupScreen.styles';

const ProfileSetupScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const setProfile = useStore((state) => state.setProfile);

  const profileForm = useForm<CreateProfileDto>({
    resolver: zodResolver(createProfileSchema),
  });

  const onSubmitProfile = async (data: CreateProfileDto) => {
    try {
      const profileResponse = await profileApi.createProfile(data);
      setProfile(profileResponse.data);
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfileForm form={profileForm} onSubmit={onSubmitProfile} />
    </ScrollView>
  );
};

export default ProfileSetupScreen;
