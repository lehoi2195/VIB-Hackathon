import React, {useEffect, useMemo} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {ViewContainer, TextInput, Button, CustomText} from '@/Components';
import {Images, BaseStyle, Colors} from '@/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from '../schemaLogin';
import {useDispatch} from 'react-redux';
import {isEmpty as checkEmpty} from 'lodash';
import {LoginRequest} from '@/ReduxSaga';

const Login = ({navigation}) => {
  const {
    control,
    getValues,
    setValue,
    watch,
    formState: {errors},
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      let params = new FormData();
      params.append('identifier', getValues().email);
      params.append('password', getValues().password);

      dispatch(LoginRequest(params));
    } catch (error) {
      console.log(`error>>>>>`, error);
    }
  };

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
    if (!checkEmpty(getValues())) {
      Object.entries(getValues()).some(([key, value]) => {
        const optionsField = ['email', 'password'];
        if ((!value && !optionsField.includes(key)) || !!errorCondition) {
          isEmpty = true;
        }
      });
    }
    return isEmpty;
  }, [errors, watch()]);

  return (
    <ViewContainer>
      <View style={BaseStyle.viewContainer}>
        <KeyboardAwareScrollView>
          <View style={styles.logoContainer}>
            <Image source={Images.logoVIB} />
          </View>

          <View style={styles.bodyContainer}>
            <TextInput
              maxLength={120}
              placeholder="Email"
              label="Tên đăng nhập:"
              name="email"
              control={control}
              errorMessage={errors.email?.message}
            />

            <TextInput
              maxLength={120}
              placeholder="Mật khẩu"
              label="Mật khẩu:"
              name="password"
              secureTextEntry={true}
              control={control}
              errorMessage={errors.password?.message}
            />
            <Button
              disabled={isDisableBtn}
              title={'Đăng nhập'}
              size="normal"
              isOutLine={true}
              iconRight={true}
              onPress={() => handleSubmit(onLogin())}
            />
            <View style={styles.textContainer}>
              <TouchableOpacity
                style={styles.forgetPassWord}
                onPress={() => navigation.navigate('CreateNewPassword')}>
                <CustomText
                  text="Đăng ký tài khoản?   "
                  color={Colors.grayLabel}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forgetPassWord}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <CustomText text="Quên mật khẩu?" color={Colors.grayLabel} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </ViewContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  logoContainer: {
    position: 'relative',
    bottom: 60,
    alignItems: 'center',
    marginTop: 200,
    paddingLeft: '5%',
  },
  bodyContainer: {
    marginHorizontal: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgetPassWord: {
    paddingTop: 20,
    alignItems: 'center',
  },
});
