import ProfileBadge from '@/components/swipe/ProfileBadge';
import { FeedItem } from '@/schemas/feedSchema';
import { shadows } from '@/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { createStyles } from './SwipeCard.styles';

interface SwipeCardProps {
  profile: FeedItem;
}

const SwipeCard = ({ profile }: SwipeCardProps) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
        <Text variant="headlineMedium" style={styles.name}>
          {profile.name}, {profile.ageRange}
        </Text>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons
            name="map-marker"
            size={18}
            color={theme.colors.onSurfaceVariant}
          />
          <Text variant="bodyMedium" style={styles.infoText}>
            {profile.district}, {profile.city}
          </Text>
        </View>

        {profile.budgetMin && profile.budgetMax && (
          <View style={styles.infoRow}>
            <Text variant="bodyMedium" style={styles.infoText}>
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

export default SwipeCard;
