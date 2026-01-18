import Loading from '@/components/loading/Loading';
import MatchModal from '@/components/swipe/matchModal/MatchModal';
import SwipeContainer from '@/components/swipe/swipeContainer/SwipeContainer';
import { usePreferenceCheck } from '@/hooks/usePreferenceCheck';
import { FeedItem } from '@/schemas/feedSchema';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { styles } from './SwipeScreen.styles';
import PreferencesModalWrapper from '@/components/forms/PreferencesModalWrapper/PreferencesModalWrapper';

const SwipeScreen = () => {
  const [matchedProfile, setMatchedProfile] = useState<FeedItem | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const { hasPreferences, isLoading } = usePreferenceCheck();

  const handleMatch = useCallback((profile: FeedItem) => {
    setMatchedProfile(profile);
    setShowMatchModal(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    console.log('Navigate to messages:', matchedProfile);
  }, [matchedProfile]);

  const handleKeepSwiping = useCallback(() => {
    setShowMatchModal(false);
  }, []);

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <View style={styles.container}>
      <SwipeContainer onMatch={handleMatch} />

      {!hasPreferences && (
        <PreferencesModalWrapper visible={true} onDismiss={() => {}} />
      )}
      <MatchModal
        visible={showMatchModal}
        onDismiss={() => setShowMatchModal(false)}
        onSendMessage={handleSendMessage}
        onKeepSwiping={handleKeepSwiping}
        matchedProfile={matchedProfile}
        currentUserPhoto={undefined}
      />
    </View>
  );
};

export default SwipeScreen;
