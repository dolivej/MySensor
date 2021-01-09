/*

  This is an example of the header component that can be supplied to stacks.
  Right now it handles logic for many different sections which is why it has lots of conditional rendering statements.
  To clean this up in the future or for more custom headers, split this up into different components.

  For more info on how to use the React Navigation Library, see the docs

*/

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

const spacer = {
  height: 40,
  width: 50,
  justifyContent: 'center',
  alignItems: 'center',
};
const NavHeader = ({navigation, color, type, route, sensor}) => {
  const [pressed, setPressed] = useState(route.name);

  return (
    <View
      style={{
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: SIZES.padding,
        backgroundColor: color || COLORS.white,
        paddingTop: 5,
        paddingBottom: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          display: type ? 'flex' : 'none',
        }}>
        <Text
          style={{
            height: 25,
            marginBottom: 5,
            color: color ? COLORS.white : COLORS.primary,
            ...FONTS.h3,
          }}>
          {type}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          display: type ? 'none' : 'flex',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: color
              ? pressed == "Today's Summary" || pressed.includes('Report')
                ? COLORS.white
                : color
              : pressed == "Today's Summary" || pressed.includes('Report')
              ? COLORS.primary
              : COLORS.white,
            padding: 5,
            borderRadius: 5,
            marginRight: 10,
            elevation:
              pressed == "Today's Summary" || pressed.includes('Report')
                ? 3
                : 0,
          }}
          onPress={() => {
            navigation.navigate(color ? sensor + ' Report' : "Today's Summary");
          }}>
          <Text
            style={{
              height: 25,
              color: color
                ? pressed == "Today's Summary" || pressed.includes('Report')
                  ? COLORS.primary
                  : COLORS.white
                : pressed == "Today's Summary" || pressed.includes('Report')
                ? COLORS.white
                : COLORS.primary,
              ...FONTS.h3,
            }}>
            {color ? 'Report' : 'Today'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: color
              ? pressed == 'Past'
                ? COLORS.white
                : color
              : pressed == 'Past'
              ? COLORS.primary
              : COLORS.white,
            padding: 5,
            borderRadius: 5,
            marginRight: 10,
            display: color ? 'none' : 'flex',
            elevation: pressed == 'Past' ? 3 : 0,
          }}
          onPress={() => {
            navigation.navigate('Past');
          }}>
          <Text
            style={{
              height: 25,
              color: color
                ? pressed == 'Past'
                  ? COLORS.primary
                  : COLORS.white
                : pressed == 'Past'
                ? COLORS.white
                : COLORS.primary,
              ...FONTS.h3,
            }}>
            Past
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: color
              ? pressed.includes('Suggestions')
                ? COLORS.white
                : color
              : pressed.includes('Suggestions')
              ? COLORS.primary
              : COLORS.white,
            padding: 5,
            borderRadius: 5,
            marginRight: 10,
            elevation: pressed.includes('Suggestions') ? 3 : 0,
          }}
          onPress={() => {
            navigation.navigate(
              color ? sensor + ' Suggestions' : 'Summary Suggestions',
            );
          }}>
          <Text
            style={{
              height: 25,
              color: color
                ? pressed.includes('Suggestions')
                  ? COLORS.primary
                  : COLORS.white
                : pressed.includes('Suggestions')
                ? COLORS.white
                : COLORS.primary,
              ...FONTS.h3,
            }}>
            Suggestions
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{...spacer}}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Icon
          name="bars"
          size={20}
          color={color ? COLORS.white : COLORS.primary}
          light
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavHeader;
