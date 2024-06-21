import * as React from 'react';
import RNNotificationCall from 'react-native-full-screen-notification-incoming-call';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import randomUuid from 'uuid-random';
import BackgroundTimer from 'react-native-background-timer';
import { useNavigation } from '@react-navigation/native';
import { CallKeepService } from '../services/CallKeepService';
import RNCallKeep from 'react-native-callkeep';
import { PermissionsAndroid } from 'react-native';


CallKeepService.instance().setupCallKeep();

export default function Home() {
  const navigation = useNavigation();

  const checkAndRequestPostNotificationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const currentStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        if (currentStatus) {
          console.log('Post notifications permission already granted');
          return true;
        } else {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Post notifications permission granted');
            return true;
          } else {
            console.log('Post notifications permission denied');
            return false;
          }
        }
      } catch (error) {
        console.error('Failed to check/request POST_NOTIFICATIONS permission', error);
        return false;
      }
    } else {
      console.log('Post notifications permission not required for this platform or version');
      return true;
    }
  };

 

  React.useEffect(() => {
    const initialize = async () => {
      await checkAndRequestPostNotificationPermission();
    };

    initialize();
  }, []);

  CallKeepService.navigation = navigation;

  const display = () => {
    BackgroundTimer.setTimeout(() => {
      const uuid = randomUuid();
      CallKeepService.instance().displayCall(uuid);
    }, 3000);
  };

  const onHide = () => {
    RNNotificationCall.hideNotification();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detail')}
      >
        <Text>Go to detail</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={display}
      >
        <Text>Display</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginTop: 15 }]}
        onPress={onHide}
      >
        <Text>Hide</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
});
