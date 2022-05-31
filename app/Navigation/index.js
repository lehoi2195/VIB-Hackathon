import React, {useState, useEffect} from 'react';

import MainStackNavigator from './MainStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {getValue} from '@/Utils/LocalStorage';
import {CONSTANTS} from '@/Constants';
import jwt_decode from 'jwt-decode';
import {LoginSuccess, MyAccountRequest, TransactionsRequest} from '@/ReduxSaga';
// import isEmpty from 'lodash/isEmpty';
const RootStack = createStackNavigator();

/**
 * @description Main Navigator
 * @export
 * @param {*} props
 * @returns {*}
 */
export default function Navigator(props) {
  const {loginStatus} = useSelector(state => state.Login);
  const [accessStatus, setAccessStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateUser = async () => {
      const token = await getValue(CONSTANTS.TOKEN);
      const profileMe = await getValue(CONSTANTS.PROFILE_ME);
      if (!token || !profileMe) {
        setAccessStatus(false);
      }
      var decoded = jwt_decode(token);
      const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const currentTimeStamp = moment(currentDateTime).format('X');
      if (currentTimeStamp <= decoded.exp) {
        if (profileMe) {
          const me = JSON.parse(profileMe);
          dispatch(LoginSuccess(me));
          dispatch(MyAccountRequest(me.id));
          dispatch(TransactionsRequest(me.bank_account.user));
        }
        setAccessStatus(true);
      }
    };
    authenticateUser();
  }, [accessStatus, loginStatus]);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerShown: false,
      }}>
      {accessStatus ? (
        <>
          <RootStack.Screen
            name="MainStackNavigator"
            component={MainStackNavigator}
          />
        </>
      ) : (
        <RootStack.Screen
          name="AuthStackNavigator"
          component={AuthStackNavigator}
        />
      )}
    </RootStack.Navigator>
  );
}
