import {StyleSheet} from 'react-native';
import {Colors} from '@/Theme';
import Fonts from '@/Theme/Fonts';

/**
 * Common basic style defines
 */
const BaseStyle = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },

  // TextInput
  labelStyle: {
    fontSize: Fonts.size.medium,
    color: Colors.grayText,
    fontFamily: Fonts.type.base,
    marginBottom: 5,
    fontWeight: '300',
  },
  textNormal: {
    fontSize: Fonts.size.medium,
    color: Colors.black,
    fontFamily: Fonts.type.base,
    // lineHeight: 20,
  },
  itemShadowLight: {
    shadowColor: Colors.blue,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.0,
    elevation: 3,
  },
  rightIconStyle: {
    marginTop: '4.5%',
  },
});

export {BaseStyle};
