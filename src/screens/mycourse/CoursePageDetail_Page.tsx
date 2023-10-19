import { HStack, VStack, View, Box, Stack, Avatar, AspectRatio, Button, Image, Center } from 'native-base';
import React from 'react';
import {
    TouchableOpacity,
    Share
} from 'react-native';
import { AppText } from 'components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PATH from '@config/api';
import { toCurrency } from 'config/tools';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@itype/RouteType';
import lpkcolors from '@config/colors';
import ICourses from "types/courses/ICourse";

interface PropsData {
    val: ICourses | undefine;
}

const CoursePageDetail_Page = ({ val }: PropsData) => {

    let title = val?.title;
    let lpk_logo = PATH.pathlpkimage + val?.lpk?.lpk_detail?.logo;
    let lpk_name = val?.lpk?.name;
    let instructor_name = val?.course_instructor?.[0]?.instructors?.firstname + ' ' + val?.course_instructor?.[0]?.instructors?.lastname;
    let tags = val?.tags;
    let image_thumbnail = PATH.pathlpkimage + val?.image_thumbnail;
    let image_real = val?.image ? PATH.pathlpkimage + val.image  : 'https://example.com/default-image.jpg';
    let discount = `${100 - Math.round(val?.price * 100 / val?.price_before)} %`;
    let price_before = toCurrency(val?.price_before * 1);
    let price_after = toCurrency(val?.price * 1);
    let rating = val?.rating.toFixed(1);
    let review = val?.review_count;
    let share = val?.title + ' ' + val?.video_url;

    const navigationStack = useNavigation<StackNavigation>();

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    share,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            console.log(error.message)
            // Alert.alert(error.message);
        }
    };

    return (
        <View p={2}>
            <Stack width={120} borderColor="#E2E3E5" borderWidth={1} p={1} borderRadius={6}>
                <AppText>Kelas Interaktif</AppText>
            </Stack>
            <AppText size={18} font_type="bold">{title}</AppText>
            <HStack p={1} space={1}>
                <Stack>
                    <Avatar borderWidth={1} bg={lpkcolors.transparent} source={{ uri: lpk_logo }}>
                        <AppText>{lpk_name}</AppText>
                    </Avatar>
                </Stack>
                <VStack>
                    <AppText>{lpk_name}</AppText>
                    <HStack space={2}>
                        <AppText style={{ color: "#A0A4A8" }}>Instruktur</AppText>
                        <AppText style={{ color: "#00B683" }}>{instructor_name}</AppText>
                    </HStack>
                </VStack>
            </HStack>
            <HStack space={1} flexWrap="wrap" justifyContent="flex-start" alignItems="center">
                <AppText>Tags:</AppText>
                <HStack p={2} space={1}>
                    {tags?.map((item, index) => (
                        <Stack key={index} borderColor="#E2E3E5" borderWidth={1} p={1} borderRadius={6}>
                            <AppText>{item?.tag?.tag_name}</AppText>
                        </Stack>
                    ))}
                </HStack>
            </HStack>
            <Stack space={1}>
                <AspectRatio w="100%" ratio={18 / 6}>
                    <Image alt="fallback text" 
                    borderRadius={8} 
                    fallbackSource={{uri:image_thumbnail}} 
                    source={{uri:image_real}} />
                </AspectRatio>
            </Stack>
            <VStack p={1} space={1}>
                <HStack space={1}>
                    <Center bg="#EA3445" borderRadius={8} px={2} py={1}>
                        <Box _text={{
                            fontFamily: 'Poppins-Bold',
                            fontSize: 13,
                            color: "white"
                        }}>
                            {discount}
                        </Box>
                    </Center>
                    <AppText size={13} color="secondary" style={{ textDecorationLine: 'line-through' }}>Rp. {price_before},-</AppText>
                </HStack>
                <Stack space={1}>
                    <AppText size={22} font_type="bold">Rp. {price_after},-</AppText>
                </Stack>
            </VStack>
            <HStack space={1} alignItems="center" justifyContent="space-between">
                <HStack space={1} alignItems="center" justifyContent="space-between">
                    <HStack space={1} alignItems="center">
                        <AppText>
                            <MaterialIcons name="star-rate" color="#FFBF00" size={24} />
                        </AppText>
                        <AppText>{rating}</AppText>
                        <AppText>({review} Ulasan)</AppText>
                    </HStack>
                    <HStack space={1}>
                        {/* Add your desired components here */}
                    </HStack>
                </HStack>

                <HStack space={1}>
                    {/* <AppText>
                        <MaterialIcons name="favorite" color="#80848A" size={24} />
                    </AppText> */}
                    <AppText onPress={() => onShare()}>
                        <MaterialIcons name="share" color="#80848A" size={24} />
                    </AppText>
                </HStack>
            </HStack>
        </View>

    );
}

export default CoursePageDetail_Page;
