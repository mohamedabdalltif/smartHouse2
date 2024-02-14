import React, { useState, useEffect, useRef } from 'react';
import { View, Platform, StatusBar, Modal, Text, AppState, Appearance, LogBox, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  modifyIsFirst,
  modifyNetInfo,
  setUser,

} from './src/redux/reducers/UserReducer';

import Auth from './src/Services';
import NetInfo from '@react-native-community/netinfo';
import { COLORS, FONTS, SIZES, lotties } from './src/constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AppStack, AuthStack } from './src/navigation';
import Onboarding from './src/screens/Onboarding';
import SplashScreen from './SplashScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimatedLottieView from 'lottie-react-native';
// import BackgroundTimer from 'react-native-background-timer';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import axios from 'axios';
// import notifee from '@notifee/react-native';
// import BackgroundService from 'react-native-background-actions';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const ObBoardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};



const App = () => {
  const dispatch = useDispatch();
  const { login, first } = useSelector(state => state.UserReducer);
  const { appLoading } = useSelector(state => state.AppReducer);
  const [loginChk, setloginChk] = useState(true);
  const [isNetworkConnect, setIsNetworkConnect] = useState(true);
  // const appState = useRef(AppState.currentState);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(async () => {





    requestUserPermission();

    notifee.requestPermission();


    // await BackgroundService.updateNotification({taskDesc: 'momo'}); 

    getUser();
    RefreshServer()
    // setConnection()
    // getData()
    // dispatch(modifyIsFirst(true));
    NetInfo.addEventListener(state => {
      setIsNetworkConnect(!state.isInternetReachable);
      // if (state. )
      // utils.toastAlert('success', 'Your internet connection was restored');

    });
    Appearance.setColorScheme('light')
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      DisplayNotification(remoteMessage);
    });
    return unsubscribe;



  }, []);
  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default-inner',
      name: 'Default Channel inner',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
      },
    });
  }
  const getUser = async () => {

    let data = await Auth.getAccount();
    let isFirst = await Auth.getFirst();
    // data=null
    // isFirst="1"
    if (isFirst != '1') {
      dispatch(modifyIsFirst(true));
    }
    if (data != null) {
      dispatch(setUser(data));
    }


    setTimeout(() => {
      setloginChk(false);
    }, 2300);
  };

  if (loginChk) {
    return <SplashScreen />;
  }


  function RefreshServer() {
    axios.get(`https://mqtt-liart.vercel.app`).then((res) => {
      // console.log(res)
    })
  }




  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <StatusBar backgroundColor={COLORS.primary} />
    //   <NavigationContainer>
    //     {first ? <ObBoardStack /> : login ? <AppStack /> : <AuthStack />}
    //   </NavigationContainer>
    //   <Toast />
    // </SafeAreaView>


    <SafeAreaView style={{ flex: 1 }}>

      <StatusBar translucent backgroundColor={COLORS.black} />
      <MenuProvider>
        <NavigationContainer>
          {/* {first ? <ObBoardStack /> : 
    */}

          {login ?

            <>

              <AppStack />

            </>

            : <AuthStack />
          }
        </NavigationContainer>
        <Toast />
      </MenuProvider>
      {/* <Modal transparent visible={isNetworkConnect}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                backgroundColor: COLORS.white,
                paddingHorizontal: RFValue(20),
                paddingVertical: RFValue(30),
                borderRadius: RFValue(30),
                elevation: RFValue(20),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AnimatedLottieView
                source={lotties.NoWifi}
                loop
                autoPlay
                style={{
                  width: RFValue(200),
                  height: RFValue(200),
                  alignSelf: 'center',
                  marginBottom: SIZES.margin,
                 
                }}
                
                resizeMode="contain"
              />
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.black,
                }}>
                Check Your internet Connection
              </Text>
            </View>
          </View>
        </Modal> */}


    </SafeAreaView>



  );
};

export default App;
