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


import { CustomTextInput, FormInput, TextButton } from '../../../components';
import utils from '../../../utils';
import MQTT from 'sp-react-native-mqtt';
import uuid from 'react-native-uuid'
import { ScrollView } from 'react-native-gesture-handler';




import AnimatedLottieView from 'lottie-react-native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import { setUser } from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
import axios from 'axios';

const SignInHome = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isFlash, setIsFlash] = React.useState(false);
  const [show_modal, setshow_modal] = React.useState(false)


  const signIn = () => {
    setLoading(true)
    if (Email === '' || Password === '') {
      utils.toastAlert("error", "Please check values")
      setLoading(false)
      return;
    }


    axios.post("https://camp-coding.tech/smart_home/auth/user_login.php", {
      email: Email,
      password: Password,
    }).then((res) => {
      console.log(res.data)
      if (res.data.status === "success") {

        if (res.data.massage.user_id == 3){
          navigation.navigate("AdminContinueSign",{
            psData:res.data.massage
          })
          setLoading(false)
        }else{
          dispatch(setUser(res.data.massage))
          storedata((res.data.massage))
          utils.toastAlert("success", "Login Done Successfully")
          setLoading(false)
        }
         

      } else {
        utils.toastAlert("error", "error happen try again later")
        setLoading(false)
      }
    })
    // // navigation.navigate('MainStack')
    // let user = {
    //   user_email: null,
    //   user_name: Email,
    //   user_photo: null,
    //   user_token: null,
    //   user_password: Password
    // }

    // dispatch(setUser(user))
    // // // navigation.navigate("FillProfile")
    // storedata(user);




  }


  function onSuccess(e) {
    console.log(e.data)
    // Alert.alert('Home', 'device added successfly')
    let res = e?.data?.split(",")
    setEmail(res[0])
    setPassword(res[1])
    setshow_modal(false)
  };


  async function storedata(data) {
    await Auth.setAccount(data);
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




          <ScrollView contentContainerStyle={{ paddingBottom: SIZES.padding * 4, marginTop: SIZES.margin }} showsVerticalScrollIndicator={false}>
            <View style={{
              alignItems: "center",
              marginVertical: SIZES.margin * 3,
              // backgroundColor:"red"
            }}>
              <Text
                style={{
                  ...FONTS.body1,
                  color: COLORS.black,
                  fontWeight: "500"


                }}
              >
                SIGN TO YOUR HOME

              </Text>

            </View>


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

              value={Email} placeholder={"Username"} onChangeText={(txt) => {
                setEmail(txt)

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

              value={Password} placeholder={"Password"} onChangeText={(txt) => {
                setPassword(txt)

              }}

            />
            <View style={{
              flexDirection: "row", alignItems: "center", marginTop: SIZES.margin * 3,
              marginBottom: SIZES.margin,
              justifyContent: "space-between"
            }}>


              <TextButton
                onPress={() => signIn()}
                buttonContainerStyle={{
                  backgroundColor: COLORS.black,
                  width: "75%",
                  alignSelf: "center",

                  height: RFValue(55),
                  borderRadius: RFValue(50),

                }}
                loading={loading}
                label={"Login"}

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

export default SignInHome;
