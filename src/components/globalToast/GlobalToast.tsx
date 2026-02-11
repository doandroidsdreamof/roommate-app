import { useStore } from '@/store/index';
import React from 'react';
import { View } from 'react-native';
import Toast from '../primitives/toast/Toast';
import { styles } from './GlobalToast.styles';

const GlobalToast = () => {
  const toasts = useStore((state) => state.toasts);
  const removeToast = useStore((state) => state.removeToast);

  return (
    <View style={styles.container}>
      {toasts.map((toast, index) => (
        <View
          key={toast.toastId}
          style={[styles.toastWrapper, { bottom: index * 60 }]}
        >
          <Toast
            toastId={toast.toastId}
            visible={true}
            removeToast={removeToast}
            message={toast.toastMessage}
            onDismiss={() => removeToast(toast.toastId)}
            duration={toast.duration}
            actionLabel={toast.actionLabel}
          />
        </View>
      ))}
    </View>
  );
};

export default GlobalToast;
