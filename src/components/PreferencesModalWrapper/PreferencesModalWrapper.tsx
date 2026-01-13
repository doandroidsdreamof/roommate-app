import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '@/api';
import PreferencesForm from '@/components/preferencesForm/PreferencesForm';
import {
  PreferencesSetupForm,
  preferencesSetupSchema,
} from '@/schemas/profileSchema';
import Modal from '../modal/Modal';

interface PreferencesModalWrapperProps {
  visible: boolean;
  onDismiss: () => void;
}

const PreferencesModalWrapper = ({
  visible,
  onDismiss,
}: PreferencesModalWrapperProps) => {
  const queryClient = useQueryClient();

  const form = useForm<PreferencesSetupForm>({
    resolver: zodResolver(preferencesSetupSchema),
    defaultValues: {
      ageMin: 18,
      ageMax: 35,
    },
  });

  const { mutate: createPreferences, isPending } = useMutation({
    mutationFn: (data: PreferencesSetupForm) =>
      profileApi.createPreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferenceExists'] });
      onDismiss();
    },
    onError: (error) => {
      console.error('Failed to create preferences:', error);
    },
  });

  const handleSubmit = (data: PreferencesSetupForm) => {
    createPreferences(data);
  };

  return (
    <Modal
      showCloseButton={true}
      visible={visible}
      onDismiss={onDismiss}
    >
      <PreferencesForm form={form} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default PreferencesModalWrapper;
