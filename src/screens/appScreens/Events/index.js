import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { COLORS, SIZES, icons } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import utils from '../../../utils';
import { RFValue } from 'react-native-responsive-fontsize';

function Events({navigation}) {
  const { userData } = useSelector(state => state.UserReducer);
  const { goBack } = useNavigation()
  const [Switch, setSwitch] = useState(true);
  const [loading, setLoading] = useState(true)
  // -------first picker state--------
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [items, setItems] = useState([

  ]);
  // ----------first switch state--------
  const [select, setSelect] = React.useState('On');
  const [first_device_value, setFirst_device_value] = React.useState('');
  // -------Second picker state--------
  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  const [items2, setItems2] = useState([

  ]);
  // ----------Second switch state--------
  const [select2, setSelect2] = React.useState('On');
  const [second_device_value, setSecond_device_value] = React.useState('');
  // -------first picker state in second View--------
  const [value3, setValue3] = useState(null);
  const [isFocus3, setIsFocus3] = useState(false);
  const [items3, setItems3] = useState([

  ]);
  // -----------------get date&time------------------
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);



  function getData() {
    // console.log(userData)
    // Alert.alert("hrtr")
    setLoading(true)
    axios.post("https://camp-coding.tech/smart_home/home/select_room_data_without_subuser.php", {
      user_id: userData.user_id
    }).then((res) => {
      // console.log(res.data.message)
      if (res.data.status == "success") {

        let data = res.data.message
        console.log(data[0]["switches"])
        let sw = data[0]["switches"]
        let dev = data[0]["devices"]
        let sensors = data[0]["sensors"]
        let arr = []
        for (let i = 0; i < sw?.length; i++) {
          sw[i]["label"] = sw[i]["name"]
          sw[i]["value"] = sw[i]["name"]
          arr.push(sw[i])
        }
        for (let i = 0; i < dev?.length; i++) {
          dev[i]["label"] = dev[i]["name"]
          dev[i]["value"] = dev[i]["name"]
          arr.push(dev[i])
        }
        for (let i = 0; i < sensors?.length; i++) {
          sensors[i]["label"] = sensors[i]["name"]
          sensors[i]["value"] = sensors[i]["name"]
          arr.push(sensors[i])
        }
        // Alert.alert(JSON.stringify(arr))
        setItems(arr)
        setItems2(arr)
        setItems3(arr)
        // setdata(res.data.message)
        setLoading(false)
        // dispatch(setAppData(arr))

      } else {
        // dispatch(setAppData([]))
        // setdata([])
        setItems([])
        setItems2([])
        setItems3([])
        setLoading(false)
      }
    })
  }
  useEffect(() => {
    getData()
  }, [])





  const AddEvent = () => {
// Alert.alert(JSON.stringify(Switch))
      setLoading(true)
    if (select == "Value" && first_device_value == "") {
      utils.toastAlert("error", "Please enter first device value")
      return;
    }
     if (select2 == "Value" && second_device_value == "") {
      utils.toastAlert("error", "Please enter second device value")
      return;
    }
     if (Switch==false&&(value3 == null || date == "")) {
      utils.toastAlert("error", "Please select devices firstly or date and time")
      return;
    }
    if (Switch==true&& (value==null || value2 ==null)) {
      utils.toastAlert("error", "Please select devices firstly or date and time")
      return;
    }
    let data_send = {
      device_one_id: Switch==true ? value?.device_id ||value?.switch_id ||value?.sensor_id: value3?.device_id ||value3?.switch_id ||value3?.sensor_id,
      action_one: select == "On" ? 1 : select == "Value" ?first_device_value:0, // 1 or 0 
      device_two_id: Switch==true ? value2?.device_id ||value2?.switch_id ||value2?.sensor_id:"",
      action_two: select2 == "On" ? 1 :select2 == "Value" ?second_device_value:0, // 1 or 0 
      date: date,
      time: time,
      type: Switch==true ? "device_to_device" : 'time' , // 'device_to_device' , 'time',
      user_id:userData.user_id

    }
   

    let data_send_versel={
      "type":  Switch==true ? "deviceToDevice" : 'time',
      deviceOneId:Switch==true ? value?.device_id ||value?.switch_id ||value?.sensor_id: value3?.device_id ||value3?.switch_id ||value3?.sensor_id,
       "firstDevTopic": Switch==true ? value?.topic: value3?.topic,
       deviceOneName:Switch==true ? value?.name: value3?.name,
       "secondDevTopic": Switch==true ? value2?.topic:"",
       deviceTwoName: Switch==true ? value2?.name:"",
       deviceTwoId:Switch==true ? value2?.device_id ||value2?.switch_id ||value2?.sensor_id:"",
       "firstDevValue": select == "On" ? 1 : select == "Value" ?first_device_value:0,
       "secondDevValue":select2 == "On" ? 1 :select2 == "Value" ?second_device_value:0,
       "time": new Date(date+" "+time),
       userId:userData?.user_id
     }
     console.log(JSON.stringify(data_send_versel))
    axios.post("https://mqtt-liart.vercel.app/events", data_send_versel).then((res) => {
      // console.log(JSON.stringify(res.data))
      if (res.data.status == "sucesss") {
        // axios.post("https://camp-coding.tech/smart_home/events/add_events.php", data_send).then((res) => {
        //   console.log(JSON.stringify(res.data))
        //   if (res.data.status == "success") {
            utils.toastAlert("success", "Device added successfully")
            // dispatch(setdeviceAdded(true))
    
            // goBack()
            setLoading(false)
        //   } else {
        //     utils.toastAlert("error", "Error happen please try again later")
        //     // setLoading(false)
        //   }
    
        // })
       
      } else {
        utils.toastAlert("error", "Error happen please try again later")
        setLoading(false)
      }

    })

    
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      {!loading ? <>
        {/* ---------Header----------- */}
        <View style={styles.Header}>
          <TouchableOpacity activeOpacity={.8} style={styles.BackButton} onPress={() => { goBack() }}>
            <Image source={icons.Backview} style={styles.BackImage} resizeMode='contain' />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Events</Text>
          <View style={{ width: 85 }} />

        </View>
        {/* ----------switch page buttons---------- */}
        <View style={styles.SwitchContainer}>
          <TouchableOpacity
            style={[styles.SwitchButton, { backgroundColor: Switch ? COLORS.primary : null, borderTopLeftRadius: Switch ? 10 : 0, borderBottomLeftRadius: Switch ? 10 : 0 }]}
            onPress={() => {
              setSwitch(true);
            }}>
            <Text style={{ color: !Switch ? COLORS.primary : '#fff' }}>Device</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.SwitchButton, { backgroundColor: !Switch ? COLORS.primary : null, borderTopRightRadius: !Switch ? 10 : 0, borderBottomRightRadius: !Switch ? 10 : 0 }]}
            onPress={() => {
              setSwitch(false);
            }}>
            <Text style={{ color: Switch ? COLORS.primary : '#fff' }}>Time</Text>
          </TouchableOpacity>
        </View>
        {/* ------------------------------------------------------------------- */}
        {/* ------------------------------------------------------------------- */}
        {Switch ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <>
              {/* ------first picker--------- */}
              <View style={styles.PickerContainer}>
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: COLORS.primary }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={items}
                  // search
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select device"}
                  // searchPlaceholder="Search..."
                  value={value?.value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    console.log(JSON.stringify(item))
                    setValue(item);
                    setIsFocus(false);
                  }}
                />
              </View>
              {/* --------on/off first picker----------- */}
              <View style={{ alignSelf: 'center' }}>
                <RadioButton.Group
                  onValueChange={newValue => setSelect(newValue)}
                  value={select}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="On" />
                      <Text>On</Text>
                    </View>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="Off" />
                      <Text>Off</Text>
                    </View>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="Value" />
                      <Text>Value</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              {select == "Value" && <TextInput
                value={first_device_value}
                onChangeText={(txt) => {
                  // console.log(txt)
                  setFirst_device_value(txt)
                }}
                placeholder='Value'
                style={{
                  width: "90%",
                  height: 50,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginTop: 10,
                  padding: 10
                }}

              />}
              {/* ------Second picker--------- */}
              <View style={styles.PickerContainer}>
                <Dropdown
                  style={[styles.dropdown, isFocus2 && { borderColor: COLORS.primary }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={items2}
                  // search
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select device"}
                  // searchPlaceholder="Search..."
                  value={value2?.value}
                  onFocus={() => setIsFocus2(true)}
                  onBlur={() => setIsFocus2(false)}
                  onChange={item => {
                    setValue2(item);
                    setIsFocus2(false);
                  }}
                  disable={value == null ? true : false}
                />
              </View>
              {/* --------on/off Second picker----------- */}
              <View style={{ alignSelf: 'center' }}>
                <RadioButton.Group
                  onValueChange={newValue => setSelect2(newValue)}
                  value={select2}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="On" />
                      <Text>On</Text>
                    </View>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="Off" />
                      <Text>Off</Text>
                    </View>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="Value" />
                      <Text>Value</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              {select2 == "Value" && <TextInput
                placeholder='Value'
                value={second_device_value}
                onChangeText={(txt) => {
                  setSecond_device_value(txt)
                }}
                style={{
                  width: "90%",
                  height: 50,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginTop: 10,
                  padding: 10
                }}

              />}
              {/* -------------------submit---------------- */}
              <TouchableOpacity
                style={styles.submit_style}
                onPress={() => {

                  AddEvent()
                }}>
                <Text style={styles.text_submit_style}>Submit</Text>
              </TouchableOpacity>
            </>
            <TouchableOpacity style={styles.submit_style}
                   onPress={() => {
                    navigation.navigate("RenderEvents")
                  }}
              >
                <Text style={styles.text_submit_style}>Show Events</Text>
              </TouchableOpacity>

          </ScrollView>
        ) : (
          // --------------------------------------------------------
          // ----------------------Second View-----------------------
          // --------------------------------------------------------
          <ScrollView showsVerticalScrollIndicator={false}>
            <>
              <View style={styles.PickerContainer}>
                <Dropdown
                  style={[styles.dropdown, isFocus3 && { borderColor: COLORS.primary }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={items3}
                  // search
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select device"}
                  // searchPlaceholder="Search..."
                  value={value3?.value}
                  onFocus={() => setIsFocus3(true)}
                  onBlur={() => setIsFocus3(false)}
                  onChange={item => {
                    setValue3(item);
                    setIsFocus3(false);
                  }}
                />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <RadioButton.Group
                  onValueChange={newValue => setSelect(newValue)}
                  value={select}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="On" />
                      <Text>On</Text>
                    </View>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="Off" />
                      <Text>Off</Text>
                    </View>
                    <View style={styles.OnOff_style}>
                      <RadioButton color={COLORS.primary} value="Value" />
                      <Text>Value</Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              {select == "Value" && <TextInput
                placeholder='Value'
                value={first_device_value}
                onChangeText={(txt) => {
                  setFirst_device_value(txt)
                }}
                style={{
                  width: "90%",
                  height: 50,
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginTop: 10,
                  padding: 10
                }}

              />}
              {/* -------------------------------------------- */}
              <TouchableOpacity
                style={styles.Date_button}
                onPress={() => {
                  setShow(true);
                }}>
                {date == '' ? (
                  <Text style={[styles.text_submit_style, { color: '#000' }]}>
                    Select Date&Time
                  </Text>
                ) : (
                  <Text style={{ color: '#000' }}>
                    Date : {date} Time : {time}
                  </Text>
                )}
              </TouchableOpacity>
              {/* ------------------------------------ */}
              {show ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={change ? 'time' : 'date'}
                  minimumDate={new Date()}
                  is24Hour={false}
                  display="default"
                  onChange={(data, time) => {
                    let dateFinal = data.nativeEvent.timestamp;
                    let date_format = moment(dateFinal).format('YYYY-MM-DD');
                    let time_formate = moment(dateFinal).format('HH:mm');

                    setDate(date_format);
                    setChange(true);
                    setTime(time_formate);
                    setShow(false);
                    setChange(false);
                  }}
                />
              ) : null}
              {/* -------------------submit---------------- */}
              <TouchableOpacity style={styles.submit_style}
                onPress={() => {

                  AddEvent()
                }}
              >
                <Text style={styles.text_submit_style}>Submit</Text>
              </TouchableOpacity>
            </>
            <TouchableOpacity style={styles.submit_style}
                onPress={() => {
                  navigation.navigate("RenderEvents")
                }}
              >
                <Text style={styles.text_submit_style}>Show Events</Text>
              </TouchableOpacity>
          </ScrollView>
        )}
      </> :
        <ActivityIndicator size={50} color={COLORS.primary} style={{ paddingTop: "50%" }} />
      }
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    height: 60,
    // backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: '#D6BDFF',
    flexDirection: 'row',

  },
  BackButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.margin,
    justifyContent: "space-between"
  },
  BackImage: {
    width: 50,
    height: 50
  },
  HeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  SwitchContainer: {
    width: '90%',
    height: RFValue(50),
    // backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  SwitchButton: {
    // backgroundColor: COLORS.primary,
    width: '50%',
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: RFValue(50)
  },
  PickerContainer: {
    width: '90%',
    margin: '5%',
  },
  dropdown: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'grey',
  },
  OnOff_style: {
    flexDirection: 'row',
    alignItems: 'center',


    // color:COLORS.primary
  },
  submit_style: {
    width: '90%',
    // marginHorizontal: '10%',
    marginVertical: '5%',
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center"

  },
  text_submit_style: {
    // fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  Date_button: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: '5%',
    marginVertical: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Events;
