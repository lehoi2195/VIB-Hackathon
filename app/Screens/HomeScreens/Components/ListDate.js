import React, {useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Images} from '@/Theme/Images';
import {ItemDate} from './ItemDate';
import {ItemHistory} from './ItemHistory';
import {Colors} from '@/Theme';
import {useSelector} from 'react-redux';

export function ListDate() {
  const [history, setHistory] = useState([]);
  const [_index, setIndex] = useState(0);
  const {data} = useSelector(state => state.Transactions);

  console.log(`data>>>>>>>>`, data);

  const handleSelect = (value, index) => {
    dataMock.forEach(item => {
      if (item.id == value.id) {
        setIndex(index);
        setHistory(value.historyPayment);
      }
    });
  };

  //isSelect === index ? styles.btnSelect :

  return (
    <>
      <View style={styles.boxSelectDate}>
        <TouchableOpacity>
          <Image source={Images.ic_arrow_left} />
        </TouchableOpacity>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}>
          {dataMock.map((item, index) => {
            return (
              <ItemDate
                items={item}
                onPress={handleSelect}
                index={index}
                isSelect={_index}
              />
            );
          })}
        </ScrollView>
        <TouchableOpacity>
          <Image source={Images.ic_arrow_right} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        renderItem={({item, index}) => <ItemHistory items={item} />}
      />
    </>
  );
}

const dataMock = [
  {
    id: 1,
    date: 'January 21 2021',
    historyPayment: [
      {
        nameService: 'Grap',
        price: '12$',
      },
      {
        nameService: 'VIB',
        price: '14$',
      },
      {
        nameService: 'Bee',
        price: '12$',
      },
    ],
  },
  {
    id: 2,
    date: 'February 22 2021',
    historyPayment: [
      {
        nameService: 'Grap',
        price: '12$',
      },
    ],
  },
  {
    id: 3,
    date: 'May 23 2021',
    historyPayment: [
      {
        nameService: 'Grap',
        price: '12$',
      },
    ],
  },
  {
    id: 4,
    date: 'June 24 2021',
    historyPayment: [
      {
        nameService: 'Grap',
        price: '12$',
      },
    ],
  },
  {
    id: 5,
    date: 'July 25 2021',
    historyPayment: [
      {
        nameService: 'Grap',
        price: '12$',
      },
    ],
  },
];

const styles = StyleSheet.create({
  boxSelectDate: {
    backgroundColor: Colors.gray4,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  scrollView: {
    backgroundColor: 'transparent',
    zIndex: 2,
  },
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
