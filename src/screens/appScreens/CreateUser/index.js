import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    FlatList,
    ImageBackground,

    Modal,
    ActivityIndicator,
    StatusBar,

    SafeAreaView,
    Image,

} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';


import LottieView from 'lottie-react-native';

import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { CustomTextInput, FormInput, TextButton } from '../../../components';
import utils from '../../../utils';
import MQTT from 'sp-react-native-mqtt';
import uuid from 'react-native-uuid'
import { ScrollView } from 'react-native-gesture-handler';




import AnimatedLottieView from 'lottie-react-native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useDispatch } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';


import { setUser } from '../../../redux/reducers/UserReducer';
import Auth from '../../../Services';
import axios from 'axios';

const CreateUser = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [connectionUsername, setConnectionUsername] = useState('')
    const [connectionPassword, setConnectionPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [credintialModal, setCredintialModal] = useState(false)



    const signUp = () => {
        setLoading(true)
         if (Email === '' || Password === ''||connectionPassword===''||connectionUsername==='') {
           utils.toastAlert("error", "Please check values")
           setLoading(false)
           return;
         }
     
             
             axios.post("https://camp-coding.tech/smart_home/auth/user_signup.php", {
               email: Email,
               password: Password,
               name:Email,
               connection_user_name:connectionUsername,
               connection_pass:connectionPassword
             }).then((res)=>{
               console.log(res.data)
               if(res.data.status==="success"){
     
                
                
                 storedata(res.data.message)
                  utils.toastAlert("success", "Created Done Successfully")
                 
                  setCredintialModal(true)
                  setLoading(false)
                  
               }else{
                 utils.toastAlert("error", "error happen try again later")
                 setLoading(false)
               }
             })
             // // navigation.navigate('MainStack')
             // let user = {
             //   user_email: null,
             //   user_name: Email,
             //   user_photo: null,
             //   user_token: null,
             //   user_password: Password
             // }
     
             // dispatch(setUser(user))
             // // // navigation.navigate("FillProfile")
             // storedata(user);
             
         
     
     
       }

       async function storedata(data) {
        await Auth.setAccount(data);
      }





    return (
        <SafeAreaView
            style={{
                backgroundColor: COLORS.white,
                flex: 1,
            }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"dark-content"} />
            <ImageBackground
                source={{
                    uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png',
                }}
                style={{
                    flex: 1,


                }}
                resizeMode='cover'

            >

                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: COLORS.gray3,
                        opacity: .9,
                        paddingHorizontal: SIZES.margin
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            // paddingHorizontal: SIZES.margin,
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
                        <View />



                    </View>



                    <ScrollView contentContainerStyle={{ paddingBottom: SIZES.padding * 4, marginTop: SIZES.margin }} showsVerticalScrollIndicator={false}>
                        <View style={{
                            alignItems: "center",
                            marginVertical: SIZES.margin * 2,
                            // backgroundColor:"red"
                        }}>
                            <Text
                                style={{
                                    ...FONTS.body1,
                                    color: COLORS.black,
                                    fontWeight: "500"


                                }}
                            >
                                Create New User

                            </Text>

                        </View>
                        {/* <View style={{ alignItems: "center", marginBottom: SIZES.margin * 2 }}>
                            <QRCode
                                value={`${Email || ''},${Password || ''}`}
                                size={180}
                            />
                        </View> */}


                        <CustomTextInput TextContainerStyle={{
                            alignSelf: "center",
                            width: "100%",
                            height: RFValue(55),
                            borderRadius: RFValue(50),
                            // borderWidth: 0.5,
                            flexDirection: "row",
                            alignItems: "center",
                            // paddingLeft: SIZES.padding,
                            backgroundColor: COLORS.white,
                            marginBottom: SIZES.margin

                        }}

                            value={Email} placeholder={"Username"} onChangeText={(txt) => {
                                setEmail(txt)

                            }}

                        />
                        <CustomTextInput TextContainerStyle={{
                            alignSelf: "center",
                            width: "100%",
                            height: RFValue(55),
                            borderRadius: RFValue(50),
                            // borderWidth: 0.5,
                            flexDirection: "row",
                            alignItems: "center",
                            // paddingLeft: SIZES.padding,
                            backgroundColor: COLORS.white,
                            marginBottom: SIZES.margin

                        }}

                            value={Password} placeholder={"Password"} onChangeText={(txt) => {
                                setPassword(txt)

                            }}

                        />

                        <CustomTextInput TextContainerStyle={{
                            alignSelf: "center",
                            width: "100%",
                            height: RFValue(55),
                            borderRadius: RFValue(50),
                            // borderWidth: 0.5,
                            flexDirection: "row",
                            alignItems: "center",
                            // paddingLeft: SIZES.padding,
                            backgroundColor: COLORS.white,
                            marginBottom: SIZES.margin

                        }}

                            value={connectionUsername} placeholder={"Connection Username"} onChangeText={(txt) => {
                                setConnectionUsername(txt)

                            }}

                        />


                        <CustomTextInput TextContainerStyle={{
                            alignSelf: "center",
                            width: "100%",
                            height: RFValue(55),
                            borderRadius: RFValue(50),
                            // borderWidth: 0.5,
                            flexDirection: "row",
                            alignItems: "center",
                            // paddingLeft: SIZES.padding,
                            backgroundColor: COLORS.white,

                        }}

                            value={connectionPassword} placeholder={"Connection Password"} onChangeText={(txt) => {
                                setConnectionPassword(txt)

                            }}

                        />


                        <TextButton
                            onPress={() => 
                                signUp()
                            }
                            buttonContainerStyle={{
                                backgroundColor: COLORS.primary,
                                width: "75%",
                                alignSelf: "center",
                                marginTop: SIZES.margin * 3,
                                height: RFValue(55),
                                borderRadius: RFValue(50),
                                marginBottom: SIZES.margin
                            }}
                            loading={loading}
                            label={"Create User"}

                        />


                    </ScrollView>

                </View>



            </ImageBackground>
            <Modal visible={credintialModal}
            onRequestClose={()=>{
                setCredintialModal(false)
            }}
            >

                <SafeAreaView
                    style={{
                        backgroundColor: COLORS.white,
                        flex: 1,
                    }}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"dark-content"} />
                    <ImageBackground
                        source={{
                            uri: 'https://bondhome.io/wp-content/uploads/2020/08/Post_30_Blog_03_BOND.png',
                        }}
                        style={{
                            flex: 1,


                        }}
                        resizeMode='cover'

                    >

                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: COLORS.gray3,
                                opacity: .9,
                                paddingHorizontal: SIZES.margin,
                                

                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    // paddingHorizontal: SIZES.margin,
                                    // width:"100%",
                                    justifyContent: "space-between",
                                    marginBottom:SIZES.margin

                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        setCredintialModal(false)
                                    }}
                                >
                                    <Image source={icons.Backview} style={{ width: 55, height: 55 }} resizeMode='contain' />
                                </TouchableOpacity>
                                <View />



                            </View>



                            <ScrollView contentContainerStyle={{ paddingBottom: SIZES.padding * 4, marginTop: SIZES.margin }} showsVerticalScrollIndicator={false}>
                                <Text style={{
                                    ...FONTS.body3,
                                    color: COLORS.black,
                                    marginBottom: SIZES.margin
                                }}>USER NAME : {Email}</Text>

                                <Text style={{
                                    ...FONTS.body3,
                                    color: COLORS.black,
                                    marginBottom: SIZES.margin*2
                                }}>PASSWORD : {Password}</Text>
                                <View style={{ alignItems: "center", marginTop: SIZES.margin * 2 }}>
                                    <QRCode
                                        value={`${Email || ''},${Password || ''}`}
                                        size={180}
                                    />
                                </View>
                                <TextButton
                            onPress={() => {
                               
                                setCredintialModal(false)
                                navigation.goBack()
                            }
                            }
                            buttonContainerStyle={{
                                backgroundColor: COLORS.primary,
                                width: "75%",
                                alignSelf: "center",
                                marginTop: SIZES.margin * 3,
                                height: RFValue(55),
                                borderRadius: RFValue(50),
                                marginBottom: SIZES.margin
                            }}
                            // loading={loading}
                            label={"CLOSE"}

                        />
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </SafeAreaView>
            </Modal>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default CreateUser;
