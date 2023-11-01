import React, { useState, useRef, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Button,
    Text,
    BackHandler,
    AccessibilityInfo,
    StatusBar, Platform, UIManager, LayoutAnimation, Image, Alert,Modal,TextInput
} from "react-native";

import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
const initialDimensions = Dimensions.get('screen');
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, icons ,FONTS} from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import utils from "../../../utils";
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


const EditUserRoom = ({ route, navigation }) => {
    const { userData } = useSelector(state => state.UserReducer);
    // const { appData } = useSelector(state => state.AppReducer);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [loading, setLoading] = useState(true)
    const { user_id } = route.params;
    const [current_index, setcurrent_index] = useState(-1)
    const [addLoading, setAddLoading] = useState(false)
    const [show_modal, setshow_modal] = React.useState(false);
    const [editRoomObj, setEditRoomObj] = React.useState(null);
    const [roomname, setroomname] = React.useState('');
    const [imageUpdated, setImageUpdated] = useState(false)
    const [data, setdata] = React.useState(
        []
        //  JSON.parse(JSON.stringify(appData))

    )
    const [newImage, setNewImage] = useState({});
    const [delLoading, setDelLoading] = useState(false);
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            getData()

        });

        return unsubscribe;
    }, [navigation])

    function getData() {
        // console.log(userData)
        // Alert.alert("hrtr")
        axios.post("https://camp-coding.tech/smart_home/home/select_room_data_without_subuser.php", {
            user_id: user_id
        }).then((res) => {
            console.log(res.data)
            if (res.data.status == "success") {
                setLoading(false)


                setdata(res.data.message)
                // setLoading(false)
                // dispatch(setAppData(arr))

            } else {
                // dispatch(setAppData([]))
                setdata([])
                setLoading(false)
            }
        })
    }


    
  function addroom(image) {

    setAddLoading(true)

    axios.post("https://camp-coding.tech/smart_home/home/add_room.php", {
      "user_id":user_id,
      "name": roomname,
      "image": image
    }).then((res) => {
      console.log(res)
      if (res.data.status == "success") {
        getData()
        utils.toastAlert("success", "Room Add Successfully")
        setAddLoading(false)
        setshow_modal(false)
        setImageUpdated(false)
        setroomname("")
      } else {
        utils.toastAlert("error", "error happen try agian later")
        setAddLoading(false)
      }
      // getData()

    })
  }

  function deleteRoom() {
    setDelLoading(true)

    axios.post("https://camp-coding.tech/smart_home/home/delete_room.php", {
      room_id: editRoomObj.room_id
    }).then((res) => {
      console.log(res)
      if (res.data.status == "success") {
        getData()
        utils.toastAlert("success", "Room deleted Successfully")
        setDelLoading(false)
        setshow_modal(false)
        setEditRoomObj(null)
      } else {
        utils.toastAlert("error", "error happen try agian later")
        setDelLoading(false)

      }
      // getData()

    })
  }

  function editRoom(image) {
    setAddLoading(true)
    console.log(image)

    axios.post("https://camp-coding.tech/smart_home/home/update_room.php", {
      room_id: editRoomObj.room_id,
      "name": roomname,
      "image": image
    }).then((res) => {
      console.log(res)
      if (res.data.status == "success") {
        getData()
        utils.toastAlert("success", "Room Add Successfully")
        setAddLoading(false)
        setshow_modal(false)
        setEditRoomObj(null)
        setImageUpdated(false)
        setroomname("")
      } else {
        utils.toastAlert("error", "error happen try agian later")
        setAddLoading(false)
      }
      // getData()

    })
  }

  function openPichker() {
    ImageCropPicker.openPicker({
      includeBase64: true,
      compressImageQuality: 0.8,
      freeStyleCropEnabled: true,
      cropping: true,
      cropperToolbarColor: COLORS.primary,
      cropperStatusBarColor: COLORS.primary,
    }).then(image => {
      setNewImage(image);
      setImageUpdated(true)
    });
  }


  async function _uploadImage() {
    setAddLoading(true)
    RNFetchBlob.fetch(
      'POST',
       'https://camp-coding.tech/smart_home/image_uplouder.php',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'octet-stream',
      },
      [
         {
          name: 'image',
          filename: 'avatar.png',
          type: 'image/png',
          data: newImage['data'],
        },
        // { name : 'panar_text', data : selBanner}
      ],
    ).then(res => {
      // console.log(JSON.parse(res.data))
      if (JSON.parse(res.data).startsWith('https:')) {
        // console.log(res.data)
        editRoomObj !== null ? editRoom(res.data) :addroom(res.data)
        // console.log(res.data)
        // _uploadBanner(JSON.parse(res.data));
      } else {
        setAddLoading(false)
        utils.toastAlert("error", "error happen try agian later")
        // setLoading(false);
      }
    });

   

  
  }

        return (
            <View style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}>
                {/* <StatusBar backgroundColor='#tran' /> */}




                {/* <View> */}
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
                    <TouchableOpacity
                        onPress={() => {
                            // navigation.goBack();
                            setshow_modal(true);
                            setNewImage({})
                        }}
                    >
                        <Image source={icons.add} style={{ width: 55, height: 55 }} resizeMode='contain' />
                    </TouchableOpacity>
                </View>
                {!loading ?
                    <ScrollView>
                        {data?.map((item, index) => (
                            <>

                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("EditRoomDevices",{
                                            devData:item
                                          })
                                    }}
                                    style={{
                                        backgroundColor: COLORS.gray3, marginBottom: SIZES.base,
                                        width: "90%",
                                        alignItems: "center",
                                        alignSelf: "center",
                                        paddingVertical: SIZES.padding,
                                        marginTop: SIZES.margin,
                                        borderRadius: SIZES.radius,
                                        flexDirection: "row",
                                        paddingHorizontal: RFValue(10),
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 22,
                                            color: COLORS.primary,
                                            // marginBottom:SIZES.margin
                                        }}
                                    >
                                        {data[index].name}
                                    </Text>
                                    <TouchableOpacity
                                    onPress={()=>{
                                        setshow_modal(true)
                                        setEditRoomObj(item)
                                        setroomname(item.name)
                                        setNewImage({path:item.image.replaceAll("\"","").trim()})
                                    }}
                                    >
                                        <Image source={icons.edit} style={{ width: RFValue(20), height: RFValue(20) }} tintColor={COLORS.primary} />
                                    </TouchableOpacity>



                                </TouchableOpacity>





                            </>


                        ))}
                    </ScrollView>
                    : <ActivityIndicator size={50} style={{ marginTop: SIZES.margin * 2 }} />}
                {/* </View> */}
                <Modal
