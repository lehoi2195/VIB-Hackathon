import React from 'react';
import {ImageBackground, Text, View, StyleSheet, Image} from 'react-native';
import {Colors, Images} from '@/Theme';
import moment from 'moment';
import Utils from '@/Utils/Utils';

export function Card({nameCard, value, numberCard, date}) {
  const cardNumber = Utils.convertNumberToMoney(value);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardView}>
        <View style={styles.firstSection}>
          <View>
            <Text style={styles.nameCard}>{nameCard}</Text>
            <Text style={styles.value}>{`$` + cardNumber}</Text>
          </View>
          <Image source={Images.MasterCardIcon} style={styles.masterIcon} />
        </View>

        <View style={styles.boxFooter}>
          <Text style={styles.text}>{Utils.convertNumberCard(numberCard)}</Text>
          <Text style={styles.text}>{moment(date).format('MM/YY')}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    height: 250,
    padding: 20,
  },
  cardView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.blue,
    borderRadius: 24,
  },
  masterIcon: {
    height: 29.9,
    width: 47.88,
  },
  firstSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  boxFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20%',
    marginHorizontal: 20,
  },
  nameCard: {
    fontSize: 18,
    lineHeight: 20,
    textTransform: 'uppercase',
    color: Colors.white,
  },
  value: {
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 18,
    lineHeight: 20,
    color: Colors.white,
  },
});
