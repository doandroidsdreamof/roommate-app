import { spacing } from '@/theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addButton: {
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  addButtonContent: {
    height: 100,
  },
  container: {
    gap: spacing.md,
  },
  helperText: {
    marginBottom: spacing.sm,
    opacity: 0.7,
  },
  image: {
    borderRadius: spacing.sm,
    height: 200,
    width: '100%',
  },
  imageContainer: {
    marginBottom: spacing.md,
    position: 'relative',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  label: {
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  pickButton: {
    marginBottom: spacing.md,
  },
  removeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    right: spacing.xs,
    top: spacing.xs,
  },
  removeButtonSmall: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    right: -spacing.xs,
    top: -spacing.xs,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnailImage: {
    borderRadius: spacing.sm,
    height: 100,
    width: 100,
  },
});