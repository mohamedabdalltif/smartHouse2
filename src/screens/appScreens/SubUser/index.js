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
  StatusBar, Platform, UIManager, LayoutAnimation, Image, Alert
} from "react-native";

import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
const initialDimensions = Dimensions.get('screen');

import CheckBox from '@react-native-community/checkbox';
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, SIZES, icons } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}


const SubUser = ({ route, navigation }) => {
  const { userData } = useSelector(state => state.UserReducer);
  // const { appData } = useSelector(state => state.AppReducer);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [loading, setLoading] = useState(true)

  const [current_index, setcurrent_index] = useState(-1)



  const [data, setdata] = React.useState(
    []
//  JSON.parse(JSON.stringify(appData))
 
  )
  // useEffect(()=>{
  //   // console.log(JSON.stringify(appData))
  //   let editData=[...appData]
  //   for(let i=0;i<editData.length;i++){
  //   for (let j = 0; j < editData[i]?.switches?.length; j++) {
  //     editData[i].switches[j].check=true

  //   }
  //   for (let x = 0; x < editData[i]?.sensors?.length; x++) {
  //     editData[i].sensors[x].check=false
  //   }
  //   for (let k = 0; k < editData[i]?.devices?.length; k++) {
  //     editData[i].devices[k].check=false
  //   }}

  //   console.log(JSON.stringify(editData))
  //   setdata(editData)
  // },[])
useEffect(()=>{
  
  const unsubscribe = navigation.addListener('focus', () => {
    getData()
   
  });

  return unsubscribe;
},[navigation])

  function getData() {
    // console.log(userData)
    // Alert.alert("hrtr")
    axios.post("https://camp-coding.tech/smart_home/home/select_room_data_without_subuser.php", {
      user_id: userData.user_id
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
  function changeToggle(index,inner_index,type) {
    console.log(index + '********' + inner_index)
    let old_data = [...data]
if(type=="sw"){
    old_data[index].switches[inner_index].check = !old_data[index].switches[inner_index].check
    setdata(old_data)
    // console.log(old_data[index].switches[inner_index].check)
}else if(type=="dev"){
  old_data[index].devices[inner_index].check = !old_data[index].devices[inner_index].check
  setdata(old_data)
    // console.log(old_data[index].devices[inner_index].check)
}else if(type=="sen"){
  old_data[index].sensors[inner_index].check = !old_data[index].sensors[inner_index].check
  setdata(old_data)
    // console.log(old_data[index].devices[inner_index].check)
}
    
  }

  function changeshow(index) {
    let old_data = [...data]

    if (old_data[index].show) {
      old_data[index].show = false
    } else {
      for (let i = 0; i < old_data.length; i++) {
        old_data[i].show = false
      }
      old_data[index].show = true
    }


    setdata(old_data)
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);

  }
  return (
    <View style={{
      flex: 1,
      backgroundColor:COLORS.white
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
                    </View>
                    {!loading?
  <ScrollView>
      {data?.map((item, index) => (
        <>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("SubDevices",{
            devData:item
          })
        }}
        style={{
          backgroundColor:COLORS.gray3,marginBottom:SIZES.base,
          width:"90%",
          alignItems:"center",
          alignSelf:"center",
          paddingVertical:SIZES.padding,
          marginTop:SIZES.margin,
          borderRadius:SIZES.radius
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color:COLORS.primary,
            // marginBottom:SIZES.margin
          }}
        >
         {data[index].name}
        </Text>
     
     
     </TouchableOpacity>
         
        



        </>


      ))}
      </ScrollView>
      :<ActivityIndicator size={50} style={{marginTop:SIZES.margin*2}}/>}
{/* </View> */}
    </View>
  )
}


export default SubUser;