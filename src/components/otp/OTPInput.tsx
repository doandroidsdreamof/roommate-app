import useCount from '@/hooks/useCount';
import React, { useRef } from 'react';
import {
  TextInput as RNTextInput,
  TextInputKeyPressEvent,
  View,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from './OTPInput.styles';

interface OTPInputProps {
  otp: string;
  otpError?: string;
  onOtpChange: (otp: string) => void;
  onSubmit: () => void;
  onResend: () => void;
}

const OTPInput = ({
  otp,
  otpError,
  onOtpChange,
  onSubmit,
  onResend,
}: OTPInputProps) => {
  const inputRefs = useRef<RNTextInput[]>([]);
  const digits = otp.padEnd(6, ' ').split('').slice(0, 6);
  const { formatTime, expiresIn } = useCount(300);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pastedDigits = text.slice(0, 6).split('');
      onOtpChange(pastedDigits.join(''));
      inputRefs.current[5]?.focus();
      return;
    }

    if (!/^\d*$/.test(text)) return;

    const newDigits = [...digits];
    newDigits[index] = text;
    onOtpChange(newDigits.join('').trim());

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
    if (e && e.nativeEvent.key === 'Backspace') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>We sent a code to your email</Text>
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

      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={otp.length !== 6}
        style={styles.button}
      >
        Verify OTP
      </Button>
      <Button mode="text" onPress={onResend} style={styles.resendButton}>
        Resend OTP
      </Button>
      <Text>OTP expires in {formatTime(expiresIn)} </Text>
    </View>
  );
};

export default OTPInput;
