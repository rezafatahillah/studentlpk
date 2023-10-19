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

function KebijakanPrivasiScreen(props: any) {
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
                Kebijakan Privasi
              </AppText>
            </HStack>
          </Hidden>
          <Divider />
          {animating && <IndicatorLoading animating={animating} />}
          <VStack space={2} w="100%" mt={5}>
            <VStack space={3} m={4}>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Adanya Kebijakan Privasi ini adalah komitmen nyata dari
                RumahLPK.com untuk menghargai dan melindungi setiap informasi
                pribadi Pengguna situs RumahLPK.com ini. Kebijakan ini menjadi
                acuan yang mengatur dan melindungi penggunaan data dan informasi
                penting para pengguna situs RumahLPK.com, yang telah dikumpulkan
                pada saat mendaftar, mengakses dan menggunakan layanan disini,
                seperti alamat email, nomor telepon, foto, gambar, dan
                lain-lain.
              </AppText>

              <AppText
                style={{textAlign: 'justify'}}
                font_type="semibold"
                size={14}
                mt={4}>
                Kebijakan Privasi Kami
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Seluruh informasi pribadi yang Anda berikan kepada RumahLPK.com
                hanya akan digunakan dan dilindungi oleh RumahLPK.com. Setiap
                informasi yang Anda berikan terbatas untuk tujuan proses yang
                berkaitan dengan RumahLPK.com dan tanpa tujuan lainnya.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami dapat mengubah Kebijakan Privasi ini dari waktu ke waktu
                dengan melakukan pengurangan ataupun penambahan ketentuan pada
                halaman ini. Perubahan terhadap kebijakan ini akan diumumkan
                melalui situs RumahLPK.com atau melalui alamat dari media lain
                yang Anda berikan kepada kami. Anda dianjurkan untuk membaca
                Kebijakan Privasi ini secara berkala agar mengetahui
                perubahan-perubahan terbaru.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami sangat memperhatikan betul keamanan dan privasi pelanggan
                kami, dan kami hanya akan mengumpulkan informasi pribadi Anda
                yang hanya kami perlukan untuk kepentingan internal kami saja.
                Perlindungan data dan informasi pelanggan merupakan privasi yang
                harus kami jaga penuh untuk menjaga kepercayaan Anda terhadap
                kami.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami hanya akan menggunakan data dan informasi Anda sebagaimana
                yang dinyatakan dalam Kebijakan Privasi berikut. Kami hanya akan
                mengumpulkan dan menggunakan informasi yang berhubungan dengan
                transaksi kami dengan Anda.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                RumahLPK.com tidak bertanggung jawab atas pertukaran data yang
                dilakukan sendiri di antara pengguna situs.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami hanya akan menyimpan informasi privasi Anda sepanjang kami
                diwajibkan oleh hukum atau selama informasi tersebut masih
                berhubungan dengan tujuan awal pengumpulan informasi tersebut.
              </AppText>

              <AppText
                style={{textAlign: 'justify'}}
                font_type="semibold"
                size={14}
                mt={4}>
                Pengumpulan Informasi Pribadi
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami tidak menjual, membagi atau memperjualbelikan informasi
                pribadi pelanggan yang dikumpulkan secara online melalui ataupun
                kepada pihak ketiga.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Informasi pribadi yang dikumpulkan secara online akan dibagi di
                dalam perusahaan hanya untuk kepentingan internal kami, ketika
                Anda membuat akun di web kami, informasi pribadi yang kami
                kumpulkan termasuk:
              </AppText>
              <VStack ml={6}>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> Nama
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> Alamat Surat Elektronik / Email
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> Telepon dan atau kontak lainnya
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> Alamat Pengiriman
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> Nomor Rekening
                </AppText>
              </VStack>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Informasi yang akan kami kumpulkan dari Anda akan digunakan
                untuk hal-hal seperti:
              </AppText>
              <VStack ml={6}>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> mengirimkan sertifikat LPK kepada para
                  peserta pelatihan.
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> menginformasikan kepada Anda tentang
                  pembelian/penjualan kelas dan bantuan oleh customer service
                  kami
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> memberikan informasi kelas pelatihan
                  yang relevan kepada Anda
                </AppText>
              </VStack>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami akan menggunakan informasi yang Anda berikan untuk
                memverifikasi dan menjalankan transaksi finansial yang
                berhubungan dengan pembayaran online yang telah Anda lakukan,
                mengidentifikasi pengunjung dalam situs kami, menjalankan
                penelitian demografis pengguna kami, mengirimkan informasi,
                mengirimkan informasi yang kami anggap penting bagi Anda atau
                informasi yang telah Anda minta dari kami, seperti informasi
                tentang produk dan layanan kami, apabila Anda telah menyatakan
                bahwa Anda tidak keberatan menerima informasi-informasi seperti
                ini.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami hanya dapat memberikan nama dan alamat Anda kepada pihak
                ketiga untuk tujuan pengiriman sertifikat kepada Anda yaitu
                kepada kurir/ekspedisi guna pengiriman.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Pembayaran yang Anda buat melalui situs akan diproses oleh kami
                secara langsung. Anda hanya boleh memberikan informasi
                pembayaran kepada kami atas informasi yang akurat dan tidak
                menyesatkan dan Anda harus memberitahukan informasi dan
                perubahan-perubahan terbaru pada kami.
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Rincian pesanan Anda akan kami simpan dan kami dapat
                mengaksesnya secara langsung. Anda juga dapat mengakses
                informasi ini dengan masuk ke dalam akun website RumahLPK.com
                Anda. Di sana Anda dapat melihat rincian dari
                pembelian/penjualan kelas yang telah dilakukan,
                pembelian/penjualan kelas yang masih terbuka dan sertifikat LPK
                yang segera akan dikirimkan dan mendaftarkan rincian alamat dan
                nama peserta pelatihan. Anda harus memperlakukan akses data
                personal ini secara rahasia dan tidak memberikannya kepada pihak
                ketiga yang tidak sah. Kami tidak bertanggung jawab atas
                penyalahgunaan password kecuali penyalahgunaan ini adalah
                kesalahan kami.
              </AppText>
              <VStack ml={6}>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> melakukan konfirmasi pembayaran dari
                  Anda dan atau pengembalian pembayaran
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> melakukan konfirmasi pembayaran dari
                  Anda dan atau pengembalian pembayaran
                </AppText>
                <AppText style={{textAlign: 'justify'}} size={14}>
                  <Octicons name="dot" /> melakukan konfirmasi pembayaran dari
                  Anda dan atau pengembalian pembayaran
                </AppText>
              </VStack>

              <AppText
                style={{textAlign: 'justify'}}
                font_type="semibold"
                size={14}
                mt={4}>
                Perubahan pada Kebijakan Privasi
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Kami memiliki hak untuk mengganti dan mengubah Pernyataan
                Privasi pada waktu kapan saja. Semua perubahan kebijakan akan
                diumumkan di situs kami.
              </AppText>

              <AppText
                style={{textAlign: 'justify'}}
                font_type="semibold"
                size={14}
                mt={4}>
                Pengaduan Pelanggaran Privasi
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Bila Anda merasa tidak puas dengan bagaimana kami menangani
                keluhan atau aduan Anda, jangan ragu-ragu untuk menghubungi kami
                melalui Whatsapp di{' '}
                <AppText font_type="bold"> 0811-1691-211</AppText>
              </AppText>

              <AppText
                style={{textAlign: 'justify'}}
                font_type="semibold"
                size={14}
                mt={4}>
                Hak RumahLPK.com
              </AppText>
              <AppText style={{textAlign: 'justify'}} size={14}>
                Anda memahami dan menyetujui bahwa RumahLPK.com memiliki hak
                untuk mengungkapkan informasi pribadi Anda pada setiap hukum,
                peraturan, pemerintahan, pajak, penegak hukum atau pemerintah
                atau pemilik hak terkait, jika RumahLPK.com memiliki alasan
                wajar yang dapat dipercaya bahwa pengungkapan informasi pribadi
                Anda diperlukan untuk kewajiban apapun, sebagai persyaratan atau
                pengaturan, baik sukarela atau wajib sebagai akibat dari
                pesanan, pemeriksaan dan atau permintaan pihak terkait. Sejauh
                diizinkan oleh hukum yang berlaku, dalam hal ini Anda setuju
                untuk tidak melakukan tuntutan apapun terhadap RumahLPK.com
                untuk pengungkapkan informasi pribadi Anda.
              </AppText>

              <Divider />
            </VStack>

            {/* <Box w="100%"  minHeight="600" mt="50%" pt="5"  bg="#ffffff" roundedTopRight="35" roundedTopLeft="35" > */}
            <Box
              w="100%"
              minHeight="600"
              roundedTopRight="35"
              roundedTopLeft="35">
              <HStack mt={5} m={4}>
                <Checkbox
                  value="true"
                  accessibilityLabel="This is a dummy checkbox"
                  onChange={() => {
                    setCheckbox(true);
                  }}
                />
                <AppText size={14}>
                  {' '}
                  Membuat akun berarti Anda setuju dengan Syarat dan Ketentuan
                  serta Kebijakan Privasi kami.
                </AppText>
              </HStack>

              <Box mt="5">
                {checkbox === false ? (
                  <Button
                    rounded="10"
                    h="50px"
                    bg={COLORS.bgGrey100}
                    borderColor={COLORS.bgGrey100}
                    borderWidth={2}>
                    <HStack space={2}>
                      <AppText color="black" font_type="bold">
                        {' '}
                        Setuju
                      </AppText>
                    </HStack>
                  </Button>
                ) : (
                  <Button
                    rounded="10"
                    ml={3}
                    mr={3}
                    h="50px"
                    bg={COLORS.buttonsubmitlpk}
                    borderColor={COLORS.teal100}
                    borderWidth={2}>
                    <HStack space={2}>
                      <TouchableOpacity
                        onPress={() => RootnavigationProp.navigate('Aktivasi')}>
                        <AppText color="white" font_type="bold">
                          {' '}
                          Setuju
                        </AppText>
                      </TouchableOpacity>
                    </HStack>
                  </Button>
                )}
              </Box>
            </Box>
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

export default KebijakanPrivasiScreen;
