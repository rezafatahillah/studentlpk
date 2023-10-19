import {
    AspectRatio,
    Box,
    Button,
    Card,
    Center,
    FlatList,
    Heading,
    HStack,
    Image,
    Stack,
    View,
    VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText } from 'components/Text';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from 'types/RouteType';
import instructureLpkPageService from '@services/instructureLpkPageService';
import IInstructors from 'types/courses/IInstructors';
import { ITableParams } from 'types/ITableParams';
import PATH from 'config/api';
import CardCourseSkeleton from 'components/CardCourseSkeleton';
import { Tabs } from 'react-native-collapsible-tab-view';
import { ILpkDetail } from 'types/ILpkDetail';

var deviceWidth: any = Dimensions.get('window').width;

interface PropsData {
    val: ILpkDetail;
}

const LpkPageDetail_User = ({ val }: PropsData) => {

    const StackNavigatePops = useNavigation<StackNavigation>();
    const [dataIns, setDataIns] = useState<IInstructors[]>([]);
    const uuid = val.uuid;
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState<ITableParams>({
        fields: [
            'id',
            'firstname',
            'lastname',
            'email',
            'phone',
            'profession',
            'description',
            'photo',
            'facebook',
            'instagram',
            'linkedin',
            'twitter',
            'medium',
            'youtube',
        ],
        filters: [
            {
                column: 'lpk.uuid',
                operator: '=',
                value: uuid,
            },
            { column: 'is_publish', operator: '=', value: 1 },
        ],
        sort: [],
    });
    const getDetailClass = (slug: any) => {
        StackNavigatePops.navigate('detailInstruktur', {
            screen: 'detailInstructure',
            params: { urlslug: val },
        } as never);
    };

    const dataInstruktur = () => {
        setLoading(true);
        if (uuid) {
            const updatedParams = { ...params };
            // updatedParams.filters[0].value = uuid;

            if (updatedParams.filters && updatedParams.filters.length > 0) {
                updatedParams.filters[0].value = uuid;
            }

            instructureLpkPageService
                .getInstructor(params)
                .then(res => {
                    // console.log(res)
                    setDataIns(res);

                    setLoading(false);
                })
                .catch(error => {
                    console.log(`Error while getting instructure: ${error}`);
                });
        } else {
            console.log('UUID is undefined or null');
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setDataIns([]);
            dataInstruktur();
        }, 5000);
        setLoading(false);
    };

    useEffect(() => {
        dataInstruktur();
    }, [uuid]);

    const renderItem = ({ item }) => {
        const fullName = `${item.firstname} ${item.lastname}`;
        const isLongName = fullName.length > 30;

        return (
            <TouchableOpacity onPress={() => getDetailClass(item.slug)}>
                <View style={{ flexDirection: 'row' }}>
                    <VStack w={deviceWidth / 2} p={1}>
                        <Box alignItems="center">
                            <Box
                                rounded="lg"
                                overflow="hidden"
                                borderColor="coolGray.200"
                                borderWidth="1"
                                _dark={{
                                    borderColor: '#E2E3E5',
                                    backgroundColor: '#ffffff',
                                }}
                                _web={{
                                    shadow: 1,
                                    borderWidth: 0,
                                }}
                                _light={{
                                    backgroundColor: '#ffffff',
                                }}
                            // style={{
                            //     height: isLongName ? 100 : 800, // Set different heights based on name length
                            // }}
                            >
                                <Box>
                                    <AspectRatio w="100%" ratio={16 / 9}>
                                        <Image
                                            alt="Image Course"
                                            accessibilityLabel="Image Course"
                                            source={{
                                                uri: PATH.pathlpkimage + item.photo,
                                            }}
                                        />
                                    </AspectRatio>
                                </Box>
                                <Stack paddingX={3} paddingY={5} space={1}>
                                    <HStack h={isLongName ? 10 : 10}>
                                        <AppText
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            size={12}
                                            font_type="bold"
                                            style={{ lineHeight: 16 }}
                                        >
                                            {fullName}
                                        </AppText>
                                    </HStack>

                                    <HStack alignContent={'center'} space={2} h={isLongName ? 5 : 5}>
                                        <AppText size={10} color="secondary">
                                            {item.profession}
                                        </AppText>
                                    </HStack>

                                    <Stack h={isLongName ? 40 : 40}>
                                        <AppText size={10} color="secondary" >
                                            {item.description}
                                        </AppText>
                                    </Stack>

                                </Stack>
                                <Button onPress={() => getDetailClass(item.slug)} backgroundColor={'emerald.500'}>Lihat Instruktur</Button>
                            </Box>
                        </Box>
                    </VStack>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Box alignItems="center" backgroundColor="#fff">
            {loading && <CardCourseSkeleton />}
            <Tabs.FlatList
                data={dataIns}
                renderItem={renderItem}
                numColumns={2}
                refreshing={loading}
                onRefresh={handleRefresh}
                contentContainerStyle={{ marginTop: 20 }}
            />
        </Box>
    );
}

export default LpkPageDetail_User;
