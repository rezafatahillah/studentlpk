import { AppText } from 'components/Text';
import {
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  Skeleton,
  Stack,
  VStack,
} from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { IMycourse } from 'types/IMycourse';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation, TabNavigation } from 'types/RouteType';
import BoxMyCourse from 'components/BoxMyCourse';
import { IFilterCourse, filterCourse } from 'config/dictionary';
import colors from 'config/colors';
import { RefreshControl } from 'react-native';
import IParamsMyCourse from 'types/IParamsMyCourse';

interface Props {
  data: IMycourse[];
  params: IParamsMyCourse;
  filterActive?: string;
  setFilter?: Function;
  onRefresh: () => void;
  onFilter: (item: IFilterCourse) => void;
  refresh: boolean;
}
const MyCourseContent = ({
  data,
  params,
  onRefresh,
  onFilter,
  refresh,
}: Props) => {
  const navigation = useNavigation<TabNavigation>();
  let skeletoncomp = [] as Element[];
  for (var i = 0; i < 5; i++) {
    skeletoncomp.push(
      <Box
        key={i}
        bg="white"
        padding={15}
        style={{ borderWidth: 1 }}
        borderColor="coolGray.200"
        borderRadius="8">
        <VStack space={3}>
          <HStack space={3}>
            <Skeleton size={10} h="10" />
            <Skeleton.Text flex={1} />
          </HStack>
          <Skeleton h={3} />
          <Skeleton rounded="10" />
        </VStack>
      </Box>,
    );
  }
  return (
    <>
      <HStack justifyContent="space-between">
        <Box>
          <HStack space={4} p={4} justifyContent="space-between">
            <Box w="80%">
              <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <HStack
                  borderRadius={6}
                  h="40px"
                  bg="#fff"
                  borderWidth={1}
                  borderColor="#E8E8E8"
                  p={2}>
                  <AppText>
                    <MaterialIcons name="search" color="#80848A" size={24} />
                  </AppText>
                  <AppText>Cari Kelas2</AppText>
                </HStack>
              </TouchableOpacity>
            </Box>

            <HStack w="20%" mr={4}>
              <TouchableOpacity>
                <Stack>
                  <Badge // bg="red.400"
                    colorScheme="danger"
                    rounded="full"
                    mb={-3}
                    mr={-2}
                    zIndex={1}
                    variant="solid"
                    alignSelf="flex-end"
                    _text={{
                      fontSize: 10,
                    }}>
                    99+
                  </Badge>
                  <AppText>
                    <MaterialIcons
                      name="shopping-cart"
                      color="#80848A"
                      size={24}
                    />
                  </AppText>
                </Stack>
              </TouchableOpacity>
            </HStack>
          </HStack>
        </Box>
      </HStack>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <HStack space={2} paddingX={2} paddingBottom={4}>
          {filterCourse.map((item, index) => (
            <Button
              onPress={() => onFilter(item)}
              key={index}
              h={10}
              backgroundColor={
                params.enroll_status === item.value
                  ? colors.success700
                  : colors.bgGrey50
              }
              rounded={20}>
              <AppText
                color={params.enroll_status === item.value ? 'white' : 'secondary'}>
                {item.title}
              </AppText>
            </Button>
          ))}
        </HStack>
      </ScrollView>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        paddingX={3}
        showsVerticalScrollIndicator={false}>
        {refresh ? (
          <VStack space={2}>{skeletoncomp}</VStack>
        ) : data?.length > 0 ? (
          <VStack space={3}>
            {data.map((item, index) => (
              <BoxMyCourse data={item} key={index} />
            ))}
          </VStack>
        ) : (
          <VStack mt={40} space={2} paddingX={2}>
            <Center>
              <Image
                alt="empty logo"
                source={require('../../../assets/images/artwork.png')}
              />
              <AppText size={14} mt={4} font_type="semibold">
                Kelasmu Masih Kosong
              </AppText>
              <AppText color="secondary">
                Yuk, cari kelas yang sesuai dengan minatmu
              </AppText>
            </Center>
            <Button rounded="10" h="50px" colorScheme={'emerald'}>
              <AppText color="white" font_type="semibold">
                {' '}
                Cari Kelas{' '}
              </AppText>
            </Button>
          </VStack>
        )}
      </ScrollView>
    </>
  );
};

export default MyCourseContent;
