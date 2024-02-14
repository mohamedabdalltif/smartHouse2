import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal,
    Dimensions,
    FlatList,
    Image,
    ActivityIndicator
} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images, lotties } from '../../../constants';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import utils from '../../../utils';
import AnimatedLottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
const RenderEvents = ({ navigation, route }) => {
    const { userData } = useSelector(state => state.UserReducer);
    const [eventData, setEventData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        getData()
    }, [])

    function getData() {
        // Alert.alert(userData.user_id)
        setLoading(true)
        axios.get(`https://mqtt-liart.vercel.app/events/${userData.user_id}`).then((res) => {
              console.log(JSON.stringify(res.data))
            if (res.data.status == "sucesss") {
                setEventData(res.data.message)
                setLoading(false)
            } else {
                setEventData([])

                setLoading(false)
            }

        })
    }
    function delete_event(id) {
        // Alert.alert(userData.user_id)

        axios.get(`https://mqtt-liart.vercel.app/events/delete/${id}`).then((res) => {
              console.log(JSON.stringify(res.data))
            if (res.data.status == "sucesss") {
                utils.toastAlert("success", "Event deleted successfully")
                getData()
            } else {
                utils.toastAlert("error", "Error happen please try again later")
            }

        })
    }




    return (
        <>
            <View style={styles.constainer}>
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
                    <Text
                        style={{
                            ...FONTS.body3,
                            fontWeight: "bold",
                            color: "#000"
                        }}
                    >
                        {"My Events"}
                    </Text>
                    <View style={{ width: 30 }}></View>
                </View>
                {loading ?
                    <ActivityIndicator style={{ marginTop: 50 }} size={50} color={COLORS.primary} />
                    :
                    <FlatList
                    ListHeaderComponent={
                        <Text
                        style={{
                            ...FONTS.body3,
                            fontWeight: "bold",
                            color: COLORS.primary,
                            textAlign:"center",
                            marginBottom:RFValue(10)
                        }} 
                        >Long press on event to delete</Text>
                    }
                        data={eventData}
                        contentContainerStyle={{
                            // backgroundColor:"#0ff",
                            padding: SIZES.padding
                        }}
                        // maxHeight={120}


                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => `pro-${index}`}


                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        onLongPress={() => {
                                            setLoading(true)
                                            setTimeout(() => {
                                                delete_event(item?._id)
                                            }, 2000)

                                        }}

                                        style={{
                                            padding: 10,
                                            backgroundColor: COLORS.white2,
                                            borderWidth: 2,
                                            borderColor: COLORS.primary,
                                            borderRadius: 5,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.23,
                                            shadowRadius: 2.62,
                                            elevation: 7,
                                            marginVertical: 10
                                        }}>
                                        <View
                                            style={{
                                                marginBottom: 15
                                            }}
                                        >


                                            <Text
                                                style={{
                                                    ...FONTS.body3,
                                                    // fontFamily: FONTS.fontFamilyBold,
                                                    color: COLORS.primary,
                                                    fontWeight: "bold"
                                                }}><Text style={{
                                                    color: "#000"
                                                }}>Event id : </Text>
                                                {item?._id}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...FONTS.body3,
                                                    // fontFamily: FONTS.fontFamilyBold,
                                                    color: COLORS.primary,
                                                    fontWeight: "bold"
                                                }}><Text style={{
                                                    color: "#000"
                                                }}>Event type : </Text>
                                                {item?.type}
                                            </Text>
                                            {item?.type == "deviceToDevice" ? <>
                                                <Text
                                                    style={{
                                                        ...FONTS.body3,
                                                        // fontFamily: FONTS.fontFamilyBold,
                                                        color: COLORS.primary,
                                                        fontWeight: "bold"
                                                    }}><Text style={{
                                                        color: "#000"
                                                    }}>Event on device {item?.deviceOneName}  : </Text>
                                                    {item?.firstDevValue}
                                                </Text>
                                                <Text
                                                    style={{
                                                        ...FONTS.body3,
                                                        // fontFamily: FONTS.fontFamilyBold,
                                                        color: COLORS.primary,
                                                        fontWeight: "bold"
                                                    }}><Text style={{
                                                        color: "#000"
                                                    }}>Event second device {item?.deviceTwoName}  : </Text>
                                                    {item?.secondDevValue}
                                                </Text>
                                            </> : <>
                                                <Text
                                                    style={{
                                                        ...FONTS.body3,
                                                        // fontFamily: FONTS.fontFamilyBold,
                                                        color: COLORS.primary,
                                                        fontWeight: "bold"
                                                    }}><Text style={{
                                                        color: "#000"
                                                    }}>Event on time: </Text>
                                                    {moment(item?.time).format('ll') + ", " + moment(item?.time).format('LT')}
                                                </Text>
                                                <Text
                                                    style={{
                                                        ...FONTS.body3,
                                                        // fontFamily: FONTS.fontFamilyBold,
                                                        color: COLORS.primary,
                                                        fontWeight: "bold"
                                                    }}><Text style={{
                                                        color: "#000"
                                                    }}>Event device : </Text>
                                                    {item?.deviceOneName}
                                                </Text>
                                            </>
                                            }



                                        </View>


                                        {/* <View
                                        style={{
                                            flexDirection: "row",
                                            alignSelf: "flex-end",
                                            // backgroundColor:"#f0f",
                                            width: "55%",
                                            justifyContent: "space-around"
                                        }}
                                    >

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                // backgroundColor:"#0ff",
                                                width: "43%",
                                                alignSelf: "flex-end",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.h5,
                                                    // fontFamily: FONTS.fontFamilyBold,
                                                    color: COLORS.primary,

                                                }}>{moment(item?.time).format('ll')}</Text>

                                            <MaterialIcons name="today" size={SIZES.h4} color={COLORS.primary} />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                // backgroundColor:"#0ff",
                                                width: "30%",
                                                alignSelf: "flex-end",
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...FONTS.h5,
                                                    // fontFamily: FONTS.fontFamilyBold,
                                                    color: COLORS.primary,

                                                }}>{moment(item?.time).format('LT')}</Text>

                                            <MaterialIcons name="alarm" size={SIZES.h4} color={COLORS.primary} />
                                        </View>
                                    </View> */}

                                    </TouchableOpacity>
                                </>
                            )
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>

                                    <AnimatedLottieView
                                        source={lotties.emptyData}
                                        autoPlay
                                        loop
                                        style={{ height: 200, width: '100%' }}
                                        resizeMode="contain"
                                    />
                                    <Text
                                        style={{

                                            ...FONTS.h3,
                                            color: COLORS.black,
                                            textAlign: 'center',
                                        }}>
                                        {"There is no data"}
                                    </Text>

                                </View>
                            );
                        }}

                    />
                }




            </View>
        </>
    );
};

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        // padding: SIZES.padding,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        paddingHorizontal: 20
    },
    monthButton: {
        backgroundColor: COLORS.gray3,
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    selectedMonthButton: {
        backgroundColor: COLORS.primary, // Change to your desired color
    },
    monthButtonText: {
        textAlign: 'center',

    },
    selectedText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    },
    yearButton: {
        backgroundColor: COLORS.gray3,
        padding: 10,
        borderRadius: 5,
        margin: 5,
    },
    selectedYearButton: {
        backgroundColor: COLORS.primary, // Change to your desired color
    },
    yearButtonText: {
        textAlign: 'center',
    },

});
export default RenderEvents;
