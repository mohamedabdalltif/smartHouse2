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
    StatusBar, Platform, UIManager, LayoutAnimation, Image
} from "react-native";

import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
const initialDimensions = Dimensions.get('screen');

import CheckBox from '@react-native-community/checkbox';
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, icons } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import { TextButton } from "../../../components";
import axios from "axios";
import utils from "../../../utils";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


const SubDevices = ({ route, navigation }) => {
    const { devData } = route.params;
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [loading, setLoading] = useState(false)



    const [data, setdata] = React.useState(
        JSON.parse(JSON.stringify(devData))

    )
    // useEffect(()=>{
    //   // console.log(JSON.stringify(appData))
    //   let editData=[...appData]
    //   for(let i=0;i<editData.length;i++){
    //   for (let j = 0; j < editData[i]?.switches?.length; j++) {
    //     editData[i].switches[j].check=true

    //   }
    //   for (let x = 0; x < editData[i]?.sensors?.length; x++) {
    //     editData[i].sensors[x].check=false
    //   }
    //   for (let k = 0; k < editData[i]?.devices?.length; k++) {
    //     editData[i].devices[k].check=false
    //   }}

    //   console.log(JSON.stringify(editData))
    //   setdata(editData)
    // },[])

    function changeToggle(inner_index, type) {
        console.log(type + '********' + data.switches[inner_index].found_sub)
        let old_data = { ...data }
        if (type == "sw") {
            old_data.switches[inner_index].found_sub = !old_data.switches[inner_index].found_sub
            setdata(old_data)
            // console.log(old_data[index].switches[inner_index].found_sub)
        } else if (type == "dev") {
            old_data.devices[inner_index].found_sub = !old_data.devices[inner_index].found_sub
            setdata(old_data)
            // console.log(old_data[index].devices[inner_index].found_sub)
        } else if (type == "sen") {
            old_data.sensors[inner_index].found_sub = !old_data.sensors[inner_index].found_sub
            setdata(old_data)
            // console.log(old_data[index].devices[inner_index].found_sub)
        }

    }
    function submit() {
        console.log(data)
        setLoading(true)
        let devStr = []
        let senStr = []
        let swStr = []
        for (let i = 0; i < data.devices.length; i++) {
            if (data.devices[i].found_sub == true) {
                devStr.push(data.devices[i].device_id)
            }
        }
        for (let i = 0; i < data.sensors.length; i++) {
            if (data.sensors[i].found_sub == true) {
                senStr.push(data.sensors[i].sensor_id)
            }
        }
        for (let i = 0; i < data.sensors.length; i++) {
            if (data.switches[i].found_sub == true) {
                swStr.push(data.switches[i].switch_id)
            }
        }
        console.log(devStr.join("*"))
        console.log(senStr.join("*"))
        console.log((senStr.join("*")||"empty") + "**smart**" +( devStr.join("*")||"empty") + "**smart**" + (swStr.join("*")||"empty"))
        axios.post("https://camp-coding.tech/smart_home/home/add_sub_user.php", {
            room_id: data.room_id,
            sub_users_data: (senStr.join("*")||"empty") + "**smart**" +( devStr.join("*")||"empty") + "**smart**" + (swStr.join("*")||"empty")

        }).then((res) => {
            // console.log(res.data)
            if (res?.data?.status == "success") {
                utils.toastAlert("success", "Done successfully")
                setLoading(false)
            } else {
                utils.toastAlert("error", "Erorr happen try again later")
                setLoading(false)
            }
        })
        // setLoading(false)

    }

    //   function changeshow(index) {
    //     let old_data = [...data]

    //     if (old_data[index].show) {
    //       old_data[index].show = false
    //     } else {
    //       for (let i = 0; i < old_data.length; i++) {
    //         old_data[i].show = false
    //       }
    //       old_data[index].show = true
    //     }


    //     setdata(old_data)
    //     // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

    //   }
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







                            <View
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
                                    marginBottom: SIZES.base
                                }}
                            >

                                <Text
                                    style={{

                                    }}
                                >
                                    {sw_item.name}
                                </Text>
                                <CheckBox
                                    style={{
                                    }}
                                    // disabled={false}
                                    value={sw_item?.found_sub}
                                    onValueChange={(newValue) => changeToggle(sw_index, "sw")}
                                />



                            </View>



                        </>))}

                    {data?.sensors.map((sw_item, sw_index) => (
                        <>







                            <View
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
                                    marginBottom: SIZES.base
                                }}
                            >

                                <Text
                                    style={{

                                    }}
                                >
                                    {sw_item.name}
                                </Text>
                                <CheckBox
                                    style={{
                                    }}
                                    // disabled={false}
                                    value={sw_item?.found_sub}
                                    onValueChange={(newValue) => changeToggle(sw_index, "sen")}
                                />



                            </View>



                        </>))}
                    {data?.devices.map((sw_item, sw_index) => (
                        <>







                            <View
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
                                    marginBottom: SIZES.base
                                }}
                            >

                                <Text
                                    style={{

                                    }}
                                >
                                    {sw_item.name}
                                </Text>
                                <CheckBox
                                    style={{
                                    }}
                                    // disabled={false}
                                    value={sw_item?.found_sub}
                                    onValueChange={(newValue) => changeToggle(sw_index, "dev")}
                                />



                            </View>



                        </>))}

                </View>








            </ScrollView>
            <TextButton
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

            />
            {/* </View> */}
        </View>
    )
}


export default SubDevices;