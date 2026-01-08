import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/themeStore';

export const useThemeMode = () => {
  const systemColorScheme = useColorScheme();
  const { themeMode, setThemeMode } = useThemeStore();

  const isDarkMode =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
      : themeMode === 'dark';

  const toggleDarkMode = async () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    await setThemeMode(newMode);
  };

  return {
    themeMode,
    setThemeMode,
    isDarkMode,
    toggleDarkMode,
  };
};
