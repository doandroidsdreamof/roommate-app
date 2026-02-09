import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { style } from './Toast.styles';

interface ToastProps {
  visible: boolean;
  message: string;
  onDismiss: () => void;
  actionLabel?: string;
  duration?: number;
  onActionPress?: () => void;
}

const Toast = ({
  visible,
  message,
  onDismiss,
  actionLabel,
  duration = 4000,
  onActionPress,
}: ToastProps) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      style={style.container}
      action={
        actionLabel
          ? {
              label: actionLabel,
              onPress: onActionPress,
            }
          : undefined
      }
    >
      {message}
    </Snackbar>
  );
};

export default Toast;
