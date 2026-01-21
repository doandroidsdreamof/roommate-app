import React from 'react';
import { View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { createStyles } from './Stepper.styles';

interface StepperProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

const Stepper = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: StepperProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="bodyMedium" style={styles.label}>
          {label}
        </Text>
      )}
      <View style={styles.stepperContainer}>
        <IconButton
          icon="minus"
          size={20}
          onPress={handleDecrement}
          disabled={value <= min}
          style={styles.button}
        />
        <Text variant="titleMedium" style={styles.value}>
          {value}
        </Text>
        <IconButton
          icon="plus"
          size={20}
          onPress={handleIncrement}
          disabled={value >= max}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Stepper;
