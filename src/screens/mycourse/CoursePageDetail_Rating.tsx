import {
  Box,
  CheckIcon,
  HStack,
  Icon,
  Center,
  Image,
  Select,
  VStack,
  Divider,
  Input,
  Progress,
  ScrollView,
  Actionsheet,
  useDisclose,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { AppText } from 'components/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from 'config/colors';
import service from '@services/service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PATH from 'config/api';
import { ILpkData, ILpkRating, ILpkRatingSummary, ILpkRatingDet } from 'types/IRating';
import { ILpkDetail } from 'types/ILpkDetail';
import LpkPageSkeleton from '@components/LpkPageSkeleton';
import IReview from 'types/courses/IReview';
import IRating from 'types/courses/IRating';
import IRatingDet from 'types/courses/IRatingDet';

interface PropsData {
  val: string | undefined;
}

const CoursePageDetail_Rating = ({ val }: PropsData) => {

  const slug = val;

  const [courseDetail, setCourseDetail] = useState<IRating>();

  const [courseReviews, setCourseReviews] = useState<IReview[]>([]);
  const [courseRatingDet, setCourseRatingDet] = useState<IRatingDet>();

  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedValue, setSelectedValue] = useState('all');

  const toggleShowMore = (index: number) => {
    const foundIndex = expandedItems.indexOf(index);
    if (foundIndex !== -1) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };


  const rating = Number(courseDetail?.sum_rating).toFixed(1);
  const review = courseDetail?.review_count;

  const rate = [
    {
      value: '1',
      label: '1',
      jumlah: courseRatingDet?.rc_1,
      bar: parseInt(courseRatingDet?.r_1 ?? '0'),
    },
    {
      value: '2',
      label: '2',
      jumlah: courseRatingDet?.rc_2,
      bar: parseInt(courseRatingDet?.r_2 ?? '0'),
    },
    {
      value: '3',
      label: '3',
      jumlah: courseRatingDet?.rc_3,
      bar: parseInt(courseRatingDet?.r_3 ?? '0'),
    },
    {
      value: '4',
      label: '4',
      jumlah: courseRatingDet?.rc_4,
      bar: parseInt(courseRatingDet?.r_4 ?? '0'),
    },
    {
      value: '5',
      label: '5',
      jumlah: courseRatingDet?.rc_5,
      bar: parseInt(courseRatingDet?.r_5 ?? '0'),
    },
  ];

  useEffect(() => {
    // console.log("reza pilih", courseRatingDet)
    setLoading(true);
    if (slug) {
      service.getRating(slug, selectedValue).then(res => {
        // console.log("reza", res)
        setCourseDetail(res);
        setCourseReviews(res.reviews);
        setCourseRatingDet(res.rating_det);
        setLoading(false);
      });
    }
  }, [slug, selectedValue]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} backgroundColor="#ffff">
      <Box maxW="100%" backgroundColor="#fff" paddingX={2}>
        <TouchableOpacity onPress={onOpen}>
          <Box
            // width={38}
            height={70}
            mt={6}
            borderWidth={1}
            borderRadius={10}
            borderColor={colors.bgGrey300}>
            <HStack justifyContent="space-between" padding={3}>
              <HStack space={2}>
                <AppText font_type="bold" size={24} alignSelf="center">
                  {rating}<AppText>/5</AppText>
                </AppText>
                <Divider orientation="vertical" />
                <VStack>
                  <HStack space={2} mb={2}>
                    <AntDesign
                      name="star"
                      size={16}
                      color={colors.warning500}
                    />
                    <AntDesign
                      name="star"
                      size={16}
                      color={colors.warning500}
                    />
                    <AntDesign
                      name="star"
                      size={16}
                      color={colors.warning500}
                    />
                    <AntDesign
                      name="star"
                      size={16}
                      color={colors.warning500}
                    />
                    <AntDesign
                      name="star"
                      size={16}
                      color={colors.warning500}
                    />
                  </HStack>
                  <AppText >{review} Ulasan</AppText>
                </VStack>
              </HStack>
              <EvilIcons size={48} name="chevron-right" />
            </HStack>
          </Box>
        </TouchableOpacity>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <AppText font_type="bold" size={16}>
                Rating
              </AppText>
            </Box>
            {rate
              .map((item, index) => (
                <Actionsheet.Item key={index}> {/* Tambahkan prop key dengan nilai yang unik */}
                  <HStack justifyContent="space-between">
                    <AppText>
                      <Ionicons name="star" color="#FFBF00" /> {item.label}
                    </AppText>
                    <Box w="80%" maxW="400">
                      <VStack space="md">
                        <VStack mx="4" space="md">
                          <Progress
                            bg="coolGray.100"
                            _filledTrack={{
                              bg: '#FFBF00',
                            }}
                            value={item.bar}
                          />
                        </VStack>
                      </VStack>
                    </Box>
                    <AppText color="#A0A4AB">{item.jumlah}</AppText>
                  </HStack>
                </Actionsheet.Item>
              ))
              .reverse()}

          </Actionsheet.Content>
        </Actionsheet>

        <VStack mt={2}>
          <Select
            onValueChange={itemValue => {
              setSelectedValue(itemValue);
            }}
            accessibilityLabel="Rating"
            placeholder="Rating"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
          >
            {
              rate
                .map(item => (
                  <Select.Item
                    key={item.value} // Add a unique key prop
                    value={item.value.toString()} // Convert value to string
                    label={item.label}
                  />
                ))
                .reverse()
            }

          </Select>
        </VStack>
        <Box backgroundColor="#F5F5F5">
          {loading ? (
            <LpkPageSkeleton />
          ) : (
            Array.isArray(courseReviews) &&
            courseReviews.map((item, index) => {

              // const profile = PATH.pathlpkimage + item?.student?.student_profile?.avatar;
              const name = item?.student?.firstname + ' ' + item?.student?.lastname;
              const star = Array.from({ length: item.rating }).map((_, i) => (
                <AntDesign
                  key={i}
                  name="star"
                  size={16}
                  color={colors.warning500}
                />
              ));
              const time = item?.created_at.toString();
              const comment = item?.user_comment;
              // const admin_name = item?.lpk?.name;
              const admin_time = item?.reply_time ? item?.reply_time : "0000:00:00";
              const admin_comment = item?.admin_reply;
              const lpk_name = item?.lpk?.name;
              const lpk_category = "LPK";


              return (
                <Box width="100%" padding={4} key={index} marginBottom={2} backgroundColor="#ffffff">

                  <Box>
                    <VStack mt={2}>
                      <HStack space={2}>
                        <Box flex={0.3}>
                          <HStack>{star}</HStack>
                        </Box>
                        <Box flex={0.7}><AppText>{time}</AppText></Box>
                      </HStack>
                      <AppText font_type="bold" size={14}>
                        {name}
                      </AppText>
                      <AppText size={14}>{comment}</AppText>
                      <HStack justifyContent="space-between" mt={2}>
                        <AppText mt={1}>
                          <MaterialIcons name="thumb-up-off-alt" size={10} /> Membantu
                        </AppText>
                        {admin_comment && (
                          <TouchableOpacity onPress={() => toggleShowMore(index)}>
                            <AppText>
                              {expandedItems.indexOf(index) !== -1 ? 'Show Less' : 'Show More'}{' '}
                              <Feather
                                name={expandedItems.indexOf(index) !== -1 ? 'chevron-up' : 'chevron-down'}
                              />
                            </AppText>
                          </TouchableOpacity>
                        )}

                      </HStack>
                      {expandedItems.indexOf(index) !== -1 && (
                        <HStack pt={4}>
                          <VStack width="2%" backgroundColor="#F4F4F4" p={1}></VStack>

                          <VStack width="98%" pl={2}>
                            <HStack space={2} justifyContent="space-between" alignItems="center">
                              <Box flex={0.5}>
                                <HStack justifyContent="flex-start">
                                  <AppText size={14} font_type="bold">{lpk_name}</AppText>
                                </HStack>
                              </Box>
                              <Box flex={0.15}>
                                <Box borderWidth={1} borderColor="gray" borderRadius={4} p={1}>
                                  <AppText textAlign="center">
                                    {lpk_category}
                                  </AppText>
                                </Box>
                              </Box>
                              <Box flex={0.35}>
                                <AppText textAlign="right">{admin_time}</AppText>
                              </Box>
                            </HStack>

                            <HStack space={2}>
                              <AppText size={14}>{admin_comment}</AppText>
                            </HStack>
                          </VStack>
                        </HStack>
                      )}

                    </VStack>
                  </Box>
                </Box>
              );
            })

          )}

        </Box>
      </Box>
    </ScrollView>
  );
}

export default CoursePageDetail_Rating;
