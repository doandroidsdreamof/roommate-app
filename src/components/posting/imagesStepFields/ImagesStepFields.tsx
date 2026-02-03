import React from 'react';
import { Image, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { styles } from './ImagesStepFields.styles';

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
            style={styles.removeButton}
            iconColor="#fff"
          />
        </View>
      ) : (
        <Button
          mode="outlined"
          icon="camera"
          onPress={pickCoverImage}
          style={styles.pickButton}
        >
          Kapak Fotoğrafı Seç
        </Button>
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
              style={styles.removeButtonSmall}
              iconColor="#fff"
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
