import {getValue} from '@/Utils/LocalStorage';
import {CONSTANTS} from '@/Constants';
import * as Bluebird from 'bluebird';
/**
 * @description GET request
 * @param {*} url
 * @param {*} token
 */
export const ApiCall = async (baseURL, method = 'GET', data, Token = true) => {
  try {
    const contentType = 'application/json';
    const tokenAccess = Token ? await getValue(CONSTANTS.TOKEN) : '';
    const header = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': contentType,
      },
    };

    if (Token) {
      header.headers.Authorization = `Bearer ${tokenAccess}`;
    }

    const methodList = ['POST', 'PUT', 'DELETE'];

    if (methodList.includes(method)) {
      header.body = data;
    }

    const result = fetch(baseURL, header)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        return error;
      });
    return Bluebird.resolve(result);
  } catch (error) {
    return Bluebird.reject('');
  }
};
