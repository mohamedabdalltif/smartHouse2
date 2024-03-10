import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
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
  // Button,
  SafeAreaView,
  PermissionsAndroid
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

import LottieView from 'lottie-react-native';

import { COLORS, FONTS, icons, images, lotties, SIZES } from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import moment from 'moment';
import { FormInput } from '../../../components';
import utils from '../../../utils';
import { useIsFocused } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import {

  setAppData,
  modifySensorConn, setClient
} from '../../../redux/reducers/AppReducer';
import MQTT from 'sp-react-native-mqtt';
import uuid from 'react-native-uuid'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
// import notifee from '@notifee/react-native';
import BackgroundService from 'react-native-background-actions';
import axios from 'axios';
const CARD_HEIGHT = 220;
const CARD_WIDTH = SIZES.width * 0.8;
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
import { useDispatch, useSelector } from 'react-redux';
import AnimatedLottieView from 'lottie-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { setUser } from '../../../redux/reducers/UserReducer';
const options = {
  taskName: 'i4technology',
  taskTitle: 'i4technology',
  taskDesc: 'Background Event',
  stopOnTerminate: true,
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },

  parameters: {
    delay: 5000,

  },
};

const Home = ({ navigation }) => {

  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.UserReducer);
  const [voiceModal, setVoiceModal] = useState(false);
  const [started, setStarted] = useState('');
  const [recognized, setRecognized] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [pitch, setPitch] = useState('');
  const [data, setdata] = useState([])
  // });
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [addLoading, setAddLoading] = useState(false)
  const [connection, setConnection] = useState(true)
  const [imageUpdated, setImageUpdated] = useState(false)
  const [newImage, setNewImage] = useState({});


  const [isFlash, setIsFlash] = useState(false);

  function onSuccess(e) {
    Alert.alert('Home', 'device added successfly');
    setshow_modal(false);
  }

  const [show_modal, setshow_modal] = React.useState(false);
  const [editRoomObj, setEditRoomObj] = React.useState(null);
  const [roomname, setroomname] = React.useState('');
  const [counter, setCounter] = useState(0);
  const [delLoading, setDelLoading] = useState(false);
  useEffect(async () => {
    // console.log(userData)
    // dispatch(setUser({userData,user_id:3}))
    let token = await Auth.FcmToken();
    console.log(token)
    if (connection) {
      const interval = setInterval(() => {
        setCounter(counter => counter + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [counter]);



  // const {appLoading,appData,client,sensorConnection} = useSelector(state => state.AppReducer);



  function getData() {
    // console.log(userData)
    axios.post("https://camp-coding.tech/smart_home/home/select_rooms_data.php", {
      user_id: userData.user_id
    }).then((res) => {
      // console.log(res.data)
      if (res.data.status == "success") {
        let arr = res.data.message
        for (let i = 0; i < arr.length; i++) {
          let sw = arr[i].switches
          for (let j = 0; j < sw.length; j++) {

            if (sw[j].type == "rgb") {
              let split_topic = sw[j].topic.split("*smart*")
              // console.log(split_topic)
              sw[j].topic = split_topic[0]
              sw[j].red_topic = split_topic[1]
              sw[j].green_topic = split_topic[2]
              sw[j].blue_topic = split_topic[3]
              // console.log( sw[j])
            }

          }
        }

        setdata(arr)
        setLoading(false)
        // dispatch(setAppData(arr))

      } else {
        // dispatch(setAppData([]))
        setdata([])
        setLoading(false)
      }
    })



  }
  // function getData() {
  //   axios.get("https://camp-coding.tech/smart_home/select_rooms_data.php").then((res) => {
  //     console.log(JSON.stringify(res.data.message))
  //     if (res.data.status == "success") {
  //       let arr = res.data.message
  //       for (let i = 0; i < arr.length; i++) {
  //         let sw=arr[i].switches
  //         for (let j=0;j<sw.length;j++){
  //          if( sw[j].type=="rgb"){
  //           let split_topic=sw[j].topic.split("*smart*")
  //           // console.log(split_topic)
  //           sw[j].topic=split_topic[0]
  //           sw[j].red_topic=split_topic[1]
  //           sw[j].green_topic=split_topic[2]
  //           sw[j].blue_topic=split_topic[3]
  //           // console.log( sw[j])
  //          }

  //         }
  //       }
  //       setdata(arr)
  //       setLoading(false)
  //     } else {
  //       setdata([])
  //       setLoading(false)
  //     }
  //   })



  // }
  function Connection() {
    let currentTime = +new Date();
    let clientID = currentTime + uuid.v1();
    clientID = clientID.slice(0, 23)
    MQTT.createClient({
      // uri: 'mqtt://185.194.217.124:1883',
      clientId: clientID,
      user: userData.connection_user_name,
      // "MohamedGalal",

      pass: userData.connection_pass,
      // "KmkCA6S*QkGTqrwUU9dD",

      // user:'MohamedSaad',
      //  pass: 'MS_127RTIF_#$%_e',
      protocol: "mqtt",
      tls: false,
      host: "185.194.217.124",
      port: 1883,
      // will:true,
      // willQos:0,
      // willRetainFlag:false,
      // willtopic:"I4TCShSFR40XTUWVXYZ4",
      auth: true,
      automaticReconnect: true,


    }).then(function (client) {
      // console.log(client)
      client.on('closed', function () {
        console.log('mqtt.event.closed');
        // dispatch(modifySensorConn(false))
        setConnection(false)
      });

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg);
        // dispatch(modifySensorConn(false))

        setConnection(false)
      });

      // client.on('message', function (msg) {
      //   console.log('mqtt.event.message Home', msg);

      //   console.log(msg.data)
      // });
      // client.on('message', function (msg) {
      //   // console.log('mqtt.event.message Home', msg);

      //   // console.log(msg?.topic)
      //   showLocalNotification(msg?.topic)
      // });
      client.on('connect', function () {
        console.log('connected');
        // dispatch(setClient(client))
        // dispatch(modifySensorConn(true))
        setClient(client)
        setConnection(true)
        // client.subscribe('I4TCShSFR40XTUWVXYZ4', 0);
        // // client.unsubscribe("#")
        // client.publish('I4TCShSFR40XTUWVXYZ4/SWITCH/I4TCShPSw1OXTUWVXYZ5J/SWITCH2', "1", 2, true);

      });


      client.connect();



    }).catch(function (err) {
      console.log(err);
    });
  }

  // const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), 10000));
  // const veryIntensiveTask = async (taskDataArguments) => {
  //   // Example of an infinite loop task
  //   const { delay } = taskDataArguments;
  //   await new Promise(async (resolve) => {


  //     setTimeout(() => {

  //       let currentTime = +new Date();
  //       let clientID = currentTime + uuid.v1();
  //       clientID = clientID.slice(0, 23)
  //       MQTT.createClient({
  //         // uri: 'mqtt://185.194.217.124:1883',
  //         clientId: clientID,
  //         user: userData.connection_user_name,
  //         // "MohamedGalal",

  //         pass:  userData.connection_pass,
  //         // "KmkCA6S*QkGTqrwUU9dD",

  //         // user:'MohamedSaad',
  //         //  pass: 'MS_127RTIF_#$%_e',
  //         protocol: "mqtt",
  //         tls: false,
  //         host: "185.194.217.124",
  //         port: 1883,
  //         // will:true,
  //         // willQos:0,
  //         // willRetainFlag:false,
  //         // willtopic:"I4TCShSFR40XTUWVXYZ4",
  //         auth: true,
  //         automaticReconnect: true,


  //       }).then(function (client) {
  //         // console.log(client)
  //         client.on('closed', function () {
  //           console.log('mqtt.event.closed');
  //           // dispatch(modifySensorConn(false))
  //           setConnection(false)
  //         });

  //         client.on('error', function (msg) {
  //           console.log('mqtt.event.error', msg);
  //           // dispatch(modifySensorConn(false))

  //           setConnection(false)
  //         });


  //         client.on('message', function (msg) {
  //           // console.log('mqtt.event.message Home', msg);

  //           console.log(msg?.topic)
  //           // showLocalNotification(msg?.topic)
  //         });
  //         client.on('connect', function () {
  //           console.log(data.sensors);
  //           // client.subscribe(data.sensors[0].topic,
  //           //   0)


  //         });


  //         client.connect();



  //       }).catch(function (err) {
  //         console.log(err);
  //       });
  //     }, 20000)

  //     await sleep(delay);
  //     await BackgroundService.stop();
  //   });
  // };
  // async function showLocalNotification(data) {
  //   try {
  //     const notification = await notifee.createChannel({
  //       id: '1',
  //       name: 'default',
  //     });

  //     await notifee.displayNotification({
  //       title: 'i4technology',
  //       body: data+"mmm",
  //       android: {
  //         channelId: "1",
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error displaying notification:', error);
  //   }

  // }















  useEffect(async () => {

    const unsubscribe = navigation.addListener('focus', () => {
      getData()
      Connection()
    });
    await BackgroundService.start(veryIntensiveTask, options);

    return unsubscribe;

  }, [navigation])















  function addroom(image) {

    setAddLoading(true)

    axios.post("https://camp-coding.tech/smart_home/home/add_room.php", {
      "user_id": userData.user_id,
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
    // console.log(image)

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
        editRoomObj !== null ? editRoom(res.data) : addroom(res.data)
        // console.log(res.data)
        // _uploadBanner(JSON.parse(res.data));
      } else {
        setAddLoading(false)
        utils.toastAlert("error", "error happen try agian later")
        // setLoading(false);
      }
    });




  }









  const onSpeechStart = (e) => {
    console.log('onSpeechStart: ', e);

    setStarted('√')

    setEnd('')
    setPartialResults([])
    setResults([])
    setRecognized('')
    setPitch('')
    setStarted('')
    setError('')

  };

  const onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√')
  };

  const onSpeechEnd = (e) => {
    console.log('onSpeechEnd: ', e);
    setEnd('√')
  };

  const onSpeechError = (e) => {
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error))

  };

  const onSpeechResults = (e) => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
    setEnd("end")
  };

  const onSpeechPartialResults = (e) => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);

  };

  const onSpeechVolumeChanged = (e) => {
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value)
  };

  const _startRecognizing = async () => {

    setEnd('')
    setPartialResults([])
    setResults([])
    setRecognized('')
    setPitch('')
    setStarted('')
    setError('')

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }

    setEnd('')
    setPartialResults([])
    setResults([])
    setRecognized('')
    setPitch('')
    setStarted('')
    setError('')
  };
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;


    return () =>
      Voice.destroy().then(Voice.removeAllListeners);
  }, [])

  useEffect(() => {
    // console.log(results[0]?.includes("go to"))
    if (results[0]?.toLowerCase().includes("open")) {
      // Alert.alert("open")
      // console.log(results[0])

      for (let i = 0; i < data.length; i++) {
        let sw = data[i]?.switches
        let sensor = data[i]?.sensors
        let device = data[i]?.devices
        // console.log(sw)
        for (let j = 0; j < sw.length; j++) {


          // console.log()
          // console.log( results[0]?.replace("open ", ""))
          if (testChar(sw[j]?.name, results[0]?.toLowerCase().replace("open ", ""))) {
            // console.log(sw[j]?.name.toLowerCase())
            client.publish(sw[j]?.topic, "1", 2, true)
            utils.toastAlert("success", `${sw[j]?.name} opend successfully`)
            setVoiceModal(false)
            break;
          }
        }
        for (let x = 0; x < sensor.length; x++) {
          if (testChar(sensor[x]?.name, results[0]?.toLowerCase().replace("open ", ""))) {
            client.publish(sensor[x]?.topic, "1", 2, true)
            utils.toastAlert("success", `${sensor[x]?.name} opend successfully`)
            setVoiceModal(false)
            // console.log(sensor[x]?.name.toLowerCase())
            break;
          }
        }
        for (let k = 0; k < device.length; k++) {
          if (testChar(device[k]?.name, results[0]?.toLowerCase().replace("open ", ""))) {
            // console.log(device[k]?.name.toLowerCase())
            client.publish(device[k]?.topic, "1", 2, true)
            utils.toastAlert("success", `${device[k]?.name} opend successfully`)
            setVoiceModal(false)
            break;
          }
        }



      }
      _destroyRecognizer()
    } else if (results[0]?.includes("go to")) {
      // go_to_fun(results[0])

      // console.log(data[0].name.toLowerCase())
      // console.log(results[0]?.replace("go to ",""))
      for (let i = 0; i < data.length; i++) {
        if (data[i].name.toLowerCase() === results[0]?.replace("go to ", "")) {
          setVoiceModal(false)
          navigation.navigate('RoomDeatils', {
            psdata: data[i],
            client: client,

          });
          break;
        }
      }
      _destroyRecognizer()
    } else if (results[0]?.toLowerCase().includes("close")) {
      // Alert.alert("open")
      // console.log(results[0])

      for (let i = 0; i < data.length; i++) {
        let sw = data[i]?.switches
        let sensor = data[i]?.sensors
        let device = data[i]?.devices
        // console.log(sw)
        for (let j = 0; j < sw.length; j++) {


          // console.log()
          // console.log( results[0]?.replace("open ", ""))
          if (testChar(sw[j]?.name, results[0]?.toLowerCase().replace("close ", ""))) {
            // console.log(sw[j]?.name.toLowerCase())
            client.publish(sw[j]?.topic, "0", 2, true)
            utils.toastAlert("success", `${sw[j]?.name} closed successfully`)
            setVoiceModal(false)
            break;
          }
        }
        for (let x = 0; x < sensor.length; x++) {
          if (testChar(sensor[x]?.name, results[0]?.toLowerCase().replace("close ", ""))) {
            client.publish(sensor[x]?.topic, "0", 2, true)
            // console.log(sensor[x]?.name.toLowerCase())
            utils.toastAlert("success", `${sensor[x]?.name} closed successfully`)
            setVoiceModal(false)
            break;
          }
        }
        for (let k = 0; k < device.length; k++) {
          if (testChar(device[k]?.name, results[0]?.toLowerCase().replace("close ", ""))) {
            // console.log(device[k]?.name.toLowerCase())
            client.publish(device[k]?.topic, "0", 2, true)
            utils.toastAlert("success", `${device[k]?.name} closed successfully`)
            setVoiceModal(false)
            break;
          }
        }



      }
      _destroyRecognizer()
    }
  }, [results])


  function testChar(str, substring) {
    // console.log(str)
    // console.log(substring)
    var arr_str = str + "".toLowerCase().split('');
    var arr_substr = substring.toLowerCase().split('');

    return arr_substr.filter(function (each) {
      return arr_str.indexOf(each) === -1;
    }).length === 0;
  }
  const go_to_fun = (result) => {
    console.log("hhh")
    let res = result?.split(" ")[2]
    console.log(data[0].name.toLowerCase === res)
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase === res) {
        navigation.navigate('RoomDeatils', {
          psdata: data[i],
          client: client,

        });
        break;
      }
    }


  }


  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={"dark-content"} />


      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: RFValue(10),
        }}>
        {/* <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.webp?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=',
          }}
          style={{
            height: RFValue(55),
            width: RFValue(55),
            borderRadius: RFValue(27.5),
          }}
        /> */}
        <Text


          style={{
            ...FONTS.body2,
            color: COLORS.black
          }}>
          {userData.user_name}
        </Text>

        <View style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between"
        }}>

          <TouchableOpacity
            onPress={() => {
              setVoiceModal(true)
            }}
            style={{
              width: RFValue(50),
              height: RFValue(50),
              // position: "absolute",
              backgroundColor: COLORS.primary,
              // bottom: "12%",
              // right: 0,
              borderRadius: RFValue(20),
              marginRight: RFValue(10),
              alignItems: "center",
              justifyContent: "center"
            }}>

            <MaterialIcons name={"keyboard-voice"} size={RFValue(15)} color={COLORS.white} />


          </TouchableOpacity>
          {(userData.user_id == 3) &&
            <TouchableOpacity
              onPress={() => {
                setshow_modal(true);
                setNewImage({})
              }}>
              <Image source={icons.add} style={{ width: RFValue(50), height: RFValue(50) }} resizeMode='contain' />
            </TouchableOpacity>
          }
        </View>


      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: RFValue(10),
        }}>
        <Text

          style={{
            ...FONTS.body1,
            color: '#000',
          }}>
          Hello 👋
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: '#848484',
          }}>
          Welcome to your home
        </Text>
      </View>
      <View style={{
        alignItems: "center"
      }}>
        <Text
          style={{
            ...FONTS.body2,
            color: '#000',
          }}
        >Connection Timer</Text>
        <Text
          style={{
            ...FONTS.body3,
            color: '#848484',
          }}
        >{new Date(counter * 1000).toISOString().slice(11, 19)}</Text>
      </View>


      <View style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: RFValue(20),
        alignItems: "center",
        paddingHorizontal: SIZES.base
      }}>
        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',

          }}>
          <View
            style={{
              backgroundColor: '#000',
              borderRadius: RFValue(15),
              marginRight: RFValue(10),
              paddingHorizontal: RFValue(10),
              paddingVertical: RFValue(8),

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white
              }}>
              {data.length}
            </Text>
          </View>
          <Text
            style={{
              ...FONTS.body3,
              fontWeight: "bold",
              color: '#000',
            }}>
            Rooms
          </Text>
        </View>
        {/* <TouchableOpacity>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.primary,
              textDecorationLine: "underline"
            }}
          >
            See all
          </Text>

        </TouchableOpacity> */}

      </View>

      {!loading ?
        data.length > 0 ?
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>

              {data.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log(client)
                    // if (client !== null) {
                    // console.log(client)
                    // Alert.alert(JSON.stringify(item))
                    navigation.navigate('RoomDeatils', {
                      psdata: item,
                      client: client,

                    });
                    // }

                  }}
                  style={{
                    backgroundColor: COLORS.gray3,

                    marginTop: RFValue(30),
                    height: RFValue(270),
                    width: RFValue(170),
                    borderRadius: RFValue(20),
                    marginLeft: RFValue(10),
                    marginRight: index == data.length - 1 ? RFValue(10) : 0,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setshow_modal(true)
                      setEditRoomObj(item)
                      setroomname(item.name)
                      setNewImage({ path: item.image.replaceAll("\"", "").trim() })
                      console.log({ path: item.image.replaceAll("\"", "") })
                    }}
                    style={{
                      width: RFValue(35),
                      height: RFValue(65),
                      position: "absolute",
                      backgroundColor: COLORS.primary,
                      zIndex: 1,
                      right: 0,
                      borderTopRightRadius: RFValue(20),
                      borderBottomLeftRadius: RFValue(20),
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Image
                      source={icons.edit}
                      style={{
                        height: RFValue(15),
                        width: RFValue(15),


                      }}

                      resizeMode="contain"
                    />

                  </TouchableOpacity>
                  <Image
                    source={{
                      uri: item?.image.replaceAll("\"", "").trim()
                    }}
                    style={{
                      height: RFValue(180),
                      width: '100%',
                      borderTopRightRadius: RFValue(20),
                      borderTopLeftRadius: RFValue(20),
                    }}
                    resizeMode="contain"
                  />
                  {/* <Image
                    source={icons.pc}
                    style={{
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                  /> */}
                  <View style={{
                    width: "100%",
                    height: RFValue(90),
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <Text
                      style={{
                        ...FONTS.body4,
                        color: '#000',
                        textAlign: 'center',
                        // marginTop:RFValue(20),
                        fontWeight: "700"
                      }}>
                      {item.name}
                    </Text>
                  </View>

                </TouchableOpacity>
              ))}
            </View>
          </ScrollView> :
          <Text
            style={{
              ...FONTS.body3,
              alignSelf: "center",
              marginTop: SIZES.margin * 2


            }}
          >There is no rooms</Text>
        : <ActivityIndicator size={50} style={{
          marginVertical: SIZES.margin
        }} />
      }


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

          {editRoomObj !== null && userData.user_id == 3 && <TouchableOpacity
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

            if (imageUpdated) _uploadImage();
            else {
              editRoomObj !== null ? editRoom(newImage.path) : addroom(newImage.path)
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

      {/* <Modal transparent visible={!connection}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: COLORS.white,
              paddingHorizontal: RFValue(20),
              paddingVertical: RFValue(30),
              borderRadius: RFValue(30),
              elevation: RFValue(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AnimatedLottieView
              source={lotties.sensor}
              loop
              autoPlay
              style={{
                width: RFValue(200),
                height: RFValue(200),
                alignSelf: 'center',
                marginBottom: SIZES.margin,

              }}

              resizeMode="contain"
            />
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.black,
              }}>
              Check Your Devices Connection
            </Text>
          </View>
        </View>
      </Modal> */}


      <Modal
        visible={voiceModal}


        onRequestClose={() => {
          setVoiceModal(false)
        }}
        transparent
      >
        <TouchableOpacity onPress={() => {
          setVoiceModal(false)
        }} activeOpacity={0} style={styles.container}>
          <View style={{
            width: "100%",
            height: "50%",
            backgroundColor: COLORS.white,
            alignItems: "center",
            // justifyContent: "center",
            borderTopLeftRadius: RFValue(25),
            borderTopRightRadius: RFValue(25),
            paddingTop: SIZES.padding
          }}>



            <Text style={styles.welcome}>Welcome, How Can I Help You ?</Text>

            <View
              style={{ width: "100%", height: RFValue(2), backgroundColor: COLORS.gray3, alignSelf: "center", marginBottom: SIZES.base }}
            ></View>
            <Text style={{ ...FONTS.body4, color: COLORS.primary, fontWeight: "bold" }}>
              Tips
            </Text>

            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Say <Text style={{ ...FONTS.body4, color: COLORS.primary, fontWeight: "bold" }}>go to (name of page)</Text> for navigation</Text>
            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Say <Text style={{ ...FONTS.body4, color: COLORS.primary, fontWeight: "bold" }}>open (device name)</Text> for open device</Text>
            <Text style={{ ...FONTS.body4, color: COLORS.black }}>Say <Text style={{ ...FONTS.body4, color: COLORS.primary, fontWeight: "bold" }}>close (device name)</Text> for close device</Text>
            <View
              style={{ width: "100%", height: RFValue(2), backgroundColor: COLORS.gray3, alignSelf: "center", marginVertical: SIZES.base }}
            ></View>
            {/* <Text style={styles.stat}>{`Recognized: ${
          recognized
        }`}</Text> */}
            {/* <Text style={styles.stat}>{`Pitch: ${pitch}`}</Text> */}
            {/* <Text style={styles.stat}>{`Error: ${error}`}</Text> */}
            {/* <Text style={styles.stat}>Results</Text> */}
            {results.map((result, index) => {
              return (
                <Text key={`result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })}
            {/* <Text style={styles.stat}>Partial Results</Text> */}
            {/* {partialResults.map((result, index) => {
              return (
                <Text key={`partial-result-${index}`} style={styles.stat}>
                  {result}
                </Text>
              );
            })} */}
            {/* <Text style={styles.stat}>{`End: ${end}`}</Text> */}
            {/* <TouchableHighlight onPress={_startRecognizing}>
          <Image style={styles.button} source={icons.add} />
        </TouchableHighlight> */}
            <TouchableHighlight
              onPress={_startRecognizing}
              style={{
                width: RFValue(50),
                height: RFValue(50),
                // position: "absolute",
                backgroundColor: COLORS.primary,
                // bottom: "12%",
                // right: 0,
                borderRadius: RFValue(20),
                marginRight: RFValue(10),
                alignItems: "center",
                justifyContent: "center"
              }}>
              {end == "end" || end == "" ?
                <MaterialIcons name={"keyboard-voice"} size={RFValue(15)} color={COLORS.white} />
                : <ActivityIndicator size={10} color={COLORS.white} />}

            </TouchableHighlight>
            <TouchableHighlight onPress={_stopRecognizing}>
              <Text style={styles.action}>Stop Recognizing</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={_cancelRecognizing}>
              <Text style={styles.action}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={_destroyRecognizer}>
              <Text style={styles.action}>Destroy</Text>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>

      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: RFValue(15),
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default Home;
