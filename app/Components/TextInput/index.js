import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import Icon from '../Icon';
import { View } from 'react-native';
import { CustomText } from '@/Components';
import { BaseStyle, Colors } from '@/Theme';
import { Controller } from 'react-hook-form';

const TextInput = props => {
  const { style, children, showIcon, control, name, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);

  const renderInput = () => (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          {...rest}
          onChangeText={value => onChange(value)}
          onBlur={() => {
            setIsFocused(false);
            onBlur();
          }}
          onFocus={() => setIsFocused(true)}
          inputContainerStyle={[
            styles.TextInputStyle(Colors.white),
            isFocused && { borderColor: Colors.blue },
            rest.errorMessage && { borderColor: Colors.lockedStatus },
            BaseStyle.itemShadowLight,
          ]}
          inputStyle={styles.inputStyle}
          errorStyle={{ color: 'red' }}
          labelStyle={BaseStyle.labelStyle}
          value={value}>
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
TextInput.defaultProps = {
  style: color => ({
    paddingHorizontal: 10,
    borderColor: color,
    borderWidth: 1,
    borderRadius: 10,
  }),
};

export default TextInput;
