import { useColorScheme } from 'react-native';
import { useStore } from '@/store/index';

export const useThemeMode = () => {
  const systemColorScheme = useColorScheme();

  const themeMode = useStore((state) => state.themeMode);
  const setThemeMode = useStore((state) => state.setThemeMode);

  const isDarkMode =
    themeMode === 'system'
      ? systemColorScheme === 'dark'
      : themeMode === 'dark';

  const toggleDarkMode = () => {
    const newMode = isDarkMode ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  return {
    themeMode,
    setThemeMode,
    isDarkMode,
    toggleDarkMode,
  };
};