visible={show_modal}
onRequestClose={() => {
  setshow_modal(false);
  setEditRoomObj(null)
}}
animationType="slider">
<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }}
>
  <TouchableOpacity
    onPress={() => {
      setshow_modal(false);
      setEditRoomObj(null)
    }}
    style={{
      margin: 15,
    }}>
    <Image source={icons.Backview} />
  </TouchableOpacity>

  {editRoomObj !== null&& userData.user_id == 3  && <TouchableOpacity
    onPress={() => {
      deleteRoom()
    }}
    style={{
      width: RFValue(50),
      height: RFValue(50),
      // position: "absolute",
      backgroundColor: COLORS.black,
      // bottom: "12%",
      // right: 0,
      borderRadius: RFValue(20),
      // marginRight: RFValue(10),
      alignItems: "center",
      justifyContent: "center",
      margin: 15,
    }}>
    {delLoading ? <ActivityIndicator size={15} color={COLORS.white} /> :
      <MaterialCommunityIcons name={"trash-can"} size={RFValue(15)} color={COLORS.white} />
    }
  </TouchableOpacity>
  }

</View>

<TouchableOpacity
  style={{
    alignItems: 'center',
    backgroundColor: COLORS.gray3,
    padding: RFValue(15),
    borderRadius: 10,
    margin: RFValue(15)
  }}
  onPress={() => {
    openPichker();
  }}>
  {Object.keys(newImage).length > 0 ? (
    <>
      <Image
        source={{
          uri: newImage?.path,
        }}
        style={{
          width: RFValue(200),
          height: RFValue(200),
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
    </>
  ) : (
    <>
      <Ionicons
        name="image"
        color={COLORS.black}
        size={RFValue(20)}
      />
      <Text style={{ ...FONTS.h3, color: COLORS.black }}>
        إختر صورة
      </Text>
    </>
  )}
</TouchableOpacity>
<TextInput
  style={{
    width: '90%',
    // height: 50,
    // backgroundColor: '#ddd',
    borderWidth: 2,
    alignSelf: 'center',
    marginTop: RFValue(20),
    borderRadius: RFValue(15),
    borderColor: '#B6B6B6',
    padding: RFValue(12),
  }}
  placeholder="Enter your room name"
  value={roomname}
  onChangeText={value => {
    setroomname(value);
  }}
/>



<TouchableOpacity
  onPress={() => {
   
    if(imageUpdated) _uploadImage();
    else{
      editRoomObj !== null ? editRoom(newImage.path) :addroom(newImage.path)
    }
  }}
  style={{
    width: 250,
    // height: 100,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    marginTop: RFValue(50),
    alignItems: 'center',
    padding: RFValue(15),
    borderRadius: RFValue(50),
  }}>
  {
    addLoading ?
      <ActivityIndicator size={RFValue(20)} color={COLORS.white} /> :
      <Text
        style={{
          ...FONTS.body3,

          alignSelf: 'center',

          color: COLORS.white,
          fontWeight: "bold"
        }}>
        {editRoomObj !== null ? " Edit Room" : " Add Room"}
      </Text>
  }

</TouchableOpacity>
</Modal>
            </View>


        )
    }


    export default EditUserRoom;