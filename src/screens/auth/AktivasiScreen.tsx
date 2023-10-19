
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Box, Center, NativeBaseProvider, VStack, HStack, Button, 
   Image, ScrollView,Divider } from "native-base";
import IndicatorLoading from '@components/indicatorLoading';
import COLORS from '@config/colors';
import { AppText } from "../../components/Text";

var deviceHeight:any = Dimensions.get('window').height.toFixed();

function LastRegisterScreen(props:any){
  const navigation = useNavigation();  // check which routes is navigates
  
  const [animating, setAnimating] = useState(false);

  
    useEffect(()=>{
          console.log('State login Berubah')
    },[animating])

  
        return (
          <NativeBaseProvider>
            <ScrollView>
              
            <SafeAreaView style={styles.container}>
            
                {
                  animating && <IndicatorLoading animating={animating}/>
                }
                <VStack space={2} w='100%' mt={5}>
                  <Center>
                    <Image alt='image'
                      source={require('../../../assets/images/aktivasi.png')}
                      style={{width: '50%',resizeMode: 'contain',marginTop:'20%',}}
                    />
                  </Center>
                      <VStack ml={2}>
                        <Center>
                          <AppText style={{textAlign:'justify'}} font_type='bold' size={16}>
                          Aktivasi akun Anda
                          </AppText>
                          <AppText size={14} style={{textAlign:'justify'}}>
                          Terima kasih telah mendaftar! Silakan periksa
                          </AppText>
                          <AppText size={14}>email Anda dan konfirmasi alamat untuk</AppText>
                          <AppText size={14}> mengaktifkan akun. {'\n'}</AppText>
                        </Center>

                      <Button rounded="10" ml={3} mr={3}  h="50px" bg={COLORS.buttonsubmitlpk}  borderColor={COLORS.teal100} borderWidth={2} onPress={() => navigation.navigate('loginpage' as never)}> 
                              <HStack space={2} >
                                <AppText color='white' font_type="bold"> Kembali ke Beranda</AppText>
                                
                              </HStack>
                            </Button> 
                      
                      <Divider/>
                      </VStack>
                      

                
                
                {/* <Box w="100%"  minHeight="600" mt="50%" pt="5"  bg="#ffffff" roundedTopRight="35" roundedTopLeft="35" > */}
                <Box w="100%"  minHeight="600" roundedTopRight="35" roundedTopLeft="35" >
                    
                

                      
                      
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

export default LastRegisterScreen;