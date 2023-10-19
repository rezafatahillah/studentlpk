import { HStack, VStack, View, Badge, Box, Center, Image, Stack } from 'native-base';
import React from 'react';
import {
    useWindowDimensions,
    TouchableOpacity,
    Share
} from 'react-native';
import { AppText } from './Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@itype/RouteType';


const CardSearchLPK = (props: any) => {

    const navigationStack = useNavigation<StackNavigation>();

    return (
        <HStack
            justifyContent="space-between"
            pt={2}
            w="100%"
            h={10}
            zIndex={1}
        >
            <Box w="10%" alignItems="center" justifyContent="center">
                <TouchableOpacity onPress={() => navigationStack.goBack()}>
                    <Stack>
                        <AppText>
                            <MaterialIcons name="arrow-back" color="#80848A" size={24} />
                        </AppText>
                    </Stack>
                </TouchableOpacity>
            </Box>

            <Box w="80%"  justifyContent="center">
                <TouchableOpacity
                    onPress={() =>
                        navigationStack.navigate('lpkList', { title: 'title untuk params' })
                    }
                >
                    <HStack
                        borderRadius={4}
                        w="100%"
                        h={10}
                        bg="#fff"
                        borderWidth={1}
                        borderColor="#E8E8E8"
                        p={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <AppText>
                            <MaterialIcons name="search" color="#80848A" size={24} />
                        </AppText>
                        <AppText>Cari LPK</AppText>
                    </HStack>

                </TouchableOpacity>
            </Box>

            <Box w="10%" alignItems="center" justifyContent="center">
                <TouchableOpacity onPress={() => navigationStack.navigate('trans_history')}>
                    <Stack>
                        <AppText>
                            <MaterialIcons name="shopping-cart" color="#80848A" size={24} />
                        </AppText>
                    </Stack>
                </TouchableOpacity>
            </Box>
        </HStack>
    );
};

export default CardSearchLPK;