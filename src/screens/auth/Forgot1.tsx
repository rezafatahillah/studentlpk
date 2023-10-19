
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@itype/RouteType';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Text, Box, Center, NativeBaseProvider, VStack, HStack, Input, Icon, Button, FormControl, useToast } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IndicatorLoading from '@components/indicatorLoading'

// import HomeScreenNavigation that check fro routes in homescreen
import COLORS from '@config/colors';
import { Email } from 'types/IResetPassword';
import PATH from 'config/api';
import axios from 'axios';
// Get device height and width
var deviceHeight: any = Dimensions.get('window').height.toFixed();
var deviceWidth: any = Dimensions.get('window').width;

const Forgot1 = (props: any) => {
  return (
    // <View style={{ flex: 1 }}>

    <Content />
  );
};

function Content(props: any) {
  const [colorSearch, setColorSearch] = React.useState('#000');
  const [bgSearch, setBgSearch] = React.useState('#fff');// check which routes is navigates
  const navigationStack = useNavigation<StackNavigation>();
  // const navigation = useNavigation(); // check which routes is navigates
  const toast = useToast();
  const [message, setMessage] = React.useState('');
  const [stateLogin, setStateLogin] = React.useState({ username: '', password: '' });
  const [animating, setAnimating] = useState(false);
  const [email, setEmail] = useState('');

  const stateChange = (usr: any, ev: any) => {
    setStateLogin(prev => ({
      ...prev,
      [usr]: ev
    }))
  }

  useEffect(() => {
    // console.log('State login Berubah')
  }, [animating])

  const handleEmail = async () => {
    const param: Email = {
      email: email,
    }
    const baseURL = PATH.baseapiurl + 'authentication/forgot-password/request-token';
    try {

      const response = await axios.post(baseURL, param);
      toast.show({
        description: response.data.message
      })

      console.log("reza", email)

      // console.log("F", response);
      // navigation.navigate('forgot_pass_2', { email })
      // navigationStack.navigate('forgot_pass_2', { screen: 'DetailProduct', params: { snap_token: response } } as never)
      navigationStack.navigate('forgot2');


    } catch (error: any) {
      toast.show({
        description: error.response.data.message
      })
      console.error(error);
    }
  }
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        {
          animating && <IndicatorLoading animating={animating} />
        }

        <VStack w='100%'>
          <VStack marginTop={40} ml={4}>
            <Text style={{ fontSize: 22, color: COLORS.textblack }}>Atur ulang kata sandi</Text>
            <Text style={{ color: COLORS.textgray }}>Masukkan e-mail yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang kata sandi.</Text>

          </VStack>



          <Box w="100%" minHeight="600" pt="5" roundedTopRight="35" roundedTopLeft="35" >

            <Box p="3" w="100%">
              <FormControl w="100%" maxW="100%" isRequired>
                <VStack space={2}>
                  <Text>Email</Text>
                  <Input bg={bgSearch} style={{ color: colorSearch, fontSize: 15 }} h="50px" w={{ base: "100%", md: "100%" }} InputLeftElement={<Icon as={<MaterialIcons name="mail" />} size={5} ml="2" color="muted.400" />} placeholder="Enter Email Address"
                    value={email} onChangeText={(ev) => setEmail(ev)} />

                </VStack>

                <Box mt="5">
                  <Button rounded="10" h="50px" bg={COLORS.buttonsubmitlpk} borderColor={COLORS.teal100} borderWidth={2} onPress={handleEmail}>
                    <HStack space={2} >
                      <Text color={COLORS.textbuttonsubmitlpk} fontWeight="700" > Lanjut</Text>
                      {/* <MaterialCommunityIcons name="chevron-right" style={{color:COLORS.black300}} size={22} /> */}
                    </HStack>
                  </Button>
                </Box>
              </FormControl>

              <Center pt="1">
                {
                  message ? <Text style={{ color: COLORS.danger500, padding: 6, borderRadius: 10 }}>Your Username & Password not Match !</Text> : ''
                }

              </Center>


            </Box>

          </Box>
        </VStack>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:COLORS.transparant500,
    backgroundColor: '#ffffff'
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
    color: 'black'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  headerTittle: {
    color: '#1d64f2'
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
    fontSize: 16,
    marginBottom: 8,
    color: '#7ef2fc',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#838587"
  },
  contentLists: {
    fontSize: 14,
    marginBottom: 8,
    color: '#424242'
  },

  box_circle: {
    height: 250, width: '70%',
    backgroundColor: '#b2d3ff38',
    position: 'absolute',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    top: '-1%',
    left: '15%',
    zIndex: 99
  },
  box_circle2: {
    // backgroundColor:'#4594ff52',
    height: 200, width: 200,
    position: 'absolute',
    borderRadius: 300,
    top: '80%',
    left: '26%',
    border: 'none',
    shadowColor: "#4594ff52",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  box_circle3: {
    height: 200, width: 200,
    // backgroundColor:'#b2d3ff38',
    backgroundColor: COLORS.transparant300,
    position: 'absolute',
    borderRadius: 200,
    top: (deviceHeight / 2) - (deviceHeight / 9),
    left: '75%',
    zIndex: 99
  },
  box_circle4: {
    height: 180, width: 180,
    // backgroundColor:'#b2d3ff38',
    backgroundColor: COLORS.mint100,
    position: 'absolute',
    borderRadius: 200,
    top: (deviceHeight / 2) + (deviceHeight / 3) + 10,
    bottom: '10%',
    left: '-30%',
    zIndex: 99
  },
  inputText: {
    color: '#dfecff',
    fontSize: 16,
  }
});

export default Forgot1;