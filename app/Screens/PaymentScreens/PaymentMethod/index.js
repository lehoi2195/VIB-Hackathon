import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  ViewContainer,
  Header,
  TextInputV2,
  Button,
  CustomText,
} from '@/Components';
import { Images, BaseStyle, Colors } from '@/Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schemaPayment';
import { useDispatch } from 'react-redux';
import { CreateNewAccountRequest } from '@/ReduxSaga';
import { isEmpty as checkEmpty } from 'lodash';
import { PAYMENT_FORM } from '@/Constants';
import _ from 'lodash';
import { ho, ten, bankNameConst, accNumberConst } from './constants';
import Utilities from '@/Utils/Utils';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { PaymentRequest } from '@/ReduxSaga';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';

const PaymetMethod = ({ navigation }) => {
  const {
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const { navigate } = useNavigation();
  const { open, voiceText } = useSelector(state => state.VoiceModal);
  console.log('voiceText', voiceText);
  const { paymentStatus, data } = useSelector(state => state.Payment);
  const UserAcc = useSelector(state => state.Login);
  const dispatch = useDispatch();
  const [StatusSpeed, setStatusSpeed] = useState(false)
  const [listSpeed, setlistSpeed] = useState(voiceText)
  const [money, setMoney] = useState(0)
  const [bankName, setBankName] = useState('')
  const [userName, setUserName] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [accNumber, setAccNumber] = useState('')
  const [statusGotoDetail, setStatusGotoDetail] = useState(false)

  useMemo(async () => {
    setTimeout(async () => {
      await setlistSpeed(voiceText)
    }, 200)
  }, [voiceText]);


  const addSpeed = (e) => {
    console.log('data========>', e.value)
    setTimeout(async () => {
      if (e.value?.[0].length < 100) {
        setlistSpeed(e.value?.[0]);
      }
    }, 700);
    // setlistSpeed(e.value?.[0])
  };
  useEffect(async () => {
    Voice.onSpeechResults = addSpeed;
    await Voice.start('vi_VN');
  }, []);

  const start = async () => {
    await setStatusSpeed(true);
    await Voice.start('vi_VN');
  }
  const end = async () => {
    await setStatusSpeed(false);
    await setlistSpeed('')
    await Voice.cancel();
  }
  // enable mic
  const enableMic = useMemo(() => {
    if (StatusSpeed == true) {
      Voice.onSpeechResults = addSpeed;
      return Voice.onSpeechResults;
    }
  }, [StatusSpeed]);

  // hàm lấy ra số tiền
  const getMoney = useMemo(() => {
    if (listSpeed != '' && listSpeed != null) {
      let temp = listSpeed.split(' ')
      setMoney(Utilities.isNumber(temp) || 0)
      return Utilities.isNumber(temp) || 0;
    }
  }, [listSpeed])

  // hàm clear data
  const deleteData = useMemo(() => {
    if (listSpeed != '' && listSpeed != null) {
      let temp = listSpeed.split(' ')
      if (temp.includes('xóa') || temp.includes('Xóa') || temp.includes('xoá') || temp.includes('Xoá')) {
        Voice.cancel();
        setlistSpeed(' ');
        setBankName(' ')
        setTimeout(async () => {
          await Voice.start('vi_VN');
          await setlistSpeed(' ');
          await setBankName(' ')
        }, 500)
      }
    }
    return true;
  }, [listSpeed]);

  // hàm lấy ra tên người cần chuyển khoản
  const getBankName = useMemo(() => {
    if (listSpeed != '' && listSpeed != null) {
      let temp = listSpeed.split(' ')
      let arr = _.intersection(bankNameConst, temp);
      console.log('arr=====>', arr)
      if (arr.length != 0) {
        setBankName(arr[0]);
      }
    }

    return true;
  }, [listSpeed]);

  // hàm lấy ra tên người cần chuyển khoản
  const getName = useMemo(async () => {
    if (listSpeed != '' && listSpeed != null) {
      let data = listSpeed.split(' ')
      let arr = _.intersection(data, ten);
      console.log('arrrrr===>', arr)
      if (arr.length != undefined && arr.length != 0) {
        await setUserName(arr[0]);
      }
    }
    return true;
  }, [listSpeed,])

  // hàm lấy ra số tài khoản và người cần chuyển khoản
  const getStk = useMemo(() => {
    console.log('bankName', bankName);
    console.log('userName', userName);
    let accInfo =
      bankName != '' && userName != ''
        ? accNumberConst.find(
          item => item?.bank == bankName && item?.name.includes(userName),
        )
        : '';
    if (accInfo != undefined) {
      setAccNumber(accInfo?.accNumber);
      setUserInfo(accInfo?.name);
    }
    return true;
  }, [listSpeed, userName])


  console.log('bankname======', bankName);
  console.log('money', money);
  console.log('listSpeed=====>', listSpeed);
  const onPayment = async () => {
    try {
      // let params = new FormData();
      // params.append('from_account_id', '5');
      // params.append('to_account_id', '4');
      // params.append('paid_amount', '10000');
      let params = {
        paid_amount: String(money),
        from_account_id: String(UserAcc?.data?.id),
        to_account_id: '10',
      };
      console.log('params====>', params);
      dispatch(PaymentRequest(params));
      setStatusGotoDetail(true);
    } catch (error) {
      console.log(`error>>>>>`, error);
    }
  };
  const goToDetail = useMemo(() => {
    if (paymentStatus && statusGotoDetail) {
      navigate('PaymentDetail', data);
    }
  }, [paymentStatus, statusGotoDetail]);

  // check disable button khi không đúng điều kiện
  const isDisableBtn = useMemo(() => {
    const errorCount = [];
    Object.keys(errors).forEach(e => {
      if (!!errors[e]?.message) {
        errorCount.push(errors[e]?.message);
      }
    });
    const errorCondition = errorCount.length > 0;

    let isEmpty = false;
    if (bankName == '' || accNumber == '' || userInfo == '' || money == 0) {
      isEmpty = true;
    }
    return isEmpty;
  }, [bankName, accNumber, userInfo, money]);

  return (
    <ViewContainer>
      <Header navigation={navigation} title={'Thanh Toán'} />
      <KeyboardAwareScrollView>
        <View style={BaseStyle.viewContainer}>
          <View style={styles.bodyContainer}>
            <TextInputV2
              placeholder="VIB Bank"
              label="Bank Name:"
              name={PAYMENT_FORM.BANK_NAME}
              control={control}
              typeInput={'text'}
              onChangeValue={val => {
                setBankName(val);
              }}
              value={bankName}
              control={control}
              errorMessage={errors.username?.message}
            />
            <TextInputV2
              label="Payee Bank No:"
              placeholder="Nhập số tài khoản"
              name={PAYMENT_FORM.PAYEE_BANK_NO}
              typeInput={'text'}
              onChangeValue={val => {
                setAccNumber(val);
              }}
              value={accNumber}
              control={control}
              errorMessage={errors.username?.message}
            />
            <TextInputV2
              label="Payee name:"
              placeholder="Nhập tên người nhận"
              name={PAYMENT_FORM.PAYEE_NAME}
              control={control}
              typeInput={'text'}
              onChangeValue={val => {
                setUserInfo(val);
              }}
              value={userInfo}
              errorMessage={errors.username?.message}
            />
            <TextInputV2
              label="Number Amount:"
              placeholder="nhập số tiền VNĐ"
              name={PAYMENT_FORM.AMOUNT_PAYMENT}
              typeInput={'money'}
              onChangeValue={val => {
                setMoney(val);
              }}
              value={money}
              control={control}
              errorMessage={errors.username?.message}
            />
            <TextInputV2
              placeholder="Note (Optional):"
              name={PAYMENT_FORM.TRANSACTION_NOTE}
              secureTextEntry={true}
              control={control}
              errorMessage={errors.username?.message}
            />
            <Button
              disabled={isDisableBtn}
              title={'Thanh Toán'}
              size="normal"
              isOutLine={true}
              icon={
                <Image source={Images.Arrow} style={BaseStyle.rightIconStyle} />
              }
              iconRight={true}
              onPress={() => handleSubmit(onPayment())}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ViewContainer>
  );
};

export default PaymetMethod;

const styles = StyleSheet.create({
  logoContainer: {
    position: 'relative',
    bottom: 60,
    alignItems: 'center',
    marginTop: 100,
    paddingLeft: '5%',
    //backgroundColor: 'black',
  },
  bodyContainer: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  forgetPassWord: {
    paddingTop: 20,
    alignItems: 'center',
  },
});
