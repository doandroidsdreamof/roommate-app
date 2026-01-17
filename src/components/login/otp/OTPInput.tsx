import { useCount } from '@/hooks/useCount';
import React, { useRef } from 'react';
import { Pressable, TextInput as RNTextInput, View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
import { styles } from './OTPInput.styles';

interface OTPInputProps {
  otp: string;
  otpError?: string;
  email: string;
  onOtpChange: (otp: string) => void;
  onSubmit: () => void;
  onResend: () => void;
  onBackToEmail: () => void;
}

const OTPInput = ({
  otp,
  otpError,
  email,
  onOtpChange,
  onSubmit,
  onResend,
  onBackToEmail,
}: OTPInputProps) => {
  const theme = useTheme();
  const hiddenInputRef = useRef<RNTextInput>(null);
  const digits = otp.padEnd(6, ' ').split('').slice(0, 6);
  const { formatTime, expiresIn, reset } = useCount(300);

  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 6);
    onOtpChange(cleaned);
  };

  const handleBoxPress = () => {
    hiddenInputRef.current?.focus();
  };

  const handleResend = () => {
    onResend();
    reset();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={onBackToEmail}
          iconColor={theme.colors.onSurface}
          style={styles.backButton}
        />
      </View>

      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        Doğrulama Kodu Girin
      </Text>

      <RNTextInput
        ref={hiddenInputRef}
        value={otp}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={6}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        autoFocus
        style={styles.hiddenInput}
      />

      <Pressable onPress={handleBoxPress}>
        <View style={styles.otpContainer}>
          {digits.map((digit, index) => (
            <View
              key={index}
              style={[
                styles.otpInput,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.outline,
                },
                otp.length === index && {
                  borderColor: theme.colors.primary,
                },
                otpError && {
                  borderColor: theme.colors.error,
                },
              ]}
            >
              <Text
                style={[styles.otpDigitText, { color: theme.colors.onSurface }]}
              >
                {digit.trim()}
              </Text>
            </View>
          ))}
        </View>
      </Pressable>
      {otpError && (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {otpError}
        </Text>
      )}
      <Button
        mode="contained"
        onPress={onSubmit}
        disabled={otp.length !== 6}
        style={styles.button}
      >
        Doğrula
      </Button>
      <Button
        mode="text"
        onPress={handleResend}
        disabled={expiresIn > 0}
        style={styles.resendButton}
      >
        Tekrar Gönder {expiresIn > 0 && `(${formatTime(expiresIn)})`}
      </Button>
      {expiresIn > 0 && (
        <Text
          style={[styles.timerText, { color: theme.colors.onSurfaceVariant }]}
        >
          Kod süresi dolacak: {formatTime(expiresIn)}
        </Text>
      )}
      <View>
        <View style={styles.emailDisplay}>
          <Text
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Kodu şu adrese gönderdik:
          </Text>
          <Text style={[styles.emailText, { color: theme.colors.onSurface }]}>
            {email}
          </Text>
          <Button
            mode="text"
            onPress={onBackToEmail}
            compact
            textColor={theme.colors.primary}
            style={styles.wrongEmailButton}
          >
            Yanlış e-posta?
          </Button>
        </View>
      </View>
    </View>
  );
};

export default OTPInput;
