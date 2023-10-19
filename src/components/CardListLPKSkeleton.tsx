import { Box, HStack, Skeleton, VStack, Stack } from 'native-base';
import React from 'react';
import {
    Dimensions,
} from "react-native";
var deviceWidth: any = Dimensions.get('window').width;

const CardLPKSearchSkeleton = () => {
    var cardlist = [] as Element[]
    for (var i = 0; i < 8; i++) {
        cardlist.push(
            <Box key={i} bg="white" style={{ borderWidth: 1 }} mb={5} borderColor="coolGray.200" borderRadius="8">

                <HStack padding={2} space={5}>
                    <Stack>
                        <Skeleton h={65} w={100} />
                    </Stack>
                    <VStack>
                        <HStack space={2}>
                            <Skeleton.Text />
                        </HStack>
                    </VStack>
                </HStack>

            </Box>
        )
    }
    return (
        <VStack justifyContent="space-between" space={1}>
            {cardlist}
        </VStack>
    )
}

export default CardLPKSearchSkeleton;