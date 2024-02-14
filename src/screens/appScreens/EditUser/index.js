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
    StatusBar, Platform, UIManager, LayoutAnimation, Image, Alert, Modal, TextInput
} from "react-native";

import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
const initialDimensions = Dimensions.get('screen');

import CheckBox from '@react-native-community/checkbox';
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, icons, FONTS } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import { TextButton } from "../../../components";
import utils from "../../../utils";

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


const EditUser = ({ route, navigation }) => {
    const { userData } = useSelector(state => state.UserReducer);
    // const { appData } = useSelector(state => state.AppReducer);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [loading, setLoading] = useState(true)
    const [updateLoading, setUpdateLoading] = useState(false)

    const [current_index, setcurrent_index] = useState(-1)

    const [UserDetailModal, setUserDetailModal] = useState(false)
    const [UserConnectionName, setUserConnectionName] = useState("")
    const [UserConnectionPass, setUserConnectionPass] = useState("")
    const [UserPass, setUserPass] = useState("")

    const [data, setdata] = React.useState(
        []
        //  JSON.parse(JSON.stringify(appData))

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
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData()

        });

        return unsubscribe;
    }, [navigation])

    function getData() {
        // console.log(userData)
        // Alert.alert("hrtr")
        axios.get("https://camp-coding.tech/smart_home/home/select_all_users.php").then((res) => {
            console.log(res.data)
            if (res.data.status == "success") {
                setLoading(false)


                setdata(res.data.message)
                // console.log(res.data.message)
                // setLoading(false)
                // dispatch(setAppData(arr))

            } else {
                // dispatch(setAppData([]))
                setdata([])
                setLoading(false)
            }
        })



    }
    function update_data() {
        // console.log(userData)
        // Alert.alert("hrtr")

        axios.post("https://camp-coding.tech/smart_home/auth/edit_user_con.php", {
            user_id: current_index,
            connection_user_name: UserConnectionName,
            connection_pass: UserConnectionPass,
            user_pass: UserPass

        }).then((res) => {
            console.log(res.data)
            if (res.data.status == "success") {
                // setLoading(false)
                setUserDetailModal(false)
                setUpdateLoading(false)
                utils.toastAlert("success", "update successfully")



            } else {
                setUserDetailModal(false)
                utils.toastAlert("error", "error happen")
                setUpdateLoading(false)
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
                                    navigation.navigate("EditUserRoom", {
                                        user_id: data[index].user_id
                                    })
                                }}
                                style={{
                                    backgroundColor: COLORS.gray3, marginBottom: SIZES.base,
                                    width: "90%",
                                    alignItems: "center",
                                    alignSelf: "center",
                                    paddingVertical: SIZES.padding,
                                    marginTop: SIZES.margin,
                                    borderRadius: SIZES.radius,
                                    flexDirection: "row",
                                    paddingHorizontal: RFValue(10),
                                    justifyContent: "space-between"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        color: COLORS.primary,
                                        // marginBottom:SIZES.margin
                                    }}
                                >
                                    {data[index].user_name}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setUpdateLoading(true)
                                        setcurrent_index(data[index].user_id)
                                        setUserConnectionName(data[index].connection_user_name)
                                        setUserConnectionPass(data[index].connection_pass)
                                        setUserPass(data[index].password)
                                        setUserDetailModal(true)

                                    }}
                                >
                                    <Image source={icons.edit} style={{ width: RFValue(20), height: RFValue(20) }} tintColor={COLORS.primary} />
                                </TouchableOpacity>



                            </TouchableOpacity>





                        </>


                    ))}
                </ScrollView>
                : <ActivityIndicator size={50} style={{ marginTop: SIZES.margin * 2 }} />}
            {/* </View> */}
            <Modal
                transparent
                visible={UserDetailModal}
                onRequestClose={() => {
                    setUserDetailModal(false)
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
                            Please Enter Connection Details
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
                            placeholder="Connection UserName"
                            value={UserConnectionName}
                            onChangeText={value => {
                                setUserConnectionName(value)
                            }}
                        // onBlur={()=>{

                        // }}
                        />
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
                            placeholder="Connection Password"

                            value={UserConnectionPass}
                            onChangeText={value => {
                                setUserConnectionPass(value)
                            }}
                        // onBlur={()=>{

                        // }}
                        />

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

                            value={UserPass}
                            onChangeText={value => {
                                setUserPass(value)
                            }}
                        // onBlur={()=>{

                        // }}
                        />


                        <TextButton
                            onPress={() => {
                                update_data()
                            }}
                            label={"OK"}
                            buttonContainerStyle={{
                                width: "40%",
                                paddingVertical: SIZES.base,
                                marginVertical: SIZES.base,
                                borderRadius: RFValue(10),
                                alignSelf: "center"
                            }}
                        />


                    </View>

                </View>

            </Modal>
        </View>
    )
}


export default EditUser;