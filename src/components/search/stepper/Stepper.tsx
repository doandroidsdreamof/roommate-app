import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper';
import { createStyles } from './Stepper.styles';

// TODO decouple debounce
// TODO optimize this component it is terrible right now

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

  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const isMinDisabled = localValue <= min;
  const isMaxDisabled = localValue >= max;

  const handleDecrement = () => {
    const newValue = localValue - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = localValue + step;
    if (newValue <= max) {
      onChange(newValue);
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
        <Pressable
          onPress={handleDecrement}
          disabled={isMinDisabled}
          style={[styles.button, isMinDisabled && styles.buttonDisabled]}
          android_ripple={{ color: theme.colors.primary, radius: 20 }}
        >
          <Icon
            source="minus"
            size={20}
            color={
              isMinDisabled
                ? theme.colors.surfaceDisabled
                : theme.colors.onSurface
            }
          />
        </Pressable>

        <Text variant="titleMedium" style={styles.value}>
          {localValue}
        </Text>

        <Pressable
          onPress={handleIncrement}
          disabled={isMaxDisabled}
          style={[styles.button, isMaxDisabled && styles.buttonDisabled]}
          android_ripple={{ color: theme.colors.primary, radius: 20 }}
        >
          <Icon
            source="plus"
            size={20}
            color={
              isMaxDisabled
                ? theme.colors.surfaceDisabled
                : theme.colors.onSurface
            }
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Stepper;
