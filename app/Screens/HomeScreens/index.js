<<<<<<< HEAD
// Speech to Text Conversion in React Native – Voice Recognition
// https://aboutreact.com/speech-to-text-conversion-in-react-native-voice-recognition/

// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
=======
import React, { useEffect, useState, useMemo } from 'react';
>>>>>>> a2c3331118f3039e063cd6945e734852998b4ab1
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
<<<<<<< HEAD

// import Voice
import Voice from 'react-native-voice';

const App = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    //Setting callbacks for the process status
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      //destroy the process after switching the screen
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    //Invoked when .start() is called without error
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechEnd = e => {
    //Invoked when SpeechRecognizer stops recognition
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechError = e => {
    //Invoked when an error occurs.
    console.log('onSpeechError: ', e);
    setError(JSON.stringify(e.error));
  };

  const onSpeechResults = e => {
    //Invoked when SpeechRecognizer is finished recognizing
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = e => {
    //Invoked when any results are computed
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const onSpeechVolumeChanged = e => {
    //Invoked when pitch that is recognized changed
    console.log('onSpeechVolumeChanged: ', e);
    setPitch(e.value);
  };

  const startRecognizing = async () => {
    //Starts listening for speech for a specific locale
    try {
      await Voice.start('en-US');
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
=======
import { BaseStyle } from '@/Theme/BaseStyle';
import { useDispatch, useSelector } from 'react-redux';
import CallAPIExample from '@/ReduxSaga/CallAPIExample';
import { ViewContainer, TextInput, Button, Icon, Header } from '@/Components';
import { Images, Colors } from '@/Theme';
import Fonts from '@/Theme/Fonts';
import { ListDate } from './Components/ListDate';
import { Card } from './Components/Card';
import { VoiceModalOpen, VoiceModalAddText, PopupModalOpen, GeneralModalOpen } from '@/ReduxSaga';
import Voice from '@react-native-voice/voice';

const Home = () => {
  const dispatch = useDispatch();
  const [infoCard, setInfoCard] = useState({});
  const [listSpeed, setlistSpeed] = useState('')
  const { open } = useSelector(state => state.VoiceModal);

  useEffect(() => {
    getSlider();
    Voice.onSpeechResults = addSpeed;
  }, []);

  const getSlider = () => {
    setInfoCard({
      nameCard: 'Nguyen Van A',
      value: 20000000,
      numberCard: '999999999999',
      date: new Date(),
    });
  };

  const startRecognizing = async () => {
    try {
      await dispatch(VoiceModalAddText(null))
      dispatch(VoiceModalOpen())
      await Voice.start('vi-VN');
      setlistSpeed('');
    } catch (e) {
>>>>>>> a2c3331118f3039e063cd6945e734852998b4ab1
      console.error(e);
    }
  };

<<<<<<< HEAD
  const stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  const destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
      setPitch('');
      setError('');
      setStarted('');
      setResults([]);
      setPartialResults([]);
      setEnd('');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>
          Speech to Text Conversion in React Native | Voice Recognition
        </Text>
        <Text style={styles.textStyle}>Press mike to start Recognition</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>{`Started: ${started}`}</Text>
          <Text style={styles.textWithSpaceStyle}>{`End: ${end}`}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.textWithSpaceStyle}>{`Pitch: \n ${pitch}`}</Text>
          <Text style={styles.textWithSpaceStyle}>{`Error: \n ${error}`}</Text>
        </View>
        <TouchableHighlight onPress={startRecognizing}>
          <Image
            style={styles.imageButton}
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
          />
        </TouchableHighlight>
        <Text style={styles.textStyle}>Partial Results</Text>
        <ScrollView>
          {partialResults.map((result, index) => {
            return (
              <Text key={`partial-result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <Text style={styles.textStyle}>Results</Text>
        <ScrollView style={{marginBottom: 42}}>
          {results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.textStyle}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <View style={styles.horizontalView}>
          <TouchableHighlight
            onPress={stopRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Stop</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={cancelRecognizing}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={destroyRecognizer}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Destroy</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
=======
  const demoOpen = async () => {
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
  };


  useMemo(async () => {
    if (!open) {
      await Voice.destroy();
      await dispatch(VoiceModalAddText(null))
      await dispatch(VoiceModalClose())
    }
  }, [open])

  const addSpeed = async (e) => {
    try {
      setTimeout(async () => {
        if (e.value?.[0].length < 100) {
          await dispatch(VoiceModalAddText(e.value?.[0]))
        }
        else {
          await dispatch(VoiceModalAddText('Tôi không hiểu ý bạn vui lòng thử lại'))
          await Voice.cancel();
          setTimeout(async () => {
            await Voice.start('vi_VN');
            setTimeout(async () => {
              await dispatch(VoiceModalAddText(null))
            }, 10000)
          }, 500)
        }
      }, 700)
    }
    catch (e) {
      console.log('EEEEEEEEEE', e)
    }
  }


  return (
    <ViewContainer>
      <Header title="My VIB Account" leftComponent={() => { }} />
      <Card
        nameCard={infoCard?.nameCard}
        value={infoCard?.value}
        numberCard={infoCard?.numberCard}
        date={infoCard?.date}
      />
      <ListDate />
      <TouchableOpacity
        style={styles.btnVoice}
        onPress={() =>
          startRecognizing()
        }>
        <Image source={Images.ic_voice_home} />
        <Text style={styles.heyMyVIB}>"Hey My VIB"</Text>
      </TouchableOpacity>
    </ViewContainer>
>>>>>>> a2c3331118f3039e063cd6945e734852998b4ab1
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  horizontalView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    textAlign: 'center',
    padding: 12,
  },
  imageButton: {
    width: 50,
    height: 50,
  },
  textWithSpaceStyle: {
    flex: 1,
    textAlign: 'center',
    color: '#B0171F',
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   Platform,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {BaseStyle} from '@/Theme/BaseStyle';
// import {useDispatch, useSelector} from 'react-redux';
// import CallAPIExample from '@/ReduxSaga/CallAPIExample';
// import {ViewContainer, TextInput, Button, Icon, Header} from '@/Components';
// import {Images, Colors} from '@/Theme';
// import Fonts from '@/Theme/Fonts';
// import {ListDate} from './Components/ListDate';
// import {Card} from './Components/Card';
// import {VoiceModalOpen, VoiceModalAddText} from '@/ReduxSaga';
// import Voice from '@react-native-voice/voice';

// const Home = () => {
//   const dispatch = useDispatch();
//   const [infoCard, setInfoCard] = useState({});
//   const [listSpeed, setlistSpeed] = useState('');
//   const {open} = useSelector(state => state.VoiceModal);
//   const {data} = useSelector(state => state.MyAccount);

//   console.log(`data>>>>>>>>>`, data);

//   useEffect(() => {
//     getSlider();
//     // dispatch(CallAPIExample.actions.apiExampleFetch());
//     // Voice.onSpeechResults = addSpeed;
//     // Voice.start('en_US');
//   }, []);

//   // const addSpeed = async e => {
//   //   console.log('e.value?.[0]', e.value?.[0]);
//   //   if (
//   //     open == false &&
//   //     (e.value?.[0].includes('Hey') ||
//   //       e.value?.[0].includes('hey') ||
//   //       e.value?.[0].includes('baby') ||
//   //       e.value?.[0].includes('VIP') ||
//   //       e.value?.[0].includes('Vib'))
//   //   ) {
//   //     await dispatch(VoiceModalOpen());
//   //     await Voice.cancel();
//   //     setTimeout(async () => {
//   //       await Voice.start('vi_VN');
//   //       await dispatch(VoiceModalAddText(null));
//   //     }, 500);
//   //   }
//   //   // console.log('e.value?.[0].length', e.value?.[0].length)
//   //   // console.log('open-------', open)
//   //   // if (open) {
//   //   console.log('vib=====>', e.value?.[0]);
//   //   try {
//   //     setTimeout(async () => {
//   //       if (e.value?.[0].length < 100) {
//   //         await dispatch(VoiceModalAddText(e.value?.[0]));
//   //       } else {
//   //         await dispatch(
//   //           VoiceModalAddText('Tôi không hiểu ý bạn vui lòng thử lại'),
//   //         );
//   //         await Voice.cancel();
//   //         setTimeout(async () => {
//   //           await Voice.start('vi_VN');
//   //           await dispatch(VoiceModalAddText(null));
//   //         }, 500);
//   //       }
//   //     }, 700);
//   //   } catch (e) {
//   //     console.log('EEEEEEEEEE', e);
//   //   }
//   //   // }

//   //   // setlistSpeed(e.value?.[0])
//   // };

//   const getSlider = () => {
//     setInfoCard({
//       nameCard: data?.user.username,
//       value: data?.total_amount,
//       numberCard: data?.card_number,
//       date: new Date(),
//     });
//   };

//   return (
//     <ViewContainer>
//       <Header title="My VIB Account" leftComponent={() => {}} />
//       <Card
//         nameCard={infoCard?.nameCard}
//         value={infoCard?.value}
//         numberCard={infoCard?.numberCard}
//         date={infoCard?.date}
//       />
//       <ListDate />
//       <TouchableOpacity
//         style={styles.btnVoice}
//         onPress={() => dispatch(VoiceModalOpen())}>
//         <Image source={Images.ic_voice_home} />
//         <Text style={styles.heyMyVIB}>"Hey My VIB"</Text>
//       </TouchableOpacity>
//     </ViewContainer>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   slider: {},
//   cardContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnVoice: {
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//     bottom: Platform.OS === 'android' ? '25%' : '13%',
//   },
//   heyMyVIB: {
//     fontSize: 15,
//     lineHeight: 20,
//     fontFamily: Fonts.type.base,
//   },
// });
