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

const Faq = ({ navigation }) => {

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
                        navigation.goBack()
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
            <Text>jjjjjj</Text>



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
export default Faq;