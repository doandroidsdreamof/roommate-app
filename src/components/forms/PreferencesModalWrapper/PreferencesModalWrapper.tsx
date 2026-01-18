import { profileApi } from '@/api';
import PreferencesForm from '@/components/forms/preferencesForm/PreferencesForm';
import Loading from '@/components/loading/Loading';
import Modal from '@/components/modal/Modal';
import { usePreferenceCheck } from '@/hooks/usePreferenceCheck';
import {
  PreferencesSetupForm,
  preferencesSetupSchema,
} from '@/schemas/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

interface PreferencesModalWrapperProps {
  visible: boolean;
  onDismiss: () => void;
}

const PreferencesModalWrapper = ({
  visible,
  onDismiss,
}: PreferencesModalWrapperProps) => {
  const queryClient = useQueryClient();
  const { isLoading } = usePreferenceCheck();

  const form = useForm<PreferencesSetupForm>({
    resolver: zodResolver(preferencesSetupSchema),
    defaultValues: {
      ageMin: 18,
      ageMax: 35,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: PreferencesSetupForm) =>
      profileApi.createPreferences(data),
    onSuccess: async () => {
      console.log('Preferences created successfully');
      await queryClient.invalidateQueries({ queryKey: ['preferenceExists'] });
      await queryClient.invalidateQueries({ queryKey: ['swipe'] });
      form.reset();
      onDismiss();
    },
    onError: (error) => {
      console.error('Failed to create preferences:', error);
    },
  });

  const handleSubmit = useCallback(
    async (data: PreferencesSetupForm): Promise<void> => {
      await mutation.mutateAsync(data);
    },
    [mutation]
  );

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <Modal
      showCloseButton={false}
      dismissable={false}
      visible={visible}
      onDismiss={onDismiss}
    >
      <PreferencesForm
        form={form}
        onSubmit={handleSubmit}
        isLoading={mutation.isPending}
      />
    </Modal>
  );
};

export default PreferencesModalWrapper;
