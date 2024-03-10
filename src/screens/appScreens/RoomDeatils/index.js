import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,

  TouchableOpacity,

  ImageBackground,

  Modal,

  StatusBar,
  Image,

  SafeAreaView,
  Alert,

} from 'react-native';
import Slider from 'react-native-slider'
import { RFValue } from 'react-native-responsive-fontsize';




import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';


import { ScrollView } from 'react-native-gesture-handler';



import { useDispatch, useSelector } from 'react-redux';


import SwitchToggle from 'react-native-switch-toggle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {


  setdeviceAdded

} from '../../../redux/reducers/AppReducer';

import axios from 'axios';

const RoomDeatils = ({ navigation, route }) => {

  const { userData } = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();

  const { psdata, client } = route.params;
  const [switchs, setSwitchs] = useState([])
  const [devices, setDevices] = useState([])
  const [customRemote, setCustomRemote] = useState([])
  const [Cameras, setCameras] = useState([])
  const [sensors, setSensors] = useState([])
  const [deviceTypeModal, setDeviceTypeModal] = useState(null);
  const [selectedCam, setSelectedCam] = useState(null);
  const [min_value, setMin_value] = useState(0);
  const [max_value, setMax_value] = useState(1);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

      setSwitchs(psdata.switches)
      setSensors(psdata.sensors)
      setDevices(psdata.devices)
      for (let j = 0; j < psdata?.switches.length; j++) {
        client?.subscribe(psdata.switches[j].topic, 2)
        client?.subscribe(psdata.switches[j].topic + "/CONNECTION", 2)

      }
      for (let x = 0; x < psdata?.sensors.length; x++) {
        client?.subscribe(psdata.sensors[x].topic, 2)
        client?.subscribe(psdata.sensors[x].topic + "/CONNECTION", 2)

      }
      for (let k = 0; k < psdata?.devices.length; k++) {
        client?.subscribe(psdata.devices[k].topic, 2)
        client?.subscribe(psdata.devices[k].topic + "/CONNECTION", 2)

      }

      client.on('message', function (msg) {
        console.log('mqtt.event.message', msg);

        psdata?.switches?.filter((state, indx) => {

          if (psdata?.switches[indx]?.topic === msg?.topic) {

            let arr = [...psdata.switches]

            arr[indx].on = (msg.data === "1" ? true : false)


            setSwitchs(arr)
          } else if (psdata?.switches[indx]?.topic + "/CONNECTION" === msg?.topic) {
            let arr = [...psdata.switches]

            arr[indx].connected = (msg.data === "1" ? true : false)

            setSwitchs(arr)
          }

        })

        psdata.devices.filter((state, indx) => {

          if (psdata.devices[indx]?.topic + "/CONNECTION" === msg?.topic) {

            let arr = [...psdata.devices]

            arr[indx].connected = msg?.data === "1" ? true : false


            setDevices(arr)
          }
        })

        psdata?.sensors?.filter((state, indx) => {

          if (psdata?.sensors[indx]?.topic === msg?.topic) {
            // console.log(msg?.data)

            let arr = [...psdata.sensors]

            arr[indx].value = msg?.data

            setSensors(arr)
          } else if (psdata?.sensors[indx]?.topic + "/CONNECTION" === msg?.topic) {
            let arr = [...psdata.sensors]

            arr[indx].connected = msg?.data

            setSensors(arr)
          }
        })

      })

    });
    getCustomRemote()
    getCamera()

    return unsubscribe;



  }, [navigation])


  const getCustomRemote = () => {
    let data_send = {
      "room_id": psdata?.room_id,

    }

    axios.post("https://camp-coding.tech/smart_home/remote/select_remote.php", data_send).then((res) => {
      console.log(res.data)
      if (res.data.status == "success") {
        setCustomRemote(res.data.message)

      }


    })
  }
  const getCamera = () => {
    let data_send = {
      "room_id": psdata?.room_id,

    }

    axios.post("https://camp-coding.tech/smart_home/camera/select_camera.php", data_send).then((res) => {
      console.log(res.data)
      if (res.data.status == "success") {
        setCameras(res.data.message)

      }


    })
  }



  renderSwitches = () => {
    return (
      <>

        {switchs.length > 0 && <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            marginLeft: RFValue(10),
            marginVertical: SIZES.base,
            fontWeight: "bold",
            textAlign: "center"
          }}>
          Switches
        </Text>
        }
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            // flex:1,

            // backgroundColor:"red"
            // paddingHorizontal: SIZES.base
          }}>
          {switchs?.map((item, index) => (
            <TouchableOpacity
              onLongPress={() => {
                navigation.navigate("DeviceHistory", {
                  psdata: item,
                  type: item.type


                })
              }}
              onPress={() => {
                // Alert.alert(item.type)
                navigation.navigate("EditSwitch", {
                  psdata: item,
                  type: item.type,
                  client: client
                  // "rgb"

                })
              }}
              style={{
                // height: 160,
                width: '47%',
                backgroundColor: '#fff',
                borderRadius: RFValue(20),
                marginBottom: SIZES.base,
              }}>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: RFValue(10),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body2,
                    //fontFamily: FONTS.//fontFamily,
                    fontWeight: 'bold',
                    color: item.on ? COLORS.primary : '#000',
                  }}>

                  {item?.on ? 'on' : 'off'}
                </Text>
                <SwitchToggle

                  switchOn={item?.on}
                  onPress={() => {
                    // console.log(index)
                    const arr = [...switchs]

                    arr[index].on = !item.on
                    // console.log(arr[index].on)
                    setSwitchs(arr)
                    client.publish(arr[index].topic, arr[index].on === true ? "1" : "0", 2, true)
                  }}
                  circleColorOff="#000"
                  circleColorOn="#fff"
                  backgroundColorOn={COLORS.primary}
                  backgroundColorOff="#C4C4C4"
                  duration={100}
                  containerStyle={{
                    width: RFValue(40),
                    height: RFValue(23),
                    borderRadius: RFValue(25),
                    padding: RFValue(5),
                  }}
                  circleStyle={{
                    width: RFValue(15),



                    height: RFValue(15),
                    borderRadius: RFValue(20),
                  }}
                />


              </View>
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                <MaterialCommunityIcons
                  name={"lamp"}
                  style={{
                    fontSize: RFValue(16),
                    alignSelf: "center",
                    color: item?.connected == false ? COLORS.red : COLORS.green
                  }}

                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    //fontFamily: FONTS.//fontFamily,
                    fontSize: 17,
                    marginVertical: 5,
                    textAlign: 'center',
                    color: COLORS.black
                  }}>
                  {item.name}
                </Text>
                {/* <Text
                  style={{
                    ...FONTS.body4,
                    color: '#848484',
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  {item?.describtion}
                </Text> */}
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </>
    )
  }

  renderSensors = () => {
    return (
      <>

        {sensors.length > 0 && <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            marginLeft: RFValue(10),
            marginVertical: SIZES.base,
            fontWeight: "bold",
            textAlign: "center"
          }}>
          Sensors
        </Text>
        }
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingHorizontal: SIZES.base
          }}>
          {sensors?.map((item, index) => (
            item.type == "slider" ?
              <TouchableOpacity
                onLongPress={() => {
                  navigation.navigate("DeviceHistory", {
                    psdata: item,
                    type: item.type
                    // "rgb"

                  })
                }}
                onPress={() => {
                  // setAddSensorDefaultVal(item.value)
                  // setAddSensorMeasurement(item.measurement)
                  // setAddSensorName(item.name)
                  // setItemIdx(index)
                  // setShowEditSensorModal(true)
                  navigation.navigate("EditSensor", {
                    psdata: item,
                    type: "slider"
                  })

                }} style={{
                  width: "100%",
                  paddingHorizontal: SIZES.padding,
                  backgroundColor: COLORS.white,
                  borderRadius: 15,
                  marginVertical: SIZES.margin,
                  paddingTop: SIZES.base
                }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{
                    ...FONTS.body4,
                    marginBottom: SIZES.base,
                    color: item?.connected == false ? COLORS.red : COLORS.green,
                    fontWeight: "700"

                  }}>{item.name}</Text>

                  <Text
                    style={{
                      ...FONTS.body3,
                      color: COLORS.black,
                      fontWeight: "700"

                    }}
                  >{item.value}</Text>


                </View>
                <Slider
                  value={item.value * 1}
                  step={0}
                  minimumValue={item.min_value}
                  maximumValue={item.max_value}
                  // inputRange={[max_value, min_value]}
                  onValueChange={(value) => client.publish(item.topic, value + '', 2, true)}

                />

              </TouchableOpacity>
              :
              <TouchableOpacity
                onLongPress={() => {
                  navigation.navigate("DeviceHistory", {
                    psdata: item,
                    type: item.type
                    // "rgb"

                  })
                }}
                onPress={() => {
                  // setAddSensorDefaultVal(item.value)
                  // setAddSensorMeasurement(item.measurement)
                  // setAddSensorName(item.name)
                  // setItemIdx(index)
                  // setShowEditSensorModal(true)
                  navigation.navigate("EditSensor", {
                    psdata: item,
                    type: ""
                  })

                }}
                style={{
                  // height: 160,
                  width: '47%',
                  backgroundColor: '#fff',
                  borderRadius: RFValue(20),
                  marginBottom: SIZES.base,
                }}>


                <View
                // style={{ padding: SIZES.base }}
                >

                  <Text style={{
                    ...FONTS.body4,
                    margin: SIZES.base,
                    color: COLORS.black,
                    fontWeight: "700",
                    textAlign: "center"

                  }}>{item.name}</Text>

                  <Image
                    source={icons.pc}
                    style={{
                      width: RFValue(16),
                      height: RFValue(16),
                      alignSelf: "center",
                      marginBottom: SIZES.base


                    }}
                    tintColor={item?.connected == false ? COLORS.red : COLORS.green}
                  />



                  <View style={{
                    width: "100%",
                    height: RFValue(100),
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary,
                    borderBottomLeftRadius: RFValue(20),
                    borderBottomRightRadius: RFValue(20),
                  }}>
                    <Text
                      style={{
                        ...FONTS.body2,
                        color: COLORS.white

                      }}
                    >{item.value}</Text>

                  </View>

                </View>

              </TouchableOpacity>

          ))}
        </View>

      </>
    )
  }

  renderDevices = () => {
    return (
      <>

        {devices.length > 0 && <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            marginLeft: RFValue(10),
            marginVertical: SIZES.base,
            fontWeight: "bold",
            textAlign: "center"
          }}>
          Devices
        </Text>
        }

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingHorizontal: SIZES.base
          }}>
          {devices?.map((item, index) => (
            <TouchableOpacity
              onLongPress={() => {
                navigation.navigate("DeviceHistory", {
                  psdata: item,
                  type: item.type
                  // "rgb"

                })
              }}
              onPress={() => {
                setDeviceTypeModal(item)

              }}
              style={{
                width: '47%',
                backgroundColor: '#fff',
                borderRadius: RFValue(20),
                marginBottom: SIZES.base,
              }}>

              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                {item.type == "ac" ?

                  <MaterialCommunityIcons
                    name={"air-conditioner"}
                    style={{
                      fontSize: RFValue(16),
                      alignSelf: "center",
                      color: item?.connected == false ? COLORS.red : COLORS.green
                    }}

                  /> :
                  <Image
                    source={icons.pc}
                    style={{
                      width: RFValue(16),
                      height: RFValue(16),
                      alignSelf: "center",
                      marginBottom: SIZES.base


                    }}
                    tintColor={item?.connected == false ? COLORS.red : COLORS.green}
                  />
                }
                <Text
                  style={{
                    fontWeight: 'bold',
                    //fontFamily: FONTS.//fontFamily,
                    fontSize: 17,
                    marginVertical: 5,
                    textAlign: 'center',
                    color: COLORS.black
                  }}>
                  {item.name}
                </Text>
                {/* <Text
                  style={{
                    ...FONTS.body4,
                    color: '#848484',
                    textAlign: 'center',
                    marginTop: 5,
                  }}>
                  {item?.describtion}
                </Text> */}
              </View>
            </TouchableOpacity>
          ))}
          {customRemote?.map((item, index) => (
            <TouchableOpacity
              onLongPress={() => {
                navigation.navigate("DeviceHistory", {
                  psdata: item,
                  type: item.type
                  // "rgb"

                })
              }}
              onPress={() => {
                let data = item
                data['type'] = "custom"

                setDeviceTypeModal(data)

              }}
              style={{
                width: '47%',
                backgroundColor: '#fff',
                borderRadius: RFValue(20),
                marginBottom: SIZES.base,
              }}>

              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                }}>

                <Image
                  source={icons.pc}
                  style={{
                    width: RFValue(16),
                    height: RFValue(16),
                    alignSelf: "center",
                    marginBottom: SIZES.base


                  }}
                  tintColor={COLORS.green}
                />

                <Text
                  style={{
                    fontWeight: 'bold',
                    //fontFamily: FONTS.//fontFamily,
                    fontSize: 17,
                    marginVertical: 5,
                    textAlign: 'center',
                    color: COLORS.black
                  }}>
                  {item.remote_name}
                </Text>

              </View>
            </TouchableOpacity>
          ))}
        </View>


      </>
    )
  }
  renderCamera = () => {
    return (
      <>

        {Cameras?.length > 0 && <Text
          style={{
            ...FONTS.body3,
            color: COLORS.primary,
            marginLeft: RFValue(10),
            marginVertical: SIZES.base,
            fontWeight: "bold",
            textAlign: "center"
          }}>
          Cameras
        </Text>
        }

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            paddingHorizontal: SIZES.base
          }}>
          {Cameras?.map((item, index) => (
            <TouchableOpacity

              onPress={() => {
                setSelectedCam(item)
                setDeviceTypeModal("cam")

              }}
              style={{
                width: '47%',
                backgroundColor: '#fff',
                borderRadius: RFValue(20),
                marginBottom: SIZES.base,
              }}>

              <View
                style={{
                  alignSelf: 'center',
                  marginTop: 20,
                }}>



                <Image
                  source={icons.pc}
                  style={{
                    width: RFValue(16),
                    height: RFValue(16),
                    alignSelf: "center",
                    marginBottom: SIZES.base


                  }}
                  tintColor={COLORS.green}
                />

                <Text
                  style={{
                    fontWeight: 'bold',
                    //fontFamily: FONTS.//fontFamily,
                    fontSize: 17,
                    marginVertical: 5,
                    textAlign: 'center',
                    color: COLORS.black
                  }}>
                  {item.title}
                </Text>

              </View>
            </TouchableOpacity>
          ))}

        </View>


      </>
    )
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
          uri: psdata?.image.replaceAll("\"", "").trim()
          // 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png',
        }}
        style={{
          flex: 1,
        }}
        resizeMode='cover'

      >
        <View style={{
          width: "100%",
          height: "35%",
          paddingTop: SIZES.base
        }}>
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
            {(userData.user_id == 3) &&
              <TouchableOpacity

                onPress={() => {
                  // setShowAddDevicesModal(true)
                  // setshow_modal(true);
                  dispatch(setdeviceAdded(false))
                  navigation.navigate("AddDevicesType", {
                    room_id: psdata.room_id
                  })
                }}>
                <Image source={icons.add} style={{ width: 55, height: 55 }} resizeMode='contain' />
              </TouchableOpacity>
            }

          </View>

        </View>
        <View
          style={{
            width: "100%",
            height: "75%",
            backgroundColor: COLORS.gray3,
            opacity: .9,
            paddingHorizontal: SIZES.margin
          }}
        ><View
          style={{
            alignItems: 'center',
            marginTop: RFValue(15),
          }}>
            <Text
              style={{
                ...FONTS.body2,
                color: '#000',
                fontWeight: '700',
              }}>
              {psdata.name}
            </Text>


          </View>

          <View style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: RFValue(15),
            alignItems: "center",
            paddingHorizontal: SIZES.base
          }}>
            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',

              }}>
              <View
                style={{
                  backgroundColor: '#000',
                  borderRadius: RFValue(15),
                  marginRight: RFValue(10),
                  paddingHorizontal: RFValue(10),
                  paddingVertical: RFValue(5),

                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.white
                  }}>
                  {switchs.length + sensors.length + devices.length}
                </Text>
              </View>
              <Text
                style={{
                  ...FONTS.body3,
                  fontWeight: "bold",
                  color: '#000',
                }}>
                Devices
              </Text>

            </View>

            {/* <TouchableOpacity>
              <Text
                style={{
                  ...FONTS.body4,
                  color: COLORS.primary,
                  textDecorationLine: "underline"
                }}
              >
                Turn on all
              </Text>

            </TouchableOpacity> */}


          </View>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.primary,
              textDecorationLine: "underline",
              textAlign: "center"
            }}
          >
            Long press on device to show history
          </Text>


          <ScrollView contentContainerStyle={{ paddingBottom: SIZES.padding * 4, marginTop: SIZES.margin }} showsVerticalScrollIndicator={false}>
            {renderSwitches()}
            {renderDevices()}
            {renderCamera()}
            {renderSensors()}

          </ScrollView>

        </View>

        <Modal transparent visible={deviceTypeModal !== null}
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
                {deviceTypeModal == "sw" ? "Switch Type" : deviceTypeModal == "cam" ? "Camera Type" : "Device Type"}

              </Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: SIZES.base
              }}>
                <TouchableOpacity
                  onPress={() => {
                    const item = deviceTypeModal
                    setDeviceTypeModal(null)
                    item.type == "tv" ?
                      navigation.navigate("TvRemote", {
                        type: "tv",
                        item: item,
                        client: client
                      })
                      :
                      item.type == "custom" ?
                        navigation.navigate("CustomRemote", {

                          item: item,
                          client: client
                        }) :
                        deviceTypeModal == "cam" ?
                          navigation.navigate("CameraWebView", {
                            psdata: selectedCam,
                          })
                          :
                          navigation.navigate("AcRemote", {
                            type: "ac",
                            item: item,
                            client: client
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
                    {deviceTypeModal == "cam" ? "CAMERA" : "REMOTE"}
                  </Text>


                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const item = deviceTypeModal
                    setDeviceTypeModal(null)
                    deviceTypeModal == "cam" ?
                      navigation.navigate("EditCamera", {
                        psdata: selectedCam,

                      }) :
                      navigation.navigate("EditDevice", {
                        psdata: item,
                        type: item.type
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
                    {"EDIT"}
                  </Text>

                </TouchableOpacity>

              </View>

            </View>
          </TouchableOpacity>
        </Modal>

      </ImageBackground>


    </SafeAreaView >
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

export default RoomDeatils;
