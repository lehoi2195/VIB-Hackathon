import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Bluebird from 'bluebird';
/**
 *
 * @duty function about token : save async storage,
 *
 */
// get token
export const getValue = async CONSTANTS => {
  const value = await AsyncStorage.getItem(CONSTANTS).then(result => {
    return result;
  });

  return Bluebird.resolve(value);
};
// singIn save token in local storage
export const setValue = async (CONSTANTS, value) => {
  return AsyncStorage.setItem(CONSTANTS, JSON.stringify(value));
};

export const removeValue = async CONSTANTS => {
  return AsyncStorage.removeItem(CONSTANTS);
};
