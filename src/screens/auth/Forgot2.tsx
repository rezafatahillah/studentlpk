
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Text, Box, Center, NativeBaseProvider, VStack, Input, Button, FormControl, useToast, HStack } from "native-base";
import axios from 'axios';
import IndicatorLoading from '@components/indicatorLoading'
import COLORS from '@config/colors';
import PATH from 'config/api';
import { OTP } from 'types/IResetPassword';


var deviceHeight: any = Dimensions.get('window').height.toFixed();
var deviceWidth: any = Dimensions.get('window').width;

const Forgot2 = (props: any) => {
  return (
    // <View style={{ flex: 1 }}>
    <Content />
  );
};

function Content(props: any) {// check which routes is navigates
  const navigation = useNavigation(); // check which routes is navigates
  const [message, setMessage] = React.useState('');
  const [animating, setAnimating] = useState(false);
  const toast = useToast();
  const route = useRoute();
  const email = route.params;
  const [mail, setMail] = useState(email.email);
  const [otp, setOtp] = useState('');
  const [key, setKey] = useState('');



  useEffect(() => {
    // console.log('State login Berubah')
  }, [animating])

  useEffect(() => {
    console.log("key updated:", key);
  }, [key]);

  if (key !== '') {
    navigation.navigate('forgot_pass_3', { mail, key })
  } else {
    console.log("ok");

  }

  const handleOTP = async () => {
    const param: OTP = {
      email: mail,
      otp: otp,
    }
    // console.log("otp param",param)
    const baseURL = PATH.baseapiurl + 'authentication/forgot-password/submit-token';
    try {

      const response = await axios.put(baseURL, param);
      toast.show({
        description: response.data.message
      })
      setKey(response.data.data.key);

      console.log("em", mail);
      console.log("F2", response.data.data.key);
      console.log("key", key);



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
        <VStack space={2} w='100%'>


          <VStack marginTop={40} ml={4}>
            <Center>
              <Text style={{ fontSize: 22, color: COLORS.textblack }}>Masukan Kode Verifikasi</Text>
              <Text style={{ color: COLORS.textgray }}>Kode Verifikasi telah dikirim melalui e-mail ke a*************@g****.com.</Text>
            </Center>
          </VStack>

          <Box w="100%" minHeight="600" pt="5" roundedTopRight="35" roundedTopLeft="35" >

            <Box p="3" w="100%">
              <FormControl w="100%" maxW="100%" isRequired>
                <VStack space={2} justifyContent="center">
                  <Input variant="underlined" keyboardType={'number-pad'} fontSize={40} textAlign='center' value={otp} onChangeText={(txt) => setOtp(txt)} />

                </VStack>

              </FormControl>

              <Center pt="1">
                {
                  message ? <Text style={{ color: COLORS.danger500, padding: 6, borderRadius: 10 }}>Your Username & Password not Match !</Text> : ''
                }

              </Center>

              <Button rounded="10" h="50px" bg={COLORS.buttonsubmitlpk} borderColor={COLORS.teal100} borderWidth={2} onPress={handleOTP}>
                <HStack space={2} >
                  <Text color={COLORS.textbuttonsubmitlpk} fontWeight="700" > Lanjut</Text>
                  {/* <MaterialCommunityIcons name="chevron-right" style={{color:COLORS.black300}} size={22} /> */}
                </HStack>
              </Button>
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

export default Forgot2;