import React from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { styles } from './EmailInput.styles';

interface EmailInputProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
  error?: boolean;
}

const EmailInput = ({
  email,
  isDisabled,
  onEmailChange,
  onSubmit,
  error,
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
        error={error}
      />
      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={isDisabled}
        style={styles.button}
      >
        Doğrulama kodu gönder
      </Button>
    </View>
  );
};

export default EmailInput;
