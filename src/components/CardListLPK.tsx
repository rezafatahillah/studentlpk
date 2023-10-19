import { useNavigation } from "@react-navigation/native";
import colors from "config/colors";
import { Avatar, Badge, Box, Button, Divider, HStack, Image, Stack, Text, VStack, Center } from "native-base";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import PATH from '@config/api';
import { DataDetail, LpkDetail } from "types/ILPK";
import { StackNavigation, TabNavigation } from 'types/RouteType';
import { AppText } from "./Text";
import AntDesign from 'react-native-vector-icons/AntDesign';

interface PropsData {
    data: DataDetail;
}
const CardListLPK = (data: PropsData) => {
    const item = data.data;
    const navigation = useNavigation<StackNavigation>();
    const tabnavigation = useNavigation<TabNavigation>();
    const getDetailClass = (name: string, slug: string) => {
        navigation.navigate('lpkDetail', {
            name: name,
            slug: slug,
        });
    }
    const imageBackup = "https://kerma.widyatama.ac.id/wp-content/uploads/2021/05/blank-profile-picture-973460_1280.png";
    let lpk_logo = PATH.pathlpkimage + (!item.lpk_detail.logo ? imageBackup : item.lpk_detail.logo);
    let lpk_name = item.name;
    let lpk_slug = item.slug;
    let lpk_rating = item.rating;
    return (
        <Box bg="white" style={{ borderWidth: 1 }} mb={5} borderColor="coolGray.200" borderRadius="8">
            <TouchableOpacity onPress={() => getDetailClass(lpk_name, lpk_slug)}>
                <HStack padding={2} space={5}>

                    <Center>
                        <Image size="md" borderRadius={100} source={{
                            uri: lpk_logo
                        }} alt="Alternate Text" />
                    </Center>
                    <VStack>
                        <AppText>{lpk_name}</AppText>
                        <HStack space={2}>
                            <AntDesign
                                name="star"
                                size={16}
                                color={colors.warning500}
                            />
                            <AppText style={{ color: "#A0A4A8" }}>{lpk_rating}</AppText>
                        </HStack>
                    </VStack>
                </HStack>
                <Button m={2} variant="outline" colorScheme="success" onPress={() => getDetailClass(lpk_name, lpk_slug)}>
                    Lihat LPK
                </Button>

            </TouchableOpacity>
        </Box>
    );
}

export default CardListLPK;