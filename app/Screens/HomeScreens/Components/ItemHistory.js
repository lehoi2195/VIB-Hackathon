import {Colors} from '@/Theme';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export function ItemHistory({items}) {
  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      style={styles.btnHistory}
      onPress={() => navigate('PaymentDetail')}>
      <Text style={styles.nameService}>{items?.nameService}</Text>
      <Text style={styles.price}>{`-${items?.price}`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnHistory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray2,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  price: {
    color: Colors.blue,
    fontSize: 18,
    lineHeight: 20,
  },
  nameService: {
    color: Colors.textHistory,
    fontSize: 18,
    lineHeight: 20,
  },
});
