import * as React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, ViewPropTypes, View, Image} from 'react-native';
import {Button as ButtonRNE} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {BaseStyle, Colors, Images} from '@/Theme';
import Fonts from '@/Theme/Fonts';

/**
 * @description customized button
 * @param {*} props
 * @returns {*}
 * @reference https://reactnativeelements.com/docs/button/
 */
function Button(props) {
  const {isOutLine, size, buttonStyle, titleStyle, loadingProps, ...rest} =
    props;

  const height = size === 'small' ? 40 : 46;
  const bgColor = isOutLine ? Colors.transparent : Colors.blue;
  const textColor = isOutLine ? Colors.blue : Colors.white;

  return (
    <ButtonRNE
      {...rest}
      buttonStyle={[styles.buttonStyle(height, bgColor, rest.disabled)]}
      titleStyle={[
        styles.title,
        {
          color: textColor,
        },
        size === 'small' && styles.titleSmall,
        titleStyle,
      ]}
      icon={
        rest.disabled ? (
          <Image
            source={Images.Arrow_Disabled}
            style={BaseStyle.rightIconStyle}
          />
        ) : (
          <Image source={Images.Arrow} style={BaseStyle.rightIconStyle} />
        )
      }
      // disabledStyle={{
      //   backgroundColor: Colors.btnDisable,
      // }}
      disabledTitleStyle={{
        color: Colors.btnDisable,
      }}
      loadingProps={{
        color: textColor,
        ...loadingProps,
      }}
      ViewComponent={LinearGradient}
      linearGradientProps={
        !isOutLine
          ? {
              colors: [Colors.blueHeavy, Colors.blueHeavy, Colors.blue],
              start: {x: 0, y: 0},
              end: {x: 1, y: 0.5},
            }
          : {
              colors: [
                Colors.transparent,
                Colors.transparent,
                Colors.transparent,
              ],
              start: {x: 0, y: 0},
              end: {x: 1, y: 0.5},
            }
      }
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: (height, bgColor, disabled) => ({
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    backgroundColor: bgColor,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: disabled ? Colors.btnDisable : Colors.blue,
  }),
  title: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    lineHeight: Fonts.size.regular,
    width: '85%',
    marginLeft: 20,
  },
  titleSmall: {
    fontSize: Fonts.size.medium,
    lineHeight: 17,
  },
});

Button.propTypes = {
  isOutLine: PropTypes.bool,
  buttonStyle: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  size: PropTypes.oneOf(['normal', 'small']),
  loadingProps: PropTypes.object,
};

Button.defaultProps = {
  isOutLine: false,
  buttonStyle: {},
  titleStyle: {},
  size: 'normal',
  loadingProps: {},
};

export default Button;
