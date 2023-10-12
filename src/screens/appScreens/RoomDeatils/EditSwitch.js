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
    ScrollView
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

import LottieView from 'lottie-react-native';
// import {Image} from 'react-native-animatable';

import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SwitchToggle from 'react-native-switch-toggle';
import moment from 'moment';
import { FormInput } from '../../../components';
import utils from '../../../utils';

import Slider from 'react-native-slider'

import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios';

const EditSwitche = ({ navigation, route }) => {
    const { psdata, type } = route.params;
    const [name, setName] = useState(psdata.name);
    const [topic, setTopic] = useState(psdata.topic);
    const [redtopic, setRedTopic] = useState(psdata.red_topic);
    const [greentopic, setGreenTopic] = useState(psdata.green_topic);
    const [bluetopic, setBlueTopic] = useState(psdata.blue_topic);
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);
    const [deviceTypeModal, setDeviceTypeModal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);
    // useEffect(() => {
    //     console.log(psdata)
    // }, [

    // ])

    const editSwitch = () => {
        setLoading(true)
        // console.log(psdata)
        if (
            (type === "" && name !== '' && topic !== '')
            ||
            (type === "rgb" && name !== '' && topic !== '' && redtopic !== '' && greentopic !== '' && bluetopic !== '')
        ) {
            const data_send = {
                switch_id: psdata.switch_id,
                name: name,
                topic: type == "rgb" ? topic + "*smart*" + redtopic + "*smart*" + greentopic + "*smart*" + bluetopic : topic
            }
            // console.log(data_send)
            axios.post("https://camp-coding.tech/smart_home/switchs/update_switch.php", data_send).then((res) => {
                console.log(res.data)
                if (res.data.status == "success") {
                    utils.toastAlert("success", "Switch edited successfully")
                    navigation.navigate("Home")
                    setLoading(false)
                } else {
                    utils.toastAlert("error", "Error happen please try again later")
                    setLoading(false)
                }

            })
        }
        else {
            utils.toastAlert("error", "Please enter all values")
            setLoading(false)
        }
    }

    const deleteSwitch=()=>{
        setDelLoading(true)
        axios.post("https://camp-coding.tech/smart_home/switchs/delete_switch.php",{
            switch_id: psdata.switch_id
        }).then((res)=>{
            if (res.data.status == "success") {
                utils.toastAlert("success", "Switch deleted successfully")
                navigation.navigate("Home")
                setDelLoading(false)
            } else {
                utils.toastAlert("error", "Error happen please try again later")
                setDelLoading(false)
            }
        })
    }



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
                        width:"100%",
                        justifyContent: "space-between",
                        // backgroundColor:"red"

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
                           deleteSwitch()
                        }}
                        style={{
                            width: RFValue(50),
                            height: RFValue(50),
                            // position: "absolute",
                            backgroundColor: COLORS.black,
                            // bottom: "12%",
                            // right: 0,
                            borderRadius: RFValue(20),
                            // marginRight: RFValue(10),
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                         {delLoading?<ActivityIndicator size={15} color={COLORS.white}/>:
                        <MaterialCommunityIcons name={"trash-can"} size={RFValue(15)} color={COLORS.white} />
                    }


                    </TouchableOpacity>
                    {/* <View /> */}




                </View>


            </ImageBackground>

            <ScrollView contentContainerStyle={{
                padding: SIZES.margin,
                // backgroundColor: COLORS.white,
                // flex: 1,
                paddingBottom: SIZES.padding
            }}
                showsVerticalScrollIndicator={false}

            >
                <Text
                    style={{
                        ...FONTS.body4,
                        fontWeight: 'bold',
                        color: COLORS.primary,
                        textAlign: "center"
                    }}>
                    Edit Switch
                </Text>

                <TextInput
                    style={{
                        width: '90%',
                        // height: 50,
                        // backgroundColor: '#ddd',
                        borderWidth: 2,
                        alignSelf: 'center',
                        marginTop: RFValue(20),
                        borderRadius: RFValue(15),
                        borderColor: '#B6B6B6',
                        padding: RFValue(12),
                    }}
                    placeholder="Enter your Switch name"
                    value={name}
                    onChangeText={value => {
                        setName(value)
                    }}
                />

                <TextInput
                    style={{
                        width: '90%',
                        // height: 50,
                        // backgroundColor: '#ddd',
                        borderWidth: 2,
                        alignSelf: 'center',
                        marginTop: RFValue(20),
                        borderRadius: RFValue(15),
                        borderColor: '#B6B6B6',
                        padding: RFValue(12),
                    }}
                    placeholder="Enter your Switch Topic"
                    value={topic}
                    onChangeText={value => {
                        setTopic(value)
                    }}
                />

                {type == "rgb" &&
                    <>


                        <>

                            <TextInput
                                style={{
                                    width: '90%',
                                    // height: 50,
                                    // backgroundColor: '#ddd',
                                    borderWidth: 2,
                                    alignSelf: 'center',
                                    marginTop: RFValue(20),
                                    borderRadius: RFValue(15),
                                    borderColor: '#B6B6B6',
                                    padding: RFValue(12),
                                }}
                                placeholder="Enter your Switch Red Topic"
                                value={redtopic}
                                onChangeText={value => {
                                    setRedTopic(value)
                                }}
                            />
                            <TextInput
                                style={{
                                    width: '90%',
                                    // height: 50,
                                    // backgroundColor: '#ddd',
                                    borderWidth: 2,
                                    alignSelf: 'center',
                                    marginTop: RFValue(20),
                                    borderRadius: RFValue(15),
                                    borderColor: '#B6B6B6',
                                    padding: RFValue(12),
                                }}
                                placeholder="Enter your Switch Green Topic"
                                value={greentopic}
                                onChangeText={value => {
                                    setGreenTopic(value)
                                }}
                            />

                            <TextInput
                                style={{
                                    width: '90%',
                                    // height: 50,
                                    // backgroundColor: '#ddd',
                                    borderWidth: 2,
                                    alignSelf: 'center',
                                    marginTop: RFValue(20),
                                    borderRadius: RFValue(15),
                                    borderColor: '#B6B6B6',
                                    padding: RFValue(12),
                                }}
                                placeholder="Enter your Switch Blue Topic"
                                value={bluetopic}
                                onChangeText={value => {
                                    setBlueTopic(value)
                                }}
                            />
                        </>

                        <View
                            style={{
                                width: "90%",
                                paddingHorizontal: SIZES.padding,
                                backgroundColor: COLORS.gray3,
                                borderRadius: 15,
                                marginVertical: SIZES.margin,
                                paddingVertical: SIZES.margin,
                                alignSelf: "center"
                            }}>
                            <MaterialCommunityIcons
                                name={"lamp"}
                                style={{
                                    fontSize: RFValue(25),
                                    alignSelf: "center",
                                    color: `rgb(${red},${green},${blue})`
                                }}

                            />
                        </View>

                        <View style={{
                            width: "90%",
                            paddingHorizontal: SIZES.padding,
                            backgroundColor: COLORS.gray3,
                            borderRadius: 15,
                            marginVertical: SIZES.margin,
                            paddingTop: SIZES.base,
                            alignSelf: "center"
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{
                                    ...FONTS.body4,
                                    marginBottom: SIZES.base,
                                    color: `rgb(${red},0,0)`,
                                    fontWeight: "700"

                                }}>{"red"}</Text>

                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: `rgb(${red},0,0)`,
                                        fontWeight: "700"

                                    }}
                                >{red}</Text>


                            </View>
                            <Slider
                                value={red}
                                step={1}
                                minimumValue={0}
                                maximumValue={255}



                                onValueChange={(value) => setRed(value)}

                            />

                        </View>
                        <View style={{
                            width: "90%",
                            paddingHorizontal: SIZES.padding,
                            backgroundColor: COLORS.gray3,
                            borderRadius: 15,
                            marginVertical: SIZES.margin,
                            paddingTop: SIZES.base,
                            alignSelf: "center"
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{
                                    ...FONTS.body4,
                                    marginBottom: SIZES.base,
                                    color: `rgb(0,${green},0)`,
                                    fontWeight: "700"

                                }}>{"green"}</Text>

                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: `rgb(0,${green},0)`,
                                        fontWeight: "700"

                                    }}
                                >{green}</Text>


                            </View>
                            <Slider
                                value={green}
                                step={1}
                                minimumValue={0}
                                maximumValue={255}
                                onValueChange={(value) => setGreen(value)}

                            />

                        </View>
                        <View style={{
                            width: "90%",
                            paddingHorizontal: SIZES.padding,
                            backgroundColor: COLORS.gray3,
                            borderRadius: 15,
                            marginVertical: SIZES.margin,
                            paddingTop: SIZES.base,
                            alignSelf: "center"
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{
                                    ...FONTS.body4,
                                    marginBottom: SIZES.base,
                                    color: `rgb(0,0,${blue})`,
                                    fontWeight: "700"

                                }}>{"blue"}</Text>

                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: `rgb(0,0,${blue})`,
                                        fontWeight: "700"

                                    }}
                                >{blue}</Text>


                            </View>
                            <Slider
                                value={blue}
                                step={1}
                                minimumValue={0}
                                maximumValue={255}
                                onValueChange={(value) => setBlue(value)}

                            />

                        </View>
                    </>
                }


                <TouchableOpacity
                    onPress={() => {
                        // navigation.goBack()
                        editSwitch()

                    }}
                    style={{
                        width: 250,
                        // height: 100,
                        alignSelf: 'center',
                        backgroundColor: COLORS.primary,
                        marginTop: RFValue(50),
                        alignItems: 'center',
                        padding: RFValue(15),
                        borderRadius: RFValue(50),
                    }}>
                    {
                        loading ?
                            <ActivityIndicator size={RFValue(20)} color={COLORS.white} /> :
                            <Text
                                style={{
                                    ...FONTS.body3,

                                    alignSelf: 'center',

                                    color: COLORS.white,
                                    fontWeight: "bold"
                                }}>
                                Edit Switch
                            </Text>
                    }
                </TouchableOpacity>


            </ScrollView>


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

export default EditSwitche;
