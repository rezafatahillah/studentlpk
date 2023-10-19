
import React from 'react';
import {Image,View} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <Image alt='logo' source={require('@assets/images/logo_rumah_lpk.png')}/>
    </View>
  );
};
export default SplashScreen;