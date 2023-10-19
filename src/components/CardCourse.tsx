import { AspectRatio, Box, Center, Heading, HStack, Image, Stack, Text, VStack } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigation, TabNavigation } from 'types/RouteType';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from "react-native";
import { AppText } from './Text';
import { toCurrency } from 'config/tools';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'config/colors';
import LPKBadge from './LPKBadge';
import type ICourse from 'types/courses/ICourse';
import PATH from '@config/api';
interface PropsData {
    val: ICourse
}
const CardCourse = ({ val }: PropsData) => {
    const StackNavigatePops = useNavigation<StackNavigation>();
    const getDetailClass = (slug: any) => {
        StackNavigatePops.navigate('course_detail', { screen: 'DetailProduct', params: { urlslug: slug } } as never);
    }
    var deviceWidth: any = Dimensions.get('window').width;
    const courseimage = PATH.pathlpkimage + (!val ? '' : val?.image_thumbnail);
    return (
        <TouchableOpacity onPress={() => getDetailClass(val.slug)}>
            <VStack w={deviceWidth / 2.3} p={0.5}>
                <Box alignItems="center">
                    <Box rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "#E2E3E5",
                        backgroundColor: "#ffffff"
                    }} _web={{
                        shadow: 1,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "#ffffff"
                    }}>
                        <Box>
                            <AspectRatio w="100%" ratio={17 / 9}>
                                <Image alt='Image Course' source={{
                                    uri: courseimage
                                }} />
                            </AspectRatio>
                        </Box>
                        <Stack padding={3} space={2}>
                            <HStack space={1}>
                                <Center bg="#FE730A" borderRadius={8} px="2" py="1">
                                    <Box _text={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 10,
                                        color: "#FAFAFA"
                                    }}>
                                        {val?.kind?.label}
                                    </Box>
                                </Center>
                                <Center bg="#fff" borderRadius={8} borderWidth={1}
                                    borderColor={colors.bgGrey300} px="2" py="1">
                                    <Box _text={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 10,

                                    }}>
                                        {val?.type?.label}
                                    </Box>
                                </Center>
                            </HStack>
                            <AppText numberOfLines={2} ellipsizeMode="tail" size={10} font_type='semibold' style={{ lineHeight: 16 }}>
                                {val.title}
                            </AppText>
                            <HStack alignContent={'center'} space={2}>
                                <Ionicons name='star' color={colors.warning500} size={14} />
                                <AppText size={10} color='secondary'>
                                    {`${Math.round(val?.rating)} (${toCurrency(val?.review_count * 1)}) Ulasan`}
                                </AppText>
                            </HStack>
                            <LPKBadge lpk={val.lpk} instruktur={val?.course_instructor} />
                            <HStack alignItems="center" space={2}>
                                <Center bg="#EA3445" borderRadius={8} px="2" py="1">
                                    <Box _text={{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 10,
                                        color: "white"
                                    }}>
                                        {`${100 - Math.round(val?.price * 100 / val?.price_before * 1)} %`}
                                    </Box>
                                </Center>
                                <AppText size={10} color='secondary' style={{ textDecorationLine: 'line-through' }} >
                                    Rp.  {toCurrency(val?.price_before * 1)},-
                                </AppText>
                            </HStack>
                            <AppText size={16} font_type={'bold'}>
                                Rp.  {toCurrency(val?.price * 1)},-
                            </AppText>
                        </Stack>

                    </Box>
                </Box>

            </VStack>
        </TouchableOpacity>
    )
}

export default CardCourse;