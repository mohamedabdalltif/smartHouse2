import React, {useEffect, useRef} from 'react';
import {View, Image, StatusBar, ImageBackground} from 'react-native';
import {COLORS, FONTS, icons, images} from './src/constants';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import * as Animatable from 'react-native-animatable';
const SplashScreen = () => {
  const iconRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      iconRef.current.flipOutY(200);
    }, 2100);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: COLORS.white,
      }}>
      <StatusBar backgroundColor={COLORS.white} />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animatable.Image
          ref={iconRef}
          delay={200}
          animation={'flipInY'}
          source={images.splash}
          style={{
            width: RFValue(250),
            height: RFValue(200),
            position:"absolute",
            top:RFValue(180)
          }}
          resizeMode="contain"
        />
      </View>
      {/* <ImageBackground 
      style={{alignSelf:"flex-end",width:"100%",height:RFValue(350)}}
      source={images.backGroundSplash}
      resizeMode='contain'
      /> */}
    </View>
  );
};

export default SplashScreen;
