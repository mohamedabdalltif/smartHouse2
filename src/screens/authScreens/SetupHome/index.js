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
import { CustomTextInput, TextButton } from '../../../components';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/reducers/UserReducer';

const SetupHome = ({ navigation }) => {
    const [homeName, setHomeName] = useState("")
    const dispatch = useDispatch();

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
    async function storedata(data) {
        await Auth.setAccount(data);
      }
    const HomeName = () => {
        return (
            <>
                <View
                    style={{
                        // alignItems:"center",
                        width: "85%",
                        alignSelf: "center",
                        // backgroundColor:"red",
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.margin
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
                        your home name
                    </Text>

                    <Text
                        style={{
                            ...FONTS.body5,
                            color: COLORS.gray,
                            textAlign: "center"
                        }}
                    >
                        choose a nickname for this home to help identify it later
                    </Text>
                </View>

                <CustomTextInput TextContainerStyle={{
                    alignSelf: "center",
                    width: "100%",
                    height: RFValue(55),
                    borderRadius: RFValue(50),
                    // borderWidth: 0.5,
                    flexDirection: "row",
                    alignItems: "center",
                    // paddingLeft: SIZES.padding,
                    backgroundColor: COLORS.gray2,
                    marginVertical: SIZES.margin
                }}

                    value={homeName} placeholder={"name"} onChangeText={(txt) => {
                        setHomeName(txt)

                    }}

                />
            </>
        )
    }

    return (
        <View style={styles.constainer}>

            <Header />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View
                    
                >
                    {HomeName()}

                </View>
                <TextButton
                label={"Next"}
                onPress={()=>{
                    dispatch(setUser('data'))
                    // navigation.navigate("FillProfile")
                    storedata('data');
                }}
                buttonContainerStyle={{
                    flex:1,
                    width:"60%",
                    alignSelf:"center",
                    height:RFValue(60),
                    borderRadius:RFValue(50),
                    backgroundColor:COLORS.black
                }} 
                />

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    constainer: {
        // flex: 1,
        flexGrow:1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding
    },

}
)
export default SetupHome;