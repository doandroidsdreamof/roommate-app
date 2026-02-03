import PreferencesModalWrapper from '@/components/forms/PreferencesModalWrapper/PreferencesModalWrapper';
import { MESSAGE_CONTEXT_TYPE } from '@/components/message/types';
import Loading from '@/components/primitives/loading/Loading';
import MatchModal from '@/components/swipe/matchModal/MatchModal';
import SwipeContainer from '@/components/swipe/swipeContainer/SwipeContainer';
import { usePreferenceCheck } from '@/hooks/usePreferenceCheck';
import { FeedItem } from '@/schemas/feedSchema';
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { styles } from './SwipeScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MessagesStackParamList } from '@/components/swipe/matchModal/MessagesStackNavigator';

type NavigationProp = NativeStackNavigationProp<MessagesStackParamList>;

export interface MatchedProfile {
  feedItem: FeedItem;
  conversationId: string;
  recipientId: string;
}

const SwipeScreen = () => {
  const [matchedProfile, setMatchedProfile] = useState<MatchedProfile | null>(
    null
  );
  const [showMatchModal, setShowMatchModal] = useState(false);
  const { hasPreferences, isLoading } = usePreferenceCheck();
  const navigation = useNavigation<NavigationProp>();

  const handleMatch = useCallback(
    (profile: FeedItem, conversationId: string, recipientId: string) => {
      setMatchedProfile({
        feedItem: profile,
        conversationId,
        recipientId,
      });
      setShowMatchModal(true);
    },
    []
  );

  const handleSendMessage = useCallback(() => {
    if (!matchedProfile) return;
    navigation.dispatch(
      CommonActions.navigate({
        name: 'MessagesList',
        params: {
          screen: 'Message',
          params: {
            conversationId: matchedProfile.conversationId,
            recipientId: matchedProfile.recipientId,
            recipientName: matchedProfile.feedItem.name || 'User',
            contextType: MESSAGE_CONTEXT_TYPE.MATCH,
          },
        },
      })
    );
  }, [matchedProfile, navigation]);

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
