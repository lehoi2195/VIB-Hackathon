import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreens from '@/Screens/ProfileScreens';

const ProfileStack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerShown: false,
      }}>
      {/* <ProfileStack.Screen name="ProfileScreens" component={ProfileScreens} /> */}
    </ProfileStack.Navigator>
  );
}
