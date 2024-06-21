
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './src/App';
import CustomIncomingCall from './src/CustomIncomingCall';


AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
AppRegistry.registerComponent(appName, () => App);
