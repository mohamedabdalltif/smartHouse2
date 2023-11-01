import React, { useState, useRef, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
    Text,
    BackHandler,
    AccessibilityInfo,
    StatusBar, Platform, UIManager, LayoutAnimation, Image, Alert,Modal
} from "react-native";

import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
const initialDimensions = Dimensions.get('screen');

import CheckBox from '@react-native-community/checkbox';
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, icons } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


const Events = ({ route, navigation }) => {
    const { userData } = useSelector(state => state.UserReducer);
    // const { appData } = useSelector(state => state.AppReducer);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [loading, setLoading] = useState(true)

    const [current_index, setcurrent_index] = useState(-1)



    const [data, setdata] = React.useState(
        []
    )
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData()

        });

        return unsubscribe;
    }, [navigation])

    function getData() {
        // console.log(userData)
        // Alert.alert("hrtr")
        axios.post("https://camp-coding.tech/smart_home/home/select_room_data_without_subuser.php", {
            user_id: userData.user_id
        }).then((res) => {
            console.log(res.data)
            if (res.data.status == "success") {
                setLoading(false)


                setdata(res.data.message)
                // setLoading(false)
                // dispatch(setAppData(arr))

            } else {
                // dispatch(setAppData([]))
                setdata([])
                setLoading(false)
            }
        })



    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            {/* <StatusBar backgroundColor='#tran' /> */}




            {/* <View> */}
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
            </View>
            {!loading ?
                <ScrollView>
                    {data?.map((item, index) => (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("SubDevices", {
                                        devData: item
                                    })
                                }}
                                style={{
                                    backgroundColor: COLORS.gray3, marginBottom: SIZES.base,
                                    width: "90%",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    paddingVertical: SIZES.padding,
                                    marginTop: SIZES.margin,
                                    borderRadius: SIZES.radius
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        color: COLORS.primary,
                                        // marginBottom:SIZES.margin
                                    }}
                                >
                                    {data[index].name}
                                </Text>


                            </TouchableOpacity>





                        </>


                    ))}
                    
                </ScrollView>
                : <ActivityIndicator size={50} style={{ marginTop: SIZES.margin * 2 }} />}
            {/* </View> */}
            <TouchableOpacity
                    style={{
                        position:"absolute",
                        // width:RFValue(60),0
                        // height:RFValue(60),
                        // backgroundColor:COLORS.primary,
                        bottom:RFValue(20),
                        right:RFValue(20),
                        // borderRadius:RFValue(30),
                        // alignItems:"center",
                        // justifyContent:"center"
                    }}
                    >
                        <Image
                        source={icons.add}

                        />

                    </TouchableOpacity>

                    <Modal transparent visible={true}
          onRequestClose={() => {
            setShowModal(null)
          }}
        >
          <TouchableOpacity 
          activeOpacity={0}
          style={styles.modalBackGround}
          onPress={()=>{
            setShowModal(null)
          }}
          >
            <View
              style={styles.modalContainer}>
                <Text
                style={{
                  ...FONTS.body3,
                  fontWeight:"bold",
                  textAlign:"center",
                  color:COLORS.primary,
                  marginBottom:SIZES.margin
                }}
                >
                 { deviceTypeModal=="sw"?"Switch Type":"Device Type"}

                </Text>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom:SIZES.base
              }}>
                <TouchableOpacity
                onPress={()=>{
                 

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
                    { deviceTypeModal=="sw"?"ORDINARY":"AC"}
                  </Text>


                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                  setDeviceTypeModal(null)
                  deviceTypeModal=="sw"?
                  navigation.navigate("AddSwitches",{
                    type:"RGB",
                    room_id:room_id
                  })
                  :
                  navigation.navigate("AddDevices",{
                    type:"tv",
                    room_id:room_id
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
                   { deviceTypeModal=="sw"?"RGB":"TV"} 
                  </Text>

                </TouchableOpacity>

              </View>

            </View>
          </TouchableOpacity>
        </Modal>  
            
        </View>
    )
}


const styles = StyleSheet.create({
  
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


export default Events;