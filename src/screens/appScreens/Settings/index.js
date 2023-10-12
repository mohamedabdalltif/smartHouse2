import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, TouchableOpacity, Modal, TextInput } from 'react-native';

import { CustomTextInput, FormInput, Header } from '../../../components';
import { COLORS, FONTS, icons, images, SIZES } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../../Services';
import { removeUser } from '../../../redux/reducers/UserReducer';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-paper';

import SwitchToggle from 'react-native-switch-toggle';
const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector(s => s.UserReducer);
  const [subUser, setSubUser] = useState(false)
  const [subUserPass, setSubUserPass] = useState(false)
  const [subUserTextPass, setSubUserTextPass] = useState("")
  return (
    <>

      <View style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: "center",

      }}>
        <View
          style={{

            alignItems: 'center',
            // marginVertical: 10,
            backgroundColor: COLORS.white,
            marginVertical: SIZES.margin


          }}>

          <Text
            style={{
              ...FONTS.body2,
              fontWeight: "bold",
              color: '#000',

            }}>
            Settings
          </Text>

        </View>




        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('Profile')

          // }}
          style={{
            height: RFValue(70),
            width: '90%',
            backgroundColor: COLORS.gray3,
            borderRadius: RFValue(12),
            // justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            padding: RFValue(15),
            marginBottom: SIZES.margin,
            marginTop: SIZES.margin * 2
          }}>
          <View
            style={{
              // width: '15%',
            }}>
            <Image
              source={icons.personimg}
              style={{
                height: RFValue(40),
                width: RFValue(40)
              }}
            />
          </View>

          <View
            style={{
              // width: '50%',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                ...FONTS.body3,
                marginLeft: RFValue(20)
              }}>
              {userData.user_name}
            </Text>

          </View>


        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Noti')
          }}
          style={{
            height: RFValue(70),
            width: '90%',
            backgroundColor: COLORS.gray3,
            borderRadius: RFValue(12),
            // justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            padding: RFValue(15),
            marginBottom: SIZES.margin,
          }}>
          <View
            style={{
              // width: '15%',
            }}>
            <Image
              source={icons.notfi}
              style={{
                height: RFValue(40),
                width: RFValue(40)
              }}
            />
          </View>

          <View
            style={{
              // width: '50%',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                ...FONTS.body3,
                marginLeft: RFValue(20)
              }}>
              {'Notification'}
            </Text>

          </View>


        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSubUserPass(true)
          }}

          style={{
            height: RFValue(70),
            width: '90%',
            backgroundColor: COLORS.gray3,
            borderRadius: RFValue(12),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            padding: RFValue(20),
            marginBottom: SIZES.margin,
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              ...FONTS.body3,

            }}>

            {"Sub user"}
          </Text>
          <SwitchToggle
            switchOn={subUser}
            onPress={() => {
              setSubUser(!subUser)
            }}
            circleColorOff="#000"
            circleColorOn="#fff"
            backgroundColorOn={COLORS.primary}
            backgroundColorOff="#C4C4C4"
            duration={100}
            containerStyle={{
              width: 40,
              height: 23,
              borderRadius: 25,
              padding: 5,
            }}
            circleStyle={{
              width: 15,



              height: 15,
              borderRadius: 20,
            }}
          />


        </TouchableOpacity>
        <Button
          // disabled={!isEditableMode}
          onPress={async () => {
            dispatch(removeUser());
            await Auth.logout();
          }}
          mode="contained"
          buttonColor={COLORS.primary}
          labelStyle={{
            ...FONTS.h3,
            color: COLORS.white,
            paddingVertical: 4,
          }}
          style={{
            borderRadius: 8,
            marginTop: RFValue(10),
            marginBottom: RFValue(90),
            width: '90%',
            alignSelf: 'center',
          }}>
          Logout
        </Button>
        <Modal
          transparent
          visible={subUserPass}
          onRequestClose={() => {
            setSubUserPass(false)
          }}
        >
          <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,.5)"
          }}>
            <View
              style={{
                width: "80%",
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.base,
                paddingVertical: SIZES.margin,
                borderRadius: RFValue(20)
              }}
            >
              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: COLORS.black,
                  // marginBottom: SIZES.margin
                }}
              >
                Please Enter App Password
              </Text>

              <TextInput
                style={{
                  width: '90%',
                  // height: 50,
                  // backgroundColor: '#ddd',
                  borderWidth: 2,
                  alignSelf: 'center',
                  marginTop: RFValue(20),
                  borderRadius: RFValue(12),
                  borderColor: '#B6B6B6',
                  padding: RFValue(8),
                }}
                placeholder="Password"
                value={subUserTextPass}
                onChangeText={value => {
                  setSubUserTextPass(value)
                }}
                onBlur={()=>{
                  console.log("here")
                }}
              />


            </View>

          </View>

        </Modal>


      </View>
    </>);
};


export default Settings;
