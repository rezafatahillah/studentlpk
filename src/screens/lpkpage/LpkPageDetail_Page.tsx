import React, { useEffect, useState } from 'react';
import { Box, Divider, HStack, VStack, View, Image } from 'native-base';
import { AppText } from 'components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ILpkDetail } from '@itype/ILpkDetail';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from 'config/colors';
import PATH from '@config/api';
import LpkPageSkeleton from 'components/LpkPageSkeleton';

interface PropsData {
    val: ILpkDetail;
}

const LpkPageDetail_Page = ({ val }: PropsData) => {
    const name              = val.name ? val.name : "";
    const email             = val.email ? val.email : "";
    const courseCount       = val.courses_count ? val.courses_count : 0;
    const instructorCount   = val.instructors_count ? val.instructors_count : 0;
    const studentCount      = val.student_count ? val.student_count : 0;

    const logo = val?.lpk_detail?.logo
        ? PATH.pathlpkimage + val.lpk_detail.logo
        : '';

    return (
        <View>
            <Box>
                <VStack>
                    <HStack padding={4}>
                        <Box
                            width={130}
                            height={100}
                            borderWidth={1}
                            borderRadius={20}
                            borderColor={colors.bgGrey100}
                            alignItems="center"
                            justifyContent="center"
                        >
                            {logo ? (
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="center"
                                    alignItems="center"
                                    alignSelf="center"
                                    source={{
                                        uri: logo,
                                    }}
                                    alt="image"
                                    accessibilityLabel="image"
                                />
                            ) : (
                                <Image
                                style={{ width: '100%', height: '100%' }}
                                    resizeMode="center"
                                    alignItems="center"
                                    alignSelf="center"
                                    source={require('@assets/images/white.jpg')}
                                    alt="Fallback Image"
                                    accessibilityLabel="Fallback Image"
                                />
                            )}
                        </Box>
                        <VStack width="80%" paddingX={4} alignSelf="center">
                            <AppText font_type="bold" size={14}>
                                {name}
                            </AppText>
                            <AppText size={10} style={{color: '#1D242F'}}>
                                {email}
                            </AppText>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
            <HStack mb={4} justifyContent="space-between">
                <VStack w={'33%'} alignItems="center" alignSelf={'center'}>
                    <AppText style={{color: '#1D242F'}}>Kelas</AppText>
                    <AppText font_type="bold" size={14}>
                        {courseCount}
                    </AppText>
                </VStack>
                <Divider orientation="vertical" />
                <VStack w={'33%'} alignItems="center" alignSelf={'center'}>
                    <AppText style={{color: '#1D242F'}}>Instruktur</AppText>
                    <AppText font_type="bold" size={14}>
                        {instructorCount}
                    </AppText>
                </VStack>
                <Divider orientation="vertical" />
                <VStack w={'33%'} alignItems="center" alignSelf={'center'}>
                    <AppText style={{color: '#1D242F'}}>Peserta</AppText>
                    <AppText font_type="bold" size={14}>
                        {studentCount}
                    </AppText>
                </VStack>
            </HStack>
        </View>
    );
};

export default LpkPageDetail_Page;
