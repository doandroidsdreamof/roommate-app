import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { spacing } from '../theme/theme';

interface EmailInputProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

const EmailInput = ({
  email,
  isDisabled,
  onEmailChange,
  onSubmit,
}: EmailInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
      />
      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={isDisabled}
        style={styles.button}
      >
        <Text>Send OTP</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    marginTop: spacing.md,
  },
  container: {
    padding: spacing.md,
  },
});

export default EmailInput;
