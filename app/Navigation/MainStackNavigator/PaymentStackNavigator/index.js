import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PaymentMethod from '@/Screens/PaymentScreens/PaymentMethod';
import NFCPayment from '@/Screens/PaymentScreens/NFC';

const PaymentStack = createStackNavigator();

export default function PaymentStackNavigator() {
  return (
    <PaymentStack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <PaymentStack.Screen name="PaymentMethod" component={PaymentMethod} />
      <PaymentStack.Screen name="NFCPayment" component={NFCPayment} />
    </PaymentStack.Navigator>
  );
}
