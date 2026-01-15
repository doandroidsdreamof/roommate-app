import { authApi } from '@/api';
import EmailInput from '@/components/loginModule/emailInput/EmailInput';
import OTPInput from '@/components/loginModule/otp/OTPInput';
import { LoginSchema, loginSchema } from '@/schemas/loginSchema';
import { useStore } from '@/store/index';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

type LoginStep = 'email' | 'otp';

const LoginScreen = () => {
  const [step, setStep] = useState<LoginStep>('email');
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      stepOne: { email: '' },
      stepTwo: { otp: '' },
    },
  });
  const login = useStore((state) => state.login);
  const email = watch('stepOne.email');
  const isEmailValid = email && !errors.stepOne?.email;

  const requestOTP = async () => {
    const email = getValues('stepOne.email');

    try {
      const response = await authApi.requestOTP(email);
      if (response?.success) setStep('otp');
    } catch (error) {
      console.error('OTP request error:', error);
    }
  };

  const onEmailSubmit = async () => {
    const isValid = await trigger('stepOne');
    if (isValid) {
      await requestOTP();
    }
  };

  const onOTPSubmit = async (data: LoginSchema) => {
    const email = getValues('stepOne.email');

    try {
      const response = await authApi.authenticate(email, data.stepTwo.otp);
      const { accessToken, refreshToken } = response.data;
      await login(accessToken, refreshToken);
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={{ display: step === 'email' ? 'flex' : 'none' }}>
          <Controller
            control={control}
            name="stepOne.email"
            render={({ field: { onChange, value } }) => (
              <EmailInput
                email={value}
                onEmailChange={onChange}
                onSubmit={onEmailSubmit}
                isDisabled={!isEmailValid || isSubmitting}
                error={!!errors.stepOne?.email}
              />
            )}
          />
        </View>

        <View style={{ display: step === 'otp' ? 'flex' : 'none' }}>
          <Controller
            control={control}
            name="stepTwo.otp"
            render={({ field: { onChange, value } }) => (
              <OTPInput
                otp={value}
                onOtpChange={onChange}
                onSubmit={handleSubmit(onOTPSubmit)}
                onResend={requestOTP}
                otpError={errors.stepTwo?.otp?.message}
              />
            )}
          />
        </View>
      </View>
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
