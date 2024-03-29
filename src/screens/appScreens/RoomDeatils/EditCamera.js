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
import SwitchToggle from 'react-native-switch-toggle';
import moment from 'moment';
import { FormInput } from '../../../components';
import utils from '../../../utils';



import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios';

const EditCamera = ({ navigation, route }) => {
    const { userData } = useSelector(state => state.UserReducer);
    const { psdata, type } = route.params;
    const [name, setName] = useState(psdata.title);
    const [topic, setTopic] = useState(psdata.link);
    const [loading, setLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);




    const editCamera = () => {
        setLoading(true)
        // console.log(psdata)

        const data_send = {
            camera_id: psdata.camera_id,
            title: name,
            link: topic
        }
        // console.log(data_send)

        axios.post("https://camp-coding.tech/smart_home/camera/edit_camera.php", data_send).then((res) => {
            console.log(res.data)
            if (res.data.status == "success") {
                utils.toastAlert("success", "Camera edited successfully")
                navigation.navigate("Home")
                setLoading(false)
            } else {
                utils.toastAlert("error", "Error happen please try again later")
                setLoading(false)
            }

        })

    }

    const deleteCamera = () => {
        setDelLoading(true)
        axios.post("https://camp-coding.tech/smart_home/camera/delete_camera.php", {
            camera_id: psdata.camera_id
        }).then((res) => {
            if (res.data.status == "success") {
                utils.toastAlert("success", "Camera deleted successfully")
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
                    {userData.user_id == 3 && <TouchableOpacity
                        onPress={() => {
                            deleteCamera()
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
                        {delLoading ? <ActivityIndicator size={15} color={COLORS.white} /> :
                            <MaterialCommunityIcons name={"trash-can"} size={RFValue(15)} color={COLORS.white} />
                        }


                    </TouchableOpacity>
                    }
                    {/* <View /> */}



                </View>


            </ImageBackground>

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
                    Edit Camera
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
                    placeholder="Enter your Camera name"
                    value={name}
                    onChangeText={value => {
                        setName(value)
                    }}
                />

                {userData.user_id == 3 && <TextInput
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
                    placeholder="Enter your Camera Link"
                    value={topic}
                    onChangeText={value => {
                        setTopic(value)
                    }}
                />
                }



                <TouchableOpacity
                    onPress={() => {
                        editCamera()
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
                                Edit Camera
                            </Text>
                    }
                </TouchableOpacity>


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

export default EditCamera;
