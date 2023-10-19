import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Progress,
  VStack,
} from 'native-base';
import React from 'react';
import {AppText} from './Text';
import {IMycourse} from 'types/IMycourse';
import PATH from '@config/api';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from 'types/RouteType';
interface Props {
  data: IMycourse;
}
const BoxMyCourse = ({data}: Props) => {
  const navigation = useNavigation<StackNavigation>();
  const courseimage = PATH.pathlpkimage + (!data ? '' : data?.image_thumbnail);
  return (
    <Box
      bg="white"
      padding={15}
      style={{borderWidth: 1}}
      borderColor="coolGray.200"
      borderRadius="8">
      <VStack space={3}>
        <VStack space={2}>
          <HStack alignItems={'baseline'} space={3}>
            <Image
              size={'xs'}
              rounded={'lg'}
              resizeMode="cover"
              alt="Logo LPK"
              source={{uri: courseimage}}
            />
            <VStack style={{flex: 1}}>
              <AppText size={14}>{data.title}</AppText>
              <HStack space={3}>
                <Badge colorScheme="info" rounded={'lg'} variant="solid">
                  <AppText size={10} font_type="medium" color="white">
                    {data.course_type}
                  </AppText>
                </Badge>
                <Badge colorScheme="warning" rounded={'lg'} variant="solid">
                  <AppText size={10} font_type="medium" color="white">
                    {' '}
                    {data.enroll_status}
                  </AppText>
                </Badge>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <VStack space={3}>
          <HStack justifyContent="space-between">
            <AppText font_type="semibold">Progress Kelas</AppText>
            <AppText font_type="semibold">{Math.round(data.progress)}%</AppText>
          </HStack>
          <Box w="100%" maxW="400">
            <Progress value={data.progress} colorScheme={'success'} />
          </Box>
          <HStack space={1} justifyContent={'space-between'}>
            {Math.round(data?.progress) === 100 && (
              <Button
                w={'50%'}
                onPress={() =>
                  navigation.navigate('certificateCourse', {
                    slug: data.slug,
                    title: 'LMS Page',
                  })
                }
                rounded="10"
                bgColor={'white'}
                borderColor={'gray.600'}
                borderWidth={1}>
                <AppText font_type="medium">Lihat Sertifikat</AppText>
              </Button>
            )}
            <Button
              w={Math.round(data?.progress) === 100 ? '50%' : '100%'}
              onPress={() =>
                navigation.navigate('lmspage', {
                  slug: data.slug,
                  title: data.title,
                })
              }
              rounded="10"
              colorScheme={'emerald'}>
              <AppText color="white" font_type="medium">
                Masuk Kelas
              </AppText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default BoxMyCourse;
