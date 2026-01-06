import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { authApi } from './src/api';
import { OTPInput } from './src/components/Otp';
import { darkTheme, lightTheme } from './src/theme/theme';

export default function App() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState<string>();
  const [otpError, setOtpError] = useState<string>();

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handleSubmit = async () => {
    try {
      const response = await authApi.authenticate(email, otp);
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
      setOtpError('Invalid OTP');
    }
  };

  return (
    <PaperProvider theme={theme}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <OTPInput
          email={email}
          otp={otp}
          emailError={emailError}
          otpError={otpError}
          setEmail={setEmail}
          setOtp={setOtp}
        />

        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
