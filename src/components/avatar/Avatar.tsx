import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Avatar as PaperAvatar, Text } from 'react-native-paper';
import { styles } from './Avatar.styles';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
  showName?: boolean;
  containerStyle?: ViewStyle;
  nameVariant?: 'labelSmall' | 'labelMedium' | 'labelLarge';
}

const FALLBACK_AVATAR = require('../../../assets/images/fallback-avatar.png');

const Avatar = ({
  src,
  name,
  size = 90,
  showName = true,
  containerStyle,
  nameVariant = 'labelMedium',
}: AvatarProps) => {
  const avatarSource = src ? { uri: src } : FALLBACK_AVATAR;

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
