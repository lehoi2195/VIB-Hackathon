import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {Colors} from '@/Theme';
import {CustomText} from '@/Components';

export default function Loading() {
  const {loading} = useSelector(state => state.Loading);
  return (
    <View>
      <Modal
        isVisible={loading}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        animationOutTiming={50}
        backdropColor={Colors.lightTransparent}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingInner}>
            <ActivityIndicator size={40} color={Colors.blue} />
            <CustomText text="Loading..." color={Colors.blue} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
  },
  loadingInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 130,
    borderRadius: 10,
    backgroundColor: Colors.white,
    paddingRight: 10,
  },
});
