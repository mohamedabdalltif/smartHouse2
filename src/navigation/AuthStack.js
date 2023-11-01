import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
// import {AuthMain} from '../screens/authScreens';


import {  Faq, ForgetPassword, Login, SeconedStepVerify, RegisterSuccess, Signup, SetupHome, Country, SignInHome} 
from '../screens/authScreens';
import NewPassword from '../screens/authScreens/NewPassword';
import { AdminContinueSign } from '../screens/appScreens';



const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    // <Stack.Navigator
    //   screenOptions={{
    //     gestureDirection: 'horizontal',
    //     ...TransitionPresets.SlideFromRightIOS,
    //     headerShown: false,
    //   }}
    //   initialRouteName="AuthMain">
    //   <Stack.Screen name="AuthMain" component={AuthMain} />
    // </Stack.Navigator>
     <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="SignInHome"
      >
      <Stack.Screen name="SignInHome" component={SignInHome} />
      <Stack.Screen name="AdminContinueSign" component={AdminContinueSign} />

       {/* <Stack.Screen name="Login" component={Login} />
      
     <Stack.Screen name="SeconedStepVerify" component={SeconedStepVerify} />
     <Stack.Screen name="Faq" component={Faq} />
       <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
      <Stack.Screen name="SetupHome" component={SetupHome} />
      <Stack.Screen name="Country" component={Country} /> */}

 

     
    </Stack.Navigator>
  );
};

export default AuthStack;
