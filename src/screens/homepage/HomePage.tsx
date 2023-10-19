import {
  HStack,
  Box,
  Center,
  Button,
  VStack,
  ScrollView,
  Stack,
  Image,
  Spacer,
  Badge,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppSelector} from '@redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {AppText} from 'components/Text';

import PATH from '@config/api';
import CardCourse from 'components/CardCourse';
import service from '@services/service';
import ICourse from 'types/courses/ICourse';
import {ITableParams} from 'types/ITableParams';
import {SpringKeyboardAnimationConfig} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import colors from 'config/colors';
import ICategorie from 'types/ICategorie';
import SearchBar from 'components/SearchBar';
import CardCourseSkeleton from 'components/CardCourseSkeleton';
import {StackNavigation, TabNavigation} from 'types/RouteType';

var deviceWidth: any = Dimensions.get('window').width;

function HomePage() {
  const navigation = useNavigation<StackNavigation>();
  const tabnavigation = useNavigation<TabNavigation>();
  const [kategori, setsetKategori] = useState<ICategorie[]>([]);
  const [kelasTerbaru, setKelasTerbaru] = useState<ICourse[]>([]);
  const [clicked, setClicked] = React.useState(false);
  const [isloadingCard, setIsloadingCard] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState('');
  const [params, setParams] = useState<ITableParams>({
    fields: [
      'id',
      'title',
      'slug',
      'price_before',
      'price',
      'is_discount',
      'uuid',
      'image',
      'image_thumbnail',
      'thumbnail_img',
      'video_thumbnail',
      'course_instructor.*',
      'course_instructor.instructors.*',
      'type.*',
      'kind.*',
      'lpk.*',
      'lpk.lpk_detail.*',
      'is_publish',
    ],
    sort:[],
    perPage: 12,
  });
  const getKelasTerbaru = () => {
    setIsloadingCard(true);
    service
      .getCourses(params)
      .then(response => {
        setIsloadingCard(false);
        setKelasTerbaru(response);
      })
      .catch(error => {
        console.log(`Error while getting courses: ${error}`);
      });
  };
  const getCategory = () => {
    service
      .getCategories()
      .then(response => {
        setsetKategori(response);
      })
      .catch(error => {
        console.log(`Error while getting courses: ${error}`);
      });
  };
  useEffect(() => {
    getKelasTerbaru();
    getCategory();
  }, []);

  return (
    <VStack flex={1} backgroundColor={'#fff'}>
      <SearchBar
        onFocusAction={(value: boolean) => setClicked(value)}
        searchAction={(value: string) => setSearchPhrase(value)}
        clicked={clicked}
        searchPhrase={searchPhrase}
      />
      <VStack flex={1} paddingX={3} backgroundColor={'#fff'}>
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isloadingCard}
                onRefresh={getKelasTerbaru}
              />
            }>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <HStack justifyContent="space-evenly" marginTop={2}>
                {Banner &&
                  Banner.map((val: any, i: number) => {
                    return (
                      <VStack key={i} w={deviceWidth / 1.2}>
                        <Image
                          alt="image"
                          source={val.banner}
                          style={{
                            width: '100%',
                            height: 170,
                            resizeMode: 'stretch',
                          }}
                        />
                      </VStack>
                    );
                  })}
              </HStack>
            </ScrollView>
            <VStack
              mt={4}
              space={3}
              padding={4}
              borderWidth={1}
              borderRadius={10}
              borderColor={'#E2E3E5'}>
              <HStack>
                <Box w="12%">
                  <MaterialCommunityIcons
                    name="certificate"
                    color="#487d71"
                    size={30}
                  />
                </Box>
                <VStack w="88%">
                  <AppText
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#1D242F',
                    }}>
                    Cek Sertifikat
                  </AppText>
                  <AppText style={{fontSize: 12, color: '#80848A'}}>
                    Cek keaslian sertifikat yang diterbitkan disini
                  </AppText>
                </VStack>
              </HStack>
              <Button
                colorScheme={'success'}
                onPress={() => navigation.navigate('certificateCheck')}
                >
                Cek Sertifikat
              </Button>
            </VStack>

            <HStack mt={4} justifyContent="space-between">
              <AppText font_type="bold" size={14}>
                LPK
              </AppText>
              <AppText
                font_type="semibold"
                onPress={() => navigation.navigate('lpkList', { title: 'LPK List' })}
                color="success">
                Lihat Semua
              </AppText>
            </HStack>
            <View mt={4} style={styles.container}>
              {LPKS.map((item, index) => (
                <View style={styles.itemContainer} key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('lpkList', { title: 'LPK List' })}
                    >
                    <Box
                      backgroundColor={colors.bgGrey50}
                      paddingX={4}
                      paddingY={1}
                      borderRadius={10}
                      borderWidth={1}
                      borderColor={colors.bgGrey500}>
                      <Image
                        style={styles.logo}
                        alt="img"
                        source={{uri: item.logo}}
                      />
                    </Box>
                    <AppText style={styles.name}>{item.name}</AppText>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <HStack mt={4} justifyContent="space-between">
              <AppText size={14} font_type="bold">
                Kategori
              </AppText>
            </HStack>
            <ScrollView
              mt={4}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {kategori?.map((item, index) => (
                <HStack
                  space={2}
                  key={index}
                  padding={2}
                  alignItems="center"
                  borderRadius={10}
                  mr={2}
                  justifyItems="center"
                  backgroundColor={colors.bgGrey50}>
                  <Image
                    alt="cat img"
                    size={10}
                    source={{uri: PATH.pathadminimage + item.src}}
                  />
                  <AppText>{item.title}</AppText>
                </HStack>
              ))}
            </ScrollView>

            <HStack mt={8} justifyContent="space-between">
              <AppText size={14} font_type="bold">
                Jenis Kelas
              </AppText>
            </HStack>
            <ScrollView
              mt={4}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <HStack justifyContent="space-between" space={1}>
                {JenisKelas &&
                  JenisKelas.map((val: any, i: number) => {
                    return (
                      <VStack key={i} w={deviceWidth / 2.2}>
                        <Stack w="100%">
                          <Center>
                            <Image
                              alt="image"
                              source={val.banner}
                              style={{width: '100%', resizeMode: 'contain'}}
                            />
                          </Center>
                        </Stack>
                      </VStack>
                    );
                  })}
              </HStack>
            </ScrollView>

            <HStack mt={4} justifyContent="space-between">
              <AppText font_type="bold" size={14}>
                Kelas Terbaru
              </AppText>
              <AppText
                font_type="semibold"
                onPress={() => navigation.navigate('courseList', { title: 'Course List' })}
                // onPress={() => navigation.navigate('HomeStack' as never, { screen: 'SearchKelasTerbaruScreen', params: { title: ' Search' } })}
                color="success">
                Lihat Semua{' '}
                <MaterialIcons
                  name="keyboard-arrow-right"
                  color="#ffff"
                  size={15}
                />
              </AppText>
            </HStack>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <HStack justifyContent="space-between" space={1}>
                {isloadingCard && <CardCourseSkeleton />}
                {!isloadingCard &&
                  kelasTerbaru &&
                  kelasTerbaru.map((val: any, i: number) => {
                    return <CardCourse val={val} key={i} />;
                  })}
              </HStack>
            </ScrollView>

            <HStack mt={4} justifyContent="space-between">
              <AppText size={14} font_type="bold">
                Kelas Terlaris
              </AppText>
              <AppText font_type="semibold" color="success">
                Lihat Semua{' '}
                <MaterialIcons
                  name="keyboard-arrow-right"
                  color="#ffff"
                  size={15}
                />
              </AppText>
            </HStack>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <HStack justifyContent="space-between" space={1}>
                {isloadingCard && <CardCourseSkeleton />}
                {!isloadingCard &&
                  kelasTerbaru &&
                  kelasTerbaru.map((val: any, i: number) => {
                    return <CardCourse val={val} key={i} />;
                  })}
              </HStack>
            </ScrollView>
            <Spacer mt={60} />
          </ScrollView>
        </SafeAreaView>
      </VStack>
    </VStack>
  );
}
interface Data {
  [x: string]: any;
  id: number;
  name: string;
  logo: string;
}
const LPKS: Data[] = [
  {
    id: 1,
    name: 'Geti',
    logo: 'https://rumahlpk.com/media/images/lpk_logo/geti.png',
    slug: 'geti-global-edukasi-talenta-inkubator',
  },
  {
    id: 2,
    name: 'SIMS',
    logo: 'https://rumahlpk.com/media/images/lpk_logo/SIMS.png',
  },
  {
    id: 3,
    name: 'Mandiri',
    logo: 'https://rumahlpk.com/media/images/lpk_logo/MANDIRI.png',
  },
  {
    id: 4,
    name: 'ASTI',
    logo: 'https://rumahlpk.com/media/images/lpk_logo/ASRI.png',
  },
  {
    id: 5,
    name: 'Mutiara Jaya',
    logo: 'https://rumahlpk.com/media/images/lpk_logo/MUTIARA_JAYA.png',
  },
  {
    id: 6,
    name: 'RIJA',
    logo: 'https://rumahlpk.com/media/images/lpk_logo/LPK_RIJA.png',
  },
];
const Banner: {}[] = [
  {
    id: 1,
    banner: require('@assets/images/jumbotron_banner_1.png'),
  },
  {
    id: 2,
    banner: require('@assets/images/jumbotron_banner_2.png'),
  },
];

const JenisKelas: {}[] = [
  {
    id: 1,
    banner: require('@assets/images/kelas1.png'),
  },
  {
    id: 2,
    banner: require('@assets/images/kelas2.png'),
  },
  {
    id: 3,
    banner: require('@assets/images/kelas1.png'),
  },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  name: {
    textAlign: 'center',
  },
  headerStyle: {
    flex: 1,
    backgroundColor: '93f0fb40',
    top: 0,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  iconColor: {
    color: '#eaf1f7',
  },
  defaultBg: {
    backgroundColor: '#9dd8eba8',
  },
  textDefault: {
    // color:'#11629f',
    color: '#1D242F',
    fontWeight: '400',
    fontSize: 12,
  },
  textBig: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 14,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  wrapperCustom: {
    borderRadius: 8,
    // padding: 6
  },
});

export default HomePage;
