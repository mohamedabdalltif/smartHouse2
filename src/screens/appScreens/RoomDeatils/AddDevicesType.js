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
  ScrollView,
  BackHandler
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

import LottieView from 'lottie-react-native';
// import {Image} from 'react-native-animatable';

import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SwitchToggle from 'react-native-switch-toggle';
import moment from 'moment';
import { FormInput } from '../../../components';
import utils from '../../../utils';

import { setdeviceAdded } from '../../../redux/reducers/AppReducer';

import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';

const AddDevicesType = ({ navigation, route }) => {
  const dispatch = useDispatch()
  // const [devices,setDevices]=useState(JSON.parse(JSON.stringify(devArr)))
  const { appLoading, appData, client, sensorConnection, deviceAdded } = useSelector(state => state.AppReducer);
  // const[deviceAdded,setDeviceAdded]=useState(false)

  const { room_id } = route.params;
  const [deviceTypeModal, setDeviceTypeModal] = useState(null);
  function handleBackButtonClick() {
    console.log(deviceAdded)
    if (!deviceAdded) {
      navigation.goBack()

    } else {
      navigation.navigate("Home");

    }

    return true;
  }
  useEffect(() => {

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

    };
  }, []);




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
              if (!deviceAdded) {
                navigation.goBack()

              } else {
                navigation.navigate("Home");

              }
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
          Add a device manually
        </Text>


        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: SIZES.margin
          }}>
          <TouchableOpacity
            onPress={() => {
              setDeviceTypeModal("sw")
            }}
            style={{
              width: "47%",
              height: RFValue(80),
              backgroundColor: COLORS.gray3,
              marginTop: RFValue(10),
              borderRadius: RFValue(10),
              alignItems: 'center',
              justifyContent: 'center',
              // flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name={"lamp"}
              style={{
                fontSize: RFValue(16),
                alignSelf: "center",
                marginBottom: SIZES.base,
                color: COLORS.primary
              }}

            />
            <Text
              style={{
                ...FONTS.body5,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Switch{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddSensors', {
                room_id: room_id
              });
            }}
            style={{
              width: "47%",
              height: RFValue(80),
              backgroundColor: COLORS.gray3,
              marginTop: RFValue(10),
              borderRadius: RFValue(10),
              alignItems: 'center',
              justifyContent: 'center',
              // flexDirection: 'row',
            }}>
            <Image
              source={icons.pc}
              style={{
                width: RFValue(16),
                height: RFValue(16),
                alignSelf: "center",
                marginBottom: SIZES.base


              }}
              tintColor={COLORS.primary}
            />
            <Text
              style={{
                ...FONTS.body5,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Sensor{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDeviceTypeModal("dev")
            }}
            style={{
              width: "47%",
              height: RFValue(80),
              backgroundColor: COLORS.gray3,
              marginTop: RFValue(10),
              borderRadius: RFValue(10),
              alignItems: 'center',
              justifyContent: 'center',
              // flexDirection: 'row',
            }}>
            <MaterialCommunityIcons
              name={"air-conditioner"}
              style={{
                fontSize: RFValue(16),
                alignSelf: "center",
                marginBottom: SIZES.base,
                color: COLORS.primary
              }}
            />
            <Text
              style={{
                ...FONTS.body5,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Device{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddCamera', {
                room_id: room_id
              });
            }}
            style={{
              width: "47%",
              height: RFValue(80),
              backgroundColor: COLORS.gray3,
              marginTop: RFValue(10),
              borderRadius: RFValue(10),
              alignItems: 'center',
              justifyContent: 'center',
              // flexDirection: 'row',
            }}>
            <Ionicons
              name={"videocam"}
              style={{
                fontSize: RFValue(16),
                alignSelf: "center",
                marginBottom: SIZES.base,
                color: COLORS.primary
              }}
            />
            <Text
              style={{
                ...FONTS.body5,
                fontWeight: 'bold',
                color: COLORS.black,
              }}>
              Camera{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal transparent visible={deviceTypeModal == "sw" || deviceTypeModal == "dev"}
          onRequestClose={() => {
            setDeviceTypeModal(null)
          }}
        >
          <TouchableOpacity
            activeOpacity={0}
            style={styles.modalBackGround}
            onPress={() => {
              setDeviceTypeModal(null)
            }}
          >
            <View
              style={styles.modalContainer}>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: COLORS.primary,
                  marginBottom: SIZES.margin
                }}
              >
                {deviceTypeModal == "sw" ? "Switch Type" : "Device Type"}

              </Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: SIZES.base
              }}>
                <TouchableOpacity
                  onPress={() => {
                    setDeviceTypeModal(null)
                    deviceTypeModal == "sw" ?
                      navigation.navigate("AddSwitches", {
                        type: "",
                        room_id: room_id,

                      })
                      :
                      navigation.navigate("AddDevices", {
                        type: "ac",
                        room_id: room_id
                      })

                  }}
                  style={{
                    width: "47%",
                    height: RFValue(50),
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: RFValue(10)
                  }}>
                  <Text style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    textAlign: "center"
                  }}>
                    {deviceTypeModal == "sw" ? "ORDINARY" : "AC"}
                  </Text>


                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeviceTypeModal(null)
                    deviceTypeModal == "sw" ?
                      navigation.navigate("AddSwitches", {
                        type: "RGB",
                        room_id: room_id
                      })
                      :
                      navigation.navigate("AddDevices", {
                        type: "tv",
                        room_id: room_id
                      })

                  }}
                  style={{
                    width: "47%",
                    height: RFValue(50),
                    backgroundColor: COLORS.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: RFValue(10)
                  }}>
                  <Text style={{
                    ...FONTS.body3,
                    color: COLORS.white,
                    textAlign: "center"
                  }}>
                    {deviceTypeModal == "sw" ? "RGB" : "TV"}
                  </Text>

                </TouchableOpacity>


              </View>

              <TouchableOpacity
                onPress={() => {
                  setDeviceTypeModal(null)
                  navigation.navigate('AddCustomDevice', {
                    room_id: room_id
                  })
                }}
                style={{
                  width: "47%",
                  height: RFValue(50),
                  backgroundColor: COLORS.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: RFValue(10),
                  alignSelf: 'center',
                  marginTop: 5
                }}>
                <Text style={{
                  ...FONTS.body3,
                  color: COLORS.white,
                  textAlign: "center"
                }}>
                  CUSTOM
                </Text>


              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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

export default AddDevicesType;
