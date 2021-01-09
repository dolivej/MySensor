/*

Report Screens:
This is where the user will go if they want more details on each sensor reading

<DailyReport />
-> A section that defaults to todays report, however, the user can change it to query different time periods, shows a graph

<SummarySection />
-> Potential section where user can see suggestions for this sensor


The chart relies on the component LineChart.js 
The report section takes in sensor data for a specific sensor

*/

import React, {useState} from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS, FONTS, SIZES} from '../constants';
import {NavHeader, LineChartComp} from '../components/';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

// A section that defaults to todays report, however, the user can change it to query different time periods, shows a graph
const DailyReport = ({navigation, sensor}) => {
  const renderReportChart = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          minHeight: 0.35 * SIZES.height,
        }}>
        <View>
          <Text style={{color: COLORS.white, ...FONTS.h1}}>{sensor.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                padding: 2,
                backgroundColor: COLORS.white,
                marginRight: 5,
                borderRadius: 4,
                elevation: 1,
                flexDirection: 'row',
              }}>
              <Text style={{color: sensor.color, ...FONTS.h4, paddingLeft: 2}}>
                Daily View
              </Text>
              <Icon
                style={{paddingTop: 4, paddingLeft: 6, paddingRight: 3}}
                name="chevron-down"
                size={13}
                color={sensor.color}
                light
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 2,
                backgroundColor: COLORS.white,
                marginRight: 5,
                borderRadius: 4,
                elevation: 1,
                flexDirection: 'row',
              }}>
              <Text style={{color: sensor.color, ...FONTS.h4, paddingLeft: 2}}>
                12 Dec, 2020
              </Text>
              <Icon
                style={{paddingTop: 4, paddingLeft: 6, paddingRight: 3}}
                name="chevron-down"
                size={13}
                color={sensor.color}
                light
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginLeft: -15, paddingTop: SIZES.padding}}>
          <LineChartComp
            data={sensor.readings.data}
            unit={sensor.readings.unit}
            round={sensor.readings.round}
          />
        </View>
      </View>
    );
  };

  const renderReportSummaryGraphics = () => {
    return (
      <View
        style={{
          ...styles.shadow,
          backgroundColor: COLORS.white,
          width: SIZES.width,
          minHeight: 0.65 * SIZES.height,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          elevation: 3,
        }}>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            marginBottom: -20,
          }}>
          <Text style={{color: sensor.color, ...FONTS.h1}}>Results</Text>
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.padding,

            alignItems: 'center',
            alignContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: sensor.color,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: COLORS.darkgray, ...FONTS.h4}}>
                  Average
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={sensor.icon}
                    size={20}
                    color={sensor.color}
                    light
                  />
                  <Text
                    style={{
                      color: sensor.color,
                      ...FONTS.h3,
                      paddingTop: 10,
                      paddingLeft: 5,
                    }}>
                    {sensor.details.average}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: sensor.color,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: COLORS.darkgray, ...FONTS.h4}}>High</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={sensor.details.high.icon}
                    size={20}
                    color={sensor.color}
                    light
                  />
                  <Text
                    style={{
                      color: sensor.color,
                      ...FONTS.h3,
                      paddingTop: 10,
                      paddingLeft: 5,
                    }}>
                    {sensor.details.high.value}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginLeft: 5,
                marginRight: 5,
                backgroundColor: sensor.color,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow,
              }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: COLORS.darkgray, ...FONTS.h4}}>Low</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    name={sensor.details.low.icon}
                    size={20}
                    color={sensor.color}
                    light
                  />
                  <Text
                    style={{
                      color: sensor.color,
                      ...FONTS.h3,
                      paddingTop: 10,
                      paddingLeft: 5,
                    }}>
                    {sensor.details.low.value}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {renderNotificationSection()}

        {renderReadings()}
      </View>
    );
  };

  const renderNotificationSection = () => {
    return (
      <View style={{padding: SIZES.padding}}>
        <Text
          style={{
            color: sensor.color,
            ...FONTS.h2,
            paddingBottom: SIZES.radius,
          }}>
          My Notifications
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: sensor.color,
            padding: SIZES.radius,
            flexDirection: 'row',
            borderRadius: 3,
            elevation: 1,
          }}>
          <Icon name="plus" size={17} color={COLORS.white} light />
          <Text style={{color: COLORS.white, paddingLeft: 5}}>
            Create New Policy
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderReadings = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            paddingVertical: SIZES.radius + 3,
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.radius - 9,
            marginBottom: SIZES.radius - 9,
            marginLeft: SIZES.padding,
            marginRight: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.lightGray,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 20,
                width: 20,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={sensor.icon} size={20} color={sensor.color} light />
            </View>

            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.primary,
                ...FONTS.h4,
                paddingRight: '50%',
              }}>
              {item.value + sensor.readings.unit}
            </Text>

            <View
              style={{
                height: 20,
                width: 20,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={'calendar'} size={20} color={COLORS.darkgray} light />
            </View>
            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.primary,
                ...FONTS.h4,
              }}>
              {item.time}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{flex: 1, paddingBottom: SIZES.padding}}>
        <Text
          style={{
            color: sensor.color,
            ...FONTS.h2,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          All Readings
        </Text>

        <FlatList
          data={sensor.readings.readings}
          renderItem={renderItem}
          keyExtractor={(item) => {
            return '' + item.id;
          }}
          numColumns={1}
        />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, backgroundColor: sensor.color}}>
        {/* Report Header */}
        {renderReportChart()}

        {/* Report Summary Graphics */}
        {renderReportSummaryGraphics()}
      </View>
    </ScrollView>
  );
};

// Potential section where user can see suggestions for this sensor
const SummarySection = () => {
  return <Text>Summary Suggestions</Text>;
};

// Stack for the report section where you can customize its header
const Report = ({sensor}) => {
  let DailyReportFull = () => {
    return <DailyReport sensor={sensor} />;
  };

  return (
    <Stack.Navigator
      initalRouteName={sensor.name + ' Report'}
      headerMode="screen"
      screenOptions={({navigation, route}) => {
        return {
          headerStyle: {
            shadowColor: 'transparent',
            elevation: 0,
            height: 60,
            backgroundColor: sensor.color,
          },
          headerTitle: () => (
            <NavHeader
              navigation={navigation}
              color={sensor.color}
              route={route}
              sensor={sensor.name}
            />
          ),
          headerTitleContainerStyle: {
            left: 0,
            right: -15,
            top: 0,
            backgroundColor: sensor.color,
          },
        };
      }}>
      <Stack.Screen
        name={sensor.name + ' Report'}
        component={DailyReportFull}
      />
      <Stack.Screen
        name={sensor.name + ' Suggestions'}
        component={SummarySection}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default Report;
