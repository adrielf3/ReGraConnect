import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import ligth from './themes/ligth';
import { AuthProvider } from './contexts/auth';
import { ProfileProvider } from './contexts/profile';
import { LoadingProvider } from './contexts/loading';

import Loading from './components/Loading';

import Routes from './routes';

const App: React.FC = () => {

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  useEffect(() => {

    // if (requestUserPermission) {
    //   // return fcm token for the device
    //   messaging().getToken().then(token => {
    //     console.log(token);
    //   });
    // } else {
    //   console.log("Failed Token Status", authStatus);
    // }

    Platform.OS !== 'ios' &&
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        // console.log('Message handled in the background!', remoteMessage);
      });

    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;

  }, []);


  useEffect(() => {
    SplashScreen.hide()
  })

  return (
    <NavigationContainer>
      <LoadingProvider>
        <AuthProvider>
          <ProfileProvider>
            <ThemeProvider theme={ligth}>
              <Routes />
              <Loading />
            </ThemeProvider>
          </ProfileProvider>
        </AuthProvider>
      </LoadingProvider>
    </NavigationContainer>
  );
};


export default App;
