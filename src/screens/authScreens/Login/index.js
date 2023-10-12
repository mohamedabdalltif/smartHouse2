import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking, TextInput } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { CustomTextInput, TextButton } from '../../../components';

import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  // const [checked, setChecked] = useState(false);s
  const [emailError, setemailError] = React.useState(false);
  const [passError, setPassError] = React.useState(false);
  const signIn = () => {
    if ( Email === "") {

        setemailError(true)

    }
    if ( Password === "") {
        setPassError(true)
        return;
    }

    // navigation.navigate('MainStack')
    let user = {
        user_email: Email,
        user_name: "ahmed ali",
        user_photo: null,
        user_token: null,
        user_password: Password
    }
  
    dispatch(setUser(user))
    // navigation.navigate("FillProfile")
    storedata(user);
}

async function storedata(data) {
  await Auth.setAccount(data);
}
  const Header = () => {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          //  justifyContent: "space-between",
          alignItems: "center",
          marginBottom: SIZES.margin
        }}
      >
        {/* <TouchableOpacity >
          <FastImage 
          source={icons.arrowLeftButton}
          style={{
            width: RFValue(50),
            height: RFValue(50),
          }}
          
          />

        </TouchableOpacity> */}
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("Faq")
        }} 
         >
          {/* <FastImage
            source={icons.faqButton}
            style={{
              width: RFValue(50),
              height: RFValue(50),
            }}

          /> */}

        </TouchableOpacity>


      </View>
    )
  }
  return (
    <View style={styles.mainContainer}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{
          ...FONTS.body1,
          fontFamily: FONTS.fontFamilyBold,
          color: COLORS.black,
          textAlign: "center",
          marginVertical: SIZES.margin*2
        }}>Welcome back</Text>

        <CustomTextInput TextContainerStyle={{
          alignSelf: "center",
          width: "100%",
          height: RFValue(55),
          borderRadius: RFValue(50),
          // borderWidth: 0.5,
          flexDirection: "row",
          alignItems: "center",
          // paddingLeft: SIZES.padding,
          backgroundColor: COLORS.gray3,
          marginVertical: emailError ? SIZES.base : SIZES.margin
        }}

          value={Email} placeholder={"Email"} onChangeText={(txt) => {
            setEmail(txt)
            setemailError(false)
          }}

        />
        {emailError === true ? <Text style={[FONTS.h5, { color: COLORS.red, alignSelf: "center", marginBottom: SIZES.base }]}>{"Invalid Email"}</Text> : null}

        <CustomTextInput

          TextContainerStyle={{
            alignSelf: "center",
            width: "100%",
            height: RFValue(55),
            borderRadius: RFValue(50),
            // borderWidth: 0.5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: COLORS.gray3,
            paddingRight: SIZES.padding,
            marginBottom: emailError ? SIZES.base : SIZES.margin
          }}
          value={Password} placeholder={"Password"} type={"password"} onChangeText={(txt) => {
            setPassword(txt)
            setPassError(false)
          }} />
        {passError === true ? <Text style={[FONTS.h5, { color: COLORS.red, alignSelf: "center", marginBottom: SIZES.base }]}>{"Invalid Password"}</Text> : null}

        <TouchableOpacity onPress={() => {
          navigation.navigate("ForgetPassword")
        }}>
          <Text style={[FONTS.h5, { fontWeight: "bold", color: COLORS.primary, marginTop: SIZES.base, textAlign: "right", textDecorationLine: 'underline' }]}>
            Recovery Password
          </Text>
        </TouchableOpacity>

        <TextButton
        onPress={()=>signIn()}
          buttonContainerStyle={{
            backgroundColor: COLORS.black,
            width: "75%",
            alignSelf: "center",
            marginTop: SIZES.margin * 3,
            height: RFValue(55),
            borderRadius: RFValue(50),
            marginBottom: SIZES.margin
          }}
          label={"Login"}

        />

        {/* <Text
          style={{
            ...FONTS.body5,
            textAlign: "center",
            marginBottom: SIZES.margin
          }}
        >

          Or Login With
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignSelf:"center"
          }}
        >

          <TouchableOpacity >
            <FastImage
              source={icons.googleButton}
              style={{
                width: RFValue(50),
                height: RFValue(50),
                marginRight:SIZES.base
              }}

            />

          </TouchableOpacity>
          <TouchableOpacity >
            <FastImage
              source={icons.facebookButton}
              style={{
                width: RFValue(50),
                height: RFValue(50),
                marginRight:SIZES.base,
                marginBottom:SIZES.margin
              }}

            />

          </TouchableOpacity>

        </View> */}
        <View style={{ flexDirection: "row", alignSelf: "center", marginTop: SIZES.margin }}>
            <Text style={[FONTS.h5, { color: COLORS.black, marginRight: SIZES.base }]}>
              Don't have an account?
            </Text>
            <TouchableOpacity
             onPress={()=>{
              navigation.navigate("Signup")
          }}
            >
              <Text style={[FONTS.h5, { fontWeight: "bold", color: COLORS.primary,textDecorationLine:"underline" }]} >
                Register
              </Text>
            </TouchableOpacity>

          </View>







      </ScrollView>
    </View>


  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.white
  }


});

export default Login;