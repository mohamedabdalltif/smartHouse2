import React, {useState, useEffect,useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  UIManager,
  LayoutAnimation,
  Modal,
  ActivityIndicator,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';

import {RFValue} from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, icons, images, SIZES} from '../../../constants';
// import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {FormInput} from '../../../components';
import utils from '../../../utils';
import {useIsFocused} from '@react-navigation/native';
import {color} from 'react-native-reanimated';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import MonthPicker from 'react-native-month-year-picker';

import {ScrollView} from 'react-native-gesture-handler';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from 'react-native-chart-kit';
const CARD_HEIGHT = 220;
const CARD_WIDTH = SIZES.width * 0.8;
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Statistec = ({navigation}) => {
  const [show_modal, setshow_modal] = React.useState(false);

  const [data, setdata] = React.useState([
    {
      data: 'may 2022',
      money: '200',
      status: 'up',
      ratio: '20',
    },
    {
      data: 'april 2022',
      money: '150',
      ratio: '10',
      status: 'down',
    },
    {
      data: 'may 2023',
      ratio: '3',
      money: '150',
      status: 'up',
    },
    {
      data: 'feb 2022',
      money: '110',
      ratio: '5',
      status: 'down',
    },
    {
      data: 'jun 2022',
      money: '200',
      ratio: '10',
      status: 'up',
    },
    {
      data: 'jul 2022',
      money: '101',
      status: 'down',
      ratio: '44',
    },
    {
      data: 'oct 2022',
      money: '58',
      ratio: '11',
      status: 'up',
    },
    {
      data: 'jun 2022',
      money: '200',
      ratio: '10',
      status: 'up',
    },
    {
      data: 'jul 2022',
      money: '101',
      status: 'down',
      ratio: '44',
    },
    {
      data: 'oct 2022',
      money: '58',
      ratio: '11',
      status: 'up',
    },
  ]);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  

  const showPicker = useCallback((value) => setShow(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      setShow(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );


  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <StatusBar backgroundColor={'#ddd'} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image
          source={{
            uri: 'https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.webp?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=',
          }}
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontFamily: FONTS.fontFamily,
            color: '#000',
          }}>
          Home Name
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}>
          <Image source={icons.calender} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text
          style={{
            ...FONTS.body1,
            color: '#000',
          }}>
          Electric usage
        </Text>
        <Text
          style={{
            ...FONTS.body4,
            color: '#848484',
          }}>
          Power consumption bill report
        </Text>
      </View>

      <View>
        <LineChart
          data={{
           // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width - 30} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#ffa726',
            backgroundGradientTo: '#F7C17E',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            height: 100,
            width: 180,
            backgroundColor: '#EA8917',
            borderRadius: 30,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={icons.volt} />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}>
              today
            </Text>
          </View>
          <Text
            style={{
              ...FONTS.body2,
              color: '#fff',
              textAlign: 'center',
            }}>
            312{'\n'} kwh
          </Text>
        </View>
        <View
          style={{
            height: 100,
            width: 180,
            backgroundColor: '#5B17EA',
            borderRadius: 30,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={icons.bill} />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Bill
            </Text>
          </View>
          <Text
            style={{
              ...FONTS.body2,
              color: '#fff',
              textAlign: 'center',
            }}>
            $ 212
          </Text>
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.fontFamily,
              color: '#000',
              fontWeight: 'bold',
              marginLeft: 20,
              marginBottom: 10,
            }}>
            Money expenses
          </Text>
          <TouchableOpacity
            onPress={() => {
              setshow_modal(true);
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: FONTS.fontFamily,
                color: COLORS.red,
                fontWeight: 'bold',
                marginRight: 20,
                marginBottom: 10,
                textDecorationLine: 'underline',
                textDecorationColor: COLORS.red,
              }}>
              see all
            </Text>
          </TouchableOpacity>
        </View>
        {data.slice(0, 3).map(item => (
          <View
            style={{
              // height: 100,
              width: '95%',
              backgroundColor: '#F0F0F0',
              borderRadius: 25,
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'center',
              padding: 15,
              marginBottom: 10,
            }}>
            <View
              style={{
                width: '15%',
              }}>
              <Image
                source={item.status == 'up' ? icons.arrowup : icons.arrowdown}
              />
            </View>

            <View
              style={{
                width: '50%',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                {item.data}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontWeight: 'bold',
                }}>
                {item.ratio} %
                <Text
                  style={{
                    fontWeight: '300',
                    color: '#808080',
                    fontFamily: FONTS.fontFamily,
                  }}>
                  {item.status == 'up'
                    ? 'More from last month'
                    : 'less from last month'}
                </Text>
              </Text>
            </View>

            <View
              style={{
                width: '20%',
              }}>
              <Text
                style={{
                  ...FONTS.body2,
                  color: '#000',
                  textAlign: 'center',
                }}>
                $ {item.money}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* {show && (
        // <DateTimePicker
        //   testID="dateTimePicker"
        //   value={date}
        //   mode={'date'}
        //    is24Hour={true}
        //   onChange={onChange}

        // />
        <MonthPicker
        onChange={onValueChange}
        value={date}
        // minimumDate={new Date()}
        maximumDate={new Date()}
        locale="en"
      />
      )} */}
      <Modal
        visible={show_modal}
        animationType="slide"
        onRequestClose={() => {
          setshow_modal(false);
        }}>
        <TouchableOpacity
          onPress={() => {
            setshow_modal(false);
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
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
                alignSelf: 'center',
                padding: 15,
                marginBottom: 10,
              }}>
              <View
                style={{
                  width: '15%',
                }}>
                <Image
                  source={item.status == 'up' ? icons.arrowup : icons.arrowdown}
                />
              </View>

              <View
                style={{
                  width: '50%',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  {item.data}
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontWeight: 'bold',
                  }}>
                  {item.ratio} %
                  <Text
                    style={{
                      fontWeight: '300',
                      color: '#808080',
                      fontFamily: FONTS.fontFamily,
                    }}>
                    {item.status == 'up'
                      ? 'More from last month'
                      : 'less from last month'}
                  </Text>
                </Text>
              </View>

              <View
                style={{
                  width: '20%',
                }}>
                <Text
                  style={{
                    ...FONTS.body2,
                    color: '#000',
                    textAlign: 'center',
                  }}>
                  $ {item.money}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
};

export default Statistec;
