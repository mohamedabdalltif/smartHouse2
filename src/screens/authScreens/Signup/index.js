import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Linking, TextInput } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { CustomTextInput, TextButton } from '../../../components';
import utils from '../../../utils';


const Signup = ({ navigation }) => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [checked, setChecked] = useState(false)
    const [emailError, setemailError] = React.useState(false);
    const [passError, setPassError] = React.useState(false);
    const [fullname, setFullname] = useState('')
    const [fullnameError, setFullnameError] = useState(false)
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {

        var re = /^01[0125][0-9]{8}$/;
        var em = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;


        return em.test(email);
    }
    const validatePassword = (password) => {
        var pass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/
        return pass.test(password);

    }

    const signUp = () => {
        setLoading(true)
        if (fullname === "") {
            setFullnameError(true)

        }
        if (validateEmail(Email) === false || Email === "") {

            setemailError(true)

        }
        if (validatePassword(Password) === false || Password === "") {
            setPassError(true)
            setLoading(false)
            return;
        }
        if(checked){
            navigation.navigate("SeconedStepVerify")

        }else{
            utils.toastAlert("error","please accept privacy policy")
        }
        // let user = {
        //     user_email: Email,
        //     user_name: "",
        //     user_photo: null,
        //     user_token: null,
        //     user_password: Password
        // }
        // dispatch(setTempUser(user))
        // navigation.navigate("FillProfile")

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
                <TouchableOpacity
                 onPress={()=>{
                    navigation.navigate("Faq")
                  }} 
                 >
                    {/* <FastImage
                        source={icons.faqButton}
                        style={{
                            width: RFValue(50),
                            height: RFValue(50),
                        }}

                    /> */}

                </TouchableOpacity>


            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{
                    ...FONTS.body1,
                    fontFamily: FONTS.fontFamilyBold,
                    color: COLORS.black,
                    textAlign: "center",
                    marginVertical: SIZES.margin
                }}>Let's get started</Text>

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
                    marginVertical: fullnameError ? SIZES.base : SIZES.margin
                }}

                    value={fullname} placeholder={"Fullname"} onChangeText={(txt) => {
                        setFullname(txt)
                        setFullnameError(false)
                    }}

                />
                {fullnameError === true ? <Text style={[FONTS.h5, { color: COLORS.red, alignSelf: "center", marginBottom: SIZES.base }]}>{"please enter your name"}</Text> : null}


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
                        marginBottom: emailError ? SIZES.base : SIZES.margin
                    }}
                    value={Password} placeholder={"Password"} type={"password"} onChangeText={(txt) => {
                        setPassword(txt)
                        setPassError(false)
                    }} />
                {passError === true ? <Text style={[FONTS.h5, { color: COLORS.red, alignSelf: "center", marginBottom: SIZES.base }]}>{"Invalid Password"}</Text> : null}


                {/* <View style={{ flexDirection: "row", marginTop: SIZES.margin,marginLeft:SIZES.margin }}>
                    <TouchableOpacity onPress={() => {
                        setChecked(!checked)
                    }} style={{ width: RFValue(20), height: RFValue(20), borderRadius: RFValue(5), borderWidth: 2, marginRight: SIZES.margin, alignItems: "center", justifyContent: "center", backgroundColor: checked ? COLORS.black : null, borderColor: checked ? null: COLORS.black }}>
                        {checked ? (<FastImage style={{ width: RFValue(12), height: RFValue(12) }} tintColor={COLORS.white} source={icons.check} resizeMode='contain' />) : null}

                    </TouchableOpacity>


                    <Text style={[FONTS.h5, { color: COLORS.black }]}>I agree <Text style={{color:COLORS.primary,textDecorationLine:"underline"}}>Privacy Policy</Text> and <Text style={{color:COLORS.primary,textDecorationLine:"underline"}}>User Agreement</Text></Text>
                </View> */}


                <TextButton
                    onPress={() => signUp()}
                    buttonContainerStyle={{
                        backgroundColor: COLORS.black,
                        width: "100%",
                        alignSelf: "center",
                        marginTop: SIZES.margin * 2,
                        height: RFValue(55),
                        borderRadius: RFValue(50),
                        marginBottom: SIZES.base
                    }}
                    label={"Register"}

                />
{/* 
                <Text
                    style={{
                        ...FONTS.body5,
                        textAlign: "center",
                        marginBottom: SIZES.base
                    }}
                >

                    Or Login With
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "center"
                    }}
                >

                    <TouchableOpacity >
                        <FastImage
                            source={icons.googleButton}
                            style={{
                                width: RFValue(50),
                                height: RFValue(50),
                                marginRight: SIZES.base
                            }}

                        />

                    </TouchableOpacity>
                    <TouchableOpacity >
                        <FastImage
                            source={icons.facebookButton}
                            style={{
                                width: RFValue(50),
                                height: RFValue(50),
                                marginRight: SIZES.base,
                                marginBottom: SIZES.margin
                            }}

                        />

                    </TouchableOpacity>

                </View> */}
                <View style={{ flexDirection: "row", alignSelf: "center" ,marginTop:SIZES.margin}}>
                    <Text style={[FONTS.h5, { color: COLORS.black, marginRight: SIZES.base }]}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Login")
                        }}
                    >
                        <Text style={[FONTS.h5, { fontWeight: "bold", color: COLORS.primary, textDecorationLine: "underline" }]} >
                            Login
                        </Text>
                    </TouchableOpacity>

                </View>







            </ScrollView>
        </View>


    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: SIZES.padding,
        backgroundColor: COLORS.white
    }


});

export default Signup;