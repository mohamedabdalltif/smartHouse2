import React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import BottomTab from './BottomTab';

import {createStackNavigator} from '@react-navigation/stack';
import { AcRemote, AddDevices, AddDevicesType, AddSensors, AddSwitches, CreateUser, EditDevice, EditSensor, EditSwitch, Events, Noti, Profile, RoomDeatils, Settings, SubDevices, SubUser, TvRemote } from '../screens/appScreens';
import EditUser from '../screens/appScreens/EditUser';
import EditUserRoom from '../screens/appScreens/EditUser/EditUserRoom';
import EditRoomDevices from '../screens/appScreens/EditUser/EditRoomDevices';

 
// import RoomDeatils from '../screens/appScreens/RoomDeatils/RoomDeatils';
// import Statistics from '../screens/appScreens/Statistec/Statistics'

// import Profile from '../screens/appScreens/Profile/Profile'

// import Notefication from '../screens/appScreens/Noti/Notefication'



 const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}
      initialRouteName="MainStack">
      <Stack.Screen name="MainStack" component={BottomTab} />
      <Stack.Screen name="RoomDeatils" component={RoomDeatils} />
      <Stack.Screen name="Statistics" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Noti" component={Noti} />
      <Stack.Screen name="AddDevicesType" component={AddDevicesType} />
      <Stack.Screen name="AddSwitches" component={AddSwitches} />
      <Stack.Screen name="EditSwitch" component={EditSwitch} />
      <Stack.Screen name="AddSensors" component={AddSensors} />
      <Stack.Screen name="EditSensor" component={EditSensor} />
      <Stack.Screen name="AddDevices" component={AddDevices} />
      <Stack.Screen name="EditDevice" component={EditDevice} />
      <Stack.Screen name="TvRemote" component={TvRemote} />
      <Stack.Screen name="AcRemote" component={AcRemote} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="EditUser" component={EditUser} />
      <Stack.Screen name="EditUserRoom" component={EditUserRoom} />
      <Stack.Screen name="EditRoomDevices" component={EditRoomDevices} />
      <Stack.Screen name="SubUser" component={SubUser} />
      <Stack.Screen name="SubDevices" component={SubDevices} />
      <Stack.Screen name="Events" component={Events} />



      {/* <Stack.Screen name="MyShipments" component={MyShipments} />
      <Stack.Screen name="Mytrips" component={Mytrips} />
      <Stack.Screen name="ShipmentDetails" component={ShipmentDetails} />
      <Stack.Screen name="AddShipment" component={AddShipment} />
      <Stack.Screen name="AddTrip" component={AddTrip} />
      <Stack.Screen name="Chat" component={Chat} /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
