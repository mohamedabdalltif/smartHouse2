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



import { setUser } from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
import axios from 'axios';

const SignInHome = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)



  const signIn = () => {
   setLoading(true)
    if (Email === '' || Password === '') {
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
      user: Email,
      // 'MohamedGalal',
      pass: Password,
      // 'KmkCA6S*QkGTqrwUU9dD',
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
        utils.toastAlert("error", "Not Authorized")
        setLoading(false)
        return;
      });
      client.on('connect', function () {
        axios.post("https://camp-coding.tech/smart_home/auth/user_signup.php", {
          email: Email,
          password: Password,
          name: Email
        }).then((res)=>{
          console.log(res.data)
          if(res.data.status==="success"){

            client.disconnect()
             dispatch(setUser(JSON.parse(JSON.stringify(res.data.message))))
             storedata(JSON.parse(JSON.stringify(res.data.message)))
             utils.toastAlert("success", "Login Done Successfully")
             setLoading(false)
             
          }else{
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
        
      });
      client.connect();



    }).catch(function (err) {
      utils.toastAlert("error", "error happen try again later")
      setLoading(false)
    });


  }





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

            <TextButton
              onPress={() => signIn()}
              buttonContainerStyle={{
                backgroundColor: COLORS.black,
                width: "75%",
                alignSelf: "center",
                marginTop: SIZES.margin * 3,
                height: RFValue(55),
                borderRadius: RFValue(50),
                marginBottom: SIZES.margin
              }}
              loading={loading}
              label={"Login"}

            />


          </ScrollView>

        </View>



      </ImageBackground>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default SignInHome;
