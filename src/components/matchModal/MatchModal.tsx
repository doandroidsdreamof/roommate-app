import { FeedItem } from '@/schemas/feedSchema';
import React from 'react';
import { View } from 'react-native';
import { Button, Modal, Portal, Text, useTheme } from 'react-native-paper';
import Avatar from '../avatar/Avatar';
import { styles } from './MatchModal.styles';

interface MatchModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSendMessage?: () => void;
  onKeepSwiping?: () => void;
  matchedProfile: FeedItem | null;
  currentUserPhoto?: string;
}

const MatchModal = ({
  visible,
  onDismiss,
  onSendMessage,
  onKeepSwiping,
  matchedProfile,
  currentUserPhoto,
}: MatchModalProps) => {
  const theme = useTheme();

  if (!matchedProfile) return null;

  const { name, photoUrl, city, district } = matchedProfile;
  const location = [city, district].filter(Boolean).join(' • ');

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            It&apos;s a Match!
          </Text>

          <View style={styles.profilesContainer}>
            <Avatar photoUrl={currentUserPhoto} name="You" size={90} />
            <Avatar photoUrl={photoUrl} name={name} size={90} />
          </View>

          <Text variant="bodyLarge" style={styles.subtitle}>
            You and {name} have liked each other
          </Text>

          {location && (
            <Text variant="bodyMedium" style={styles.locationText}>
              {location}
            </Text>
          )}

          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              onPress={() => {
                onSendMessage?.();
                onDismiss();
              }}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
              style={styles.sendMessageButton}
              labelStyle={styles.sendMessageButtonLabel}
              icon="message"
            >
              Send Message
            </Button>

            <Button
              mode="outlined"
              onPress={() => {
                onKeepSwiping?.();
                onDismiss();
              }}
              textColor={theme.colors.primary}
              style={[
                styles.keepSwipingButton,
                { borderColor: theme.colors.primary },
              ]}
              labelStyle={styles.keepSwipingButtonLabel}
              icon="cards"
            >
              Keep Swiping
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default MatchModal;
