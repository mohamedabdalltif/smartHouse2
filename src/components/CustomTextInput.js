import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, SIZES, icons } from "../constants";
import FastImage from "react-native-fast-image";
const CustomTextinput = ({ value, onChangeText, placeholder, icon, type, keyboardType = "default", TextContainerStyle }) => {
    const [showPass, setShowPass] = useState(false)
    const [pressIn, setPressIN] = useState(false)
    return (
        <View style={
            {
                ...TextContainerStyle,
                borderWidth:pressIn?1:0,
                borderColor:COLORS.black
            }

        }>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FastImage source={icon} style={{ width: RFValue(24), height: RFValue(24), marginRight: SIZES.base }} tintColor={COLORS.gray2} />
                <TextInput
                    onPressIn={() => {
                        setPressIN(true)
                    }}
                    onBlur={()=>{
                        setPressIN(false)
                    }}

                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={(txt) => {
                        onChangeText(txt)
                    }}

                    placeholder={placeholder}
                    style={{ width: "70%" }}
                    secureTextEntry={type == "password" && showPass == false ? true : false}

                />

            </View>
            {type == "password" && (
                <TouchableOpacity onPress={() => {
                    setShowPass(!showPass)
                }}>
                    <FastImage source={showPass ? icons.eye : icons.eye2} style={{ width: RFValue(24), height: RFValue(24) }} />
                </TouchableOpacity>)
            }

        </View>
    )
}
export default CustomTextinput;