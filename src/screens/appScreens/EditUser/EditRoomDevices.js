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
    StatusBar, Platform, UIManager, LayoutAnimation, Image, Alert
} from "react-native";

import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
const initialDimensions = Dimensions.get('screen');

import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, icons } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import { TextButton } from "../../../components";
import axios from "axios";
import utils from "../../../utils";
import { setdeviceAdded } from "../../../redux/reducers/AppReducer";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


const EditRoomDevices = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const { devData } = route.params;
    const { userData } = useSelector(state => state.UserReducer);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [loading, setLoading] = useState(false)



    const [data, setdata] = React.useState(
        JSON.parse(JSON.stringify(devData))

    )


    // function changeToggle(inner_index, type) {
    //     console.log(type + '********' + data.switches[inner_index].found_sub)
    //     let old_data = { ...data }
    //     if (type == "sw") {
    //         old_data.switches[inner_index].found_sub = !old_data.switches[inner_index].found_sub
    //         setdata(old_data)
    //         // console.log(old_data[index].switches[inner_index].found_sub)
    //     } else if (type == "dev") {
    //         old_data.devices[inner_index].found_sub = !old_data.devices[inner_index].found_sub
    //         setdata(old_data)
    //         // console.log(old_data[index].devices[inner_index].found_sub)
    //     } else if (type == "sen") {
    //         old_data.sensors[inner_index].found_sub = !old_data.sensors[inner_index].found_sub
    //         setdata(old_data)
    //         // console.log(old_data[index].devices[inner_index].found_sub)
    //     }

    // }
    // function submit() {
    //     console.log(data)
    //     setLoading(true)
    //     let devStr = []
    //     let senStr = []
    //     let swStr = []
    //     for (let i = 0; i < data.devices.length; i++) {
    //         if (data.devices[i].found_sub == true) {
    //             devStr.push(data.devices[i].device_id)
    //         }
    //     }
    //     for (let i = 0; i < data.sensors.length; i++) {
    //         if (data.sensors[i].found_sub == true) {
    //             senStr.push(data.sensors[i].sensor_id)
    //         }
    //     }
    //     for (let i = 0; i < data.sensors.length; i++) {
    //         if (data.switches[i].found_sub == true) {
    //             swStr.push(data.switches[i].switch_id)
    //         }
    //     }
    //     console.log(devStr.join("*"))
    //     console.log(senStr.join("*"))
    //     console.log((senStr.join("*") || "empty") + "**smart**" + (devStr.join("*") || "empty") + "**smart**" + (swStr.join("*") || "empty"))
    //     axios.post("https://camp-coding.tech/smart_home/home/add_sub_user.php", {
    //         room_id: data.room_id,
    //         sub_users_data: (senStr.join("*") || "empty") + "**smart**" + (devStr.join("*") || "empty") + "**smart**" + (swStr.join("*") || "empty")

    //     }).then((res) => {
    //         // console.log(res.data)
    //         if (res?.data?.status == "success") {
    //             utils.toastAlert("success", "Done successfully")
    //             setLoading(false)
    //         } else {
    //             utils.toastAlert("error", "Erorr happen try again later")
    //             setLoading(false)
    //         }
    //     })
    //     // setLoading(false)

    // }


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

                <TouchableOpacity

                    onPress={() => {
                        // setShowAddDevicesModal(true)
                        // setshow_modal(true);
                        dispatch(setdeviceAdded(false))
                        navigation.navigate("AddDevicesType", {
                            room_id: devData.room_id
                        })
                    }}>
                    <Image source={icons.add} style={{ width: 55, height: 55 }} resizeMode='contain' />
                </TouchableOpacity>

            </View>
            <ScrollView>

                <View
                    style={{
                        margin: 10
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            color: COLORS.primary,
                            marginBottom: SIZES.margin,
                            textAlign: "center"
                        }}
                    >
                        {data.name}
                    </Text>

                    {data?.switches.map((sw_item, sw_index) => (
                        <>







                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("EditSwitch", {
                                        psdata: sw_item,
                                        type: ""
                                    })
                                }}
                                style={{
                                    flexDirection: "row",
                                    // height: 100,
                                    width: '90%',
                                    backgroundColor: COLORS.gray3,
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    paddingTop: 15,
                                    paddingBottom: 2,
                                    // borderBottomLeftRadius :  item.show ? inner_index == item.inner_arr.length -1 ? 10 : null : null ,
                                    //  borderBottomRightRadius: (inner_index + 1) == item.inner_arr.length ? 10 : null,
                                    // borderBottomLeftRadius: (sw_index + 1) == item.switches.length ? 10 : 0,
                                    // borderBottomRightRadius: (sw_index + 1) == item.switches.length ? 10 : 0
                                    borderRadius: RFValue(10),
                                    marginBottom: SIZES.margin
                                }}
                            >

                                <Text
                                    style={{
                                        marginBottom: SIZES.margin
                                    }}
                                >
                                    {sw_item.name}
                                </Text>




                            </TouchableOpacity>



                        </>))}

                    {data?.sensors.map((sw_item, sw_index) => (
                        <>







                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("EditSensor", {
                                        psdata: sw_item,
                                        type: ""
                                    })
                                }}
                                style={{
                                    flexDirection: "row",
                                    // height: 100,
                                    width: '90%',
                                    backgroundColor: COLORS.gray3,
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    paddingTop: 15,
                                    paddingBottom: 2,
                                    // borderBottomLeftRadius :  item.show ? inner_index == item.inner_arr.length -1 ? 10 : null : null ,
                                    //  borderBottomRightRadius: (inner_index + 1) == item.inner_arr.length ? 10 : null,
                                    // borderBottomLeftRadius: (sw_index + 1) == item.switches.length ? 10 : 0,
                                    // borderBottomRightRadius: (sw_index + 1) == item.switches.length ? 10 : 0
                                    borderRadius: RFValue(10),
                                    marginBottom: SIZES.margin
                                }}
                            >

                                <Text
                                    style={{
                                        marginBottom: SIZES.margin
                                    }}
                                >
                                    {sw_item.name}
                                </Text>




                            </TouchableOpacity>



                        </>))}
                    {data?.devices.map((sw_item, sw_index) => (
                        <>







                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("EditDevice", {
                                        psdata: sw_item,
                                        type: ""
                                    })
                                }}
                                style={{
                                    flexDirection: "row",
                                    // height: 100,
                                    width: '90%',
                                    backgroundColor: COLORS.gray3,
                                    alignSelf: 'center',
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 20,
                                    paddingTop: 15,
                                    paddingBottom: 2,
                                    // borderBottomLeftRadius :  item.show ? inner_index == item.inner_arr.length -1 ? 10 : null : null ,
                                    //  borderBottomRightRadius: (inner_index + 1) == item.inner_arr.length ? 10 : null,
                                    // borderBottomLeftRadius: (sw_index + 1) == item.switches.length ? 10 : 0,
                                    // borderBottomRightRadius: (sw_index + 1) == item.switches.length ? 10 : 0
                                    borderRadius: RFValue(10),
                                    marginBottom: SIZES.margin
                                }}
                            >

                                <Text
                                    style={{
                                        marginBottom: SIZES.margin
                                    }}
                                >
                                    {sw_item.name}
                                </Text>




                            </TouchableOpacity>



                        </>))}

                </View>








            </ScrollView>
            {/* <TextButton
                onPress={() =>
                    submit()
                }
                buttonContainerStyle={{
                    backgroundColor: COLORS.black,
                    width: "75%",
                    alignSelf: "center",
                    marginTop: SIZES.base,
                    height: RFValue(55),
                    borderRadius: RFValue(50),
                    marginBottom: SIZES.base
                }}
                loading={loading}
                label={"Submit"}

            /> */}
            {/* </View> */}
        </View>
    )
}


export default EditRoomDevices;