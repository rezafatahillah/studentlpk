import React from 'react';
import {
  View,
  NativeBaseProvider,
} from 'native-base';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import CardProfileBeforeLogin from 'components/CardProfileBeforeLogin';
import CardProfileAfterLogin from 'components/CardProfileAfterLogin';

const ProfileScreen = () => {
  const redux_profile = useAppSelector(state => state.login);
  return (
    <View flex={1}>
      <NativeBaseProvider>
      {redux_profile.dataLogin.token ? (
        <CardProfileAfterLogin />
      ) : (
        <CardProfileBeforeLogin />
      )}
    </NativeBaseProvider>
    </View>
  );
};

export default ProfileScreen;