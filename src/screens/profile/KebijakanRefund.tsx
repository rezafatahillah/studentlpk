import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Box,
  NativeBaseProvider,
  VStack,
  HStack,
  Icon,
  Button,
  Checkbox,
  ScrollView,
  Hidden,
  IconButton,
  Divider,
  Link,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IndicatorLoading from '@components/indicatorLoading';
import COLORS from '@config/colors';
import {AppText} from '../../components/Text';
import Octicons from 'react-native-vector-icons/Octicons';

var deviceHeight: any = Dimensions.get('window').height.toFixed();

function KebijakanSertifikasi(props: any) {
  const RootnavigationProp = useNavigation<any>(); // check which routes is navigates

  const [checkbox, setCheckbox] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    console.log('State login Berubah');
  }, [animating]);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Hidden from="md">
            <HStack space="2" px="4" mt="4" mb="5" alignItems="center">
              <IconButton
                variant="unstyled"
                onPress={() => RootnavigationProp.goBack()}
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
              <AppText size={14} color="black" font_type="bold">
                Kebijakan Sertifikasi
              </AppText>
            </HStack>
          </Hidden>
          <Divider />
          {animating && <IndicatorLoading animating={animating} />}
          <VStack space={2} w="100%" mt={5}>
            <VStack space={3} m={4}>
              <AppText
                style={{textAlign: 'justify'}}
                font_type="semibold"
                size={14}
                mt={4}
                alignSelf="center">
                KEBIJAKAN RETURN & REFUND POLICY
              </AppText>
              <VStack ml={6}>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  Ketentuan mengenai pengembalian berikut berlaku untuk semua
                  layanan yang disediakan oleh RumahLPK.com.
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  Apabila Anda tidak sepenuhnya merasa puas dengan pembelian
                  Anda maka segera kembalikan, Sangat mudah! Anda dapat
                  mengembalikannya dengan bukti penjualan/pembelian kelas yang
                  asli. Kami akan dengan senang hati mengganti/mengembalikan
                  dana secara penuh atas pembelian/penjualan kelas Anda.
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  Terkait detail kelas yang dapat dikembalikan apabila terdapat
                  satu atau lebih kondisi sebagai berikut:
                </AppText>
                <VStack ml={6}>
                  <AppText style={{textAlign: 'justify'}} size={14}>
                    <Octicons name="dot-fill" /> Kelas pelatihan sudah tidak
                    aktif.
                  </AppText>
                  <AppText style={{textAlign: 'justify'}} size={14}>
                    <Octicons name="dot-fill" /> Kelas pelatihan tidak memiliki
                    jadwal.
                  </AppText>
                  <AppText style={{textAlign: 'justify'}} size={14}>
                    <Octicons name="dot-fill" /> Tidak sesuai dengan pesanan.
                  </AppText>
                  <AppText style={{textAlign: 'justify'}} size={14}>
                    <Octicons name="dot-fill" /> Kelas pelatihan tidak sesuai
                    deskripsi/judul.
                  </AppText>
                </VStack>

                <AppText style={{textAlign: 'justify'}} size={14}>
                  Apabila Anda masih memiliki kesulitan, dapat mengirim pesan
                  kepada kami pada media sosial kami di{' '}
                  <AppText font_type="bold">@rumah.lpk</AppText> atau melalui
                  pesan singkat via Whatsapp di nomor{' '}
                  <AppText font_type="bold">0811-1691-211 </AppText>.
                </AppText>
              </VStack>

              <Divider />
            </VStack>

            {/* <Box w="100%"  minHeight="600" mt="50%" pt="5"  bg="#ffffff" roundedTopRight="35" roundedTopLeft="35" > */}
          </VStack>
        </SafeAreaView>
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:COLORS.transparant500,
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
  bottomAppText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#7ef2fc',
    AppTextDecorationLine: 'underline',
    AppTextDecorationStyle: 'solid',
    AppTextDecorationColor: '#838587',
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
    backgroundColor: COLORS.transparant300,
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
    backgroundColor: COLORS.mint100,
    position: 'absolute',
    borderRadius: 200,
    top: deviceHeight / 2 + deviceHeight / 3 + 10,
    bottom: '10%',
    left: '-30%',
    zIndex: 99,
  },
  inputAppText: {
    color: '#dfecff',
    fontSize: 16,
  },
});

export default KebijakanSertifikasi;
