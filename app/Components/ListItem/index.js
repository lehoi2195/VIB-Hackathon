import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CustomText} from '@/Components';
import {Images, Colors} from '@/Theme';

const ListItem = ({icon, text, onPress, children, count}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={[styles.itemWrapper, styles.wrapper]}
      {...(onPress && {onPress})}>
      <View style={styles.left}>
        <Image source={icon} style={styles.leftIcon} />
        <CustomText size={16} text={text} color={Colors.blue} />
      </View>
      <View style={styles.right}>
        {count && count !== '0' && (
          <View style={styles.countNotif}>
            {/* <Text style={styles.countText}>{count}</Text> */}
          </View>
        )}
        {children || (
          <Image source={Images.ic_arrow_right} style={styles.rightIcon} />
        )}
      </View>
    </Wrapper>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  wrapper: {
    height: 55,
    justifyContent: 'space-between',
  },
  leftIcon: {
    width: 25,
    height: 25,
    marginRight: 18,
  },
  rightIcon: {
    width: 20,
    height: 20,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countNotif: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  countText: {
    fontSize: 12,
    color: Colors.white,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 20,
    alignItems: 'center',
  },
});
