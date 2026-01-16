import { profileApi } from '@/api';
import ProfileForm from '@/components/profileForm/ProfileForm';
import type { ProfileSetupForm } from '@/schemas/profileSchema';
import { profileSetupSchema } from '@/schemas/profileSchema';
import { useStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { createStyles } from './ProfileSetupScreen.styles';

const ProfileSetupScreen = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const setHasProfile = useStore((state) => state.setHasProfile);
  const setProfile = useStore((state) => state.setProfile);

  const profileForm = useForm<ProfileSetupForm>({
    resolver: zodResolver(profileSetupSchema),
  });

  const onSubmitProfile = async (data: ProfileSetupForm) => {
    try {
      const profileResponse = await profileApi.createProfile(data);
      await setProfile(profileResponse.data);
      setHasProfile(true);
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Create Your Profile
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Tell us about yourself
        </Text>
      </View>

      <ProfileForm form={profileForm} onSubmit={onSubmitProfile} />
    </ScrollView>
  );
};
export default ProfileSetupScreen;
