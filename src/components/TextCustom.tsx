import colors from 'config/colors';
import { Text } from 'native-base';
import React from 'react';
import {
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';

type TextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

export const TextCustom = ({ style, children }: TextProps) => {
  return <Text fontFamily={'body'} style={[styles.font, style]} >{children}</Text>;
};

const styles = StyleSheet.create({
  font: {
    color:colors.textColor
  },
});