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
import Slider from 'react-native-slider'
import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SwitchToggle from 'react-native-switch-toggle';
import moment from 'moment';
import { FormInput } from '../../../components';
import utils from '../../../utils';



import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';

const AcRemote = ({ navigation,route }) => {
    const [Value,setValue]=useState(17)
    const {item,client}=route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: RFValue(10),
            backgroundColor: COLORS.white,


        }}
        >

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: SIZES.margin,
                    // width:"100%",
                    justifyContent: "space-between",
                    marginBottom: SIZES.margin

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

                />


            </View>


            <ScrollView showsVerticalScrollIndicator={false}>



                <View style={{
                    marginBottom: SIZES.margin,
                    paddingHorizontal: SIZES.margin
                    // alignItems: "center"
                }}>



                    <View
                        style={{
                            // backgroundColor: COLORS.white,
                            // padding: SIZES.padding,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}>
                    

                        <View style={{
                            width: "100%",
                            paddingHorizontal: SIZES.padding,
                            backgroundColor: COLORS.gray3,
                            borderRadius: RFValue(15),
                            marginBottom: RFValue(30),
                            paddingTop: SIZES.base,
                            alignSelf: "center"
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={{
                                    ...FONTS.body4,
                                    marginBottom: SIZES.base,
                                    color: COLORS.black,
                                    fontWeight: "700"

                                }}>{"Value"}</Text>

                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: COLORS.black,
                                        fontWeight: "700"

                                    }}
                                >{Value}</Text>


                            </View>
                            <Slider
                                value={Value}
                                step={1}
                                minimumValue={17}
                                maximumValue={32}



                                onValueChange={(value) => setValue(value)}

                            />

                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                

                                client.publish(item.topic, "on", 2, true)
                            }}
                            style={{
                               width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                                
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                On
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                

                                client.publish(item.topic, "off", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Off
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "swingOn", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Swing On
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "swingOff", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Swing Off
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "ion", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Ion
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "myCool", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                My Cool
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "mode", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Mode
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "airOff", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Air Off
                            </Text>
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "airOn", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Air on
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "turbo", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Turbo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "economyOff", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Eco Off
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "economyOn", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Eco On
                            </Text>
                        </TouchableOpacity>


                      




                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "modeDry", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Mode Dry
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "modeHeat", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Mode Heat
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "modeFan", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Mode Fan
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "modeAuto", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Mode AUTO{' '}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "modeCool", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Mode Cool{' '}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "fanHigh", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Fan High{' '}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "fanMed", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Fan Med{' '}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "fanLow", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Fan Low{' '}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                client.publish(item.topic, "timeOut", 2, true)
                            }}
                            style={{
                                width:RFValue(70),
                               height:RFValue(50),
                                backgroundColor: COLORS.black,
                                
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3,
                                    textAlign:"center"
                                }}>
                                Time Out{' '}
                            </Text>
                        </TouchableOpacity>


                    </View>





                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default AcRemote;


