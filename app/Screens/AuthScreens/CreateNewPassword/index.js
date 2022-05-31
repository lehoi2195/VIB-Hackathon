import React, {useMemo} from 'react';
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
  TextInput,
  Button,
  CustomText,
} from '@/Components';
import {Images, BaseStyle, Colors} from '@/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from '../schemaLogin';
import {useDispatch} from 'react-redux';
import {CreateNewAccountRequest} from '@/ReduxSaga';
import {isEmpty as checkEmpty} from 'lodash';
const CreateNewPassword = ({navigation}) => {
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

  const onCreateNewAccount = async () => {
    try {
      let params = new FormData();
      params.append('username', getValues().username);
      params.append('email', getValues().email);
      params.append('password', getValues().password);

      dispatch(CreateNewAccountRequest(params));
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
        const optionsField = ['username', 'email', 'password'];
        if ((!value && !optionsField.includes(key)) || !!errorCondition) {
          isEmpty = true;
        }
      });
    }
    return isEmpty;
  }, [errors, watch()]);

  return (
    <ViewContainer>
      <Header navigation={navigation} title={'Tạo tài khoản mới'} />
      <KeyboardAwareScrollView>
        <View style={BaseStyle.viewContainer}>
          {/* <Text>Home Screen</Text> */}
          <View style={styles.logoContainer}>
            <Image source={Images.logoVIB} />
          </View>
          <View style={styles.bodyContainer}>
            <TextInput
              placeholder="Username"
              name="username"
              control={control}
              errorMessage={errors.username?.message}
            />
            <TextInput
              placeholder="Email"
              name="email"
              control={control}
              errorMessage={errors.email?.message}
            />
            <TextInput
              placeholder="Nhập lại mật khẩu"
              name="password"
              secureTextEntry={true}
              control={control}
              errorMessage={errors.password?.message}
            />
            <Button
              disabled={isDisableBtn}
              title={'Tạo tài khoản'}
              size="normal"
              isOutLine={true}
              icon={
                <Image source={Images.Arrow} style={BaseStyle.rightIconStyle} />
              }
              iconRight={true}
              onPress={() => handleSubmit(onCreateNewAccount())}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ViewContainer>
  );
};

export default CreateNewPassword;

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
    marginBottom: 100,
    marginHorizontal: 10,
  },
  forgetPassWord: {
    paddingTop: 20,
    alignItems: 'center',
  },
});
