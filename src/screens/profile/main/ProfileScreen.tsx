import MenuItem from '@/components/menu/MenuItem';
import Avatar from '@/components/primitives/avatar/Avatar';
import Loading from '@/components/primitives/loading/Loading';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useStore } from '@/store/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Divider, Switch, Text, useTheme } from 'react-native-paper';
import { styles } from './ProfileScreen.styles';

const ProfileScreen = () => {
  const theme = useTheme();
  const { logout } = useStore();
  const { isDarkMode, toggleDarkMode } = useThemeMode();
  const profile = useStore((state) => state.profile);
  const isProfileLoading = useStore((state) => state.isProfileLoading);

  if (isProfileLoading) {
    return <Loading size="large" />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar size={80} src={profile?.photoUrl} />
          <View style={styles.profileInfo}>
            <Text variant="headlineSmall">{profile?.name}</Text>

            {(profile?.city || profile?.district) && (
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
                  {[profile?.district, profile?.city]
                    .filter(Boolean)
                    .join(', ')}
                </Text>
              </View>
            )}

            {profile?.photoVerified && (
              <View style={styles.locationRow}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.primary, marginLeft: 4 }}
                >
                  Doğrulanmış
                </Text>
              </View>
            )}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Hesap Ayarları
        </Text>
        <Card style={styles.menuCard}>
          <MenuItem
            icon="account-edit"
            title="Profili Düzenle"
            onPress={() => {}}
          />
          <Divider />
          <MenuItem
            icon="bell-outline"
            title="Bildirimler"
            onPress={() => {}}
          />
          <Divider />
          <MenuItem icon="lock-outline" title="Gizlilik" onPress={() => {}} />
          <Divider />
          <MenuItem icon="cog-outline" title="Tercihler" onPress={() => {}} />
          <Divider />
          <View style={styles.darkModeItem}>
            <View style={styles.menuItemLeft}>
              <MaterialCommunityIcons
                name="theme-light-dark"
                size={24}
                color={theme.colors.onSurface}
              />
              <Text style={styles.menuItemText}>Karanlık Mod</Text>
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
          Destek
        </Text>
        <Card style={styles.menuCard}>
          <MenuItem
            icon="help-circle-outline"
            title="Yardım Merkezi"
            onPress={() => {}}
          />
          <Divider />
          <MenuItem
            icon="information-outline"
            title="Hakkında"
            onPress={() => {}}
          />
        </Card>
      </View>

      <View style={styles.section}>
        <Card style={styles.menuCard}>
          <MenuItem icon="logout" title="Çıkış Yap" onPress={logout} danger />
        </Card>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

export default ProfileScreen;
