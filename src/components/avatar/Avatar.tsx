import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Avatar as PaperAvatar, Text } from 'react-native-paper';
import { styles } from './Avatar.styles';

interface AvatarProps {
  photoUrl?: string | null;
  name?: string;
  size?: number;
  showName?: boolean;
  containerStyle?: ViewStyle;
  nameVariant?: 'labelSmall' | 'labelMedium' | 'labelLarge';
}

const FALLBACK_AVATAR = require('../../../assets/images/fallback-avatar.png');

const Avatar = ({
  photoUrl,
  name,
  size = 90,
  showName = true,
  containerStyle,
  nameVariant = 'labelMedium',
}: AvatarProps) => {
  const avatarSource = photoUrl ? { uri: photoUrl } : FALLBACK_AVATAR;

  return (
    <View style={[styles.container, containerStyle]}>
      <PaperAvatar.Image size={size} source={avatarSource} />
      {showName && name && (
        <Text variant={nameVariant} style={styles.name}>
          {name}
        </Text>
      )}
    </View>
  );
};

export default Avatar;
