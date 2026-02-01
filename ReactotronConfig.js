import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
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

console.log('Reactotron Configured with SQLite');
