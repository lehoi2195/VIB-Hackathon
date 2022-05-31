import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import {Colors} from '@/Theme';

export function ItemDate({items, onPress, isSelect, index}) {
  return (
    <TouchableOpacity
      style={isSelect === index ? styles.btnSelect : styles.btn}
      onPress={() => onPress(items, index)}>
      <Text style={isSelect === index ? styles.dateSelect : styles.date}>
        {moment(items?.date).format('MM/YYYY')}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnSelect: {
    backgroundColor: Colors.white,
    padding: 4,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  btn: {
    padding: 4,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  dateSelect: {
    color: Colors.blue,
    fontSize: 16,
  },
  date: {
    color: Colors.grayText,
    fontSize: 16,
  },
});
