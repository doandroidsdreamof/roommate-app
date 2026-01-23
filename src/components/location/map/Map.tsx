import { Asset } from 'expo-asset';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';
import { LeafletView, MapShapeType } from 'react-native-leaflet-view';
import { useTheme } from 'react-native-paper';
import { createStyles } from './Map.styles';
import type { MapProps, WebviewLeafletMessageWithPayload } from './types';

const Map = ({
  initialLocation,
  markers = [],
  circles = [],
  onMapPress,
  onMarkerPress,
  onMoveEnd,
  showUserLocation = true,
  userLocation,
  style,
}: MapProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [webViewContent, setWebViewContent] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const htmlPath = require('react-native-leaflet-view/android/src/main/assets/leaflet.html');
        const asset = Asset.fromModule(htmlPath);
        await asset.downloadAsync();

        if (!asset.localUri) {
          throw new Error('Failed to load asset');
        }

        const response = await fetch(asset.localUri);
        const htmlContent = await response.text();

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        console.error('Error loading Leaflet HTML:', error);
        Alert.alert('Map Error', 'Failed to load map. Please restart the app.');
      }
    };

    loadHtml().catch(console.error);

    return () => {
      isMounted = false;
    };
  }, []);

  const handleMessage = (message: WebviewLeafletMessageWithPayload) => {
    if (!message.event) return;

    const { event, payload } = message;

    switch (event) {
      case 'onMapClicked':
        if (onMapPress && payload?.coords) {
          onMapPress({
            latitude: payload.coords.lat,
            longitude: payload.coords.lng,
          });
        }
        break;

      case 'onMapMarkerClicked':
        if (onMarkerPress && payload?.mapMarkerID) {
          onMarkerPress(payload.mapMarkerID);
        }
        break;

      case 'onMoveEnd':
        if (onMoveEnd && payload?.coords && payload?.zoom) {
          onMoveEnd(
            {
              latitude: payload.coords.lat,
              longitude: payload.coords.lng,
            },
            payload.zoom
          );
        }
        break;

      default:
        break;
    }
  };

  const leafletMarkers = markers.map((marker) => ({
    id: marker.id,
    position: {
      lat: marker.position.latitude,
      lng: marker.position.longitude,
    },
    icon: marker.icon || '📍',
    size: marker.iconSize || [32, 32],
    title: marker.title,
  }));

  if (showUserLocation && userLocation) {
    leafletMarkers.push({
      id: 'user-location',
      position: {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      },
      icon: '🔵',
      size: [24, 24],
      title: 'Your Location',
    });
  }

  const leafletCircles = circles.map((circle) => ({
    shapeType: MapShapeType.CIRCLE,
    id: circle.id,
    center: {
      lat: circle.center.latitude,
      lng: circle.center.longitude,
    },
    radius: circle.radius,
    color: circle.color || theme.colors.primary,
    fillColor: circle.fillColor || theme.colors.primary,
    fillOpacity: circle.fillOpacity || 0.2,
  }));

  if (!webViewContent) {
    return (
      <View style={[styles.container, style, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <LeafletView
        source={{ html: webViewContent }}
        mapCenterPosition={
          initialLocation
            ? {
                lat: initialLocation.latitude,
                lng: initialLocation.longitude,
              }
            : undefined
        }
        zoomControl={true}
        mapMarkers={leafletMarkers}
        mapShapes={leafletCircles}
        onMessageReceived={handleMessage}
        doDebug={__DEV__}
        androidHardwareAccelerationDisabled={false}
      />
    </View>
  );
};

export default Map;
