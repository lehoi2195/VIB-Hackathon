import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreens from '@/Screens/HomeScreens';
import PaymentScreens from '@/Screens/PaymentScreens';
import ProfileScreens from '@/Screens/ProfileScreens';
import {Images, Colors} from '@/Theme';
import {PaymentModalOpen} from '@/ReduxSaga';
import {useDispatch} from 'react-redux';

const BottomTab = createBottomTabNavigator();

export function BottomTabNavigator({navigation}) {
  const dispatch = useDispatch();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.blue,
        inactiveTintColor: Colors.blue,
        style: styles.tabBarStyle,
        tabStyle: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case 'Home':
              return focused ? (
                <Image source={Images.HomeIcon} style={styles.tabBarIcon} />
              ) : (
                <Image
                  source={Images.HomeIconOutline}
                  style={styles.tabBarIcon}
                />
              );
            case 'Profile':
              return focused ? (
                <Image source={Images.ProfileIcon} style={styles.tabBarIcon} />
              ) : (
                <Image
                  source={Images.ProfileIconOutline}
                  style={styles.tabBarIcon}
                />
              );
            case 'Payment':
              return (
                <TouchableWithoutFeedback>
                  <View style={styles.tabBarIconContainer}>
                    <TouchableOpacity
                      onPress={() => dispatch(PaymentModalOpen())}>
                      <Image
                        source={Images.PlusIcon}
                        style={styles.tabBarPaymentIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              );
          }
        },
      })}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreens}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="Payment"
        component={PaymentScreens}
        options={{
          tabBarLabel: '',
        }}
        style={{
          width: 10,
          height: 0,
          backdropColor: 'blue',
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreens}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 5,
    height: 80,
  },
  tabBarIcon: {
    width: 25,
    height: 25,
  },
  tabBarIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 100,
  },
  tabBarPaymentIcon: {
    marginTop: 25,
    height: 100,
    width: 100,
  },
});
