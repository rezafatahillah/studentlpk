import React from 'react';
import {
  FlatList,
  Box,
  HStack,
  VStack,
  View,
  Center,
  AspectRatio,
  Image,
  Stack,
} from 'native-base';
import ICourse from 'types/courses/ICourse';
import {Dimensions} from 'react-native';
import PATH from '@config/api';
import {toCurrency} from 'config/tools';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'config/colors';
import {TouchableOpacity} from 'react-native';
import {AppText} from '../components/Text';
import {ScrollView} from 'react-native-gesture-handler';
interface PropsData {
  val: ICourse;
}

export default function FlatlistCourse({val}: PropsData) {
  const item = val;
  // console.log(item);

  const data = [item];

  // const navigation = useNavigation();
  // // const Detail = (slug: any) => {
  // //   navigation.navigate('DetailCourse', { screen: 'DetailCourse', params: { urlslug: slug } } as never);
  //  }
  var deviceWidth: any = Dimensions.get('window').width;
  const courseimage = PATH.pathlpkimage + (!item ? '' : item?.image_thumbnail);

  const renderItem = () => {
    return (
      <ScrollView>
        <Box backgroundColor="#fff">
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => item.slug}>
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
                            uri: courseimage,
                          }}
                        />
                      </AspectRatio>
                    </Box>
                    <Stack paddingX={3} paddingY={5} space={2}>
                      <HStack space={1}>
                        <Center bg="#FE730A" borderRadius={8} px="2" py="1">
                          <Box
                            _text={{
                              fontFamily: 'Poppins-Regular',
                              fontSize: 10,
                              color: '#FAFAFA',
                            }}>
                            Terbaru
                          </Box>
                        </Center>
                        <Center
                          bg="#fff"
                          borderRadius={8}
                          borderWidth={1}
                          borderColor={colors.bgGrey300}
                          px="2"
                          py="1">
                          <Box
                            _text={{
                              fontFamily: 'Poppins-Regular',
                              fontSize: 10,
                            }}>
                            Terbaru
                          </Box>
                        </Center>
                      </HStack>

                      <AppText
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        size={10}
                        font_type="semibold"
                        style={{lineHeight: 16}}>
                        {item.title}
                      </AppText>
                      <HStack alignContent={'center'} space={2}>
                        <Ionicons
                          name="star"
                          color={colors.warning500}
                          size={14}
                        />
                        <AppText size={10} color="secondary">
                          {`${item.rating} (${toCurrency(
                            item.review_count * 1,
                          )}) Ulasan`}
                        </AppText>
                      </HStack>
                      {/* <LPKBadge lpk={item.lpk} instruktur={item.course_instructor} /> */}
                      <HStack alignItems="center" space={2}>
                        <Center bg="#EA3445" borderRadius={8} px="2" py="1">
                          <Box
                            _text={{
                              fontFamily: 'Poppins-Bold',
                              fontSize: 10,
                              color: 'white',
                            }}>
                            20 %
                          </Box>
                        </Center>
                        <AppText
                          size={10}
                          color="secondary"
                          style={{textDecorationLine: 'line-through'}}>
                          Rp. {toCurrency(item.price_before * 1)},-
                        </AppText>
                      </HStack>
                      <AppText size={16} font_type={'bold'}>
                        Rp. {toCurrency(item.price * 1)},-
                      </AppText>
                    </Stack>
                  </Box>
                </Box>
              </VStack>
            </TouchableOpacity>
          </View>
        </Box>
      </ScrollView>
    );
  };

  return <FlatList data={data} renderItem={renderItem} numColumns={2} />;
}
