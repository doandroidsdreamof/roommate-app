import Loading from '@/components/Loading';
import MatchModal from '@/components/matchModal/MatchModal';
import PreferencesModalWrapper from '@/components/PreferencesModalWrapper/PreferencesModalWrapper';
import SwipeContainer from '@/components/swipe/swipeContainer/SwipeContainer';
import { usePreferenceCheck } from '@/hooks/usePreferenceCheck';
import { FeedItem } from '@/schemas/feedSchema';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { styles } from './SwipeScreen.styles';

// TODO currently it renders 20 card optimize it
const SwipeScreen = () => {
  const { hasPreferences, isLoading } = usePreferenceCheck();
  const [matchedProfile, setMatchedProfile] = useState<FeedItem | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] =
    useState<boolean>(false);

  const handleMatch = useCallback((profile: FeedItem) => {
    setMatchedProfile(profile);
    setShowMatchModal(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    // TODO: Navigate to messages screen
    console.log('Navigate to messages:', matchedProfile);
  }, [matchedProfile]);

  const handleKeepSwiping = useCallback(() => {
    setShowMatchModal(false);
  }, []);

  const handlePreferencesDismiss = useCallback(() => {
    setShowPreferencesModal(false);
  }, []);

  if (isLoading) {
    return <Loading size="large" />;
  }

  const shouldShowPreferencesModal = showPreferencesModal || !hasPreferences;

  return (
    <View style={styles.container}>
      <SwipeContainer onMatch={handleMatch} />
      <PreferencesModalWrapper
        visible={shouldShowPreferencesModal}
        onDismiss={handlePreferencesDismiss}
      />
      <MatchModal
        visible={showMatchModal}
        onDismiss={() => setShowMatchModal(false)}
        onSendMessage={handleSendMessage}
        onKeepSwiping={handleKeepSwiping}
        matchedProfile={matchedProfile}
        currentUserPhoto={undefined} // TODO pass user image
      />
    </View>
  );
};

export default SwipeScreen;
