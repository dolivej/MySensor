/*

Home Screens:
This is like the users dashboard where they can see a summary of all the sensors

<DailySummary/>
-> User can see todays summary for all the sensors, they also can see personalized suggestions at the bottom

<PastSummary/>
-> User can query through all previous summaries either by day or through ranges (like weeks) and see trends in graphs etc 

<SummarySection/>
-> This is where the user can see further details of suggestions they are recieving

The screens here do not rely on any particular service, it is assumed that sensor data and suggestionData will be passed into the component.

*/

import React from 'react';
import {View, Text, ScrollView, FlatList, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS, FONTS, SIZES} from '../constants';
import {NavHeader} from '../components/';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const suggestionsData = [
  {
    id: 1,
    icon: 'seedling',
    name: 'Plants For You',
    color: COLORS.darkgreen,
    description: 'See which plants are perfect for your environment.',
  },
  {
    id: 2,
    icon: 'burn',
    name: 'Improve Humidity',
    color: COLORS.purple,
    description:
      'Get rid of sticky uncomfortable humidity in your environment.',
  },
  {
    id: 3,
    icon: 'fan',
    name: 'Improve Air Quality',
    color: COLORS.blue,
    description:
      'Air quality can affect your health, see what you can do to improve it.',
  },
];

const Stack = createStackNavigator();

// User can see todays summary for all the sensors, they also can see personalized suggestions at the bottom
const DailySummary = ({navigation, sensors}) => {
  const renderHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          backgroundColor: COLORS.white,
        }}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h2}}>
            Today's Summary
          </Text>
          <Text style={{color: COLORS.darkgray, ...FONTS.h3}}>
            Welcome back David, here are today's readings so far.
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: COLORS.lightGray,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="calendar" size={20} color={COLORS.lightBlue} light />
          </View>
          <View style={{marginLeft: SIZES.padding}}>
            <Text style={{color: COLORS.primary, ...FONTS.h3}}>
              12 Dec, 2020
            </Text>

            <Text style={{color: COLORS.darkgray, ...FONTS.body3}}>
              All readings in acceptable range.
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderSummaryHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: SIZES.padding,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h3}}>SENSORS</Text>
          <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
            4 Sensors
          </Text>
        </View>
      </View>
    );
  };

  const renderSummarySection = () => {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            paddingVertical: SIZES.radius + 3,
            paddingHorizontal: SIZES.padding,
            marginTop: SIZES.radius - 6,
            marginBottom: SIZES.radius - 6,
            marginLeft: SIZES.padding,
            marginRight: SIZES.padding,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            ...styles.shadow,
          }}
          onPress={() => {
            navigation.navigate(item.name);
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: 20,
                width: 20,
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={item.icon} size={20} color={item.color} light />
            </View>

            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.primary,
                ...FONTS.h4,
              }}>
              {item.name}
            </Text>
          </View>
          <Text
            style={{
              marginLeft: 27,
              marginBottom: 20,
              marginTop: 20,
              padding: 10,
              backgroundColor: item.color,
              borderRadius: 5,
              color: COLORS.white,
              ...FONTS.h3,
            }}>
            {'Average of ' + item.details.average}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              paddingLeft: 27,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
                {'Low : ' + item.details.low.value}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon name="clock" size={15} color={COLORS.darkgray} light />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: COLORS.darkgray,
                    ...FONTS.body4,
                  }}>
                  {item.details.low.time}
                </Text>
              </View>
            </View>

            <View>
              <Text style={{color: COLORS.darkgray, ...FONTS.body4}}>
                {'High : ' + item.details.high.value}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon name="clock" size={15} color={COLORS.darkgray} light />
                <Text
                  style={{
                    paddingLeft: 5,
                    color: COLORS.darkgray,
                    ...FONTS.body4,
                  }}>
                  {item.details.high.time}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <View>
          <FlatList
            data={sensors}
            renderItem={renderItem}
            keyExtractor={(item) => {
              return '' + item.id;
            }}
            numColumns={1}
          />
        </View>
      </View>
    );
  };

  const renderSuggestionsHeader = () => {
    return (
      <View
        style={{
          padding: SIZES.padding,
          marginTop: SIZES.padding,
          backgroundColor: COLORS.primary,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.white}}>SUGGESTIONS</Text>
        <Text style={{...FONTS.body4, color: COLORS.white}}>
          Your personal environment suggestions.
        </Text>
      </View>
    );
  };

  const renderSuggestionsSection = () => {
    const renderItem = ({item}) => {
      return (
        <View
          style={{
            height: 200,
            width: SIZES.width - 70,
            borderRadius: 5,

            margin: SIZES.base,
            ...styles.shadow,
            backgroundColor: COLORS.white,
            marginBottom: 50,
          }}>
          <View style={{flexDirection: 'row', padding: SIZES.padding}}>
            <View>
              <Icon name={item.icon} size={30} color={item.color} light />
            </View>
            <Text
              style={{
                ...FONTS.h3,
                color: item.color,
                padding: SIZES.radius - 6,
              }}>
              {item.name}
            </Text>
          </View>
          <View>
            <Text
              style={{
                paddingLeft: SIZES.padding,
                paddingRight: SIZES.padding,
                paddingBottom: SIZES.radius,
                ...FONTS.body3,
                color: COLORS.darkgray,
              }}>
              {item.description}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                Height: 50,
                backgroundColor: item.color,
                padding: SIZES.radius,
                alignItems: 'flex-end',
                flexDirection: 'row',
                margin: SIZES.base,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.white,
                  paddingLeft: '30%',
                  paddingRight: 10,
                }}>
                See My Suggestions
              </Text>
              <Icon name="chevron-right" size={20} color={COLORS.white} light />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <View style={{backgroundColor: COLORS.primary}}>
        <FlatList
          data={suggestionsData}
          renderItem={renderItem}
          keyExtractor={(item) => {
            return '' + item.id;
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, backgroundColor: COLORS.lightGray}}>
        {/* Home Header */}
        {renderHeader()}

        {/* Summary Header */}
        {renderSummaryHeader()}

        {/* Summary Section */}
        {renderSummarySection()}

        {/* Suggestions Header */}
        {renderSuggestionsHeader()}

        {/* Suggestions Section */}
        {renderSuggestionsSection()}
      </View>
    </ScrollView>
  );
};

