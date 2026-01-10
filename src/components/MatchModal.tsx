import { FeedItem } from '@/schemas/feedSchema';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Avatar,
    Button,
    Modal,
    Portal,
    Text,
    useTheme,
} from 'react-native-paper';

interface MatchModalProps {
  visible: boolean;
  onDismiss: () => void;
  onSendMessage?: () => void;
  onKeepSwiping?: () => void;
  matchedProfile: FeedItem | null;
  currentUserPhoto?: string;
}

const MatchModal: React.FC<MatchModalProps> = ({
  visible,
  onDismiss,
  onSendMessage,
  onKeepSwiping,
  matchedProfile,
  currentUserPhoto,
}) => {
  const theme = useTheme();

  if (!matchedProfile) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modalContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.title}>
            It&apos;s a Match! 🎉
          </Text>
          <View style={styles.profilesContainer}>
            <View style={styles.profileImageWrapper}>
              <Avatar.Image
                size={90}
                source={
                  currentUserPhoto
                    ? { uri: currentUserPhoto }
                    : require('@/assets/images/default-avatar.png')
                }
                style={styles.profileImage}
              />
              <Text variant="labelMedium" style={styles.profileName}>
                You
              </Text>
            </View>

            <Text style={styles.heart}>❤️</Text>
            <View style={styles.profileImageWrapper}>
              <Avatar.Image
                size={90}
                source={
                  matchedProfile.photoUrl
                    ? { uri: matchedProfile.photoUrl }
                    : require('@/assets/images/default-avatar.png')
                }
                style={styles.profileImage}
              />
              <Text variant="labelMedium" style={styles.profileName}>
                {matchedProfile.name}
              </Text>
            </View>
          </View>

          <Text variant="bodyLarge" style={styles.subtitle}>
            You and {matchedProfile.name} have liked each other
          </Text>
          {(matchedProfile.city || matchedProfile.district) && (
            <Text variant="bodyMedium" style={styles.locationText}>
              {matchedProfile.city} • {matchedProfile.district}
            </Text>
          )}
          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              onPress={() => {
                onSendMessage?.();
                onDismiss();
              }}
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
              style={styles.keepSwipingButton}
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

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 8,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  heart: {
    fontSize: 36,
    marginHorizontal: 20,
  },
  keepSwipingButton: {
    borderColor: '#FF4081',
    borderRadius: 12,
  },
  keepSwipingButtonLabel: {
    color: '#FF4081',
    fontSize: 16,
  },
  locationText: {
    marginBottom: 24,
    opacity: 0.7,
    textAlign: 'center',
  },
  modalContainer: {
    alignItems: 'center' as const,
    borderRadius: 24,
    margin: 20,
    padding: 24,
  },
  profileImage: {
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  profileImageWrapper: {
    alignItems: 'center',
  },
  profileName: {
    fontWeight: '600',
    marginTop: 4,
  },
  profilesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
  },
  sendMessageButton: {
    backgroundColor: '#FF4081',
    borderRadius: 12,
    marginBottom: 12,
  },
  sendMessageButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontWeight: '500',
    marginBottom: 8,
    opacity: 0.9,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default MatchModal;
