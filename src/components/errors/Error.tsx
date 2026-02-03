import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { styles } from './Error.styles';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ErrorScreenProps {
  icon?: IconName;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  isLoading?: boolean;
}

const ErrorScreen = ({
  icon = 'alert-circle-outline',
  title,
  message,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  isLoading = false,
}: ErrorScreenProps) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={64}
        color={theme.colors.error}
      />
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.message}>
        {message}
      </Text>
      <View style={styles.actions}>
        {onAction && actionLabel && (
          <Button
            mode="contained"
            onPress={onAction}
            style={styles.button}
            disabled={isLoading}
            loading={isLoading}
          >
            {actionLabel}
          </Button>
        )}
        {onSecondaryAction && secondaryActionLabel && (
          <Button
            mode="outlined"
            onPress={onSecondaryAction}
            style={styles.button}
            disabled={isLoading}
          >
            {secondaryActionLabel}
          </Button>
        )}
      </View>
    </View>
  );
};

export default ErrorScreen;
