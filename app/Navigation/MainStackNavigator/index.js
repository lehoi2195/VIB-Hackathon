import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from '../BottomTabNavigator';
import HomeStackNavigator from './HomeStackNavigator';
import PaymentStackNavigator from './PaymentStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {PaymentDetail} from '@/Screens/PaymentDetail';

const MainStack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
      />
      <MainStack.Screen
        name="PaymentStackNavigator"
        component={PaymentStackNavigator}
      />
      <MainStack.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
      />
      <MainStack.Screen name="PaymentDetail" component={PaymentDetail} />
    </MainStack.Navigator>
  );
}
