import React, { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import {
  IconButton,
  Modal as PaperModal,
  Portal,
  useTheme,
} from 'react-native-paper';
import { styles } from './Modal.styles';

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  dismissable?: boolean;
  children: ReactNode;
  showCloseButton?: boolean;
}

const Modal = ({
  visible,
  onDismiss,
  dismissable = true,
  showCloseButton = false,
  children,
}: ModalProps) => {
  const theme = useTheme();

  const canDismissViaBackdrop = dismissable && !showCloseButton;

  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        dismissable={canDismissViaBackdrop}
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.content}>
          {showCloseButton && (
            <View style={styles.closeButtonContainer}>
              <IconButton
                icon="close"
                size={24}
                onPress={onDismiss}
                style={styles.closeButton}
              />
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {children}
          </ScrollView>
        </View>
      </PaperModal>
    </Portal>
  );
};

export default Modal;
