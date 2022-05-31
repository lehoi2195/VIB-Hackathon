import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {Text} from 'react-native';
import {Icon as IconRNE} from 'react-native-elements';

function Icon(props) {
  const {colors} = useTheme();
  const {iconStyle, ...rest} = props;
  return (
    <IconRNE
      color={colors.text}
      {...rest}
      iconStyle={[iconStyle && iconStyle]}
    />
  );
}

Icon.propTypes = {
  iconStyle: Text.propTypes.style,
};

Icon.defaultProps = {
  type: 'material-community',
};

export default Icon;
