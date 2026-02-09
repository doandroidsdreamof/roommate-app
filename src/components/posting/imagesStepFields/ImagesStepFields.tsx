import React from 'react';
import { Image, View } from 'react-native';
import { Button, HelperText, IconButton, Text, useTheme } from 'react-native-paper';
import { styles } from './ImagesStepFields.styles';
import { useFormContext } from 'react-hook-form';

interface ImagesStepFieldsProps {
  coverImage: string | null;
  additionalImages: string[];
  pickCoverImage: () => void;
  pickAdditionalImages: () => void;
  removeAdditionalImage: (index: number) => void;
  removeCoverImage: () => void;
}

const ImagesStepFields = ({
  coverImage,
  additionalImages,
  pickCoverImage,
  pickAdditionalImages,
  removeAdditionalImage,
  removeCoverImage,
}: ImagesStepFieldsProps) => {
  const theme = useTheme();
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <View style={styles.container}>
      <Text variant="labelLarge" style={styles.label}>
        Kapak Fotoğrafı *
      </Text>
      {coverImage ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: coverImage }} style={styles.image} />
          <IconButton
            icon="close"
            size={20}
            onPress={removeCoverImage}
            containerColor="rgba(0, 0, 0, 0.6)"
            iconColor={theme.colors.onPrimary}
            style={styles.removeButton}
          />
        </View>
      ) : (
        <View>
          <Button
            mode="outlined"
            icon="camera"
            onPress={pickCoverImage}
            style={styles.pickButton}
          >
            Kapak Fotoğrafı Seç
          </Button>
          <HelperText type="error" visible={!!errors.coverImageUrl}>
            {typeof errors?.coverImageUrl?.message === 'string'
              ? errors?.coverImageUrl?.message
              : 'Kapak fotoğrafı zorunludur'}
          </HelperText>
        </View>
      )}

      <Text variant="labelLarge" style={styles.label}>
        Ek Fotoğraflar ({additionalImages.length}/5)
      </Text>
      <Text variant="bodySmall" style={styles.helperText}>
        Opsiyonel
      </Text>

      <View style={styles.imagesGrid}>
        {additionalImages.map((uri, index) => (
          <View key={index} style={styles.thumbnailContainer}>
            <Image source={{ uri }} style={styles.thumbnailImage} />
            <IconButton
              icon="close"
              size={16}
              onPress={() => removeAdditionalImage(index)}
              containerColor="rgba(0, 0, 0, 0.6)"
              iconColor={theme.colors.onPrimary}
              style={styles.removeButtonSmall}
            />
          </View>
        ))}
        {additionalImages.length < 5 && (
          <Button
            mode="outlined"
            icon="plus"
            onPress={pickAdditionalImages}
            style={styles.addButton}
            contentStyle={styles.addButtonContent}
          >
            Ekle
          </Button>
        )}
      </View>
    </View>
  );
};

export default ImagesStepFields;