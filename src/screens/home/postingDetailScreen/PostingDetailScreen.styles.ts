import { StyleSheet, Dimensions } from 'react-native';
import { MD3Theme } from 'react-native-paper';
import { spacing } from '@/theme/theme';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.75;

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageGalleryContainer: {
      position: 'relative',
      height: IMAGE_HEIGHT,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      gap: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xl + spacing.md,
      paddingBottom: spacing.md,
    },
    backButton: {
      backgroundColor: theme.colors.surface,
      margin: 0,
    },
    bookMarkButton: {
      margin: 0,
      position: 'relative',
    },
    headerActions: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    imageGallery: {
      height: IMAGE_HEIGHT,
    },
    image: {
      width: width,
      height: IMAGE_HEIGHT,
    },
    content: {
      backgroundColor: theme.colors.background,
    },
    section: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
    },
    divider: {
      marginHorizontal: spacing.lg,
    },
    title: {
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    location: {
      color: theme.colors.onSurfaceVariant,
    },
    quickInfoRow: {
      flexDirection: 'row',
      gap: spacing.lg,
    },
    quickInfoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    quickInfoText: {
      color: theme.colors.onSurface,
    },
    hostInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    hostAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    hostDetails: {
      flex: 1,
    },
    hostSubtitle: {
      color: theme.colors.onSurfaceVariant,
      marginTop: spacing.xs,
    },
    sectionTitle: {
      fontWeight: '600',
      marginBottom: spacing.md,
    },
    description: {
      lineHeight: 24,
      color: theme.colors.onSurface,
    },
    amenitiesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
    },
    amenityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      width: '45%',
      paddingVertical: spacing.sm,
    },
    detailsGrid: {
      gap: spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    detailValue: {
      fontWeight: '600',
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: spacing.xs,
    },
    price: {
      fontWeight: '700',
    },
    priceLabel: {
      color: theme.colors.onSurfaceVariant,
    },
    contactButton: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      borderRadius: 8,
    },
    contactButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });
