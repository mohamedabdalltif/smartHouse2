import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';

import { images, icons } from "../../../constants"
import FastImage from 'react-native-fast-image';
import { ActivityIndicator, TextInput } from 'react-native-paper';

import { CustomTextInput, TextButton } from '../../../components';
import axios from 'axios';
import utils from '../../../utils';
const ForgetPassword = ({ navigation }) => {
    const [Email, setEmail] = useState('')
    const [emailError, setemailError] = useState(false);
    const [loading, setLoading] = useState(false);

    const SendCode = () => {
        setLoading(true)
        if (Email !== "") {
            const verficationCode = Math.floor(10000000 + Math.random() * 90000000)

            // let data_to_send = {
            //     email: Email,
            //     code: verficationCode
            // }
            // axios.post("https://camp-coding.online/ahmed_cash/user/send_code.php", data_to_send).then(
            //     (res) => {
            //         if (res.status == "200") {
            //             if (res.data.status == "success") {
            //                 utils.toastAlert("success", res.data.message)
            //                 navigation.navigate("SeconedStepVerify",{
            //                     psData:data_to_send,
            //                     title:"forget",
                                
            //                 }
            //                 )
            //                 setLoading(false)
            //             } else {
            //                 utils.toastAlert("error", res.data.message)
            //                 setLoading(false)
            //             }

            //         } else {
            //             utils.toastAlert("error", "حدث خطأ ما")
            //             setLoading(false)
            //         }
            //     }
            // )
            navigation.navigate("SeconedStepVerify")
        } else {
            setemailError(true)
            setLoading(false)
        }
    }

    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: SIZES.margin
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <FastImage
                        source={icons.arrowLeftButton}
                        style={{
                            width: RFValue(50),
                            height: RFValue(50),
                        }}

                    />

                </TouchableOpacity>



            </View>
        )
    }
    const renderDefaultScrean = () => {
        return (
            <>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: SIZES.margin
                }}>

                    <Text style={[FONTS.body1, { fontWeight: "bold", color: COLORS.black, fontFamily: FONTS.fontFamilyRegular }]}>
                       Forget your password
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}

                    >
                        <FastImage source={icons.arrowBack} style={{ width: RFValue(24), height: RFValue(24) }} resizeMode='contain' tintColor={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        ...FONTS.body3,
                        marginVertical: SIZES.margin,
                        color: COLORS.black,
                    }}
                >
                  Don't worry you can reset your password,Tell us your email only.
                </Text>

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
                    marginBottom: emailError ? SIZES.base : SIZES.margin
                }}

                    value={Email} placeholder={"Email"} onChangeText={(txt) => {
                        setEmail(txt)
                        setemailError(false)
                    }}

                />
                {emailError === true ? <Text style={[FONTS.h5, { color: COLORS.red, alignSelf: "center", marginBottom: SIZES.base }]}>{"Invalid Email"}</Text> : null}
     </>
        )
    }









    return (
        <View style={styles.mainContainer}>
            <Header/>
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderDefaultScrean()}
                <TextButton
                    onPress={() => {
                        SendCode()
                       
                    }}
                    buttonContainerStyle={{ width: "60%", height: RFValue(50), borderRadius: RFValue(30), alignSelf: "center", marginVertical: SIZES.margin,backgroundColor:COLORS.black }} label={"Send"}
                    labelStyle={{
                        ...FONTS.body4
                    }}
                loading={loading}
                />

            </ScrollView>
        </View>

    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: SIZES.padding,
        backgroundColor:COLORS.white
    },
    buttonContainer: {
        alignSelf: "center",
        width: "65%",
        height: RFValue(45),
        borderRadius: 50,
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // paddingLeft: SIZES.padding,
        marginBottom: SIZES.margin,
        borderColor: "#BEBEBE"

    },
    buttonText: [FONTS.h5,
    {
        marginLeft: SIZES.margin / 2,
        color: COLORS.black,
    }],
    methodSendContainer: {
        width: RFValue(65),
        height: RFValue(65),
        borderRadius: RFValue(32.5),
        backgroundColor: COLORS.gray4,
        alignItems: "center",
        justifyContent: "center",
        marginRight: SIZES.margin
    },

    otpContainer: {
        marginHorizontal: SIZES.margin,
        marginBottom: SIZES.margin,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor:"red"
    },
    otpBox: {
        borderRadius: RFValue(7),
        backgroundColor: COLORS.gray4
        // borderColor: COLORS.green,
        // borderWidth: 0.5,
    },
    otpText: {

        color: COLORS.black,
        // padding: 0,
        textAlign: 'center',
        paddingHorizontal: SIZES.margin,
        paddingVertical: SIZES.base,
    },
    newPassTextInput: {
        alignSelf: "center",
        width: "100%",
        height: RFValue(45),
        borderRadius: RFValue(50),
        borderWidth: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.padding,
        marginBottom: SIZES.margin,
        borderColor: COLORS.gray
    }

});

export default ForgetPassword;




