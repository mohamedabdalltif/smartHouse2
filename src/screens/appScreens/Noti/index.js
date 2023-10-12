import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {FormInput, Header} from '../../../components';
import {COLORS, FONTS, icons, images, SIZES} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import Auth from '../../../Services';
import {removeUser} from '../../../redux/reducers/UserReducer';
import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-paper';

const Notfication = ({navigation}) => {
  const [data, setdata] = React.useState([
    {
      data: 'sensor 1 is not workink',
      seen : false
    },
    {
      data: 'sensor 2 droopd',
      seen : true

    },
    {
        data: 'sensor 3 not workink',
      seen : true

      },
  ]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          margin: 15,
        }}>
        <Image source={icons.Backview} />
      </TouchableOpacity>

      <ScrollView>
        {data.map(item => (
          <View
            style={{
              // height: 100,
              width: '95%',
              backgroundColor: '#F0F0F0',
              borderRadius: 25,

              alignSelf: 'center',
              padding: 15,
              marginBottom: 10,
              borderWidth : item.seen ? null : .5
            }}>
            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  color: '#000',
                  // fontWeight: 'bold',
                  ...FONTS.body3,
                }}>
                {item.data}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: RFValue(75),
  },
});

export default Notfication;
