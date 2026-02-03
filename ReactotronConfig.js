import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'Roommate App',
})
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    overlay: false,
  })
  .connect();

export const logSocket = (event, data) => {
  Reactotron.display({
    name: '🔌 Socket Event',
    preview: event,
    value: data,
    important: true,
  });
};

console.log('Reactotron Configured');
