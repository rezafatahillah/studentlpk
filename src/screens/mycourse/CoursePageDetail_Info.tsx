import { HStack, VStack, View, Box, ScrollView } from 'native-base';
import React from 'react';
import { AppText } from 'components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface PropsData {
    val: string | undefined;
    val2: string | string[] | undefined;
}

const CoursePageDetail_Info = ({ val, val2 }: PropsData) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} backgroundColor="#ffff">
            <Box backgroundColor="#fff" p={2}>
                <HStack space={2}>
                    <MaterialIcons name="panorama-vertical-select" color='#FFBF00' size={22} />
                    <AppText size={14} font_type={'bold'}>
                        {val}
                    </AppText>
                </HStack>
                <VStack>
                    {typeof val2 === 'string' ? ( // Check if val2 is a string
                        <HStack space={2}>
                            <AppText>{ }</AppText>
                            <AppText>{val2}</AppText>
                        </HStack>
                    ) : (
                        // val2 is an array of strings
                        val2?.map((item, index) => (
                            <HStack key={index} space={1}>
                                <AppText>
                                    <MaterialIcons name="done" color="#00B683" size={22} />
                                </AppText>
                                <AppText>{item}</AppText>
                            </HStack>
                        ))
                    )}
                </VStack>
            </Box>
        </ScrollView>
    );
}

export default CoursePageDetail_Info;
