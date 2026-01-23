import {
  WebviewLeafletMessage,
  WebviewLeafletMessagePayload,
} from 'react-native-leaflet-view';
import { StyleProp, ViewStyle } from 'react-native';

export interface ExtendedPayload extends WebviewLeafletMessagePayload {
  coords?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  mapMarkerID?: string;
}

export interface WebviewLeafletMessageWithPayload extends Omit<
  WebviewLeafletMessage,
  'payload'
> {
  payload?: ExtendedPayload;
}

export interface MapLocation {
  latitude: number;
  longitude: number;
}

export interface MapMarker {
  id: string;
  position: MapLocation;
  title?: string;
  description?: string;
  icon?: string;
  iconSize?: [number, number];
}

export interface MapCircle {
  id: string;
  center: MapLocation;
  radius: number;
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
}

export interface MapProps {
  initialLocation?: MapLocation;
  initialZoom?: number;
  markers?: MapMarker[];
  circles?: MapCircle[];
  onMapPress?: (location: MapLocation) => void;
  onMarkerPress?: (markerId: string) => void;
  onMoveEnd?: (location: MapLocation, zoom: number) => void;
  showUserLocation?: boolean;
  userLocation?: MapLocation;
  style?: StyleProp<ViewStyle>;
}
