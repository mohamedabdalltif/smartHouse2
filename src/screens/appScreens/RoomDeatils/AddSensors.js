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
import { RadioButton } from 'react-native-paper';
import { setdeviceAdded } from '../../../redux/reducers/AppReducer';


import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios';

const AddSensors = ({ navigation, route }) => {
  const dispatch = useDispatch()
  // const [devices,setDevices]=useState(JSON.parse(JSON.stringify(devArr)))
  const [value, setValue] = React.useState('Value');
  const [sensor_val, setSensor_val] = React.useState(0);
  const [slider_min_val, setSlider_min_val] = React.useState(0);
  const [slider_max_val, setSlider_max_val] = React.useState(0);
  const [topic, setTopic] = React.useState('');
  const [name, setName] = React.useState('');

  // const { appLoading, appData, client, sensorConnection } = useSelector(state => state.AppReducer);

  const [pressed, setPressed] = useState(false);
  const [deviceTypeModal, setDeviceTypeModal] = useState(null);
  const [loading, setLoading] = useState(false);

  const { room_id } = route.params;

  const addSensor = () => {
    setLoading(true)


    if ((value == "Value" && sensor_val !== '') ||
      (value == "Value" && slider_min_val !== '' && slider_max_val) !== '') {


      let data_send = {
        room_id: room_id,
        name: name,
        type: value == "Value" ? "" : "slider",
        value: value == "Value" ? sensor_val : slider_min_val + "**smart**" + slider_max_val,
        topic: topic
      }
      axios.post("https://camp-coding.tech/smart_home/sensors/add_sensors.php", data_send).then((res) => {
        console.log(res.data)
        if (res.data.status == "success") {
          utils.toastAlert("success", "Sensor added successfully")
          dispatch(setdeviceAdded(true))

          navigation.goBack()
          setLoading(false)
        } else {
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
          Add Sensor
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
          placeholder="Enter your Sensor name"
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
          placeholder="Enter your Sensor Topic"
          value={topic}
          onChangeText={value => {
            setTopic(value)
          }}
        />


        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <View style={{
            flexDirection: "row",
            marginTop: SIZES.margin, justifyContent: "space-around"
          }}>
            <View style={{
              flexDirection: "row-reverse",
              alignItems: "center"
            }}>
              <Text style={{
                color: value == "Value" ? COLORS.primary : COLORS.black
              }}
              >Value</Text>
              <RadioButton value="Value" color={COLORS.primary} />
            </View>
            <View
              style={{
                flexDirection: "row-reverse",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: value == "Slider" ? COLORS.primary : COLORS.black
                }}
              >Slider</Text>
              <RadioButton value="Slider" color={COLORS.primary} />
            </View>
          </View>
        </RadioButton.Group>

        {value == "Value" ?
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
            placeholder="Enter Sensor Default Value"
            value={sensor_val}
            keyboardType='number-pad'
            onChangeText={value => {
              setSensor_val(value)
            }}
          />
          :
          <View style={{
            flexDirection: "row",
            alignItems: "center", justifyContent: "space-between",
            width: "90%",
            alignSelf: "center"
          }}>
            <TextInput
              style={{
                width: '47%',
                // height: 50,
                // backgroundColor: '#ddd',
                borderWidth: 2,
                alignSelf: 'center',
                marginTop: RFValue(20),
                borderRadius: RFValue(15),
                borderColor: '#B6B6B6',
                padding: RFValue(12),
              }}
              placeholder="Slider Min Value"
              value={slider_min_val}
              keyboardType='number-pad'
              onChangeText={value => {
                setSlider_min_val(value)
              }}

            />
            <TextInput
              style={{
                width: '47%',
                // height: 50,
                // backgroundColor: '#ddd',
                borderWidth: 2,
                alignSelf: 'center',
                marginTop: RFValue(20),
                borderRadius: RFValue(15),
                borderColor: '#B6B6B6',
                padding: RFValue(12),
              }}
              placeholder="Slider Max Value"
              value={slider_max_val}
              keyboardType='number-pad'
              onChangeText={value => {
                setSlider_max_val(value)
              }}

            />


          </View>
        }




        <TouchableOpacity
          onPress={() => {
            addSensor()
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
            loading ?
              <ActivityIndicator size={RFValue(20)} color={COLORS.white} /> :
              <Text
                style={{
                  ...FONTS.body3,

                  alignSelf: 'center',

                  color: COLORS.white,
                  fontWeight: "bold"
                }}>
                Add Sensor
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

export default AddSensors;
