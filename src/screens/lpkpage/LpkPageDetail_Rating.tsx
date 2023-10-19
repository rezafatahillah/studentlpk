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
import LpkPageSkeleton from 'components/LpkPageSkeleton';

interface PropsData {
    val: ILpkDetail;
}

const LpkPageDetail_Rating = ({ val }: PropsData) => {

    const slug = val?.slug;

    const [lpkRatingSummary, setLpkRatingSummary] = useState<ILpkRatingSummary>();
    const [lpkRating, setLpkRating] = useState<ILpkRating>();
    const [lpkRatingDet, setLpkRatingDet] = useState<ILpkRatingDet>();
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

    const rating = Number(lpkRatingSummary?.avg_rating).toFixed(1);
    const review = lpkRatingSummary?.total_ulasan;

    // const ratingKursus = (rating: string) => {
    //     // console.log(service.getLpkRating(slug));

    //     setLoading(true);

    //     service.getLpkRating(slug, rating).then(res => {
    //         // console.log("reza get lpk rating", res.rating_summary)
    //         setLpkRating(res.data);
    //         setLpkRatingSummary(res.rating_summary);
    //         setLpkRatingDet(res.rating_det);
    //         setLoading(false);
    //     });
    // };

    const rate = [
        {
          value: '1',
          label: '1',
          jumlah: '',
          bar: parseInt(lpkRatingDet?.r_1 ?? '0'),
        },
        {
          value: '2',
          label: '2',
          jumlah: '',
          bar: parseInt(lpkRatingDet?.r_2 ?? '0'),
        },
        {
          value: '3',
          label: '3',
          jumlah: '',
          bar: parseInt(lpkRatingDet?.r_3 ?? '0'),
        },
        {
          value: '4',
          label: '4',
          jumlah: '',
          bar: parseInt(lpkRatingDet?.r_4 ?? '0'),
        },
        {
          value: '5',
          label: '5',
          jumlah: '',
          bar: parseInt(lpkRatingDet?.r_5 ?? '0'),
        },
      ];

    useEffect(() => {
        // console.log(selectedValue)
        setLoading(true);
        if (slug) {
            service.getLpkRating(slug, selectedValue).then(res => {
                setLpkRating(res.data);
                setLpkRatingSummary(res.rating_summary);
                setLpkRatingDet(res.rating_det);
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
                            .map(item => (
                                <Actionsheet.Item>
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
                        {rate
                            .map(item => (
                                <Select.Item
                                    key={item.value} // Add a unique key prop
                                    value={item.value}
                                    label={item.label}
                                />
                            ))
                            .reverse()}
                    </Select>
                </VStack>
                <Box backgroundColor="#F5F5F5">
                    {loading ? (
                        <LpkPageSkeleton />
                    ) : (
                        Array.isArray(lpkRating) &&
                        lpkRating.map((item, index) => {

                            const courseLogoUri = PATH.pathlpkimage + item.course_logo;
                            const courseTitle = item.course_name;
                            const userStar = Array.from({ length: item.rating }).map((_, i) => (
                                <AntDesign
                                    key={i}
                                    name="star"
                                    size={16}
                                    color={colors.warning500}
                                />
                            ));
                            const userTime = item.rating_time;
                            const userName = item.student_name;
                            const userComment = item.user_comment;
                            const lpkName = item.lpk_name;
                            const adminTime = item.reply_time ? item.reply_time : "0000:00:00";
                            const lpk = "LPK";
                            const adminComment = item.admin_reply;

                            return (
                                <Box width="100%" padding={4} key={item.id} marginBottom={2} backgroundColor="#ffffff">
                                    <Box width="80%" padding={2}>
                                        <HStack space={4} justifyContent="space-between">
                                            <Image
                                                style={{ width: 48, height: 48, borderRadius: 8 }}
                                                resizeMode="center"
                                                alignItems={'center'}
                                                alignSelf={'center'}
                                                source={{
                                                    uri: courseLogoUri,
                                                }}
                                                alt="image"
                                            />
                                            <AppText size={14}>{courseTitle}</AppText>
                                            <MaterialCommunityIcons name="dots-vertical" size={24} />
                                        </HStack>
                                    </Box>

                                    <Divider mt={4} />
                                    <Box>
                                        <VStack mt={2}>
                                            <HStack space={2}>
                                                <Box flex={0.3}>
                                                    <HStack>{userStar}</HStack>
                                                </Box>
                                                <Box flex={0.7}><AppText>{userTime}</AppText></Box>
                                            </HStack>
                                            <AppText font_type="bold" size={14}>
                                                {userName}
                                            </AppText>
                                            <AppText size={14}>{userComment}</AppText>
                                            <HStack justifyContent="space-between" mt={2}>
                                                <AppText mt={1}>
                                                    <MaterialIcons name="thumb-up-off-alt" size={10} /> Membantu
                                                </AppText>
                                                {adminComment && (
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
                                                        <HStack space={2}>
                                                            <Box flex={0.5}>
                                                                <HStack><AppText font_type="bold">{lpkName}</AppText></HStack>
                                                            </Box>
                                                            <Box flex={0.15}>
                                                                <Box borderWidth={1} borderColor="gray" borderRadius={4} p={1}>
                                                                    <AppText font_type="bold" size={14} textAlign="center">
                                                                        {lpk}
                                                                    </AppText>
                                                                </Box>
                                                            </Box>
                                                            <Box flex={0.35}><AppText>{adminTime}</AppText></Box>
                                                        </HStack>
                                                        <HStack space={2}>
                                                            <AppText size={14}>{adminComment}</AppText>
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

export default LpkPageDetail_Rating;
