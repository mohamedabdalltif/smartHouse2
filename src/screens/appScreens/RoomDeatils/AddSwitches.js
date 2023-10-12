import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  UIManager,
  LayoutAnimation,
  Modal,
  ActivityIndicator,
  StatusBar,
  Image,
  Linking,
  Alert,
  TextInput,
  Button,
  SafeAreaView,
  PermissionsAndroid,
  ScrollView
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

import LottieView from 'lottie-react-native';
// import {Image} from 'react-native-animatable';

import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwitchToggle from 'react-native-switch-toggle';
import moment from 'moment';
import { FormInput } from '../../../components';
import utils from '../../../utils';


import { setdeviceAdded } from '../../../redux/reducers/AppReducer';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios';

const AddSwitches = ({ navigation, route }) => {
  const dispatch=useDispatch()
  // const [devices,setDevices]=useState(JSON.parse(JSON.stringify(devArr)))
  const { appLoading, appData, client, sensorConnection,deviceAdded } = useSelector(state => state.AppReducer);

  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [redtopic, setRedTopic] = useState('');
  const [greentopic, setGreenTopic] = useState('');
  const [bluetopic, setBlueTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const { type, room_id } = route.params;


  const addSwitch = () => {
    setLoading(true)
    if (
      (type===""&&name !== '' && topic !== '')
    ||
    (type==="RGB" &&name !== '' && topic !== '' &&redtopic !== '' && greentopic !== '' && bluetopic !== '')
    ) {
      
     
      let data_send = {
        room_id: room_id,
        name: name,
        type: type == "" ? null : 'rgb',
        on: true,
        describtion: "describtion",
        topic:type == "" ? topic : topic+"*smart*"+redtopic+"*smart*"+greentopic+"*smart*"+bluetopic
      }
      axios.post("https://camp-coding.tech/smart_home/switchs/add_switch.php", data_send).then((res) => {
        console.log(res.data)
        if(res.data.status=="success"){
          utils.toastAlert("success", "Switch added successfully")
          dispatch(setdeviceAdded(true))
          
          navigation.goBack()
          setLoading(false)
        }else{
          utils.toastAlert("error", "Error happen please try again later")
          setLoading(false)
        }
        
      })
    } else {
      utils.toastAlert("error", "Please enter all values")
      setLoading(false)
    }
  }




  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      <ImageBackground

        source={{
          uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png',
        }}
        style={{
          width: "100%",
          height: 250,
          paddingTop: SIZES.base
          // alignSelf: 'center',
          // marginBottom: 30,



        }}
        resizeMode='cover'

      >

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.margin,
            // width:"100%",
            justifyContent: "space-between"

          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={icons.Backview} style={{ width: 55, height: 55 }} resizeMode='contain' />
          </TouchableOpacity>
          <View />



        </View>


      </ImageBackground>
      {/* <Image
        style={{
          width: "100%",
          height: 250,
          // alignSelf: 'center',
          // marginBottom: 30,
        }}
        source={{
          uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png',
        }}
        resizeMode='cover'
      /> */}
      <ScrollView contentContainerStyle={{
        padding: SIZES.margin,
        // backgroundColor: COLORS.white,
        // flex: 1
      }}>
        <Text
          style={{
            ...FONTS.body4,
            fontWeight: 'bold',
            color: COLORS.primary,
            textAlign: "center"
          }}>
          Add Switch
        </Text>

        <TextInput
          style={{
            width: '90%',
            // height: 50,
            // backgroundColor: '#ddd',
            borderWidth: 2,
            alignSelf: 'center',
            marginTop: RFValue(20),
            borderRadius: RFValue(15),
            borderColor: '#B6B6B6',
            padding: RFValue(12),
          }}
          placeholder="Enter your Switch name"
          value={name}
          onChangeText={value => {
            setName(value)
          }}
        />

        <TextInput
          style={{
            width: '90%',
            // height: 50,
            // backgroundColor: '#ddd',
            borderWidth: 2,
            alignSelf: 'center',
            marginTop: RFValue(20),
            borderRadius: RFValue(15),
            borderColor: '#B6B6B6',
            padding: RFValue(12),
          }}
          placeholder="Enter your Switch Topic"
          value={topic}
          onChangeText={value => {
            setTopic(value)
          }}
        />

        {type == 'RGB' &&
          <>

            <TextInput
              style={{
                width: '90%',
                // height: 50,
                // backgroundColor: '#ddd',
                borderWidth: 2,
                alignSelf: 'center',
                marginTop: RFValue(20),
                borderRadius: RFValue(15),
                borderColor: '#B6B6B6',
                padding: RFValue(12),
              }}
              placeholder="Enter your Switch Red Topic"
              value={redtopic}
              onChangeText={value => {
                setRedTopic(value)
              }}
            />
            <TextInput
              style={{
                width: '90%',
                // height: 50,
                // backgroundColor: '#ddd',
                borderWidth: 2,
                alignSelf: 'center',
                marginTop: RFValue(20),
                borderRadius: RFValue(15),
                borderColor: '#B6B6B6',
                padding: RFValue(12),
              }}
              placeholder="Enter your Switch Green Topic"
              value={greentopic}
              onChangeText={value => {
                setGreenTopic(value)
              }}
            />

            <TextInput
              style={{
                width: '90%',
                // height: 50,
                // backgroundColor: '#ddd',
                borderWidth: 2,
                alignSelf: 'center',
                marginTop: RFValue(20),
                borderRadius: RFValue(15),
                borderColor: '#B6B6B6',
                padding: RFValue(12),
              }}
              placeholder="Enter your Switch Blue Topic"
              value={bluetopic}
              onChangeText={value => {
                setBlueTopic(value)
              }}
            />
          </>
        }

        <TouchableOpacity
          onPress={() => {
            // navigation.goBack()
            addSwitch()
          }}
          style={{
            width: 250,
            // height: 100,
            alignSelf: 'center',
            backgroundColor: COLORS.primary,
            marginTop: RFValue(50),
            alignItems: 'center',
            padding: RFValue(15),
            borderRadius: RFValue(50),
          }}>
            {
            loading?
            <ActivityIndicator size={RFValue(20)} color={COLORS.white} />:
          <Text
            style={{
              ...FONTS.body3,

              alignSelf: 'center',

              color: COLORS.white,
              fontWeight: "bold"
            }}>
            Add Switch
          </Text>
}
        </TouchableOpacity>


      </ScrollView>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: RFValue(20),
    paddingVertical: RFValue(10),
    borderRadius: RFValue(15),
    elevation: RFValue(20),

  },
});

export default AddSwitches;