// User can query through all previous summaries either by day or through ranges (like weeks) and see trends in graphs etc
const PastSummary = ({navigation, sensors}) => {
  const renderHeader = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          backgroundColor: COLORS.white,
          height: SIZES.height,
        }}>
        <View>
          <Text style={{color: COLORS.primary, ...FONTS.h2}}>Past Summary</Text>
          <View style={{flexDirection: 'row', paddingVertical: SIZES.base}}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.base,
                marginRight: 10,
                ...styles.shadow,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h4}}>Daily View</Text>
              <Icon
                style={{paddingLeft: 7, paddingTop: 4}}
                name="chevron-down"
                size={15}
                color={COLORS.white}
                light
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.base,
                marginRight: 10,
                ...styles.shadow,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h4}}>
                12 Dec, 2020
              </Text>
              <Icon
                style={{paddingLeft: 7, paddingTop: 4}}
                name="chevron-down"
                size={15}
                color={COLORS.white}
                light
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, backgroundColor: COLORS.lightGray}}>
        {/* Home Header */}
        {renderHeader()}

        {/* Summary Header */}

        {/* Summary Section */}
      </View>
    </ScrollView>
  );
};

// This is where the user can see further details of suggestions they are recieving
const SummarySection = () => {
  return <Text>Summary Suggestions</Text>;
};

// Stack for the home section, you can customize the header style here
const Home = ({sensors, navigation}) => {
  const DailySummary1 = () => {
    return <DailySummary sensors={sensors} navigation={navigation} />;
  };

  const PastSummary1 = () => {
    return <PastSummary sensors={sensors} navigation={navigation} />;
  };

  return (
    <Stack.Navigator
      initalRouteName="Today's Summary"
      headerMode="screen"
      screenOptions={({navigation, route}) => {
        return {
          headerStyle: {
            shadowColor: 'transparent',
            elevation: 0,
            height: 60,
          },
          headerTitle: () => (
            <NavHeader navigation={navigation} route={route} />
          ),
          headerTitleContainerStyle: {
            left: 0,
            right: -15,
          },
        };
      }}>
      <Stack.Screen name="Today's Summary" component={DailySummary1} />
      <Stack.Screen name="Past" component={PastSummary1} />
      <Stack.Screen name="Summary Suggestions" component={SummarySection} />
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

export default Home;
