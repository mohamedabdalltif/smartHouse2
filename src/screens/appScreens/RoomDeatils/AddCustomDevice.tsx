import { Text, TouchableOpacity, Image, ImageBackground, StyleSheet, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { COLORS, FONTS, SIZES, icons } from '../../../constants'
import { RFValue } from 'react-native-responsive-fontsize'

const AddCustomDeviceScreen = () => {
    const { room_id }: any = useRoute().params
    const { goBack, navigate } = useNavigation<any>()
    const [name, setName] = React.useState('')
    const [topic, setTopic] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    return (
        <SafeAreaView edges={['top']} style={styles.Container}>
            <ImageBackground
                source={{ uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png', }}
                style={styles.ImageBackground}
                resizeMode='cover'
            >
                <TouchableOpacity style={styles.BackButton} onPress={() => { goBack() }}>
                    <Image source={icons.Backview} style={styles.BackImage} resizeMode='contain' />
                </TouchableOpacity>
            </ImageBackground>

            <ScrollView style={{ padding: 25 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.AddText}>Add Device</Text>
                <TextInput
                    style={styles.Input}
                    placeholder="Enter your Device name"
                    value={name}
                    onChangeText={val => { setName(val) }}
                />
                <TextInput
                    style={styles.Input}
                    placeholder="Enter your Device Topic"
                    value={topic}
                    onChangeText={val => { setTopic(val) }}
                />

                <TouchableOpacity onPress={() => {
                    navigate('CustomDevices', {
                        data: {
                            name,
                            topic,
                            room_id
                        }
                    })
                }} style={styles.AddButton}>
                    {
                        loading ?
                            <ActivityIndicator size={20} color={COLORS.white} />
                            :
                            <Text style={styles.ButtonTitle}>Add Device</Text>
                    }
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    )
}

export default AddCustomDeviceScreen


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    ImageBackground: {
        width: "100%",
        height: 250,
        paddingTop: SIZES.base
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
    AddText: {
        ...FONTS.body4,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: "center"
    },
    Input: {
        width: '90%',
        borderWidth: 2,
        alignSelf: 'center',
        marginTop: RFValue(20),
        borderRadius: RFValue(15),
        borderColor: '#B6B6B6',
        padding: RFValue(12),
    },
    AddButton: {
        width: 250,
        alignSelf: 'center',
        backgroundColor: COLORS.primary,
        marginTop: RFValue(50),
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