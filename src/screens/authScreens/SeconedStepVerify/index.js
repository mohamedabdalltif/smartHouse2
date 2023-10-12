import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomTextInput, ModalPopup, TextButton } from '../../../components';
import { images, icons } from "../../../constants"
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native-paper';


const SeconedStepVerify = ({ navigation }) => {



    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const [prevRef, setPrevRef] = useState(firstInput)
    const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' });


    const [timer, setTimer] = useState(60);
    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    return prevTimer;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    });





    const VerificationScreen = () => {


        return (
            <>
             <View style={{width:"70%",alignSelf:"center",marginBottom: SIZES.margin*2}}>
                <Text style={{ marginTop: SIZES.margin,marginBottom:SIZES.base, textAlign: "center", color: COLORS.black, ...FONTS.body1,fontFamily:FONTS.fontFamilyBold }}>
                    Enter the verification code
                </Text>
                <Text style={{  textAlign: "center", color: COLORS.gray, ...FONTS.body5 }}>
                    A 5 digit verification code has been sent to your registered email address
                </Text>

                </View>




                <View style={styles.otpContainer}>
                    <View style={{ ...styles.otpBox, borderWidth: prevRef === firstInput ? 1 : 0, borderColor: COLORS.black,backgroundColor:COLORS.gray3 }}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={firstInput}
                            onPressIn={() => {
                                setPrevRef(firstInput)
                            }}
                            onChangeText={text => {
                                setOtp({ ...otp, 1: text });



                                if (text) {
                                    setPrevRef(null)
                                    if (otp['2'] === "") {

                                        secondInput.current.focus()
                                        setPrevRef(secondInput)
                                    }
                                }

                            }}
                        // onBlur={()=>{
                        //     secondInput.current.focus()
                        //     setPrevRef(secondInput)
                        // }}
                        />
                    </View>
                    <View style={{ ...styles.otpBox, borderWidth: prevRef === secondInput ? 1 : 0, borderColor: COLORS.black,backgroundColor:COLORS.gray3 }}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={secondInput}
                            onPressIn={() => {
                                setPrevRef(secondInput)
                            }}
                            onChangeText={text => {
                                setOtp({ ...otp, 2: text });


                                if (text) {
                                    setPrevRef(null)
                                    if (otp['3'] === "") {
                                        thirdInput.current.focus()
                                        setPrevRef(thirdInput)
                                    }
                                }
                                // else {
                                //     firstInput.current.focus()
                                //     setPrevRef(firstInput)
                                // }

                            }}
                        />
                    </View>
                    <View style={{ ...styles.otpBox, borderWidth: prevRef === thirdInput ? 1 : 0, borderColor: COLORS.black ,backgroundColor:COLORS.gray3}}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={thirdInput}
                            onPressIn={() => {
                                setPrevRef(thirdInput)
                            }}
                            onChangeText={text => {
                                setOtp({ ...otp, 3: text });

                                if (text) {
                                    setPrevRef(null)
                                    if (otp['4'] === "") {
                                        fourthInput.current.focus()
                                        setPrevRef(fourthInput)
                                    }
                                }
                                // else {
                                //     secondInput.current.focus()
                                //     setPrevRef(secondInput)
                                // }
                            }}
                        />
                    </View>
                    <View style={{ ...styles.otpBox, borderWidth: prevRef === fourthInput ? 1 : 0, borderColor: COLORS.black,backgroundColor:COLORS.gray3 }}>
                        <TextInput
                            style={styles.otpText}
                            keyboardType="number-pad"
                            maxLength={1}
                            ref={fourthInput}
                            onPressIn={() => {
                                setPrevRef(fourthInput)
                            }}
                            onChangeText={text => {
                                setOtp({ ...otp, 4: text });
                                // !text && (setPrevRef(thirdInput)&&
                                // thirdInput.current.focus())

                                if (text) {
                                    fourthInput.current.focus()
                                    setPrevRef(null)
                                }
                                // else {
                                //     thirdInput.current.focus()
                                //     setPrevRef(thirdInput)
                                // }

                            }}
                        />
                    </View>
                </View>
                {timer ?
                    <Text style={{ marginVertical: SIZES.margin, textAlign: "center", color: COLORS.black, ...FONTS.h4 }}>
                        Resend code in <Text style={{ color: COLORS.primary }}>{timer} </Text>s.
                    </Text>
                    :
                    <Text onPress={() => setTimer(59)}
                        style={{ marginVertical: SIZES.margin, textAlign: "center", color: COLORS.primary, ...FONTS.h4,textDecorationLine:"underline" }}>
                        Send again
                    </Text>
                }





            </>
        )

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


    return (
        <View style={styles.mainContainer}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>



                {VerificationScreen()
                }

                <TextButton label={"Verify"} buttonContainerStyle={{
                    alignSelf: "center",
                    width: "100%",
                    height: RFValue(55),
                    borderRadius: 50,
                    marginTop: SIZES.margin,
                    backgroundColor:COLORS.black

                }}
                    onPress={() => {
                        // pageMode==="forgetPass"?():pageMode==="otp"?:null
                        navigation.navigate("NewPassword",{
                            email:"mae"
                        })


                    }}
                />





            </ScrollView>
        </View>

    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: SIZES.padding ,
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
        borderRadius: RFValue(20),
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

export default SeconedStepVerify;




