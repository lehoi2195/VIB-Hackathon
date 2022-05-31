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
import { GeneralModalClose } from '@/ReduxSaga';
import { useDispatch } from 'react-redux';
import { Navigate } from '@/Utils/NavigationService';

export default function GeneralModal({ navigation }) {
  const { generalType } = useSelector(state => state.GeneralModal);

  const dispatch = useDispatch();

  console.log(`GeneralModalnavigation>>>>>>>>`, navigation);

  let generalIcon;
  switch (generalType?.type) {
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
        isVisible={generalType?.isOpen}
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

              {generalType?.title && (
                <CustomText
                  text={generalType?.title}
                  color={Colors.blue}
                  style={styles.title}
                  numberOfLines={1}
                />
              )}
              {generalType?.message && (
                <CustomText
                  text={generalType?.message}
                  color={Colors.blue}
                  style={styles.content}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={
                generalType?.action
                  ? () => {
                    try {
                      if (generalType?.navigateTo) {
                        Navigate(generalType?.navigateTo);
                      }
                      dispatch(GeneralModalClose());
                    } catch (error) {
                      console.log(`error>>>>>>`, error);
                    }
                  }
                  : () => { }
              }
              style={styles.modalButton}>
              <CustomText text={'OK'} color={Colors.blue} />
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
