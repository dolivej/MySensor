/*
  This is just a styled TextInput component for use in the Auth Screens
*/

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '../constants';

import Icon from 'react-native-vector-icons/FontAwesome5';

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <Icon name={iconType} size={25} color={COLORS.primary} />
      </View>
      <TextInput
        value={labelValue}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={COLORS.darkgray}
        {...rest}
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: SIZES.height / 12,
    borderColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: COLORS.primary,
    borderRightWidth: 2,
    width: 50,
  },
  input: {
    padding: 10,

    flex: 1,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 10,
    marginTop: 15,
    marginBottom: 10,
    width: SIZES.width / 1.5,
    height: SIZES.height / 15,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 2,
  },
});
