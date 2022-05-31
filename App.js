/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import MainStore from './app/Store';
import { NavigationContainer } from '@react-navigation/native';
import { Loading, GeneralModal, PaymentModal, VoiceModal, PopupModal } from '@/Components';
import { navigationRef } from '@/Utils/NavigationService';

import RootNavigator from './app/Navigation';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={MainStore.store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
        <GeneralModal />
        <Loading />
        <PaymentModal />
        <VoiceModal />
        <PopupModal />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
