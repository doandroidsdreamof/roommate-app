import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileSetupScreen from '@/screens/profileSetupScreen/ProfileSetupScreen';

const Stack = createNativeStackNavigator();

const ProfileSetupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
    </Stack.Navigator>
  );
};

export default ProfileSetupNavigator;
