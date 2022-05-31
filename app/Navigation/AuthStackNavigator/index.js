import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CreateNewPassword, ForgotPassword, Login} from '@/Screens/AuthScreens';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: 'black',
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen
        name="CreateNewPassword"
        component={CreateNewPassword}
      />
    </AuthStack.Navigator>
  );
}
