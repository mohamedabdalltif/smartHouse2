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
const DeviceHistory = ({ navigation, route }) => {
    const { psdata, type } = route.params
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];

    const years = Array.from({ length: 2 }, (_, index) => (new Date().getFullYear() - 1 + index).toString());

    const handleMonthSelect = (month) => {
        setSelectedMonth(month);
        getData(month?.substring(0, 3), selectedYear)
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        getData(selectedMonth?.substring(0, 3), year)
    };
    const [historyData, setHistoryData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
        setSelectedMonth(currentMonth);
        const currentYear = new Date().getFullYear();

        setSelectedYear(currentYear.toString());
        // console.log(psdata)
        // Alert.alert(selectedMonth?.substring(0,3))
        getData(currentMonth?.substring(0, 3), currentYear.toString())

    }, [])

    function getData(mon, year) {
        console.log(JSON.stringify(psdata))
        setLoading(true)
        axios.get(`https://mqtt-liart.vercel.app/history?topic=${psdata?.topic}&month=${mon}-${year}`).then((res) => {
            // console.log(`https://mqtt-liart.vercel.app/history?topic=${psdata?.topic}&month=${mon}-${year}`)
            if (res.data.status == "success") {
                setHistoryData(res?.data?.data)
                setSelectedPostion(0)
            } else {
                utils.toastAlert("error", res?.data?.message + " in field " + res.data.field)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const flatListRef = useRef(null);

    const [selectedPostion, setSelectedPostion] = useState(0)

    // const scrollToMiddle = () => {
    //     setSelectedPostion(1)
    //     const middleIndex = Math.floor(historyData.length / 2);
    //     flatListRef?.current?.scrollToItem({ index: middleIndex, animated: true });
    // };

    // const scrollToTop = () => {
    // setSelectedPostion(0)
    //     flatListRef?.current?.scrollToItem({ index: 0, animated: true });
    // };

    // const scrollToBottom = () => {
    // setSelectedPostion(2)
    //     const lastIndex = historyData.length - 1;
    //     flatListRef?.current?.scrollToItem({ index: lastIndex, animated: true });
    // };
    const scrollToMiddle = () => {
        setSelectedPostion(1)
        const middleIndex = Math.floor(historyData.length / 2);
        const offset = middleIndex * 100; // Adjust ITEM_HEIGHT based on your item's height
        flatListRef.current.scrollToOffset({ offset, animated: true });
    };

    const scrollToTop = () => {
        setSelectedPostion(0)
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    };

    const scrollToBottom = () => {
        setSelectedPostion(2)
        const lastIndex = historyData.length - 1;
        const offset = lastIndex * 100; // Adjust ITEM_HEIGHT based on your item's height
        flatListRef.current.scrollToOffset({ offset, animated: true });
    };



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
                        {psdata?.name}
                    </Text>
                    <View style={{ width: 30 }}></View>
                </View>
                <View style={[styles.pickerContainer, { justifyContent: "space-evenly" }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {years.map((year, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.yearButton,
                                    selectedYear === year && styles.selectedYearButton
                                ]}
                                onPress={() => handleYearSelect(year)}
                            >
                                <Text style={[styles.yearButtonText, selectedYear === year && { color: "#fff" }]}>{year}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={[styles.pickerContainer]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {months.map((month, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.monthButton,
                                    selectedMonth === month && styles.selectedMonthButton
                                ]}
                                onPress={() => handleMonthSelect(month)}
                            >
                                <Text style={[styles.monthButtonText, selectedMonth === month && { color: "#fff" }]}>{month}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={[styles.monthButton, { marginRight: 10, backgroundColor: selectedPostion == 0 ? COLORS.primary : COLORS.gray3 }]} onPress={scrollToTop}>
                            <Text style={{ color: selectedPostion == 0 ? COLORS.white : null }}>Scroll to Top</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.monthButton, { marginRight: 10, backgroundColor: selectedPostion == 1 ? COLORS.primary : COLORS.gray3 }]} onPress={scrollToMiddle}>
                            <Text style={{ color: selectedPostion == 1 ? COLORS.white : null }}>Scroll to Middle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.monthButton, { backgroundColor: selectedPostion == 2 ? COLORS.primary : COLORS.gray3 }]} onPress={scrollToBottom}>
                            <Text style={{ color: selectedPostion == 2 ? COLORS.white : null }}>Scroll to Bottom</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <FlatList
                    data={historyData}
                    contentContainerStyle={{
                        // backgroundColor:"#0ff",
                        padding: SIZES.padding
                    }}
                    // maxHeight={120}


                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => `pro-${index}`}
                    ref={flatListRef}
                    getItemLayout={(data, index) => (
                        { length: 100, offset: 100 * index, index }
                    )}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View

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
                                            }}>VALUE :</Text> {item?.payload}</Text>



                                    </View>


                                    <View
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

                                                }}>{moment(item?.time).format('ll')} </Text>

                                            <MaterialIcons name="today" size={SIZES.h4} color={COLORS.primary} />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                // backgroundColor:"#0ff",
                                                width: "35%",
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

                                                }}>{moment(item?.time).format('LT')} </Text>

                                            <MaterialIcons name="alarm" size={SIZES.h4} color={COLORS.primary} />
                                        </View>
                                    </View>

                                </View>
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
                                {loading ?
                                    <ActivityIndicator style={{ marginTop: 20 }} size={30} color={COLORS.primary} />
                                    : <>
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
                                    </>}
                            </View>
                        );
                    }}

                />




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
export default DeviceHistory;
