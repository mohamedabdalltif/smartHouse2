import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  ImageBackground,

  Modal,
  ActivityIndicator,
  StatusBar,

  SafeAreaView,
  Image,

} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';


import LottieView from 'lottie-react-native';

import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { CustomTextInput, FormInput, TextButton } from '../../../components';
import utils from '../../../utils';
import MQTT from 'sp-react-native-mqtt';
import uuid from 'react-native-uuid'
import { ScrollView } from 'react-native-gesture-handler';




import AnimatedLottieView from 'lottie-react-native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';


import { setUser } from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
import axios from 'axios';

const AdminContinueSign = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { psData } = route.params;
  const [connectionUsername, setConnectionUsername] = useState('')
  const [connectionPassword, setConnectionPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFlash, setIsFlash] = React.useState(false);
  const [show_modal, setshow_modal] = React.useState(false)


  async function storedata(data) {
    await Auth.setAccount(data);
  }
  function onSuccess(e) {
    console.log(e.data)
    // Alert.alert('Home', 'device added successfly')
    let res = e?.data?.split(",")
    setConnectionUsername(res[0])
    setConnectionPassword(res[1])
    setshow_modal(false)
  };

  const signUp = () => {
    setLoading(true)
    if (connectionPassword === '' || connectionUsername === '') {
      utils.toastAlert("error", "Please check values")
      setLoading(false)
      return;
    }

    let currentTime = +new Date();
    let clientID = currentTime + uuid.v1();
    clientID = clientID.slice(0, 23)
    MQTT.createClient({
      // uri: 'mqtt://185.194.217.124:1883',
      clientId: clientID,
      user: connectionUsername,
      pass: connectionPassword,
      // user:'MohamedSaad',
      //  pass: 'MS_127RTIF_#$%_e',
      protocol: "mqtt",
      tls: false,
      host: "185.194.217.124",
      port: 1883,

      auth: true,
      automaticReconnect: true,



    }).then(function (client) {


      client.on('error', function (msg) {
        utils.toastAlert("error", "error happen when trying to connect")

      });



      client.on('connect', function () {
        const data = psData
        console.log(data)
        data['connection_user_name'] = connectionUsername
        data['connection_pass'] = connectionPassword

        dispatch(setUser(data))
        storedata((data))
        client.disconnect()
        utils.toastAlert("success", "Login Done Successfully")
        setLoading(false)


      });


      client.connect();



    }).catch(function (err) {
      utils.toastAlert("error", "error happen when trying to connect")
    });




  }


  function Connection() {
    let currentTime = +new Date();
    let clientID = currentTime + uuid.v1();
    clientID = clientID.slice(0, 23)
    MQTT.createClient({
      // uri: 'mqtt://185.194.217.124:1883',
      clientId: clientID,
      user: userData.connection_user_name,
      pass: userData.connection_pass,
      // user:'MohamedSaad',
      //  pass: 'MS_127RTIF_#$%_e',
      protocol: "mqtt",
      tls: false,
      host: "185.194.217.124",
      port: 1883,
      // will:true,
      // willQos:0,
      // willRetainFlag:false,
      // willtopic:"I4TCShSFR40XTUWVXYZ4",
      auth: true,
      automaticReconnect: true,


    }).then(function (client) {
      // console.log(client)
      client.on('closed', function () {
        console.log('mqtt.event.closed');
        // dispatch(modifySensorConn(false))
        setConnection(false)
      });

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg);
        // dispatch(modifySensorConn(false))

        setConnection(false)
      });

      // client.on('message', function (msg) {
      //   console.log('mqtt.event.message Home', msg);

      //   console.log(msg.data)
      // });

      client.on('connect', function () {
        console.log('connected');
        // dispatch(setClient(client))
        // dispatch(modifySensorConn(true))
        setClient(client)
        setConnection(true)
        // client.subscribe('I4TCShSFR40XTUWVXYZ4', 0);
        // // client.unsubscribe("#")
        // client.publish('I4TCShSFR40XTUWVXYZ4/SWITCH/I4TCShPSw1OXTUWVXYZ5J/SWITCH2', "1", 2, true);

      });


      client.connect();



    }).catch(function (err) {
      console.log(err);
    });
  }




  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"dark-content"} />
      <ImageBackground
        source={{
          uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png',
        }}
        style={{
          flex: 1,


        }}
        resizeMode='cover'

      >

        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.gray3,
            opacity: .9,
            paddingHorizontal: SIZES.margin
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // paddingHorizontal: SIZES.margin,
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



          <ScrollView contentContainerStyle={{ paddingBottom: SIZES.padding * 4, marginTop: SIZES.margin }} showsVerticalScrollIndicator={false}>
            <View style={{
              alignItems: "center",
              marginVertical: SIZES.margin * 2,
              // backgroundColor:"red"
            }}>
              <Text
                style={{
                  ...FONTS.body1,
                  color: COLORS.black,
                  fontWeight: "500"


                }}
              >
                Continue Login

              </Text>

            </View>
            {/* <View style={{ alignItems: "center", marginBottom: SIZES.margin * 2 }}>
                            <QRCode
                                value={`${Email || ''},${Password || ''}`}
                                size={180}
                            />
                        </View> */}



            <CustomTextInput TextContainerStyle={{
              alignSelf: "center",
              width: "100%",
              height: RFValue(55),
              borderRadius: RFValue(50),
              // borderWidth: 0.5,
              flexDirection: "row",
              alignItems: "center",
              // paddingLeft: SIZES.padding,
              backgroundColor: COLORS.white,
              marginBottom: SIZES.margin

            }}

              value={connectionUsername} placeholder={"Connection Username"} onChangeText={(txt) => {
                setConnectionUsername(txt)

              }}

            />


            <CustomTextInput TextContainerStyle={{
              alignSelf: "center",
              width: "100%",
              height: RFValue(55),
              borderRadius: RFValue(50),
              // borderWidth: 0.5,
              flexDirection: "row",
              alignItems: "center",
              // paddingLeft: SIZES.padding,
              backgroundColor: COLORS.white,

            }}

              value={connectionPassword} placeholder={"Connection Password"} onChangeText={(txt) => {
                setConnectionPassword(txt)

              }}

            />

            <View style={{
              flexDirection: "row", alignItems: "center", marginTop: SIZES.margin * 3,
              marginBottom: SIZES.margin,
              justifyContent: "space-between"
            }}>

              <TextButton
                onPress={() =>
                  signUp()
                }
                buttonContainerStyle={{
                  backgroundColor: COLORS.black,
                  width: "75%",
                  alignSelf: "center",
                  // marginTop: SIZES.margin * 3,
                  height: RFValue(55),
                  borderRadius: RFValue(50),
                  // marginBottom: SIZES.margin
                }}
                loading={loading}
                label={"Continue"}

              />
              <TouchableOpacity
                onPress={() => {
                  setshow_modal(true)
                }}
              >
                <Image
                  source={icons.code}
                  style={{
                    width: RFValue(45),
                    height: RFValue(45)
                  }}
                />
              </TouchableOpacity>
            </View>


          </ScrollView>

        </View>



      </ImageBackground>


      <Modal
        visible={show_modal}
        onRequestClose={() => {
          setshow_modal(false);

        }}
        animationType='slide'
      >



        <TouchableOpacity
          onPress={() => {
            setshow_modal(false);
          }}
          style={{
            margin: 15,
          }}>
          <Image source={icons.Backview} />
        </TouchableOpacity>



        <QRCodeScanner
          reactivate={true}
          showMarker={true}
          markerStyle={{
            borderRadius: 20,
            borderColor: COLORS.red,
          }}
          flashMode={
            isFlash
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          onRead={e => {
            onSuccess(e);
          }}
          topContent={
            <Text style={[{
              flex: 1,
              fontSize: 18,
              padding: 32,
              color: '#777',
            }, {
              textAlign: 'center'
            }]}>
              Please move your camera {'\n'} over the QR Code
            </Text>
          }

          bottomContent={
            <TouchableOpacity
              onPress={() => {
                setIsFlash(!isFlash);
              }}
              style={{
                backgroundColor: COLORS.red,
                width: 100,
                height: 100,
                borderRadius: 120 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <MaterialCommunityIcons
                name={isFlash ? 'flash' : 'flash-off'}
                size={40}
                color={COLORS.white}
              />
            </TouchableOpacity>
          }
        />


      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default AdminContinueSign;
