import MenuItem from '@/components/menu/MenuItem';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useStore } from '@/store/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Avatar,
  Card,
  Divider,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import { styles } from './ProfileScreen.styles';

const ProfileScreen = () => {
  const theme = useTheme();
  const { logout } = useStore();
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const profile = {
    name: null,
    photoUrl: null,
    email: null,
    city: null,
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Image
            size={80}
            source={{
              uri: profile?.photoUrl || 'https://via.placeholder.com/150',
            }}
          />
          <View style={styles.profileInfo}>
            <Text variant="headlineSmall" style={styles.profileName}>
              {profile?.name || 'Guest User'}
            </Text>
            {profile?.email && (
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.secondary }}
              >
                {profile.email}
              </Text>
            )}
            {profile?.city && (
              <View style={styles.locationRow}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={16}
                  color={theme.colors.secondary}
                />
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.secondary, marginLeft: 4 }}
                >
                  {profile.city}
                </Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Account Settings
        </Text>
        <Card style={styles.menuCard}>
          <MenuItem
            icon="account-edit"
            title="Edit Profile"
            onPress={() => console.log('Edit Profile')}
          />
          <Divider />
          <MenuItem
            icon="bell-outline"
            title="Notifications"
            onPress={() => console.log('Notifications')}
          />
          <Divider />
          <MenuItem
            icon="lock-outline"
            title="Privacy"
            onPress={() => console.log('Privacy')}
          />
          <Divider />
          <MenuItem
            icon="cog-outline"
            title="Preferences"
            onPress={() => console.log('Preferences')}
          />
          <Divider />
          <View style={styles.darkModeItem}>
            <View style={styles.menuItemLeft}>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color={theme.colors.onSurface}
              />
              <Text style={styles.menuItemText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              color={theme.colors.primary}
            />
          </View>
        </Card>
      </View>
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Support
        </Text>
        <Card style={styles.menuCard}>
          <MenuItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => console.log('Help')}
          />
          <Divider />
          <MenuItem
            icon="information-outline"
            title="About"
            onPress={() => console.log('About')}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Card style={styles.menuCard}>
          <MenuItem
            icon="logout"
            title="Logout"
            onPress={handleLogout} 
            danger
          />
        </Card>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default ProfileScreen;
