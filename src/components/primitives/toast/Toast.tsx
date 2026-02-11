import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { style } from './Toast.styles';
import { useEffect } from 'react';

interface ToastProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  removeToast: (id: string) => void;
  actionLabel?: string;
  toastId: string;
  duration?: number;
}

const Toast = ({
  visible,
  message,
  toastId,
  onDismiss,
  removeToast,
  actionLabel,
  duration = 3000,
}: ToastProps) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={style.container}
      action={actionLabel ? { label: actionLabel, onPress: () => removeToast(toastId) } : undefined}
    >
      {message}
    </Snackbar>
  );
};

export default Toast;
