import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Alert, ScrollView} from 'react-native';
import {BaseStyle} from '@/Theme/BaseStyle';
import {Colors, Images} from '@/Theme';
import {ViewContainer, Header, CustomText, ListItem} from '@/Components';
import {Avatar} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {Switch} from 'react-native-switch';
import {LoginOut} from '@/ReduxSaga';

const Profile = () => {
  const dispatch = useDispatch();
  const {data: profileMe} = useSelector(state => state.Login);

  const [voice, setVoice] = useState(false);

  const onVoiceAssistant = () => {
    setVoice();
  };

  const username = profileMe.username
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '');

  return (
    <ViewContainer style={BaseStyle.viewContainer}>
      <Header title="My Profile" leftComponent={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewContainer}>
          <Avatar
            size="large"
            rounded
            title={username}
            onPress={() => console.log('Works!')}
            activeOpacity={0.8}
            color="red"
            overlayContainerStyle={styles.avatarBackground}
            containerStyle={styles.avatarStyle}
          />
          <CustomText
            text={profileMe.username}
            size={22}
            style={styles.profileName}
          />
        </View>
        <View style={styles.listContainer}>
          <ListItem
            icon={Images.NotiIcon}
            text="Thông báo"
            onPress={() =>
              Alert.alert('Tính năng chưa được hỗ trợ, Xin hãy quay lại sau')
            }
          />
          <ListItem
            icon={Images.SettingIcon}
            text="Cài đặt"
            onPress={() =>
              Alert.alert('Tính năng chưa được hỗ trợ, Xin hãy quay lại sau')
            }
          />
          <ListItem icon={Images.VoiceIcon} text="Hỗ trợ giọng nói">
            <Switch
              value={voice}
              onValueChange={() => onVoiceAssistant()}
              disabled={false}
              circleSize={15}
              barHeight={20}
              circleBorderWidth={0}
              backgroundActive={Colors.blue}
              backgroundInactive={Colors.gray2}
              circleActiveColor={'#fff'}
              circleInActiveColor={'#fff'}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              outerCircleStyle={{}}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={3}
              switchRightPx={3}
              switchWidthMultiplier={2}
            />
          </ListItem>
          <ListItem
            icon={Images.LogoutIcon}
            text="Đăng xuất"
            onPress={() => dispatch(LoginOut())}
          />
        </View>
      </ScrollView>
    </ViewContainer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
  },
  avatarStyle: {
    marginTop: 25,
  },
  avatarBackground: {
    backgroundColor: Colors.blue,
  },
  profileName: {
    marginTop: 25,
  },
  listContainer: {
    marginTop: 30,
  },
});
