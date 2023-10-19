
import React,{useEffect,useState}  from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Text,useColorModeValue,Box,IconButton, Alert, Center, NativeBaseProvider,VStack ,Collapse,HStack ,Flex,Icon,Button,FormControl,useToast } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import IndicatorLoading from '@components/indicatorLoading'

import { useAppSelector, useAppDispatch } from '@redux/hooks'
import COLORS from '@config/colors';
import FloatingLabelInput from '@components/FloatingLabelInput';
import { ResetPassword } from 'types/IResetPassword';
import PATH from 'config/api';
var deviceHeight:any = Dimensions.get('window').height.toFixed();
var deviceWidth:any = Dimensions.get('window').width;


const Forgot3 = (props:any) => {
  return (
    // <View style={{ flex: 1 }}>
      <Content/>
  );
};

function Content(props:any){
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const [colorSearch, setColorSearch] = React.useState('#000');
  const [bgSearch, setBgSearch] = React.useState('#fff');
  const navigation = useNavigation();
  const [message, setMessage] = React.useState('');
  const [stateLogin, setStateLogin] = React.useState({username:'',password:''});
  const [animating, setAnimating] = useState(false);
  const dispatch = useAppDispatch();
  const [showPass, setShowPass] = React.useState(false);
  const [shown, setShown] = React.useState(true);
  const route = useRoute();
  const { mail, key } = route.params;
  const [email, setEmail] = useState(mail);
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [keys, setKeys] = useState(key);
  
  // console.log(key);
  
    useEffect(()=>{
          console.log('State login Berubah')
    },[animating])

  const handleChangePassword = async() => {
    const param : ResetPassword = {
      email: email,
      key: key,
      password: pass,
      password_confirm: passConfirm,
    }
    console.log("otp param",param)
    const baseURL = PATH.baseapiurl + 'authentication/forgot-password/change-password' ;
    try {
    
      const response = await axios.put(baseURL, param);
      toast.show({
        description: response.data.message
      })

      console.log(response);
      navigation.navigate('loginpage' as never)
      
    } catch (error:any) {
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
                animating && <IndicatorLoading animating={animating}/>
              }
            <Flex direction="row" mb="2" mt="-3">
              <VStack space={2}  w='100%'>
                <Center pt="1">
                          {
                            message?<Collapse isOpen={shown} ml={3}>
                            <Alert background='black' width="385" status="error">
                                <HStack flexShrink={1} space={150} alignItems="center" justifyContent="space-between">
                                    
                                    <Text color={COLORS.textbuttonsubmitlpk}>
                                      Kata Sandi Berhasil Diganti 
                                    </Text>
                                  <TouchableOpacity onPress={() => setShow(false)}>
                                  <Text color={COLORS.textbuttonsubmitlpk}>Oke</Text>
                                  </TouchableOpacity>
                                  
                                </HStack>
                                
                            </Alert>
                          </Collapse>:''
                          }
                          
                      </Center>

                    <VStack ml={4} mt={20}>
                
                      <Text style={{fontSize:22,color:COLORS.textblack}}>
                        Kata Sandi Baru
                      </Text>
                      <Text style={{color:COLORS.textgray}}>
                        Buat kata sandi yang kuat untuk akun dengan e-mail {email}
                      </Text>
          
                      
                    </VStack>
              
              <Box w="100%"  minHeight="600" mt="5%" pt="5" roundedTopRight="35" roundedTopLeft="35" >

                    <Box p="3" w="100%">
                      <FormControl w="100%" maxW="100%" isRequired>
                      <VStack space={2}>
                        <Text>Kata Sandi Baru</Text>
                        <FloatingLabelInput
                            isRequired
                            type={showPass ? '' : 'password'}
                            label=""
                            borderRadius="4"
                            labelColor="#9ca3af"
                            labelBGColor={useColorModeValue('#fff', '#1f2937')}
                            defaultValue={pass}
                            onChangeText={(txt: any) => setPass(txt)}
                            InputRightElement={
                              <IconButton
                                variant="unstyled"
                                icon={
                                  <Icon
                                    size="4"
                                    color="coolGray.400"
                                    as={MaterialIcons}
                                    name={showPass ? 'visibility' : 'visibility-off'}
                                  />
                                }
                                onPress={() => {
                                  setShowPass(true);
                                }}
                              />
                            }
                            _text={{
                              fontSize: 'sm',
                              fontWeight: 'medium',
                            }}
                            _dark={{
                              borderColor: 'coolGray.700',
                            }}
                            _light={{
                              borderColor: 'coolGray.300',
                            }}
                          />
                          <Text>Konfirmasi Kata Sandi</Text>
                        <FloatingLabelInput
                            isRequired
                            type={showPass ? '' : 'password'}
                            label=""
                            borderRadius="4"
                            labelColor="#9ca3af"
                            labelBGColor={useColorModeValue('#fff', '#1f2937')}
                            defaultValue={passConfirm}
                            onChangeText={(txt: any) => setPassConfirm(txt)}
                            InputRightElement={
                              <IconButton
                                variant="unstyled"
                                icon={
                                  <Icon
                                    size="4"
                                    color="coolGray.400"
                                    as={MaterialIcons}
                                    name={showPass ? 'visibility' : 'visibility-off'}
                                  />
                                }
                                onPress={() => {
                                  setShowPass(true);
                                }}
                              />
                            }
                            _text={{
                              fontSize: 'sm',
                              fontWeight: 'medium',
                            }}
                            _dark={{
                              borderColor: 'coolGray.700',
                            }}
                            _light={{
                              borderColor: 'coolGray.300',
                            }}
                          />
                        
                      </VStack>

                      <Box mt="5" ml={1} mr={1} mb={1}>
                        <Box rounded="10"  h="50px" bg={'#EDEDED'}  borderColor={'#EDEDED'} borderWidth={2}>
                        <Text color={'grey'}>Setelah kata sandi diubah, silahkan masuk kembali dengan kata sandi baru.</Text>
                        </Box>
                      </Box>
                      
                      <Box mt="5">
                            <Button rounded="10"  h="50px" bg={COLORS.buttonsubmitlpk}  borderColor={COLORS.teal100} borderWidth={2} onPress={handleChangePassword}> 
                              <HStack space={2} >
                                <Text color={COLORS.textbuttonsubmitlpk} fontWeight="700"> Ganti kata sandi</Text>
                                
                              </HStack>
                            </Button>
                      </Box>
                      </FormControl>

                      
                      
                      
                    </Box>
                    
                </Box>
              </VStack>
            </Flex>

            </SafeAreaView>
          </NativeBaseProvider>
        );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // backgroundColor:COLORS.transparant500,
        backgroundColor:'#ffffff'
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
        color:'black'
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
      headerTittle: {
        color:'#1d64f2'
      },
      headerBox: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height:230,
        width:'100%',
        position:'absolute',
        borderBottomLeftRadius:140,
        borderBottomRightRadius:0,
      },
      bottomText:{
        fontSize:16,
        marginBottom:8,
        color:'#7ef2fc',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#838587"
      },
      contentLists:{
        fontSize:14,
        marginBottom:8,
        color:'#424242'
      },

      box_circle: {
        height:250,width:'70%',
        backgroundColor:'#b2d3ff38',
        position:'absolute',
        borderBottomLeftRadius:45,
        borderBottomRightRadius:45,
        top:'-1%',
        left:'15%',
        zIndex:99
      },
      box_circle2: {
        // backgroundColor:'#4594ff52',
        height:200,width:200,
        position:'absolute',
        borderRadius:300,
        top:'80%',
        left:'26%',
        border:'none',
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
        height:200,width:200,
        // backgroundColor:'#b2d3ff38',
        backgroundColor:COLORS.transparant300,
        position:'absolute',
        borderRadius:200,
        top:(deviceHeight/2)-(deviceHeight/9),
        left:'75%',
        zIndex:99
      },
      box_circle4: {
        height:180,width:180,
        // backgroundColor:'#b2d3ff38',
        backgroundColor:COLORS.mint100,
        position:'absolute',
        borderRadius:200,
        top:(deviceHeight/2)+(deviceHeight/3)+10,
        bottom:'10%',
        left:'-30%',
        zIndex:99
      },
      inputText:{
        color:'#dfecff',
        fontSize:16,
      }
    });

export default Forgot3;