import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { FeedItem } from '@/schemas/feedSchema';
import { spacing } from '@/theme/theme';

interface BadgeConfig {
  icon: string;
  value: string;
  show: boolean;
}

interface ProfileBadgeProps {
  profile: FeedItem;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({ profile }) => {
  const badges: BadgeConfig[] = [
    {
      icon: 'smoking',
      value: profile.smokingHabit || '',
      show: Boolean(profile.smokingHabit && profile.smokingHabit !== 'no'),
    },
    {
      icon: 'paw',
      value: profile.petOwnership || '',
      show: Boolean(profile.petOwnership && profile.petOwnership !== 'none'),
    },
    {
      icon: 'glass-wine',
      value: profile.alcoholConsumption || '',
      show: Boolean(profile.alcoholConsumption),
    },
  ];

  const visibleBadges = badges.filter((badge) => badge.show);

  if (visibleBadges.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {visibleBadges.map((badge, index) => (
        <Chip
          key={`${badge.icon}-${index}`}
          icon={badge.icon}
          compact
          style={styles.chip}
          textStyle={styles.chipText}
        >
          {badge.value}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#f0f0f0',
    height: 32,
  },
  chipText: {
    fontSize: 12,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
});

export default ProfileBadge;
