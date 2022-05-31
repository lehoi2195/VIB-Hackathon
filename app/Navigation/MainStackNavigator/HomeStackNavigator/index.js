import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const HomeStack = createStackNavigator();

export default function PaymentStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerShown: false,
      }}>
      {/* <PaymentStack.Screen name="NameScreen" component={NameScreen} /> */}
    </HomeStack.Navigator>
  );
}
