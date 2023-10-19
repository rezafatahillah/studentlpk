import React from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {Text} from 'native-base';
import colors, {FontFamily} from '@config/colors';
import {ResponsiveValue} from 'native-base/lib/typescript/components/types';
// import { Color } from '../../assets/GlobalStyles';
enum Color {
  primary = '#3E8BFF',
  success = '#00B683',
  warning = '#FFBF00',
  danger = '#EA3445',
  secondary = '#80848A',
  white = '#ffffff',
  black = '#000000',
}
enum Font {
  thin = 'Poppins-Thin',
  regular = 'Poppins-Regular',
  medium = 'Poppins-Medium',
  semibold = 'Poppins-SemiBold',
  bold = 'Poppins-Bold',
}
export interface AppTextProps extends TextProps {
  font_type?: Font | string;
  color?: Color | string;
  size?: number;
  mt?: number;
  mb?: number;
  flex?: number;
  alignSelf?: string;
  textAlign?: ResponsiveValue<any | undefined>;
}
export const AppText: React.FC<AppTextProps> = ({
  style,
  font_type,
  size,
  color,
  mt,
  mb,
  flex,
  alignSelf,
  textAlign,
  ...rest
}) => {
  const combinedStyle = StyleSheet.compose(defaultStyle.default, style);
  return (
    <Text
      {...rest}
      mt={mt ? mt : 0}
      mb={mb ? mb : 0}
      flex={flex ? flex : 0}
      alignSelf={alignSelf}
      textAlign={textAlign}
      style={[
        combinedStyle,
        {
          fontFamily: !font_type ? Font.regular : Font[font_type],
          color: !color ? colors.black500 : Color[color],
          fontSize: !size ? 12 : size,
          lineHeight: undefined,
        },
      ]}
    />
  );
};

const defaultStyle = StyleSheet.create({
  default: {},
});
