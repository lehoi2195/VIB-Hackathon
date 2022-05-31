import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

export default function index() {
  // Pre-step, call this before any NFC operations
  async function initNfc() {
    await NfcManager.start();
  }

  const readNdef = async () => {
    try {
      const cleanUp = () => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.setEventListener(NfcEvents.SessionClosed, null);
      };

      return new Promise(resolve => {
        let tagFound = null;

        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
          tagFound = tag;
          resolve(tagFound);
          NfcManager.setAlertMessageIOS('NDEF tag found');
          NfcManager.unregisterTagEvent().catch(() => 0);
        });

        NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
          cleanUp();
          if (!tagFound) {
            resolve();
          }
        });

        NfcManager.registerTagEvent();
      });
    } catch (error) {
      console.log(`error`, error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={async () => {
          await initNfc();
          await readNdef();
        }}>
        <Text>NFC Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
