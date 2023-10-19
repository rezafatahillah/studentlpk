import { useNavigation } from "@react-navigation/native";
import colors from "config/colors";
import { Dimensions } from "react-native";
import { AspectRatio, Badge, Box, Divider, HStack, Image, Text, VStack, Stack, Center } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PATH from '@config/api';
import ICourse from "@itype/courses/ICourse";
import { statusdic } from "config/dictionary";
import { toCurrency } from "config/tools";
import { StackNavigation } from "types/RouteType";
import { AppText } from "./Text";
import LPKBadge from "./LPKBadge";

interface PropsData {
    data: ICourse;
}
const CardHistory = (data: PropsData) => {
    const item = data.data
    const navigation = useNavigation<StackNavigation>();
    const getDetailClass = (slug: any) => {
        navigation.navigate('courseDetail', { screen: 'DetailProduct', params: { urlslug: slug } } as never);
    }
    var deviceWidth: any = Dimensions.get('window').width;

    let slug = item.slug;
    let image_course = PATH.pathlpkimage + (!item ? '' : item?.image_thumbnail);
    let label_kind = item.kind?.label;
    let label_type = item?.type?.label;
    let title = item.title;
    let ulasan = `${Math.round(item?.rating)} (${toCurrency(item?.review_count * 1)}) Ulasan`;
    let discountPercentage = `${100 - Math.round(item?.price * 100 / item?.price_before * 1)} %`;
    let price_before = toCurrency(item?.price_before * 1);
    let price_after = toCurrency(item?.price * 1);

    return (
        <TouchableOpacity onPress={() => getDetailClass(slug)}>

            <VStack w={deviceWidth / 2.1} p={1}>
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
                                    uri: image_course
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
                                        {label_kind}
                                    </Box>
                                </Center>
                                <Center bg="#fff" borderRadius={8} borderWidth={1}
                                    borderColor={colors.bgGrey300} px="2" py="1">
                                    <Box _text={{
                                        fontFamily: 'Poppins-Regular',
                                        fontSize: 10,

                                    }}>
                                        {label_type}
                                    </Box>
                                </Center>
                            </HStack>
                            <AppText numberOfLines={2} ellipsizeMode="tail" size={10} font_type='semibold' style={{ lineHeight: 16 }}>
                                {title}
                            </AppText>
                            <HStack alignContent={'center'} space={2}>
                                <MaterialCommunityIcons name='star' color={colors.warning500} size={14} />
                                <AppText size={10} color='secondary'>
                                    {ulasan}
                                </AppText>
                            </HStack>

                            <LPKBadge lpk={item.lpk} instruktur={item?.course_instructor} />
                            <HStack alignItems="center" space={2}>
                                <Center bg="#EA3445" borderRadius={8} px="2" py="1">
                                    <Box _text={{
                                        fontFamily: 'Poppins-Bold',
                                        fontSize: 10,
                                        color: "white"
                                    }}>
                                        {discountPercentage}
                                    </Box>
                                </Center>
                                <AppText size={10} color='secondary' style={{ textDecorationLine: 'line-through' }} >
                                    Rp.  {price_before},-
                                </AppText>
                            </HStack>
                            <AppText size={16} font_type={'bold'}>
                                Rp.  {price_after},-
                            </AppText>
                        </Stack>

                    </Box>
                </Box>

            </VStack>
        </TouchableOpacity>
    );
}
const style = StyleSheet.create({
    cardtransaction: {
        borderColor: colors.LineColor200,
        borderRadius: 10,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    courseimage: {
        width: '30%',
        height: 75,
        borderRadius: 10,
        marginEnd: 10,
    }
});

export default CardHistory;