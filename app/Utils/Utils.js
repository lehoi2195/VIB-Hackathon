import * as R from 'ramda'
export default class Utilities {
  static isEmpty(value) {
    if (
      typeof value == 'undefined' ||
      value == undefined ||
      value === null ||
      value === '' ||
      value.length === 0
    ) {
      return true;
    }
    return false;
  }

  static convertNumberToMoney = value => {
    try {
      if (this.isEmpty(value)) {
        return 0;
      }
      const roundNumber = Math.round(Math.abs(Number(value)));
      return R.compose(
        R.reverse,
        R.join('.'),
        R.splitEvery(3),
        R.reverse,
      )(String(roundNumber));
    } catch (error) {
      return 0;
    }
  };
  static convertMoneyToNumber = value => {
    if (this.isEmpty(value)) {
      return value;
    }
    return R.compose(R.join(''), R.split('.'))(value);
  };

  static convertNumberCard = value => {
    try {
      if (this.isEmpty(value)) {
        return 0;
      }
      const roundNumber = Math.round(Math.abs(Number(value)));
      return R.compose(
        R.reverse,
        R.join(' '),
        R.splitEvery(4),
        R.reverse,
      )(String(roundNumber));
    } catch (error) {
      return 0;
    }
  };

  static convertNumberToMoney = (value) => {
    try {
      if (this.isEmpty(value)) {
        return 0
      }
      const roundNumber = Math.round(Math.abs(Number(value)))
      return R.compose(
        R.reverse,
        R.join('.'),
        R.splitEvery(3),
        R.reverse,
      )(String(roundNumber))
    } catch (error) {
      return 0
    }
  }

  static isNumber(data) {
    let result = '';
    for (const value of data) {
      let string = this.replaceString(value)
      // console.log('strong======', string)
      if (Number(string) != 'NaN') {
        result = Number(string);
      }
    }
    return result;
  }

  static replaceString(str) {
    str = str.replace(/\./g, '')
    str = str.replace(/\,/g, '')
    return str
  }

  static convertMoneyToNumber = (value) => {
    if (this.isEmpty(value)) {
      return value
    }
    return R.compose(R.join(''), R.split('.'))(value)
  }

  static convertNumberToMoney = (value) => {
    try {
      if (this.isEmpty(value)) {
        return 0
      }
      const roundNumber = Math.round(Math.abs(Number(value)))
      return R.compose(
        R.reverse,
        R.join('.'),
        R.splitEvery(3),
        R.reverse,
      )(String(roundNumber))
    } catch (error) {
      return 0
    }
  }

  static formatDate5(dateServer) {
    try {
      let day = new Date(dateServer)
      function pad(n) {
        return n < 10 ? '0' + n : n
      }
      return (
        pad(day.getDate()) +
        '/' +
        pad(day.getMonth() + 1) +
        '/' +
        day.getFullYear()
      )
    } catch (error) {
      console.log('formatDate5 ' + error)
      return date
    }
  }



}
