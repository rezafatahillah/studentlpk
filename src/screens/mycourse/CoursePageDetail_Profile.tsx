import { HStack, VStack, View, Avatar, Box, ScrollView } from 'native-base';
import React from 'react';
import { AppText } from 'components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ICourseInstructor from 'types/courses/ICourseInstructor';
import ILpk from 'types/courses/ILpk';
import lpkcolors from '@config/colors';
import PATH from '@config/api';

interface PropsData {
    val: string | undefined;
    val2: ILpk | ICourseInstructor[] | undefined;
}

const CoursePageDetail_Profile = ({ val, val2 }: PropsData) => {

    let profile = '';
    let header = '';
    let title = '';
    let content = '';

    if (Array.isArray(val2)) {
        if (val2.length > 0) {
            if ('instructors' in val2[0]) {
                const instructor = val2[0] as ICourseInstructor;
                profile = PATH.pathlpkimage + instructor.instructors?.photo ? PATH.pathlpkimage + instructor.instructors?.photo : "";
                header = instructor.instructors?.firstname + ' ' + instructor.instructors?.lastname;
                content = instructor.instructors?.description;
            }
        }
    } else if (typeof val2 === 'object' && val2 !== null) {
        const lpk = val2 as ILpk;
        profile = PATH.pathlpkimage + lpk.lpk_detail.logo ? PATH.pathlpkimage + lpk.lpk_detail.logo : "";
        header = lpk.name;
        content = lpk.lpk_detail?.description;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} backgroundColor="#ffff">
            <Box backgroundColor="#fff" p={2}>
                <HStack space={1}>
                    <MaterialIcons name="panorama-vertical-select" color='#FFBF00' size={22} />
                    <AppText size={14} font_type={'bold'}>{val}</AppText>
                </HStack>
                <VStack>
                    <HStack mt={2} space={2}>
                        {profile ? (
                            <Avatar
                                borderWidth={1}
                                bg={lpkcolors.transparent}
                                source={{ uri: profile }} >{header}
                            </Avatar>
                        ) : (
                            <Avatar
                                borderWidth={1}
                                bg={lpkcolors.transparent}
                                source={require('@assets/images/white.jpg')} >{header}
                            </Avatar>
                        )}
                        <VStack>
                            <AppText>{header}</AppText>
                            <AppText>{title}</AppText>
                        </VStack>
                    </HStack>
                    <AppText>{content}</AppText>
                </VStack>
            </Box>
        </ScrollView>
    );
}

export default CoursePageDetail_Profile;
