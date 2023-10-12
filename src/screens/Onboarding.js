import AnimatedLottieView from 'lottie-react-native';
import React, {useRef} from 'react';
import {View, Text, FlatList, Animated} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {TextButton} from '../components';
import {COLORS, FONTS, icons, images, lotties, SIZES} from '../constants';
import {modifyIsFirst} from '../redux/reducers/UserReducer';
import Auth from '../Services';
import FastImage from 'react-native-fast-image';
const OnBoarding = () => {
  const onboarding_screens = [
    {
      id: 1,
      image: images.intro1,
      text: 'Smarter life with smart device!',
    },
    {
      id: 2,
      image: images.intro2,
      text: 'Maximise security and instant notification!',
    },
    {
      id: 3,
      image: images.intro3,
      text: 'Give family access to your devices!',
    },
  ];
  const dispatch = useDispatch();
  const flatListRef = useRef();
  const onViewChangeRef = React.useRef(({viewableItems, changes}) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.primary + '20',
              COLORS.primary,
              COLORS.primary + '20',
            ],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 35, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`Dots-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 5,
                width: dotWidth,
                height: RFValue(3),
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding:SIZES.padding
      }}>
         <FastImage
          source={images.Logo}
          style={{
            width: RFValue(40),
            height: RFValue(40),
            // marginHorizontal:SIZES.margin,
            // marginVertical:SIZES.margin
            // alignSelf: 'center',
            // marginTop: RFValue(90),
          }}
          resizeMode="contain"
        />
      <View
        style={{
          flex: 1,
          // backgroundColor: COLORS.secondary,
         
        }}>
      
        <FastImage
          source={images.intro1}
          style={{
            width:"100%",
            height: RFValue(300),
            alignSelf: 'center',
            marginTop: RFValue(20),
          }}
          resizeMode="contain"
        />

        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          data={onboarding_screens}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          onViewableItemsChanged={onViewChangeRef.current}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  justifyContent: 'center',
                    // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    // flex: 1,
                    marginTop: RFValue(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70%',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h2,
                      color: COLORS.black,
                      fontFamily: FONTS.fontFamilyBold,
                      textAlign: 'center',
                    }}>
                    {onboarding_screens[currentIndex].text}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          //   flex: 1,
          backgroundColor: COLORS.white,
          ...COLORS.shadow,
          padding: SIZES.padding * 2,
        }}>
        <Dots />

        {currentIndex < onboarding_screens.length - 1 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
              //   alignItems: 'center',
              //   justifyContent: 'center',
            }}>
            <TextButton
              label={'Next'}
              labelStyle={{
                color: COLORS.white,
                ...FONTS.h3,
                fontFamily: FONTS.fontFamilyBold,
              }}
              buttonContainerStyle={{
                height: RFValue(45),
                borderRadius: SIZES.padding * 2,
                backgroundColor:COLORS.black
              }}
              onPress={() => {
                flatListRef?.current?.scrollToIndex({
                  index: currentIndex + 1,
                  animated: true,
                });
              }}
            />
          </View>
        )}

        {currentIndex == 2 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}>
            <TextButton
              label="Let's Start"
              labelStyle={{
                ...FONTS.h3,
                color: COLORS.white,
                fontFamily: FONTS.fontFamilyMedium,
              }}
              buttonContainerStyle={{
                height: RFValue(45),
                borderRadius: SIZES.padding * 2,
                backgroundColor:COLORS.black
              }}
              onPress={async () => {
                dispatch(modifyIsFirst(false));
                await Auth.setFirst('1');
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default OnBoarding;