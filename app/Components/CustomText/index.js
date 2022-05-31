import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BaseStyle, Colors} from '@/Theme';
import {isEmpty} from 'validator';

const CustomText = ({
  text = '',
  size = 16,
  color = Colors.black,
  numberOfLines = 3,
  style = {},
  lineHeight = 20,
  getLayout = () => {},
  wrapperStyle = {},
  highLightText = '',
  ...textProps
}) => {
  return (
    <View onLayout={getLayout} style={[wrapperStyle]}>
      {!isEmpty(text) && (
        <Text
          allowFontScaling={false}
          style={[
            styles.textNormal,
            {
              fontSize: size,
              color: color ? color : Colors.black,
              lineHeight: lineHeight || 20,
            },
            style,
          ]}
          ellipsizeMode="tail"
          numberOfLines={numberOfLines}
          {...textProps}>
          {text}
        </Text>
      )}
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  ...BaseStyle,
});
