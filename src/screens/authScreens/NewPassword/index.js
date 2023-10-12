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
const NewPassword = ({ navigation, route }) => {
    const { email } = route.params;
    const [Password, setPassword] = useState('')
    const [passError, setPassError] = React.useState(false);
    const [passwordShow, setPasswordShow] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)

    const validatePassword = (password) => {
        var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
        return pass.test(password);

    }
    const UpdatePass = () => {
        setLoading(true)
        let haveError = false
        if (validatePassword(Password) === false || Password === "") {
            setPassError(true)
            haveError = true;

        }
        if (confirmPassword === "" || confirmPassword !== Password) {
            setConfirmPasswordError(true)
            haveError = true;
        }

        if (!haveError) {
            let data_to_send = {
                email: email,
                new_password: Password
            }
            console.log(data_to_send)
            axios.post("https://camp-coding.online/ahmed_cash/user/reset_password.php", data_to_send).then(
                (res) => {
                    if (res.status == "200") {
                        if (res.data.status == "success") {
                            utils.toastAlert("success", res.data.message)
                            navigation.navigate("Login"
                            )
                            setLoading(false)
                        } else {
                            utils.toastAlert("error", res.data.message)
                            setLoading(false)
                        }

                    } else {
                        utils.toastAlert("error", "حدث خطأ ما")
                        setLoading(false)
                    }
                }
            )
        } else {
            utils.toastAlert("error", "تأكد من ادخال الكود بطريقة صحيحة")
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
                {/* <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: SIZES.margin
                }}>

                    <Text style={[FONTS.body1, { fontWeight: "bold", color: COLORS.primary, fontFamily: FONTS.fontFamilyRegular,
                textAlign:"center" }]}>
                       Create New Password
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}

                    >
                        <FastImage source={icons.arrowBack} style={{ width: RFValue(24), height: RFValue(24) }} resizeMode='contain' tintColor={COLORS.primary} />
                    </TouchableOpacity>
                </View> */}

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: SIZES.margin
                }}>

                    <Text style={[FONTS.body1, { fontWeight: "bold", color: COLORS.black, fontFamily: FONTS.fontFamilyRegular }]}>
                        Create New Password
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}

                    >
                        <FastImage source={icons.arrowBack} style={{ width: RFValue(24), height: RFValue(24) }} resizeMode='contain' tintColor={COLORS.primary} />
                    </TouchableOpacity>
                </View>


                {/* <TextInput
                    error={passError ? true : false}
                    style={{alignSelf: "center",
                        width: "100%",
                        height: RFValue(55),
                        borderRadius: RFValue(50),
                        // borderWidth: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: COLORS.gray3,
                        paddingRight: SIZES.padding,
                        marginBottom: passError ? SIZES.base : SIZES.margin }}
                    contentStyle={{ borderBottomColor: COLORS.primary }}

                    label="كلمة المرور"
                    value={Password}
                    onChangeText={text => {
                        setPassword(text)
                        setPassError(false)
                    }}
                    secureTextEntry={passwordShow ? true : false}
                    right={<TextInput.Icon name="eye" icon={passwordShow ? icons.show : icons.invisible} onPress={() => {
                        setPasswordShow(!passwordShow)

                    }} />}

                    textContentType='password'
                    underlineColor={COLORS.primary}
                    activeOutlineColor={COLORS.primary}
                    activeUnderlineColor={COLORS.primary}
                /> */}
                <CustomTextInput

                    TextContainerStyle={{
                        alignSelf: "center",
                        width: "100%",
                        height: RFValue(55),
                        borderRadius: RFValue(50),
                        // borderWidth: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: COLORS.gray3,
                        paddingRight: SIZES.padding,
                        marginBottom: passError ? SIZES.base : SIZES.margin
                    }}
                    value={Password} placeholder={"Password"} type={"password"} onChangeText={(txt) => {
                        setPassword(txt)
                        setPassError(false)
                    }} />
                {passError === true ? <Text style={[FONTS.h5, { color: COLORS.red, alignSelf: "center", marginBottom: SIZES.base }]}>{"Invalid Password"}</Text> : null}
                {/* <TextInput
                    error={confirmPasswordError ? true : false}
                    style={{ backgroundColor: null, marginBottom: SIZES.margin }}
                    contentStyle={{ borderBottomColor: COLORS.primary }}

                    label="تاكيد كلمة المرور "
                    value={confirmPassword}
                    onChangeText={text => {
                        setPassword(text)
                        setPassError(false)
                    }}

                    secureTextEntry={confirmPasswordShow ? true : false}
                    right={<TextInput.Icon name="eye" icon={confirmPasswordShow ? icons.show : icons.invisible} onPress={() => {
                        setConfirmPasswordShow(!confirmPasswordShow)

                    }} />}
                    textContentType='password'
                    underlineColor={COLORS.primary}
                    activeOutlineColor={COLORS.primary}
                    activeUnderlineColor={COLORS.primary}
                /> */}

                <CustomTextInput

                    TextContainerStyle={{
                        alignSelf: "center",
                        width: "100%",
                        height: RFValue(55),
                        borderRadius: RFValue(50),
                        // borderWidth: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: COLORS.gray3,
                        paddingRight: SIZES.padding,
                        marginBottom: confirmPasswordError ? SIZES.base : SIZES.margin
                    }}
                    value={Password} placeholder={"Confirm Password"} type={"password"} onChangeText={(txt) => {
                        setConfirmPassword(txt)
                        setConfirmPasswordError(false)
                    }} />
                {confirmPasswordError === true ? <Text style={[FONTS.h5, { color: COLORS.red, alignSelf: "center", marginBottom: SIZES.base }]}>{"Invalid Password"}</Text> : null}










            </>
        )
    }









    return (
        <View style={styles.mainContainer}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderDefaultScrean()}
                {/* <TextButton
                    onPress={() => {
                        UpdatePass()
                    }}
                    buttonContainerStyle={{ width: "60%", height: RFValue(50), borderRadius: RFValue(10), alignSelf: "center", marginVertical: SIZES.margin }} label={"Confirm"}
                    labelStyle={{
                        ...FONTS.body4
                    }}
                    loading={loading}
                /> */}

                <TextButton
                    onPress={() => {
                        UpdatePass()

                    }}
                    buttonContainerStyle={{ width: "60%", height: RFValue(50), borderRadius: RFValue(30), alignSelf: "center", marginVertical: SIZES.margin, backgroundColor: COLORS.black }} label={"Confirm"}
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
        padding: SIZES.padding / 1.5,
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

export default NewPassword;




