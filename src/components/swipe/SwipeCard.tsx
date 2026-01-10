import { StyleSheet, View, Image, Dimensions } from 'react-native';
import React from 'react';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FeedItem } from '@/schemas/feedSchema';
import { spacing, borderRadius, shadows } from '@/theme/theme';
import ProfileBadge from './ProfileBadge';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.75;

interface SwipeCardProps {
  profile: FeedItem;
}

const SwipeCard = ({ profile }: SwipeCardProps) => {
  const theme = useTheme();

  return (
    <Card style={[styles.card, shadows.lg]}>
      {profile.photoUrl && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: profile.photoUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          {profile.photoVerified && (
            <View style={[styles.verifiedBadge, shadows.sm]}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={20}
                color={theme.colors.secondary}
              />
            </View>
          )}
        </View>
      )}
      <View style={styles.content}>
        <Text
          variant="headlineMedium"
          style={[styles.name, { color: theme.colors.onSurface }]}
        >
          {profile.name}, {profile.ageRange}
        </Text>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="map-marker"
            size={18}
            color={theme.colors.outline}
          />
          <Text
            variant="bodyMedium"
            style={[styles.infoText, { color: theme.colors.onSurfaceVariant }]}
          >
            {profile.district}, {profile.city}
          </Text>
        </View>

        {profile.budgetMin && profile.budgetMax && (
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="currency-try"
              size={18}
              color={theme.colors.outline}
            />
            <Text
              variant="bodyMedium"
              style={[
                styles.infoText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {profile.budgetMin.toLocaleString()} -{' '}
              {profile.budgetMax.toLocaleString()} ₺
            </Text>
          </View>
        )}

        <ProfileBadge profile={profile} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: borderRadius.xl,
    height: CARD_HEIGHT,
    marginTop: 'auto',
    overflow: 'hidden',
    width: CARD_WIDTH,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  image: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
  imageContainer: {
    height: CARD_HEIGHT * 0.65,
    width: '100%',
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  verifiedBadge: {
    backgroundColor: 'white',
    borderRadius: borderRadius.full,
    padding: 6,
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
});

export default SwipeCard;
