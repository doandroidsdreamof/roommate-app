import { LocationData } from '@/components/location/locationPicker/LocationPicker';
import { LOCATION_MESSAGES } from '@/constants/uiMessages';
import * as Location from 'expo-location';
import { useCallback, useState } from 'react';

type AlertButtonStyle = 'default' | 'cancel' | 'destructive';

// TODO migrate alert to toast

type AlertFn = (
  title: string,
  message?: string,
  buttons?: {
    text?: string;
    onPress?: () => void;
    style?: AlertButtonStyle;
  }[]
) => void;

interface LocationSettings {
  lastKnownMaxAge: number;
  requiredAccuracy: number;
  fallbackAccuracy: Location.Accuracy;
  timeInterval: number;
  distanceInterval: number;
}

export const useLocation = ({
  lastKnownMaxAge,
  requiredAccuracy,
  fallbackAccuracy,
  distanceInterval,
  timeInterval,
}: LocationSettings) => {
  const [isLoading, setIsLoading] = useState(false);

  const checkLocationPermissions = async (
    showAlert: AlertFn
  ): Promise<boolean> => {
    const enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      const { serviceOff } = LOCATION_MESSAGES;
      showAlert(serviceOff.title, serviceOff.message, [
        { text: serviceOff.button },
      ]);
      setIsLoading(false);
      return false;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      const { permissionDenied } = LOCATION_MESSAGES;
      showAlert(permissionDenied.title, permissionDenied.message);
      setIsLoading(false);
      return false;
    }

    return true;
  };

  const fetchRawLocation =
    useCallback(async (): Promise<Location.LocationObject | null> => {
      let location = await Location.getLastKnownPositionAsync({
        maxAge: lastKnownMaxAge,
        requiredAccuracy: requiredAccuracy,
      });

      if (!location) {
        location = await Location.getCurrentPositionAsync({
          accuracy: fallbackAccuracy,
          timeInterval: timeInterval,
          distanceInterval: distanceInterval,
        });
      }
      return location;
    }, [
      distanceInterval,
      fallbackAccuracy,
      lastKnownMaxAge,
      requiredAccuracy,
      timeInterval,
    ]);

  const reverseGeocode = async (
    latitude: number,
    longitude: number
  ): Promise<LocationData | null> => {
    const addresses = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (addresses.length > 0) {
      const address = addresses[0];
      return {
        province: address.region || undefined,
        district: address.subregion || address.district || undefined,
        latitude,
        longitude,
      };
    }
    return null;
  };

  const handleLocation = useCallback(
    async (showAlert: AlertFn, onSuccess: (data: LocationData) => void) => {
      setIsLoading(true);
      try {
        const hasPermission = await checkLocationPermissions(showAlert);
        if (!hasPermission) return;

        const rawLocation = await fetchRawLocation();
        if (!rawLocation) {
          const { notFound } = LOCATION_MESSAGES;
          showAlert(notFound.title, notFound.message);
          return;
        }

        const locationData = await reverseGeocode(
          rawLocation.coords.latitude,
          rawLocation.coords.longitude
        );

        if (locationData) {
          onSuccess(locationData);
        } else {
          const { notFound } = LOCATION_MESSAGES;
          showAlert(notFound.title, notFound.message);
        }
      } catch (error) {
        console.error('Location Hook Error:', error);
        const { error: errorStrings } = LOCATION_MESSAGES;
        showAlert(errorStrings.title, errorStrings.message);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchRawLocation]
  );

  return {
    isLoading,
    reverseGeocode,
    checkLocationPermissions,
    fetchRawLocation,
    handleLocation,
  };
};
