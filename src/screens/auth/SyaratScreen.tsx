
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { 
  Box, NativeBaseProvider, VStack, HStack, Icon, Button, 
  Checkbox, ScrollView, Hidden, IconButton, Divider } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IndicatorLoading from '@components/indicatorLoading';
import COLORS from '@config/colors';
import { AppText } from "../../components/Text";

var deviceHeight:any = Dimensions.get('window').height.toFixed();

function SyaratScreen(props:any){
  const RootnavigationProp = useNavigation<any>();  // check which routes is navigates
  
  const [checkbox, setCheckbox] = useState(false);
  const [animating, setAnimating] = useState(false);



    useEffect(()=>{
          console.log('State login Berubah')
    },[animating])

  
        return (
          <NativeBaseProvider>
            <ScrollView>
              
            <SafeAreaView style={styles.container}>
            <Hidden from="md">
                <HStack space="2" px="4" mt="4" mb="5" alignItems="center">
                  <IconButton
                    variant="unstyled"
                    onPress={() => RootnavigationProp.navigate('LoginUser')}
                    icon={
                      <Icon
                      alignItems="center"
                      justifyContent="center"
                      size="6"
                      as={MaterialIcons}
                      name="arrow-back"
                      color={COLORS.black300}
                    />
                    }
                  />
                  <AppText size={14} color='black' font_type='bold'>
                    Syarat Ketentuan
                  </AppText>
                </HStack>
              </Hidden>
              <Divider/>
                {
                  animating && <IndicatorLoading animating={animating}/>
                }
                <VStack space={2} w='100%' mt={5}>
                  

                      <VStack space={3} m={4}>
                      <AppText style={{textAlign:'justify'}} size={14}>
                        Selamat datang di www.Online.geti.id.
                      </AppText>
                      <AppText style={{textAlign:'justify'}} size={14}>
                        Syarat & ketentuan yang ditetapkan di bawah ini mengatur pemakaian jasa yang ditawarkan oleh PT. ChandoHimalaya terkait penggunaan situs www.Online.geti.id. Pengguna disarankan membaca dengan seksama karena dapat berdampak kepada hak dan kewajiban Pengguna di bawah hukum.
                      </AppText>
                      <AppText style={{textAlign:'justify'}} size={14}>
                        Dengan mendaftar dan/atau menggunakan situs www.Online.geti.id, maka pengguna dianggap telah membaca, mengerti, memahami dan menyetujui semua isi dalam Syarat & ketentuan. Syarat & ketentuan ini merupakan bentuk kesepakatan yang dituangkan dalam sebuah perjanjian yang sah antara Pengguna dengan PT. GeTI. Jika pengguna tidak menyetujui salah satu, pesebagian, atau seluruh isi Syarat & ketentuan, maka pengguna tidak diperkenankan menggunakan layanan di www.Online.geti.id.{'\n'}
                      </AppText>
                      <AppText size={14}>
                        PENGGUNAAN LAYANAN DAN JASA {'\n'}
                      </AppText>
                      
                      <Divider/>
                      </VStack>
                      

                
                
                {/* <Box w="100%"  minHeight="600" mt="50%" pt="5"  bg="#ffffff" roundedTopRight="35" roundedTopLeft="35" > */}
                <Box w="100%"  minHeight="600" roundedTopRight="35" roundedTopLeft="35" >
                    
                <HStack mt={5} m={4}>
                            <Checkbox value="true" accessibilityLabel="This is a dummy checkbox" onChange={() => {setCheckbox(true)}} />
                            <AppText size={14}> Membuat akun berarti Anda setuju dengan Syarat dan Ketentuan serta Kebijakan Privasi kami.</AppText>
                          </HStack>

                          <Box mt="5">
                            {
                              checkbox === false ? <Button rounded="10"  h="50px" bg={COLORS.bgGrey100}  borderColor={COLORS.bgGrey100} borderWidth={2} > 
                              <HStack space={2} >
                                <AppText color='black' font_type="bold"> Setuju</AppText>
                                
                              </HStack>
                            </Button> : <Button rounded="10" ml={3} mr={3}  h="50px" bg={COLORS.buttonsubmitlpk}  borderColor={COLORS.teal100} borderWidth={2} > 
                              <HStack space={2} >
                                <TouchableOpacity onPress={() => RootnavigationProp.navigate('Aktivasi')}>
                                <AppText color='white' font_type="bold"> Setuju</AppText>
                                </TouchableOpacity>
                               
                                
                              </HStack>
                            </Button> 
                            
                            }
                             
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

export default SyaratScreen;