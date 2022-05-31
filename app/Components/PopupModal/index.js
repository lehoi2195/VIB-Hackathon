import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { Colors, Images } from '@/Theme';
import Fonts from '@/Theme/Fonts';
import { CustomText } from '@/Components';
import { PopupModalClose } from '@/ReduxSaga';
import { useDispatch } from 'react-redux';
import { Navigate } from '@/Utils/NavigationService';

export default function PopupModal({ navigation }) {
  const { popupType } = useSelector(state => state.PopupModal);
  const dispatch = useDispatch();

  let generalIcon;
  switch (popupType?.type) {
    case 'WARNING':
      generalIcon = Images.Warning;
      break;
    case 'SUCCESS':
      generalIcon = Images.Success;
      break;
    case 'FAILED':
      generalIcon = Images.Failed;
      break;
    default:
      generalIcon = Images.Failed;
      break;
  }

  return (
    <View>
      <Modal
        isVisible={popupType?.isOpen}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationInTiming={50}
        animationOutTiming={50}
        backdropColor={Colors.lightTransparent}
        onBackdropPress={() => { }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <View style={styles.contentArea}>
              <Image source={generalIcon} style={styles.icon} />

              {popupType?.title && (
                <CustomText
                  text={popupType?.title}
                  color={Colors.blue}
                  style={styles.title}
                  numberOfLines={1}
                />
              )}
              {popupType?.message && (
                <CustomText
                  text={popupType?.message}
                  color={Colors.blue}
                  style={styles.content}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={
                popupType?.action
                  ? () => {
                    try {
                      if (popupType?.navigateTo) {
                        Navigate('PaymentStackNavigator', {
                          screen: 'PaymentMethod',
                        });
                      }
                      dispatch(PopupModalClose());
                    } catch (error) {
                      console.log(`error>>>>>>`, error);
                    }
                  }
                  : () => { }
              }
              style={styles.modalButton}>
              <CustomText text={'YES'} color={Colors.blue} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                popupType?.action
                  ? () => {
                    try {
                      if (popupType?.navigateTo) {
                        Navigate(popupType?.navigateTo);
                      }
                      dispatch(PopupModalClose());
                    } catch (error) {
                      console.log(`error>>>>>>`, error);
                    }
                  }
                  : () => { }
              }
              style={styles.modalButton}>
              <CustomText text={'NO'} color={Colors.blue} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
  },
  modalInner: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20%',
    width: '85%',
    borderRadius: 15,
    backgroundColor: Colors.white,
    marginBottom: 150,
  },
  contentArea: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: Fonts.size.h5,
    paddingVertical: 10,
  },
  content: {
    paddingBottom: 5,
    textAlign: 'center',
  },
  modalButton: {
    borderTopWidth: 0.2,
    borderTopColor: Colors.blue,
    width: '100%',
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
});
