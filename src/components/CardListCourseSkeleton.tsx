import { Box, HStack, Skeleton, VStack, Stack } from 'native-base';
import React from 'react';
import { Dimensions, View } from "react-native";

var deviceWidth: any = Dimensions.get('window').width;

const CardLPKSearchSkeleton = () => {
    const cardlist = [] as Element[];

    for (var i = 0; i < 6; i += 2) {
        const row = (
            <HStack key={i}>
                <Box alignItems="center" w={deviceWidth / 2.1} p={1}>
                    <Box
                        rounded="lg"
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"
                        _dark={{
                            borderColor: "#E2E3E5",
                            backgroundColor: "#ffffff"
                        }}
                        _web={{
                            shadow: 1,
                            borderWidth: 0
                        }}
                        _light={{
                            backgroundColor: "#ffffff"
                        }}
                    >
                        <Box>
                            <Skeleton h={65} />
                        </Box>
                        <Stack padding={3} space={2}>
                            <Skeleton.Text />
                            <HStack alignContent="center" space={2}>
                                <Skeleton.Text />
                            </HStack>
                            <HStack alignItems="center" space={2}>
                                <Skeleton.Text />
                            </HStack>
                            <Skeleton.Text />
                        </Stack>
                    </Box>
                </Box>
                <Box alignItems="center" w={deviceWidth / 2} p={1}>
                    <Box
                        rounded="lg"
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"
                        _dark={{
                            borderColor: "#E2E3E5",
                            backgroundColor: "#ffffff"
                        }}
                        _web={{
                            shadow: 1,
                            borderWidth: 0
                        }}
                        _light={{
                            backgroundColor: "#ffffff"
                        }}
                    >
                        <Box>
                            <Skeleton h={65} />
                        </Box>
                        <Stack padding={3} space={2}>
                            <Skeleton.Text />
                            <HStack alignContent="center" space={2}>
                                <Skeleton.Text />
                            </HStack>
                            <HStack alignItems="center" space={2}>
                                <Skeleton.Text />
                            </HStack>
                            <Skeleton.Text />
                        </Stack>
                    </Box>
                </Box>
            </HStack>
        );

        cardlist.push(row);
    }

    return (
        <VStack>
            {cardlist}
        </VStack>
    );
}

export default CardLPKSearchSkeleton;