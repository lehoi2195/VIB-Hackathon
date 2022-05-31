import React, {useMemo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {ViewContainer, Header, TextInput, Button} from '@/Components';
import {Images, BaseStyle} from '@/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from '../schemaLogin';
import {useDispatch} from 'react-redux';
import {ForgotPasswordRequest} from '@/ReduxSaga';
import {isEmpty as checkEmpty} from 'lodash';

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();

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

  const onForgotPassword = async () => {
    try {
      let params = new FormData();
      params.append('email', getValues().email);

      dispatch(ForgotPasswordRequest(params));
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
        const optionsField = ['email'];
        if ((!value && !optionsField.includes(key)) || !!errorCondition) {
          isEmpty = true;
        }
      });
    }
    return isEmpty;
  }, [errors, watch()]);

  return (
    <ViewContainer>
      <Header navigation={navigation} title={'Quên mật khẩu'} />
      <KeyboardAwareScrollView>
        <View style={BaseStyle.viewContainer}>
          {/* <Text>Home Screen</Text> */}
          <View style={styles.logoContainer}>
            <Image source={Images.logoVIB} />
          </View>
          <View style={styles.bodyContainer}>
            <TextInput
              placeholder="Email:"
              name="email"
              control={control}
              errorMessage={errors.email?.message}
            />
            <Button
              disabled={isDisableBtn}
              title={'Reset lại mật khẩu'}
              size="normal"
              isOutLine={true}
              icon={
                <Image source={Images.Arrow} style={BaseStyle.rightIconStyle} />
              }
              iconRight={true}
              onPress={() => handleSubmit(onForgotPassword())}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ViewContainer>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  logoContainer: {
    position: 'relative',
    bottom: 60,
    alignItems: 'center',
    marginTop: 200,
    paddingLeft: '5%',
    //backgroundColor: 'black',
  },
  bodyContainer: {
    marginBottom: 100,
    marginHorizontal: 10,
  },
  forgetPassWord: {
    paddingTop: 20,
    alignItems: 'center',
  },
});
