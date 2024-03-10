import { Text, TouchableOpacity, Image, ImageBackground, StyleSheet, ScrollView, TextInput, Platform } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTS, SIZES, icons } from '../../../constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddCustomButtonScreen = ({
    data,
    setData,
    visable,
    setVisable,
    edit,
    setEdit
}: {
    data: any[]
    setData: any
    visable: boolean
    setVisable: any
    edit: any
    setEdit: any


}) => {
    const [name, setName] = React.useState("")
    const [topic, setTopic] = React.useState("")
    const AddButton = () => {
        const newData = [...data];
        if (name?.trim()?.length == 0 || topic?.trim()?.length == 0) {
            alert('Please fill button data');
        } else if (newData?.some((ele: any) => ele?.topic == topic)) {
            alert('Button already exists');
        } else {
            newData?.push({
                name,
                topic
            })
            setData(newData)
            setVisable(false)
        }

    }
    const EditButton = () => {
        const newData = [...data];
        newData[edit].name = name
        newData[edit].topic = topic

        setData(newData)
        setVisable(false)
        setEdit(-1)



    }
    useEffect(() => {
        if (edit == -1) {
            setName("")
            setTopic('')
        }
        else {
            setName(data[edit]?.name)
            setTopic(data[edit]?.topic)
        }
    }, [visable])
    return (
        <Modal backdropColor='#fff' isVisible={visable} style={styles.Modal}>
            <SafeAreaView edges={['top']} style={styles.Container}>
                <ImageBackground
                    source={{ uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png', }}
                    style={styles.ImageBackground}
                    resizeMode='cover'
                >
                    <TouchableOpacity style={styles.BackButton} onPress={() => { setVisable(false) }}>
                        <Image source={icons.Backview} style={styles.BackImage} resizeMode='contain' />
                    </TouchableOpacity>
                </ImageBackground>

                <ScrollView style={{ padding: 25 }} showsVerticalScrollIndicator={false}>
                    <Text style={styles.AddText}>{edit != -1 ? "Edit Button" : "Add Button"}</Text>
                    <TextInput
                        style={styles.Input}
                        placeholder="Enter your Button name"
                        value={name}
                        onChangeText={val => { setName(val) }}
                    />
                    <TextInput
                        style={styles.Input}
                        placeholder="Enter your Button Topic"
                        value={topic}
                        onChangeText={val => { setTopic(val) }}
                    />

                    <TouchableOpacity onPress={() => { edit != -1 ? EditButton() : AddButton() }} style={styles.AddButton}>
                        <Text style={styles.ButtonTitle}>{edit != -1 ? "Edit Button" : "Add Button"}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView >
        </Modal>

    )
}

export default AddCustomButtonScreen


const styles = StyleSheet.create({
    Modal: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        paddingTop: Platform.OS == 'ios' ? 35 : 10
    },
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
        // height: 100,
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