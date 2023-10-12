import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Modal

} from 'react-native';
import { COLORS, FONTS, SIZES, icons, images } from '../../../constants';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import { TextButton } from '../../../components';

const RegisterSuccess = ({ navigation }) => {


    const Header = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: SIZES.margin
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        // navigation.goBack()
                    }}
                >
                    <FastImage
                        source={icons.arrowLeftButton}
                        style={{
                            width: RFValue(50),
                            height: RFValue(50),
                        }}

                    />

                </TouchableOpacity>



            </View>
        )
    }

    return (
        <View style={styles.constainer}>

            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FastImage
                    source={images.Register_Success}
                    style={{
                        width: "100%",
                        height: RFValue(320)
                    }}
                    resizeMode='contain'

                />
                <View
                    style={{
                        // alignItems:"center",
                        // width:"70%",
                        // alignSelf:"center",
                        // backgroundColor:"red",
                        paddingHorizontal: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.body1,
                            fontWeight: "700",
                            color: COLORS.black,
                            textAlign: "center"
                        }}
                    >
                        Hurray
                    </Text>
                    <Text
                        style={{
                            ...FONTS.body1,
                            fontWeight: "700",
                            color: COLORS.black,
                            textAlign: "center"
                        }}
                    >
                        your account is now registered
                    </Text>

                    <Text
                        style={{
                            ...FONTS.body5,
                            color: COLORS.gray,
                            textAlign: "center"
                        }}
                    >
                        congratulation,you are now registered.Do you want to set up your home first?
                    </Text>
                </View>

                <TextButton
                onPress={()=>{
                    navigation.navigate("SetupHome")
                }}
                    label={"Continue setup home"}
                    labelStyle={{
                        ...FONTS.body5
                    }}
                    buttonContainerStyle={{
                        width: "100%",
                        height: RFValue(60),
                        marginVertical: SIZES.margin,
                        borderRadius: RFValue(50)
                    }}
                />

                <View style={{ flexDirection: "row", alignSelf: "center" ,marginTop:SIZES.margin}}>
                    <Text style={[FONTS.h5, { color: COLORS.black, marginRight: SIZES.base }]}>
                       No, I want to 
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            // navigation.navigate("Login")
                        }}
                    >
                        <Text style={[FONTS.body5, {  color: COLORS.primary, textDecorationLine: "underline" }]} >
                            Start exploring
                        </Text>
                    </TouchableOpacity>

                </View>


            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding
    },

}
)
export default RegisterSuccess;