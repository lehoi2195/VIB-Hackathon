import * as React from 'react';
import {StyleSheet, ViewPropTypes, Text} from 'react-native';
import {Header as HeaderRNE} from 'react-native-elements';
import {Icon} from '@/Components';
import Fonts from '@/Theme/Fonts';
import {Colors} from '@/Theme';

export default function Header(props) {
  const {containerStyle, leftComponent, navigation, title, ...rest} = props;

  return (
    <HeaderRNE
      backgroundColor="transparent"
      {...rest}
      leftComponent={
        leftComponent ? (
          leftComponent
        ) : (
          <Icon
            name="arrow-left"
            type="simple-line-icon"
            onPress={() => navigation.goBack()}
            size={Fonts.size.input}
            color={Colors.blue}
          />
        )
      }
      containerStyle={[styles.header, containerStyle]}
      centerComponent={
        <Text style={[Fonts.style.normal, styles.headerTitle]}>{title}</Text>
      }
    />
  );
}
const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  headerTitle: {
    color: Colors.blue,
  },
});
Header.propTypes = {
  containerStyle: ViewPropTypes.style,
};
Header.defaultProps = {
  containerStyle: {},
};
