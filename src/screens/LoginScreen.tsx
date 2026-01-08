import { authApi } from '@/api';
import EmailInput from '@/components/EmailInput';
import OTPInput from '@/components/otp/OTPInput';
import useDebounce from '@/hooks/useDebounce';
import useValidation from '@/hooks/useValidation';
import { emailSchema, otpSchema } from '@/schemas/formShema';
import { secureStorage } from '@/storage/storage';
import { useAuthStore } from '@/store/authStore';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type LoginStep = 'email' | 'otp';

const LoginScreen = () => {
  const [step, setStep] = useState<LoginStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  console.log('🚀 ~ secureStorage==========>:', secureStorage.getAccessToken());

  const emailValidation = useValidation(emailSchema);
  const otpValidation = useValidation(otpSchema);
  const login = useAuthStore((state) => state.login);

  const validateEmail = useDebounce((value: string) => {
    emailValidation.validate({ email: value });
  }, 200);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateEmail(value);
  };

  const emailSubmit = async () => {
    const result = emailValidation.validate({ email });
    if (!result) return;

    try {
      const response = await authApi.requestOTP(email);
      if (response?.success) {
        setStep('otp');
      }
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  const handleVerifyOTP = async () => {
    const result = otpValidation.validate({ otp });
    if (!result) return;

    try {
      const response = await authApi.authenticate(email, otp);

      // Save tokens and update auth state
      const { accessToken, refreshToken } = response.data;
      console.log('🚀 ~ response.data==========>:', response.data);
      await login(accessToken, refreshToken);

      // Navigation happens automatically in RootNavigator
      console.log('✅ Login successful');
    } catch (error) {
      console.log('🚀 ~ error:', error);
    }
  };

  const handleResendOTP = async () => {
    setOtp('');
    await emailSubmit();
  };

  return (
    <View style={styles.container}>
      {step === 'email' ? (
        <EmailInput
          email={email}
          isDisabled={!email || !!emailValidation.errors}
          onEmailChange={handleEmailChange}
          onSubmit={emailSubmit}
        />
      ) : (
        <OTPInput
          otp={otp}
          otpError={otpValidation.errors?.[0]?.message}
          onOtpChange={setOtp}
          onSubmit={handleVerifyOTP}
          onResend={handleResendOTP}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;
