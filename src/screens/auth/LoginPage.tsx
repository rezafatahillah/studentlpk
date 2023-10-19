import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  Dimensions,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Image,
  Box,
  Center,
  NativeBaseProvider,
  VStack,
  HStack,
  Flex,
  Input,
  Icon,
  Button,
  FormControl,
  useToast,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { setDataLogin, logout } from '@redux/apps/LoginSlice';
import { StackNavigation, TabNavigation } from '@itype/RouteType';
import colors from '@config/colors';
import MyLoading from 'components/MyLoading';
import { AppText } from 'components/Text';
import authservices from '@services/authservices';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import { GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// import GoogleAuthProvider from '@react-native-firebase/auth';
// import signInWithCredential from '@react-native-firebase/auth';

var deviceHeight: any = Dimensions.get('window').height.toFixed();
var deviceWidth: any = Dimensions.get('window').width;

const LoginScreen = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Content />
    </View>
  );
};

GoogleSignin.configure({
  webClientId: '635411915841-e5d03mmpbsu1dj4s8s8h3hh4bn1csiu7.apps.googleusercontent.com',
  });

function Content(props: any) {
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const [colorSearch, setColorSearch] = React.useState('#000');
  const [bgSearch, setBgSearch] = React.useState('#fff');
  const StackNavigationProp = useNavigation<StackNavigation>(); // check which routes is navigates
  const TabNavigationProp = useNavigation<TabNavigation>(); // check which routes is navigates

  const [stateLogin, setStateLogin] = React.useState({
    username: 'diezer33@gmail.com',
    password: 'Password123',
  });
  const [animating, setAnimating] = useState(false);
  const datalogin = useAppSelector(state => state.login);
  const dispatch = useAppDispatch();

  const stateChange = (usr: any, ev: any) => {
    setStateLogin(prev => ({
      ...prev,
      [usr]: ev,
    }));
  };

  useEffect(() => {
  }, []);

  const GoogleLogin = async () => {
    try {
      // console.log  
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      // await signInWithCredential(googleCredentials);
      // const email = userInfo.user.email;
      console.log(googleCredentials)
      // Process the retrieved email data as needed
    } catch (error) {
      console.log("sss",error.message)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the login process
        console.log('SIGN_IN_CANCELLED')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS')
        // Login process is already in progress
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE')
        // Play services are not available
      } else {
        console.log('another')
        // Error occurred during the login process
      }
      
    }
  };

  const GoLogin = () => {
    setAnimating(true);
    const dataParams = {
      email: stateLogin.username, //,
      password: stateLogin.password, //
    };
    authservices
      .login(dataParams)
      .then(response => {
        setAnimating(false);
        console.log('mysqres', response);
        const data = response;
        const reduxdata: any = {
          isLogin: true,
          token: response.token,
          username: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          fullname: data.firstname + ' ' + data.lastname,
          photo: data.lastname,
          email: data.email,
          afterInstall: true,
        };
        dispatch(setDataLogin(reduxdata));
        if (TabNavigationProp.canGoBack()) {
          TabNavigationProp.goBack();
        } else {
          TabNavigationProp.navigate('home');
        }
      })
      .catch(err => {
        setAnimating(false);
        console.log('myerr', err.response.data);
        toast.show({
          title: err.response.data.message,
          placement: 'top',
        });
        // setMessage(err.response.data.message)
      });
    return;
  };

  const ChangeColorTextSearch = (textColor: any, bgColor: any) => {
    setColorSearch(textColor);
    setBgSearch(bgColor);
  };

  useEffect(() => {
    console.log('State login Berubah');
  }, [animating]);
  return (
    <>
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
          {animating && <MyLoading />}
          <VStack space={2}>
            <TouchableOpacity
              onPress={() => TabNavigationProp.navigate('home')}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={25}
                color={colors.success700}
              />
            </TouchableOpacity>
            <AppText size={24} font_type="medium" style={{ marginTop: 10 }}>
              Masuk
            </AppText>
            <HStack alignItems={'center'} space={2}>
              <AppText size={14} color={'secondary'}>
                Belum punya akun?
              </AppText>
              <TouchableOpacity>
                <AppText
                  color="success"
                  size={14}
                  font_type="medium"
                  onPress={() => StackNavigationProp.navigate('register')}>
                  Daftar
                </AppText>
              </TouchableOpacity>
            </HStack>
            <Button
              rounded="5"
              bg="#FFFFFF"
              borderColor="#C7C8CB"
              borderWidth={1}
              onPress={() => GoogleLogin()}>
              <HStack space={2} alignItems={'center'}>
                <Image
                  source={require('@assets/images/google.png')}
                  alt="Google Logo"
                  size={8}
                />
                <AppText size={14} font_type="semibold">
                  Lanjutkan dengan Google
                </AppText>
              </HStack>
            </Button>
            <Flex direction="row" justify="center" alignItems="center" mt="5">
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: '#8dbdff66' }}
                />
                <View>
                  <AppText
                    color={colors.bgGrey400}
                    style={{ width: 200, textAlign: 'center' }}>
                    Atau masuk dengan
                  </AppText>
                </View>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: '#8dbdff66' }}
                />
              </View>
            </Flex>
            <Box>
              <FormControl isInvalid w="100%" maxW="100%" isRequired>
                <VStack space={2}>
                  <AppText font_type="medium">Email</AppText>
                  <Input
                    bg={bgSearch}
                    style={{ color: colorSearch, fontSize: 15 }}
                    h="50px"
                    w={{ base: '100%', md: '100%' }}
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="how-to-reg" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                    placeholder="Enter Email / Username"
                    value={stateLogin.username}
                    onChangeText={ev => stateChange('username', ev)}
                  />
                  <AppText font_type="medium">Kata Sandi</AppText>
                  <Input
                    bg={bgSearch}
                    style={{ color: colorSearch, fontSize: 15 }}
                    h="50px"
                    w={{ base: '100%', md: '100%' }}
                    type={show ? 'text' : 'password'}
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="lock-outline" />}
                        size={5}
                        ml="2"
                        color="muted.400"
                      />
                    }
                    InputRightElement={
                      <Pressable
                        onPress={() => setShow(!show)}
                        onFocus={() =>
                          ChangeColorTextSearch('#1644db', '#ffff')
                        }
                        onBlur={() => ChangeColorTextSearch('#000', '#fff')}>
                        <Icon
                          as={
                            <MaterialIcons
                              name={show ? 'visibility' : 'visibility-off'}
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      </Pressable>
                    }
                    placeholder="Password"
                    onChangeText={ev => stateChange('password', ev)}
                    value={stateLogin.password}
                  />
                  <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                    <AppText
                      color="success"
                      font_type="medium"
                      onPress={() =>
                        StackNavigationProp.navigate(
                          'forgot_pass_1' as never,
                          { title: 'Lupa Password' } as never,
                        )
                      }>
                      Lupa kata sandi?
                    </AppText>
                  </TouchableOpacity>
                </VStack>

                {/* <FormControl.Label>   Password</FormControl.Label> */}

                <Box mt="5">
                  <Button
                    rounded="10"
                    h="50px"
                    bg={colors.buttonsubmitlpk}
                    borderColor={colors.teal100}
                    borderWidth={2}
                    onPress={GoLogin}>
                    <AppText size={16} color="white" font_type="medium">
                      {' '}
                      Masuk
                    </AppText>
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </VStack>
        </SafeAreaView>
      </NativeBaseProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#dad9db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  headerTittle: {
    color: '#1d64f2',
  },
  headerBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 230,
    width: '100%',
    position: 'absolute',
    borderBottomLeftRadius: 140,
    borderBottomRightRadius: 0,
  },
  bottomText: {
    fontWeight: '700',
    color: colors.success700,
  },
  contentLists: {
    fontSize: 14,
    marginBottom: 8,
    color: '#424242',
  },

  box_circle: {
    height: 250,
    width: '70%',
    backgroundColor: '#b2d3ff38',
    position: 'absolute',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    top: '-1%',
    left: '15%',
    zIndex: 99,
  },
  box_circle2: {
    // backgroundColor:'#4594ff52',
    height: 200,
    width: 200,
    position: 'absolute',
    borderRadius: 300,
    top: '80%',
    left: '26%',
    border: 'none',
    shadowColor: '#4594ff52',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  box_circle3: {
    height: 200,
    width: 200,
    // backgroundColor:'#b2d3ff38',
    backgroundColor: colors.transparant300,
    position: 'absolute',
    borderRadius: 200,
    top: deviceHeight / 2 - deviceHeight / 9,
    left: '75%',
    zIndex: 99,
  },
  box_circle4: {
    height: 180,
    width: 180,
    // backgroundColor:'#b2d3ff38',
    backgroundColor: colors.mint100,
    position: 'absolute',
    borderRadius: 200,
    top: deviceHeight / 2 + deviceHeight / 3 + 10,
    bottom: '10%',
    left: '-30%',
    zIndex: 99,
  },
  inputText: {
    color: '#dfecff',
    fontSize: 16,
  },
});

export default LoginScreen;
