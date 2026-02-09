import { spacing } from '@/theme/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { MD3Theme } from 'react-native-paper';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.75;

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    amenitiesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    amenityItem: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.sm,
      paddingVertical: spacing.sm,
      width: '45%',
    },
    backButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      margin: 0,
    },
    bookMarkButton: {
      margin: 0,
      position: 'relative',
    },
    bottomBar: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.outline,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    contactButton: {
      borderRadius: 8,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
    },
    contactButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    content: {
      backgroundColor: theme.colors.background,
    },
    description: {
      color: theme.colors.onSurface,
      lineHeight: 24,
    },
    detailLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    detailRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    detailValue: {
      fontWeight: '600',
    },
    detailsGrid: {
      gap: spacing.md,
    },
    divider: {
      marginHorizontal: spacing.lg,
    },
    header: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      gap: 5,
      justifyContent: 'space-between',
      left: 0,
      paddingBottom: spacing.md,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xl + spacing.md,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 10,
    },
    headerActions: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    hostAvatar: {
      alignItems: 'center',
      borderRadius: 24,
      height: 48,
      justifyContent: 'center',
      width: 48,
    },
    hostDetails: {
      flex: 1,
    },
    hostInfo: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.md,
    },
    hostSubtitle: {
      color: theme.colors.onSurfaceVariant,
      marginTop: spacing.xs,
    },
    image: {
      height: IMAGE_HEIGHT,
      width: width,
    },
    imageGallery: {
      height: IMAGE_HEIGHT,
    },
    imageGalleryContainer: {
      height: IMAGE_HEIGHT,
      position: 'relative',
    },
    loadingContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    location: {
      color: theme.colors.onSurfaceVariant,
    },
    price: {
      fontWeight: '700',
    },
    priceContainer: {
      alignItems: 'baseline',
      flexDirection: 'row',
      gap: spacing.xs,
    },
    priceLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    quickInfoItem: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: spacing.xs,
    },
    quickInfoRow: {
      flexDirection: 'row',
      gap: spacing.lg,
    },
    quickInfoText: {
      color: theme.colors.onSurface,
    },
    section: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    },
    sectionTitle: {
      fontWeight: '600',
      marginBottom: spacing.md,
    },
    settingsButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      margin: 0,
    },
    title: {
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
  });
