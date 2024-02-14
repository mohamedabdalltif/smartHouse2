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

const CustomDevicesScreen = () => {
    const dispatch = useDispatch()
    const { data }: any = useRoute().params
    const { goBack, navigate } = useNavigation<any>()
    const [visable, setVisable] = React.useState(false)
    const [loading, setLoading] = React.useState(false);
    const [Data, setData] = React.useState([])
    useEffect(()=>{
      console.log(JSON.stringify(Data))
    },[])
    // console.log(data,Data)





    const AddDevice = () => {
        setLoading(true)
        let data_send = {
            "room_id": data?.room_id,
            "remote_topic": data?.topic,
            "remote_name": data?.name,
            "remote_buttons": Data.map(item => `${item.name}**${item.topic}`).join('**camp**')
        }
        // console.log(data_send)
        axios.post("https://camp-coding.tech/smart_home/remote/add_remote.php", data_send).then((res) => {
            console.log(res.data)
            if (res.data.status == "success") {
                utils.toastAlert("success", "Device added successfully")
                dispatch(setdeviceAdded(true))

                goBack()
                setLoading(false)
            } else {
                utils.toastAlert("error", "Error happen please try again later")
                setLoading(false)
            }

        })
    }
    return (
        <SafeAreaView style={styles.Container} edges={['top']}>
            <AddCustomButtonScreen data={Data} setData={setData} visable={visable} setVisable={setVisable} />
            <View style={styles.HeaderContainer}>
                <TouchableOpacity style={styles.BackButton} onPress={() => { goBack() }}>
                    <Image source={icons.Backview} style={styles.BackImage} resizeMode='contain' />
                </TouchableOpacity>
                <Text style={styles.Title}>{data?.name}</Text>
                <TouchableOpacity style={styles.BackButton} onPress={() => { setVisable(true) }}>
                    <Image source={icons.add} style={styles.BackImage} resizeMode='contain' />
                </TouchableOpacity>
            </View>


            <ScrollView style={{ padding: 25 }} showsVerticalScrollIndicator={false}>
                <View style={styles.Row}>
                    {Data?.map((item: any) => {
                        return (
                            <TouchableOpacity activeOpacity={.8} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>{item?.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => { AddDevice() }} style={styles.AddButton}>
                {loading ? <ActivityIndicator size={15} color={"white"} /> :
                    <Text style={styles.ButtonTitle}>Save</Text>
                }
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CustomDevicesScreen

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