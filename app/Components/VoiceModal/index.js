import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { Colors, Images } from '@/Theme';
import Fonts from '@/Theme/Fonts';
import { CustomText } from '@/Components';
import { VoiceModalClose, GeneralModalOpen, PopupModalOpen } from '@/ReduxSaga';
// import { StartLoading, StopLoading, GeneralModalOpen } from '@/ReduxSaga';
import { useDispatch } from 'react-redux';
import { Navigate } from '@/Utils/NavigationService';
import { BlurView } from '@react-native-community/blur';
import Utilities from '@/Utils/Utils';

export default function VoiceModal() {
  const { open, voiceText } = useSelector(state => state.VoiceModal);
  const { data: profileMe } = useSelector(state => state.Login);
  const [voice, setVoice] = useState('');
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  useMemo(async () => {
    // setTimeout(async () => {
    await setVoice(voiceText)

    // }, 200)
  }, [voiceText]);


  const getMoney = useMemo(() => {
    if (voice != '' && voice != null) {
      let temp = voice.split(' ');
      return Utilities.isNumber(temp) || 0;
    }
    return 0;
  }, [voice])

  useMemo(async () => {


    if (
      voice != null &&
      (voice.includes('Chuyển khoản')
        || voice.includes('chuyển khoản')
        || voice.includes('Chuyển tiền')
      )
    ) {
      setStatus(true);
      // Alert.alert(
      //   "Alert Title",
      //   "My Alert Msg",
      //   [
      //     {
      //       text: "Cancel",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel"
      //     },
      //     { text: "OK", onPress: () => console.log("OK Pressed") }
      //   ]
      // );

      dispatch(VoiceModalClose());
      const generalType = {
        type: 'WARNING',
        action: true,
        isOpen: true,
        backdropClose: false,
        title: 'Thông báo',
        navigateTo: 'PaymentMethod',
        message:
          'Bạn có muốn chuyển đến màn hình thanh toán',
      };
      await dispatch(PopupModalOpen(generalType))
      // setTimeout(async () => {
      // await dispatch(PopupModalOpen(generalType))
      // setTimeout(async () => {
      //   dispatch(VoiceModalClose());
      // }, 1000)
      // dispatch(VoiceModalClose());
      // Navigate('PaymentStackNavigator', {
      //   screen: 'PaymentMethod',
      // });
    }

  }, [voice, voiceText]);

  useMemo(async () => {
    console.log('aaaaaaaaaaaaaa', status)
    if (status) await demoOpen()
  }, [status]);

  const demoOpen = async () => {
    console.log('444444444444')
    const generalType = {
      type: 'WARNING',
      action: true,
      isOpen: true,
      backdropClose: false,
      title: 'Thông báo',
      navigateTo: 'PaymentMethod',
      message:
        'Bạn có muốn chuyển đến màn hình thanh toán',
    };
    // setTimeout(async () => {
    await dispatch(PopupModalOpen(generalType))
    // }, 1000)
  };


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
        onBackdropPress={() => { }}>
        <BlurView blurType="regular" style={styles.absolute}>
          <View style={styles.modalContainer}>
            <View style={styles.groupIcons}>
              <Image
                source={Images.VoiceLargeIcon}
                style={styles.micAssistant}
              />
              <Image
                source={Images.VoiceWaveIcon}
                style={styles.voiceAssistant}
              />
            </View>
            <Text
              style={
                styles.welcomeText
              }>{`Hi ${profileMe?.username}, My Vib is listening`}</Text>
            <Text style={styles.requestPaymentText} numberOfLines={5}>
              {voice}
            </Text>
            <TouchableOpacity
              style={styles.closeIconStyle}
              onPress={() => dispatch(VoiceModalClose())}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  micAssistant: {
    width: 70.96,
    height: 88.32,
  },
  voiceAssistant: {
    marginTop: 50,
    width: 302.4,
    height: 107.89,
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
  welcomeText: {
    marginHorizontal: 10,
    fontSize: 24,
    color: Colors.white,
    marginTop: 20,
    fontWeight: '200',
  },
  requestPaymentText: {
    marginHorizontal: 30,
    fontSize: 18,
    color: Colors.white,
    marginTop: 50,
    fontWeight: '300',
    textAlign: 'center',
  },
  closeIconStyle: {
    position: 'absolute',
    bottom: '-45%',
  },
});
