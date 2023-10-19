
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  Dimensions,
  View,
  Pressable,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Box, Center, NativeBaseProvider, VStack, HStack, Flex, Input, Icon, Button,FormControl, 
   Image,Checkbox,useToast, Radio, ScrollView } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import IndicatorLoading from '@components/indicatorLoading';
import { AppText } from "../../components/Text";
import { useAppDispatch } from '@redux/hooks'
import { setDataLogin } from '@redux/apps/LoginSlice'
import COLORS from '@config/colors';
import PATH from '@config/api'

var deviceHeight:any = Dimensions.get('window').height.toFixed();
var deviceWidth:any = Dimensions.get('window').width;


function RegisterScreen(props:any){
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [colorSearch, setColorSearch] = useState('#000');
  const [bgSearch, setBgSearch] = useState('#fff');
  const navigation = useNavigation(); 
  
  const [message, setMessage] = useState('');
  const [stateLogin, setStateLogin] = useState({username:'',password:''});
  const [firstName, setfirstName] = useState('');
  const [lastname, setLastName]  = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [checked, setChecked] = useState(true);
  const [animating, setAnimating] = useState(false);

  const [value, setValue] = useState('one');
  const dispatch = useAppDispatch();
  const toats = useToast();

    const handleCheckbox = () => {
      setChecked(!checked)
      console.log(checked);
      
    }
  

    const stateChange=(usr:any,ev:any)=>{
      setStateLogin(prev=>({
        ...prev,
        [usr]:ev
      }))
    }

    const GoLogin= async()=>{
      setAnimating(true);
      const dataParams = {
        "username" : stateLogin.username,//"admin@crudbooster.com",
        "password" : stateLogin.password,//"123456"
      };
      const res:any=await axios.post("https://dev2.wakita.id/api/auth", dataParams, {
              headers: {
                token:'asas'
              }
            })
        try {
          const respon=await res.data

          if(respon.success==true){
            console.log(respon.success)
            // console.log(respon.data.user)
            const reduxdata:any={
              isLogin: true,
              token:respon.data.auth.token,
              username: respon.data.user.email,
              name:respon.data.user.name,
              photo:respon.data.user.photo,
              email:respon.data.user.email,
            }
            dispatch(setDataLogin(reduxdata))
            setTimeout(()=>{
              // navigation.replace(respon.success==true ? 'BottomMenu' : 'Auth')
              setAnimating(false);
              setMessage('')
            },600)

          }else{
            // console.log('Username and Password not match ' + stateLogin.username + ' - '+stateLogin.password )
            toast.show({
              title: "Please Correct Username and Password",
              placement: "bottom"
            })
            setAnimating(false);
            setMessage('Username and Password not match')
          }
        } catch (error) {
          // console.log("ERROR RESPON : "+JSON.stringify(error))
          setMessage('ERROR RESPON')
          setAnimating(false);
        }

    }


  const ChangeColorAppTextSearch=(AppTextColor:any,bgColor:any)=>{
    setColorSearch(AppTextColor)
    setBgSearch(bgColor)
  }

  const Register = async() => {
    // let formData = new FormData();
    //   formData.append('firstname', firstName);
    //   formData.append('lastname', lastname);
    //   formData.append('name_oncertificate', firstName + lastname);
    //   formData.append('gender', value);
    //   formData.append('email', email);
    //   formData.append('password', regPassword);
    //   formData.append('password_confirm', passwordConfirm);
    //   formData.append('phone_number', phoneNumber);
    const data = {
      firstname: firstName,
      lastname: lastname,
      name_oncertificate: firstName + lastname,
      email: email,
      password: regPassword,
      password_confirmation: passwordConfirm,
      phone_number: phoneNumber,
    };
    // console.log('data',data)
      const headers = {
        "Content-Type": "application/json"
    };
      
    try {
      const response = await axios.post(PATH.baseapiurl + 'authentication/signup', data, { headers: headers });
      const jsonRes = response.data;
      navigation.navigate('syarat' as never);
      console.log(jsonRes);
    } catch (error: any) {
      toast.show({
        description: error.response.data.message
      })
      console.error(error);

    }
    
  }

    useEffect(()=>{
          console.log('State login Berubah')
    },[animating,checked])

  
        return (
          <NativeBaseProvider>
            <ScrollView>
              <SafeAreaView style={styles.container}>
                {
                  animating && <IndicatorLoading animating={animating}/>
                }
                <VStack space={2} w='100%' mt={20}>
                  

                      <VStack ml={2}>
                      <AppText size={24}>Daftar</AppText>
                      <HStack>
                      <HStack space={2} marginTop={2}>
                        <AppText size={14} color="#A0A4A8" >Sudah punya akun ?</AppText>
                        <AppText size={14} color="success">Masuk</AppText>
                      </HStack>
                      </HStack>
                      </VStack>
                      <Button variant='outline' marginTop={4} m={4} rounded="5" bg="#FFFFFF" borderColor="#C7C8CB"
                        borderWidth={1} onPress={() => GoLogin()}>
                        <HStack space={2} alignItems={'center'} >
                          <Image source={require('@assets/images/google.png')} alt="Google Logo" size={8} />
                          <AppText font_type='bold'>Lanjutkan dengan Google</AppText>
                        </HStack>
                      </Button>

                
                
                {/* <Box w="100%"  minHeight="600" mt="50%" pt="5"  bg="#ffffff" roundedTopRight="35" roundedTopLeft="35" > */}
                <Box w="100%"  minHeight="600" roundedTopRight="35" roundedTopLeft="35" >
                    
                      <Flex direction="row" justify="center" alignItems="center" mt="5">
                          <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, height: 1, backgroundColor: '#8dbdff66'}} />
                              <View>
                                <AppText style={{width: 200,color:'#000000',textAlign: 'center'}}>Atau masuk dengan</AppText>
                              </View>
                            <View style={{flex: 1, height: 1, backgroundColor: '#8dbdff66'}} />
                          </View>
                      </Flex>

                      <Box p="3" w="100%">
                        <VStack space={2}>
                          <AppText font_type='bold'>Nama Depan</AppText>
                          <Input bg={bgSearch} style={{color:colorSearch,fontSize:15}} h="50px"  w={{base: "100%",md: "100%"}} onChangeText={(txt: any ) => setfirstName(txt)} />

                          <AppText font_type='bold'>Nama Belakang</AppText>
                          <Input bg={bgSearch} style={{color:colorSearch,fontSize:15}} h="50px"  w={{base: "100%",md: "100%"}} onChangeText={(txt: any ) => setLastName(txt)} />
                          
                          <AppText font_type='bold'>Jenis Kelamin</AppText>
                          <Radio.Group
                            name="myRadioGroup"
                            value={value}
                            onChange={(nextValue) => {
                              setValue(nextValue);
                            }}
                          >
                            <HStack space={6}>
                            <Radio value="L" my="1">Laki-Laki</Radio>
                            <Radio value="P" my="1">Perempuan</Radio>
                            </HStack>
                          </Radio.Group>

                          <AppText font_type='bold'>Email</AppText>
                          <Input bg={bgSearch} style={{color:colorSearch,fontSize:15}} h="50px"  w={{base: "100%",md: "100%"}} onChangeText={(txt: any) => setEmail(txt)} />
                        
                          <AppText font_type='bold'>Kata Sandi</AppText>
                          <Input 
                            bg={bgSearch} style={{color:colorSearch,fontSize:15}} 
                            h="50px" w={{base: "100%",md: "100%"}} 
                            type={show ? "text" : "password"}
                            InputRightElement={<Pressable onPress={() => setShow(!show)}
                                                          onFocus={ () => ChangeColorAppTextSearch('#1644db','#ffff') }
                                                          onBlur={ () => ChangeColorAppTextSearch('#000','#fff') }>
                                                          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                                </Pressable>} 
                            onChangeText={(txt: any) => setRegPassword(txt)} 
                          />

                          <AppText font_type='bold'>Konfirmasi Kata Sandi</AppText>
                          <Input 
                            bg={bgSearch} style={{color:colorSearch,fontSize:15}} 
                            h="50px" w={{base: "100%",md: "100%"}} 
                            type={show ? "text" : "password"} 
                            InputRightElement={<Pressable onPress={() => setShow(!show)}
                                                          onFocus={ () => ChangeColorAppTextSearch('#1644db','#ffff') }
                                                          onBlur={ () => ChangeColorAppTextSearch('#000','#fff') }>
                                                          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                                                </Pressable>} 
                            onChangeText={(txt: any ) => setPasswordConfirm(txt)} 
                          />

                          <AppText font_type='bold'>Nomor Telepon</AppText>
                            <Input keyboardType={'number-pad'} bg={bgSearch} style={{color:colorSearch,fontSize:15}} h="50px"  w={{base: "100%",md: "100%"}} onChangeText={(txt: any ) => setPhoneNumber(txt)}/>
                          
                          <HStack mt={5} ml={1}>
                            <Checkbox value={checked ? 'false' : 'true'} onChange={handleCheckbox} accessibilityLabel="This is a dummy checkbox" />
                            <AppText> Ya! Saya ingin menerima email yang berisi penawaran eksklusif, rekomendasi pribadi, dan tips pembelajaran!</AppText>
                          </HStack>
                        </VStack>

                         
                        
                        <Box mt="5">
                          {checked === true ?  
                               <Button rounded="10"  h="50px" bg={COLORS.buttonsubmitlpk}  borderColor={COLORS.teal100} borderWidth={2} isDisabled> 
                               <HStack space={2} >
                                 <AppText color='white' font_type="bold"> Register</AppText>
                                 
                               </HStack>
                             </Button> :
                               <Button rounded="10"  h="50px" bg={COLORS.buttonsubmitlpk}  borderColor={COLORS.teal100} borderWidth={2}  onPress={Register}> 
                               <HStack space={2} >
                                 <AppText color='white' font_type="bold"> Register</AppText>
                                 
                               </HStack>
                             </Button>
                              }
                        </Box>
                        
                        <Center mt={4}>
                          <AppText>Dengan mendaftar, saya menyetujui</AppText>
                          <HStack>
                            <TouchableOpacity onPress={() => navigation.navigate('syarat' as never)}>
                              <AppText color='success'>Syarat dan Ketentuan</AppText>
                            </TouchableOpacity>
                              <AppText> serta </AppText>
                              <AppText color='success'>Kebijakan Privasi</AppText>
                          </HStack>
                        </Center>
                        
                      </Box>
                      
                  </Box>
                </VStack>

              </SafeAreaView>
            </ScrollView>
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
      bottomAppText:{
        fontSize:16,
        marginBottom:8,
        color:'#7ef2fc',
        AppTextDecorationLine: "underline",
        AppTextDecorationStyle: "solid",
        AppTextDecorationColor: "#838587"
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
      inputAppText:{
        color:'#dfecff',
        fontSize:16,
      }
    });

export default RegisterScreen;