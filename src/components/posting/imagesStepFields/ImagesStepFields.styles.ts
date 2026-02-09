import { spacing, borderRadius } from '@/theme/theme';
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
    display: 'flex',
    gap: spacing.md,
    width: '100%',
  },
  helperText: {
    marginBottom: spacing.sm,
    opacity: 0.7,
  },
  image: {
    borderRadius: borderRadius.md,
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
    position: 'absolute',
    right: spacing.xs,
    top: spacing.xs,
  },
  removeButtonSmall: {
    position: 'absolute',
    right: -spacing.xs,
    top: -spacing.xs,
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnailImage: {
    borderRadius: borderRadius.md,
    height: 100,
    width: 100,
  },
});
