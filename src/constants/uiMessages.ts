export interface LocationAlertStrings {
  serviceOff: { title: string; message: string; button: string };
  permissionDenied: { title: string; message: string };
  notFound: { title: string; message: string };
  error: { title: string; message: string };
}

export const LOCATION_MESSAGES: LocationAlertStrings = {
  serviceOff: {
    title: 'Konum Servisi Kapalı',
    message: 'Lütfen cihaz ayarlarından konum servisini açın',
    button: 'Tamam',
  },
  permissionDenied: {
    title: 'İzin Gerekli',
    message: 'Yakındaki ilanları görmek için konum erişimi gereklidir.',
  },
  notFound: {
    title: 'Adres Bulunamadı',
    message: 'Konum bilgisi alınamadı.',
  },
  error: {
    title: 'Konum Hatası',
    message: 'Konumunuz alınamadı. Lütfen tekrar deneyin.',
  },
};
