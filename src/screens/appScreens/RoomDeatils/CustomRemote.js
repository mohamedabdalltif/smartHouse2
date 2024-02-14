import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, icons } from '../../../constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View } from 'react-native-animatable'
import AddCustomButtonScreen from './AddCustomButton'
import { RFValue } from 'react-native-responsive-fontsize'
import axios from 'axios'
import utils from '../../../utils'
import { useDispatch } from 'react-redux'
import { setdeviceAdded } from '../../../redux/reducers/AppReducer'

const CustomRemote = () => {
    const dispatch = useDispatch()
    const { item, client } = useRoute().params
    const { goBack, navigate } = useNavigation()


    // const add_history = (id,val) => {
    //     // setDelLoading(true)
    //     axios.post("https://camp-coding.tech/smart_home/events/add_history.php", {
    //         "device_id": id,
    //         "value": val
    //     }).then((res)=>{

    //         // console.log(res)
    //     })
    // }






    return (
        <SafeAreaView style={styles.Container} edges={['top']}>

            <View style={styles.HeaderContainer}>
                <TouchableOpacity style={styles.BackButton} onPress={() => { goBack() }}>
                    <Image source={icons.Backview} style={styles.BackImage} resizeMode='contain' />
                </TouchableOpacity>
                <Text style={styles.Title}>{item?.remote_name}</Text>
                <View style={styles.BackButton} >
                    {/* <Image source={icons.add} style={styles.BackImage} resizeMode='contain' /> */}
                </View>
            </View>


            <ScrollView style={{ padding: 25 }} showsVerticalScrollIndicator={false}>
                <View style={styles.Row}>
                    {item?.buttons?.map((remote) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    // console.log(item.remote_topic + " " + remote?.topic)
                                    client.publish(item?.remote_topic, remote?.topic, 2, true)
                                    // add_history(remote.remote_id,remote?.topic)
                                }}
                                activeOpacity={.8} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{remote?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default CustomRemote

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    Title: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000'
    },
    BackButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: SIZES.margin,
        justifyContent: "space-between"
    },
    BackImage: {
        width: 55,
        height: 55
    },
    Row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    buttonContainer: {
        backgroundColor: COLORS.black,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginRight: 15,
        padding: 15
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.white
    },
    AddButton: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        marginBottom: RFValue(30),
        alignItems: 'center',
        padding: RFValue(15),
        borderRadius: RFValue(50),

    },
    ButtonTitle: {
        ...FONTS.body3,
        alignSelf: 'center',
        color: COLORS.white,
        fontWeight: "bold"
    }
})