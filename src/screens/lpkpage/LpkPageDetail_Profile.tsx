import { HStack, VStack, View, Box, Center, Image } from 'native-base';
import React from 'react';
import { AppText } from 'components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ILpkDetail } from 'types/ILpkDetail';
import PATH from '@config/api';
import colors from 'config/colors';

interface PropsData {
    val: ILpkDetail;
}

const LpkPageDetail_Profile = ({ val }: PropsData) => {

    const title = val?.lpk_detail?.description ? val?.lpk_detail?.description : "";
    const image = val?.lpk_detail?.cover_photo
        ? PATH.pathlpkimage + val.lpk_detail.cover_photo
        : "";

    return (
        <Box backgroundColor="#ffff">
            <VStack padding={4} space={4}>
                <AppText size={18}>Tentang Perusahaan</AppText>
                <Center>
                    {title !== null ? (
                        <AppText size={14}>{title}</AppText>
                    ) : (
                        <AppText size={14}></AppText>
                    )}

                    <Box
                        width={330}
                        height={200}
                        mt={10}
                        borderWidth={1}
                        borderRadius={20}
                        borderColor={colors.bgGrey100}
                    >
                        {image ? (
                            <Center flex={1}>
                                <Image
                                    size={30}
                                    width={330}
                                    height={100}
                                    marginRight={3}
                                    borderRadius={100}
                                    resizeMode="center"
                                    alignItems="center"
                                    style={{ width: '100%', height: '100%' }}
                                    source={{
                                        uri: image,
                                    }}
                                    accessibilityLabel="image"
                                    alt="image"
                                />
                            </Center>
                        ) : (
                            <Center flex={1}>
                                <Image
                                    size={30}
                                    width={330}
                                    height={100}
                                    marginRight={3}
                                    borderRadius={100}
                                    resizeMode="center"
                                    alignItems="center"
                                    style={{ width: '100%', height: '100%' }}
                                    source={require('@assets/images/white.jpg')}
                                    accessibilityLabel="image"
                                    alt="image"
                                />
                            </Center>
                        )}
                    </Box>
                </Center>
            </VStack>
        </Box>
    );
};

export default LpkPageDetail_Profile;
