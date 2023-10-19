import {
  ScrollView,
  HStack,
  Box,
  Badge,
  Stack,
  Divider,
  Card,
  VStack,
  Image,
  FlatList,
  Button,
  View,
  AspectRatio,
} from 'native-base';
import React from 'react';
import {Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppText} from '../../components/Text';
import {useNavigation, useRoute} from '@react-navigation/native';
import {toCurrency} from 'config/tools';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StackNavigation} from 'types/RouteType';
import colors from 'config/colors';
import PATH from 'config/api';

var deviceWidth: any = Dimensions.get('window').width;

function InstructurePageDetail() {
  const navigation = useNavigation();
  const StackNavigatePops = useNavigation<StackNavigation>();
  const getDetailClass = (slug: any) => {
    StackNavigatePops.navigate('detailInstruktur', {
      screen: 'detailInstructure',
      params: {urlslug: slug},
    } as never);
  };
  const route = useRoute();
  const param = route.params;
  const data = param.params.urlslug;
  console.log(data);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => getDetailClass(item.slug)}>
      <View style={{flexDirection: 'row'}}>
        <VStack w={deviceWidth / 2} p={2}>
          <Box alignItems="center">
            <Box
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: '#E2E3E5',
                backgroundColor: '#ffffff',
              }}
              _web={{
                shadow: 1,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: '#ffffff',
              }}>
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    alt="Image Course"
                    source={{
                      uri: PATH.pathlpkimage + item.photo,
                    }}
                  />
                </AspectRatio>
              </Box>
              <Stack paddingX={3} paddingY={5} space={2}>
                <AppText
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  size={12}
                  font_type="bold"
                  style={{lineHeight: 16}}>
                  {item.firstname} {item.lastname}
                </AppText>
                <HStack alignContent={'center'} space={2}>
                  <Ionicons name="star" color={colors.warning400} size={14} />
                  <AppText size={10} color="secondary">
                    {`${item.rating} (${toCurrency(
                      item.review_count * 1,
                    )}) Ulasan`}
                  </AppText>
                </HStack>
              </Stack>
              <Button backgroundColor={'emerald.500'}>Lihat Kelas</Button>
            </Box>
          </Box>
        </VStack>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          backgroundColor="#ffff">
          <HStack
            justifyContent="space-between"
            w="100%"
            borderBottomLeftRadius={2}
            borderBottomRightRadius={20}
            zIndex={1}>
            <Box>
              <HStack space={4} p={4} mb={3} justifyContent="space-between">
                <TouchableOpacity>
                  <MaterialIcons name="arrow-back" color="#80848A" size={32} />
                </TouchableOpacity>
                <Box w="85%">
                  <HStack
                    borderRadius={6}
                    h="40px"
                    bg="#fff"
                    borderWidth={1}
                    borderColor="#EDEDED"
                    p={2}>
                    <AppText>
                      <MaterialIcons name="search" color="#80848A" size={24} />
                    </AppText>
                    <AppText>Cari Kelas</AppText>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          </HStack>

          <Divider />

          <VStack>
            <HStack m={8}>
              <Card width={100} height={90}>
                <Image
                  size={30}
                  width={100}
                  resizeMode="cover"
                  source={{
                    uri: 'https://skillacademy-prod-image.skillacademy.com/presskit/logo_02_black.png',
                  }}
                  alt="image"
                />
              </Card>
              <VStack ml={4} mt={4}>
                <AppText font_type="bold" size={24}>
                  Skill Academy
                </AppText>
                <AppText>Proffesional Bussiness Analis</AppText>
              </VStack>
            </HStack>
          </VStack>
          <VStack space={4} paddingX={4} justifyContent="space-around">
            <AppText>
              Gita Savitri Devi adalah wanita pertama yang ditunjuk sebagai
              kepala fotografer di Rolling Stone dan orang terakhir yang
              mengambil potret John Lennon. Dalam kelas fotografi online
              pertamanya, Gita menunjukkan kepada kita bahwa yang membuat gambar
              menakjubkan bukanlah peralatan atau teknologinya — melainkan
              ceritanya. Gita mengajari Anda filosofinya: cara mengembangkan
              konsep, bekerja dengan subjek, memotret dengan cahaya alami, dan
              menghidupkan gambar dalam pascaproduksi. Lihat dunia melalui
              matanya.
            </AppText>
            <AppText font_type="bold">Ikuti Instruktur</AppText>
            <HStack justifyContent="space-between">
              <MaterialCommunityIcons name="facebook" size={20} />
              <MaterialCommunityIcons name="instagram" size={20} />
              <MaterialCommunityIcons name="linkedin" size={20} />
              <MaterialCommunityIcons name="twitter" size={20} />
              <AntDesign name="medium-wordmark" size={20} />
              <MaterialCommunityIcons name="youtube" size={20} />
            </HStack>
            <AppText font_type="bold">Instruktur Dari</AppText>
            <HStack space={2}>
              <Image
                size={30}
                width={100}
                mt={4}
                resizeMode="cover"
                source={{
                  uri: 'https://skillacademy-prod-image.skillacademy.com/presskit/logo_02_black.png',
                }}
                alt="image"
              />
              <AppText font_type="semi-bold">
                {'\n'}
                Skill Academy
              </AppText>
            </HStack>

            <AppText size={20} mt={4} font_type="semibold">
              Instruktur Name
            </AppText>
          </VStack>

          <Box alignItems="center" backgroundColor="#fff">
            {/* <FlatList data={data} renderItem={renderItem} numColumns={2} /> */}
          </Box>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default InstructurePageDetail;
