import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {Input} from 'react-native-elements';
import Icon from '../Icon';
import {View} from 'react-native';
import {CustomText} from '@/Components';
import {BaseStyle, Colors} from '@/Theme';
import {Controller} from 'react-hook-form';
import Utilities from '@/Utils/Utils';

const TextInputV2 = props => {
  const {
    style,
    children,
    showIcon,
    control,
    name,
    value,
    typeInput,
    onChangeValue = vl => {},
    regex,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const convertTextValue = input => {
    if (typeInput === 'money') {
      return Utilities.convertNumberToMoney(input);
    }
    return input ? input.trimStart() : '';
  };

  const handleChangeValue = vl => {
    try {
      if (typeInput === 'money') {
        const numberOfMoney = Utilities.convertMoneyToNumber(vl);
        const maxLength = 15;
        const len = numberOfMoney.length;
        if (len > maxLength) {
          throw new Error('len > maxLength');
        }
        console.log({numberOfMoney});
        if (numberOfMoney != Number(numberOfMoney)) {
          throw new Error('not a number');
        }
        if (Number(numberOfMoney) < 0) {
          throw new Error('not lower than 0');
        }
        return onChangeValue(numberOfMoney);

        // return Utilities.convertNumberToMoney(String(vl))
      }
      if (typeInput === 'date') {
        if (vl.length > valueText.length) {
          let formatValue = Utilities.formatDate4(vl);
          // formatValue = Utilities.validateDate(formatValue)
          return onChangeValue(formatValue);
        }
      }
      if (regex && !regex.test(vl)) {
        throw new Error('value not matches regex');
      }

      return onChangeValue(vl);
    } catch (error) {
      console.log(error);
    }
  };

  const renderInput = () => (
    <Controller
      control={control}
      render={({field: {onBlur}}) => (
        <Input
          {...rest}
          onChangeText={value => handleChangeValue(value)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onFocus={() => setIsFocused(true)}
          inputContainerStyle={[
            styles.TextInputStyle(Colors.white),
            isFocused && {borderColor: Colors.blue},
            rest.errorMessage && {borderColor: Colors.lockedStatus},
            BaseStyle.itemShadowLight,
          ]}
          inputStyle={styles.inputStyle}
          errorStyle={{color: 'red'}}
          labelStyle={BaseStyle.labelStyle}
          maxLength={50}
          value={convertTextValue(value)}>
          {children}
        </Input>
      )}
      name={name}
      defaultValue=""
    />
  );

  return <View>{renderInput()}</View>;
};

const styles = {
  color: color => ({
    color,
  }),
  TextInputStyle: color => ({
    paddingHorizontal: 10,
    borderColor: color,
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 48,

    backgroundColor: Colors.white,
  }),
  inputStyle: {
    fontSize: 15,
  },
};

// TextInputElement.propTypes = {
//   style: Input.propTypes.style,
// };
TextInputV2.defaultProps = {
  style: color => ({
    paddingHorizontal: 10,
    borderColor: color,
    borderWidth: 1,
    borderRadius: 10,
  }),
};

export default TextInputV2;
