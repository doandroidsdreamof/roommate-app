import React, { ReactNode } from 'react';
import { View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { createStyles } from './ScreenLayout.styles';

interface ScreenLayoutProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ScreenLayout = ({
  children,
  scrollable = false,
  style,
}: ScreenLayoutProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, style]}>{children}</View>;
};

export default ScreenLayout;
