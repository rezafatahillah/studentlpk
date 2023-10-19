import { Box, HStack, Skeleton, VStack } from 'native-base';
import React from 'react';
import {
    Dimensions, StyleSheet, TouchableOpacity,
} from "react-native";
var deviceWidth: any = Dimensions.get('window').width;
const CardCourseSkeleton = () => {
    var cardlist = [] as Element[]
    for (var i = 0; i < 4; i++) {
        cardlist.push(
            <Box borderWidth={1} key={i} borderColor={'gray.300'} borderRadius={10}>
                <VStack w={deviceWidth / 2.3} p={0.5} borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                    borderColor: "coolGray.500"
                }} _light={{
                    borderColor: "coolGray.200"
                }}>
                    <Skeleton h="40" />
                    <Skeleton.Text px="4" />
                    <Skeleton rounded="md" />

                </VStack >
            </Box>
        )
    }
    return (
        <HStack justifyContent="space-between" space={1}>
            {cardlist}
        </HStack>
    )
}

export default CardCourseSkeleton