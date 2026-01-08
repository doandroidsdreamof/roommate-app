import {
  PanResponder,
  Animated,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, { useRef } from 'react';
import { Card, Text, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FeedItem } from '@/schemas/feedSchema';
import { spacing } from '@/theme/theme';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.lg;
const CARD_HEIGHT = height * 0.55;

interface SwipeCardProps {
  profile: FeedItem;
  onSwipe: (direction: 'left' | 'right', userId: string) => void;
  isStackCard?: boolean;
}

const SwipeCard = ({
  profile,
  onSwipe,
  isStackCard = false,
}: SwipeCardProps) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  // Opacity for LIKE/NOPE indicators
  const likeOpacity = pan.x.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = pan.x.interpolate({
    inputRange: [-150, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only allow horizontal swipes
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x }], // Only track x movement
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, { dx, vx }) => {
        const velocity = Math.abs(vx);
        const swipeThreshold = velocity > 0.5 ? 80 : 120;

        if (dx > swipeThreshold) {
          Animated.spring(pan, {
            toValue: { x: 500, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            onSwipe('left', profile.userId);
            pan.setValue({ x: 0, y: 0 });
          });
        } else if (dx < -swipeThreshold) {
          Animated.spring(pan, {
            toValue: { x: -500, y: 0 },
            useNativeDriver: true,
          }).start(() => {
            onSwipe('right', profile.userId);
            pan.setValue({ x: 0, y: 0 });
          });
        } else {
          // Return to center
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Don't attach handlers to stack cards
  const cardHandlers = isStackCard ? {} : panResponder.panHandlers;

  return (
    <Animated.View
      {...cardHandlers}
      style={[
        styles.cardContainer,
        {
          transform: [{ translateX: pan.x }, { rotate }],
        },
      ]}
    >
      <Card style={styles.card}>
        {/* LIKE indicator */}
        {!isStackCard && (
          <Animated.View
            style={[styles.likeIndicator, { opacity: nopeOpacity }]}
          >
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
        )}

        {/* NOPE indicator */}
        {!isStackCard && (
          <Animated.View
            style={[styles.nopeIndicator, { opacity: likeOpacity }]}
          >
            <Text style={styles.nopeText}>NOPE</Text>
          </Animated.View>
        )}

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: profile.photoUrl || 'https://via.placeholder.com/400',
            }}
            style={styles.image}
            resizeMode="cover"
          />
          {profile.photoVerified && (
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={24}
                color="#3ECF8E"
              />
            </View>
          )}
        </View>

        {/* Profile Info */}
        <Card.Content style={styles.content}>
          <Text variant="headlineMedium" style={styles.name}>
            {profile.name}, {profile.ageRange}
          </Text>

          <View style={styles.locationRow}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
            <Text variant="bodyMedium" style={styles.location}>
              {profile.district}, {profile.city}
            </Text>
          </View>

          {/* Budget */}
          {profile.budgetMin && profile.budgetMax && (
            <View style={styles.budgetRow}>
              <MaterialCommunityIcons
                name="currency-try"
                size={16}
                color="#666"
              />
              <Text variant="bodyMedium" style={styles.budget}>
                {profile.budgetMin.toLocaleString()} -{' '}
                {profile.budgetMax.toLocaleString()} ₺
              </Text>
            </View>
          )}

          {/* Lifestyle Tags */}
          <View style={styles.tagsContainer}>
            {profile.smokingHabit && (
              <Chip icon="smoking" compact style={styles.chip}>
                {profile.smokingHabit}
              </Chip>
            )}
            {profile.petOwnership && profile.petOwnership !== 'none' && (
              <Chip icon="paw" compact style={styles.chip}>
                {profile.petOwnership}
              </Chip>
            )}
            {profile.alcoholConsumption && (
              <Chip icon="glass-wine" compact style={styles.chip}>
                {profile.alcoholConsumption}
              </Chip>
            )}
          </View>
        </Card.Content>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  budget: {
    color: '#666',
  },
  budgetRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginBottom: spacing.sm,
  },
  card: {
    borderRadius: 16,
    elevation: 5,
    flex: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  cardContainer: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
  chip: {
    height: 28,
  },
  content: {
    paddingTop: spacing.md,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: CARD_HEIGHT * 0.7,
    objectFit: 'cover',
    position: 'relative',
  },
  likeIndicator: {
    borderColor: '#3ECF8E',
    borderRadius: 8,
    borderWidth: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    position: 'absolute',
    right: 30,
    top: 50,
    transform: [{ rotate: '20deg' }],
    zIndex: 10,
  },
  likeText: {
    color: '#3ECF8E',
    fontSize: 32,
    fontWeight: '900',
  },
  location: {
    color: '#666',
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginBottom: spacing.xs,
  },
  name: {
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  nopeIndicator: {
    borderColor: '#EF4444',
    borderRadius: 8,
    borderWidth: 4,
    left: 30,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    position: 'absolute',
    top: 50,
    transform: [{ rotate: '-20deg' }],
    zIndex: 10,
  },
  nopeText: {
    color: '#EF4444',
    fontSize: 32,
    fontWeight: '900',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  verifiedBadge: {
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 3,
    padding: 4,
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
});

export default SwipeCard;
