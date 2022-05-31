import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {Colors, Images} from '@/Theme';
import Fonts from '@/Theme/Fonts';
import {CustomText} from '@/Components';
import {PaymentModalClose} from '@/ReduxSaga';
import {useDispatch} from 'react-redux';
import {Navigate} from '@/Utils/NavigationService';
import {BlurView, VibrancyView} from '@react-native-community/blur';

export default function PaymentModal() {
  const {open} = useSelector(state => state.PaymentModal);

  const dispatch = useDispatch();

  return (
    <View>
      <Modal
        isVisible={open}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={100}
        animationOutTiming={100}
        backdropColor={Colors.blueHeavy}
        backdropOpacity={0.4}
        onBackdropPress={() => {}}>
        <BlurView blurType="regular" style={styles.absolute}>
          <View style={styles.modalContainer}>
            <View style={styles.groupIcons}>
              <TouchableOpacity
                onPress={() => {
                  Navigate('PaymentStackNavigator', {
                    screen: 'PaymentMethod',
                  });
                  dispatch(PaymentModalClose());
                }}
                style={styles.iconContainer}>
                <Image
                  source={Images.TransferIcon}
                  style={styles.iconPayment}
                />
                <CustomText text="Tranfer Money" color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Navigate('PaymentStackNavigator', {
                    screen: 'NFCPayment',
                  });
                  dispatch(PaymentModalClose());
                }}
                style={styles.iconContainer}>
                <Image source={Images.NFCIcon} style={styles.iconPayment} />
                <CustomText text="NFC Payment" color={Colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  Navigate('PaymentStackNavigator', {
                    screen: 'NFCPayment',
                  });
                  dispatch(PaymentModalClose());
                }}>
                <Image source={Images.HistoryIcon} style={styles.iconPayment} />
                <CustomText text="History" color={Colors.white} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeIconStyle}
              onPress={() => dispatch(PaymentModalClose())}>
              <Image source={Images.CloseIcon} style={[styles.iconPayment]} />
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  absolute: {
    width: '115%',
    height: '115%',
    marginLeft: -20,
  },
  groupIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  iconContainer: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  iconPayment: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  closeIconStyle: {
    position: 'absolute',
    bottom: '-100%',
  },
});
