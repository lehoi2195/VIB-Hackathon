import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Header, ViewContainer } from '@/Components';
import { Colors, Images } from '@/Theme';
import { ItemPaymentDetail } from './component/ItemPaymentDetail';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native'
import Utilities from '@/Utils/Utils';

export function PaymentDetail({ navigation }) {
  const route = useRoute()
  const data = route?.params;
  const { goBack } = useNavigation();
  const [info, setInfo] = useState({});

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    setInfo(mockData);
  };

  return (
    <ViewContainer>
      <Header title="Chi tiết giao dịch" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={Images.ic_success} style={styles.icon} />
          <ItemPaymentDetail label="số hoá đơn:" value={data?.to?.id} />
          <ItemPaymentDetail
            label="Số tiền:"
            value={Utilities.convertNumberToMoney(data?.amount) + ' VNĐ'}
          />
          <ItemPaymentDetail label="Từ:" value={data?.from?.username} />
          <ItemPaymentDetail label="Đến:" value={data?.to?.username} />
          <ItemPaymentDetail
            label="Ngày thực hiện:"
            value={Utilities.formatDate5(data?.to?.updated_at)}
          />
          <ItemPaymentDetail label="Trạng thái:" value={'Thành công'} />
          <TouchableOpacity style={styles.btnGoBack}>
            <Text style={styles.goBack}>Tra soát giao dịch</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    margin: 25,
  },
  btnGoBack: {
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.blue,
    marginTop: 100,
    marginBottom: 50,
    marginHorizontal: 25,
  },
  goBack: {
    color: Colors.blue,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 30,
  },
});

const mockData = {
  id: 10,
  amount: 10000,
  from: 'Nguyễn Hữu Hùng',
  to: 'Trần Quốc Huy',
  date: new Date(),
  status: 'succeeded',
};
