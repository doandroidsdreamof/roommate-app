import React, { useRef } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputKeyPressEvent,
  View,
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { spacing, typography } from '../theme/theme';

interface IOTPInput {
  email: string;
  otp: string;
  emailError?: string;
  otpError?: string;
  setEmail: (value: string) => void;
  setOtp: (value: string) => void;
}

export const OTPInput = ({
  email,
  otp,
  emailError,
  otpError,
  setEmail,
  setOtp,
}: IOTPInput) => {
  const inputRefs = useRef<RNTextInput[]>([]);
  const digits = otp.padEnd(6, ' ').split('').slice(0, 6);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pastedDigits = text.slice(0, 6).split('');
      setOtp(pastedDigits.join(''));
      inputRefs.current[5]?.focus();
      return;
    }

    if (!/^\d*$/.test(text)) return;

    const newDigits = [...digits];
    newDigits[index] = text;
    setOtp(newDigits.join('').trim());

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  console.log('ok');

  const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
    console.log('🚀 ~ e:', e.nativeEvent);
    if (e && e.nativeEvent.key === 'Backspace') {
      console.log('🚀 ~ digits:', digits);

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={!!emailError}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
      />
      {emailError && <Text style={styles.error}>{emailError}</Text>}

      <View style={styles.otpContainer}>
        {digits.map((digit, index) => (
          <RNTextInput
            key={index}
            ref={(ref) => {
              if (ref) {
                inputRefs.current[index] = ref;
              }
            }}
            value={digit.trim()}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={[styles.otpInput, otpError && styles.otpInputError]}
          />
        ))}
      </View>
      {otpError && <Text style={styles.error}>{otpError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  error: {
    ...typography.caption,
    color: '#EF4444',
    marginTop: spacing.xs,
  },
  otpContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  otpInput: {
    borderColor: '#3ECF8E',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    height: 56,
    textAlign: 'center',
  },
  otpInputError: {
    borderColor: '#EF4444',
  },
});

export default OTPInput;
