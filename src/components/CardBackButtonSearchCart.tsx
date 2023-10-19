import React, { useEffect, useState } from 'react';
import { Box, Divider, HStack, VStack, View, Image } from 'native-base';
import { AppText } from './Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ILpkDetail } from '@itype/ILpkDetail';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from 'config/colors';
import PATH from '@config/api';
import LpkPageSkeleton from 'components/LpkPageSkeleton';



const CardBackButtonSearchCart = () => {

    const navigation = useNavigation<any>();

    return (
        <View>
            <HStack
                justifyContent="space-between"
                w="100%"
                h="60"
                borderBottomLeftRadius={2}
                borderBottomRightRadius={20}
                zIndex={1}>
                <Box p={1}>
                    <HStack space={4} p={4} mb={3} justifyContent="space-between">
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" color="#80848A" size={32} />
                        </TouchableOpacity>
                        <Box w="85%">
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('HomeStack' as never, {
                                        screen: 'SearchCertificateScreen',
                                        title: 'classsearch',
                                    })
                                }>
                                <HStack
                                    borderRadius={6}
                                    h="40px"
                                    bg="#fff"
                                    borderWidth={1}
                                    borderColor="#EDEDED"
                                    p={2}>
                                    <AppText>
                                        <MaterialIcons
                                            name="search"
                                            color="#80848A"
                                            size={24}
                                        />
                                    </AppText>
                                    <AppText>Cari Kelas</AppText>
                                </HStack>
                            </TouchableOpacity>
                        </Box>
                    </HStack>
                </Box>
            </HStack>

            <Divider mt={4} />
        </View>
    );
}

export default CardBackButtonSearchCart;
