import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { feedApi } from '@/api';
import { FeedItem } from '@/schemas/feedSchema';
import SwipeCard from '@/components/swipe/SwipeCard';
import { spacing } from '@/theme/theme';

const SwipeScreen = () => {
  const theme = useTheme();
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const response = await feedApi.getFeed();
      setFeed(response.data);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Failed to load feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: 'left' | 'right', userId: string) => {
    try {
      if (direction === 'right') {
        console.log('right');
      } else {
        console.log('left');
      }
      setCurrentIndex((prev) => prev + 1);

      if (currentIndex >= feed.length - 3) {
        loadFeed();
      }
    } catch (error) {
      console.error('Swipe failed:', error);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (feed.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text variant="headlineSmall" style={styles.emptyText}>
          No more profiles to show
        </Text>
        <Button mode="contained" onPress={loadFeed} style={styles.reloadButton}>
          Reload
        </Button>
      </View>
    );
  }

  const currentProfile = feed[currentIndex];

  if (!currentProfile) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text variant="headlineSmall" style={styles.emptyText}>
          You&apos;ve seen all profiles!
        </Text>
        <Button mode="contained" onPress={loadFeed} style={styles.reloadButton}>
          Reload Feed
        </Button>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Counter */}
      <View style={styles.counter}>
        <Text variant="bodySmall" style={{ color: theme.colors.outline }}>
          {currentIndex + 1} / {feed.length}
        </Text>
      </View>

      <View style={styles.cardStack}>
        {feed.slice(currentIndex, currentIndex + 3).map((profile, index) => {
          const reverseIndex = 2 - index;

          return (
            <View
              key={profile.userId}
              style={[
                styles.stackedCard,
                {
                  transform: [
                    { scale: 1 - reverseIndex * 0.05 },
                    { translateY: -reverseIndex * 10 },
                  ],
                  zIndex: index,
                },
              ]}
            >
              <SwipeCard profile={profile} onSwipe={handleSwipe} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardStack: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  counter: {
    alignSelf: 'center',
    paddingTop: spacing.lg,
    zIndex: 10,
  },
  emptyText: {
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  reloadButton: {
    marginTop: spacing.md,
  },
  stackedCard: {
    position: 'absolute',
  },
});

export default SwipeScreen;
