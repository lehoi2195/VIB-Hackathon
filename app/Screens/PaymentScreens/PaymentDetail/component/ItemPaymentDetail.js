import {Colors} from '@/Theme';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function ItemPaymentDetail({value, label}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray4,
  },
  text: {
    color: Colors.blue,
  },
});
