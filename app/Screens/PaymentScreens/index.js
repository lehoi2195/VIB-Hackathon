import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {BaseStyle, Colors} from '@/Theme';
import {ViewContainer} from '@/Components';
const Payment = ({navigation}) => {
  return (
    <ViewContainer>
      <View
        style={
          (BaseStyle.viewContainer,
          {justifyContent: 'center', alignItems: 'center'})
        }>
        <Text>Payment Screen</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PaymentStackNavigator', {
              screen: 'PaymentMethod',
            })
          }>
          <Text style={{color: Colors.blue}}>Go To Payment Page</Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
};

export default Payment;
