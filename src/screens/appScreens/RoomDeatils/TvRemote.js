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
import AntDesign from 'react-native-vector-icons/AntDesign';
import SwitchToggle from 'react-native-switch-toggle';
import moment from 'moment';
import { FormInput } from '../../../components';
import utils from '../../../utils';



import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';

const TvRemote = ({ navigation,route }) => {
    const {item,client}=route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: RFValue(10),
            backgroundColor:COLORS.white,


        }}
        >

{/* <ImageBackground
        source={{
          uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png',
        }}
        style={{
          flex: 1,
          padding: RFValue(10)


        }}
        resizeMode='cover'

      > */}
        

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: SIZES.margin,
                    // width:"100%",
                    justifyContent: "space-between",
                    marginBottom:SIZES.margin

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
                            flexDirection: "row",
                            justifyContent: "space-evenly"
                        }}
                    >

                        <TouchableOpacity
                            onPress={() => {
                                

                                client.publish(item.topic, item.on === true ? "off" : "on", 2, true)



                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                marginBottom: SIZES.margin,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius
                            }}>

                            <AntDesign name={"logout"} size={30} color={COLORS.white} />


                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "mute", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,

                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily
                                }}
                            >
                                MUTE
                            </Text>
                        </TouchableOpacity>

                    </View>


                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginBottom: SIZES.margin,
                            flexWrap: "wrap"
                        }}
                    >



                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "1", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base

                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                1
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "2", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base


                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                2
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "3", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                3
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "4", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                4
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "5", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                5
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "6", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                6
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "7", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                7
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "8", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base

                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                8
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "9", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base

                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                9
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "0", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base

                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                0
                            </Text>
                        </TouchableOpacity>

                       
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "gide", 2, true)
                            }}
                            style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,

                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                // marginBottom:SIZES.margin
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily
                                }}
                            >
                                GUIDE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={() => {

                                client.publish(item.topic, "exit", 2, true)
                            }} style={{
                                width: RFValue(60),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,

                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                // marginBottom:SIZES.margin
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily
                                }}
                            >
                                EXIT
                            </Text>
                        </TouchableOpacity>




                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginBottom: SIZES.margin,
                    }}>

                        
                  <TouchableOpacity
                    onPress={() => {

                      client.publish(item.topic, "preChannel", 2, true)
                    }}
                    style={{
                      width: RFValue(115),
                      height: RFValue(50),
                      backgroundColor: COLORS.black,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: SIZES.radius,
                      marginBottom: SIZES.base
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        //fontFamily: FONTS.//fontFamily,
                        fontSize: SIZES.body3

                      }}
                    >
                      PRE-CH
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {

                      client.publish(item.topic, "channelList", 2, true)
                    }}
                    style={{
                      width: RFValue(115),
                      height: RFValue(50),
                      backgroundColor: COLORS.black,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: SIZES.radius,
                      marginBottom: SIZES.base
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        //fontFamily: FONTS.//fontFamily,
                        fontSize: SIZES.body3

                      }}
                    >
                      CH-LIST
                    </Text>
                  </TouchableOpacity>

                    </View>



                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        marginBottom: SIZES.margin,
                    }}>
                        <View
                            style={{
                                // backgroundColor:"red",
                                justifyContent: "space-between"
                            }}
                        >

                            <TouchableOpacity
                                // onPress={()=>{

                                //   client.publish(item.topic, "channelList", 2, true)
                                // }}
                                style={{
                                    width: RFValue(60),
                                    height: RFValue(50),
                                    backgroundColor: COLORS.black,

                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: SIZES.radius,
                                    // marginBottom:SIZES.margin
                                }}>
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        //fontFamily: FONTS.//fontFamily
                                    }}
                                >
                                    MENU
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {

                                    client.publish(item.topic, "home", 2, true)
                                }}
                                style={{
                                    width: RFValue(60),
                                    height: RFValue(50),
                                    backgroundColor: COLORS.black,

                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: SIZES.radius,
                                    // marginBottom:SIZES.margin
                                }}>
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        //fontFamily: FONTS.//fontFamily
                                    }}
                                >
                                    HOME
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {

                                    client.publish(item.topic, "return", 2, true)
                                }}
                                style={{
                                    width: RFValue(60),
                                    height: RFValue(50),
                                    backgroundColor: COLORS.black,

                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: SIZES.radius,
                                    // marginBottom:SIZES.margin
                                }}>
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        //fontFamily: FONTS.//fontFamily
                                    }}
                                >
                                    RETURN
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* <View
        style={{
          // backgroundColor:"red",
          justifyContent: "space-between"
        }}
      >

       
      </View> */}
                        <View style={{
                            // padding:SIZES.padding,
                            alignItems: "center",
                            alignSelf: "center",
                            // backgroundColor:"blue"
                        }}>
                            <TouchableOpacity
                                onPress={() => {

                                    client.publish(item.topic, "up", 2, true)
                                }}
                                style={{
                                    width: RFValue(50),
                                    height: RFValue(50),
                                    backgroundColor: COLORS.black,
                                    marginBottom: SIZES.margin,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: SIZES.radius
                                }}>

                                <AntDesign name={"caretup"} size={30} color={COLORS.white} />


                            </TouchableOpacity>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: SIZES.margin,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius
                                // justifyContent:"space-between"
                            }}>
                                <TouchableOpacity
                                    onPress={() => {

                                        client.publish(item.topic, "left", 2, true)
                                    }}
                                    style={{
                                        width: RFValue(50),
                                        height: RFValue(50),
                                        backgroundColor: COLORS.black,
                                        marginRight: SIZES.margin,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: SIZES.radius
                                    }}>
                                    <AntDesign name={"caretleft"} size={30} color={COLORS.white} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        // client.subscribe(item.topic,0)
                                        client.publish(item.topic, "ok", 2, true)
                                        // client.unsubscribe(item.topic)
                                    }}
                                    style={{
                                        width: RFValue(50),
                                        height: RFValue(50),
                                        backgroundColor: COLORS.black,
                                        marginRight: SIZES.margin,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: SIZES.radius
                                    }}>
                                    <Text
                                        style={{
                                            color: COLORS.white,
                                            //fontFamily: FONTS.//fontFamily
                                        }}
                                    >
                                        OK
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    onPress={() => {

                                        client.publish(item.topic, "right", 2, true)
                                    }}
                                    style={{
                                        width: RFValue(50),
                                        height: RFValue(50),
                                        backgroundColor: COLORS.black,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: SIZES.radius

                                    }}>
                                    <AntDesign name={"caretright"} size={30} color={COLORS.white} />
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity
                                onPress={() => {

                                    client.publish(item.topic, "down", 2, true)
                                }}
                                style={{
                                    width: RFValue(50),
                                    height: RFValue(50),
                                    backgroundColor: COLORS.black,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: SIZES.radius

                                }}>
                                <AntDesign name={"caretdown"} size={30} color={COLORS.white} />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            flexWrap: "wrap",
                            marginTop:SIZES.margin
                        }}
                    >
                         

                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "www", 2, true)
                            }}
                            style={{
                                width: RFValue(90),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                WWW
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "mix", 2, true)
                            }}
                            style={{
                                width: RFValue(90),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                MIX
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "netflix", 2, true)
                            }}
                            style={{
                                width: RFValue(90),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                NETFLIX
                            </Text>
                        </TouchableOpacity>
                      
                        <TouchableOpacity
                            onPress={() => {

                                client.publish(item.topic, "primeVideo", 2, true)
                            }}
                            style={{
                                width: RFValue(115),
                                height: RFValue(50),
                                backgroundColor: COLORS.black,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: SIZES.radius,
                                marginBottom: SIZES.base
                            }}>
                            <Text
                                style={{
                                    color: COLORS.white,
                                    //fontFamily: FONTS.//fontFamily,
                                    fontSize: SIZES.body3

                                }}
                            >
                                PRIME-VIDEO
                            </Text>
                        </TouchableOpacity>



                    </View>





                </View>

            </ScrollView>

            {/* </ImageBackground> */}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default TvRemote;


