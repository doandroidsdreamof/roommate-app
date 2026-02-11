import { profileApi } from '@/api';
import PreferencesForm from '@/components/forms/preferencesForm/PreferencesForm';
import Modal from '@/components/modal/Modal';
import Loading from '@/components/primitives/loading/Loading';
import { usePreferenceCheck } from '@/hooks/usePreferences';
import {
  CreatePreferencesDto,
  createPreferencesSchema,
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

  const form = useForm<CreatePreferencesDto>({
    resolver: zodResolver(createPreferencesSchema),
    defaultValues: {
      ageMin: 18,
      ageMax: 35,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreatePreferencesDto) =>
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
    async (data: CreatePreferencesDto): Promise<void> => {
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
