import React, {useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {Images} from '@/Theme';
export default function ViewContainer({children}) {
  return (
    <ImageBackground
      source={Images.backgroundImage}
      style={styles.backgroundStyle}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    // justifyContent: 'center',
  },
});
