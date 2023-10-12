import React, {useState, useEffect} from 'react';
import {View, Platform, StatusBar,Modal, Text} from 'react-native';
import Toast from 'react-native-toast-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  modifyIsFirst,
  modifyNetInfo,
  setUser,
  
} from './src/redux/reducers/UserReducer';

import Auth from './src/Services';
import NetInfo from '@react-native-community/netinfo';
import {COLORS, FONTS, SIZES, lotties} from './src/constants';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AppStack, AuthStack} from './src/navigation';
import Onboarding from './src/screens/Onboarding';
import SplashScreen from './SplashScreen';
import { MenuProvider } from 'react-native-popup-menu';
import { RFValue } from 'react-native-responsive-fontsize';
import AnimatedLottieView from 'lottie-react-native';

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
  const {login, first} = useSelector(state => state.UserReducer);
  const {appLoading} = useSelector(state => state.AppReducer);
  const [loginChk, setloginChk] = useState(true);
  const [isNetworkConnect, setIsNetworkConnect] = useState(true);
  useEffect(() => {
   
    getUser();
    // setConnection()
    // getData()
    // dispatch(modifyIsFirst(true));
    NetInfo.addEventListener(state => {
      setIsNetworkConnect(!state.isInternetReachable);
      // if (state.isInternetReachable)
        // utils.toastAlert('success', 'Your internet connection was restored');
    
    });
  }, []);

  const getUser = async () => {
   
    let data = await Auth.getAccount();
    let isFirst = await Auth.getFirst();
    
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


  

  

  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <StatusBar backgroundColor={COLORS.primary} />
    //   <NavigationContainer>
    //     {first ? <ObBoardStack /> : login ? <AppStack /> : <AuthStack />}
    //   </NavigationContainer>
    //   <Toast />
    // </SafeAreaView>


<SafeAreaView style={{ flex: 1 }}>

<StatusBar translucent backgroundColor={COLORS.black}/>
<MenuProvider>
  <NavigationContainer>
    {/* {first ? <ObBoardStack /> : 
    */}
    
    { login ? 
     
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
