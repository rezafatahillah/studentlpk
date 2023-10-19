import React, { useEffect, useState } from 'react';
import { AppText } from 'components/Text';
import {
    Box,
    Center,
    HStack,
    Icon,
    Image,
    Input,
    Select,
    View,
    VStack,
    CheckIcon,
    Stack,
    AspectRatio,
    useToast,
    Actionsheet,
    useDisclose,
    Button,
} from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import { toCurrency } from 'config/tools';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import colors from 'config/colors';
import { StackNavigation } from 'types/RouteType';
import { useAppSelector } from 'redux/hooks';
import courselpkPageService from '@services/courselpkPageService';
import { ITableParams } from 'types/ITableParams';
import ICourse from 'types/courses/ICourse';
import PATH from 'config/api';
import CardCourseSkeleton from 'components/CardCourseSkeleton';
import categorie from '@services/category';
import ICategorie from 'types/ICategorie';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IKind from 'types/courses/IKind';
import kind from 'services/kind';
import ILevel from 'types/courses/ILevel';
import level from 'services/level';
import { Tabs } from 'react-native-collapsible-tab-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ILpkDetail } from 'types/ILpkDetail';

interface PropsData {
    val: ILpkDetail;
}

var deviceWidth: any = Dimensions.get('window').width;

const LpkPageDetail_Class = ({ val }: PropsData) => {
    const uuid = val.uuid;

    const [dataCourse, setDataCourse] = useState<ICourse[]>([]);
    const toast = useToast();
    const profile = useAppSelector(state => state.login);
    const [loading, setLoading] = useState(false);
    const [kategori, setKategori] = useState<ICategorie[]>([]);
    const [jenisKelas, setJenisKelas] = useState<IKind>();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [activedCategory, setActivedCategory] = useState(false);
    const [rating, setRating] = useState('');
    const [selectedRate, setSelectedRate] = useState('');
    const [selectKind, setSelectKind] = useState('');
    const [tingkat, setTingkat] = useState<ILevel>();
    const [selectedTingkat, setSelectedTingkat] = useState('');
    const StackNavigatePops = useNavigation<StackNavigation>();

    const defaultParams = {
        fields: [
            'id',
            'title',
            'slug',
            'price_before',
            'price',
            'is_discount',
            'uuid',
            'image',
            'image_thumbnail',
            'thumbnail_img',
            'video_thumbnail',
            'course_instructor.*',
            'course_instructor.instructors.*',
            'type.*',
            'kind.*',
            'lpk.*',
            'lpk.lpk_detail.*',
            'is_publish',
        ],
        filters: [
            {
                column: 'lpk.uuid',
                operator: '=',
                value: uuid,
            },
            { column: 'is_publish', operator: '=', value: 1 },
            { column: 'version', operator: '>', value: 0 },
        ],
        sort: [],
    };

    const rate = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
    ];

    const [params, setParams] = useState<ITableParams>(defaultParams);
    // console.log('dc', defaultParams);

    const dataKursus = () => {
        setLoading(true);

        if (uuid) {
            const updatedParams = { ...params };
            if (updatedParams.filters && updatedParams.filters.length > 0) {
                updatedParams.filters[0].value = uuid;
            }

            // updatedParams.filters[0].value = uuid;

            courselpkPageService
                .getCourses(updatedParams)
                .then(res => {
                    setDataCourse(res);

                    setLoading(false);
                })
                .catch(error => {
                    console.log(`Error while getting courses: ${error}`);
                });
        } else {
            console.log('UUID is undefined or null');
            setLoading(false);
        }
    };

    const getDetailClass = (slug: any) => {
        StackNavigatePops.navigate('courseDetail', {
            screen: 'DetailProduct',
            params: { urlslug: slug },
        } as never);
        console.log('slug', slug);
    };

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setDataCourse([]);
            dataKursus();
        }, 5000);
        setLoading(false);
    };

    const category = () => {
        categorie
            .getCategory()
            .then(res => {
                setKategori(res);
            })
            .catch(error => {
                console.log(`Error while getting category: ${error}`);
            });
    };

    const jenis = () => {
        kind
            .getKind()
            .then(res => {
                setJenisKelas(res);
            })
            .catch(error => {
                console.log(`Error while getting kind: ${error}`);
            });
    };

    const grade = () => {
        level
            .getLevel()
            .then(res => {
                setTingkat(res);
            })
            .catch(error => {
                console.log(`Error while getting kind: ${error}`);
            });
    };

    const handleSelectCategory = (item: any) => {
        setSelectedCategory(item.title);
        setActivedCategory(true);
        setSelectedRate(item.value);
        setSelectKind(item.label);
        setSelectedTingkat(item.label);

        console.log('select', activedCategory);
    };

    const handleReset = () => {
        setSelectedCategory('');
        setActivedCategory(false);
        setSelectedRate('');
        setSelectKind('');
        setSelectedTingkat('');
    };

    const handleFilter = () => { };

    const { isOpen, onOpen, onClose } = useDisclose();

    useEffect(() => {
        dataKursus();
    }, [uuid]);

    useEffect(() => {
        console.log('kategori', selectedCategory);
        console.log('rating', rating);
        console.log('selectrating', selectedRate);
        console.log('select kind', selectKind);
        console.log('select kind', selectedTingkat);
    }, [selectedCategory, rating, selectedRate, selectKind, selectedTingkat]);

    const headerFlatlist = () => {
        return (
            <Tabs.ScrollView style={{ marginBottom: -700 }}>
                <VStack>
                    <HStack>
                        <Input
                            onPressIn={() => {
                                onOpen(), category(), jenis(), grade();
                            }}
                            marginRight={4}
                            w={{
                                base: '25%',
                                md: '25%',
                            }}
                            backgroundColor={'white'}
                            InputLeftElement={
                                <Icon
                                    as={<Ionicons name="filter" />}
                                    size={5}
                                    ml="2"
                                    color="muted.400"
                                />
                            }
                            placeholder="Filter"
                        />
                        <Select
                            onValueChange={itemValue => ''}
                            minWidth={'70%'}
                            accessibilityLabel="Urutkan"
                            placeholder="Urutkan"
                            _selectedItem={{
                                bg: 'teal.600',
                                endIcon: <CheckIcon size="5" />,
                            }}>
                            <Select.Item label="Terbaru" value="ux" />
                            <Select.Item label="Rating Terendah" value="web" />
                            <Select.Item label="Rating Tertinggi" value="cross" />
                        </Select>
                    </HStack>
                </VStack>
            </Tabs.ScrollView>
        );
    };

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => getDetailClass(item.slug)}>
                <VStack w={deviceWidth / 2} p={2}>
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
                            }}>
                            <Box>
                                <AspectRatio w="100%" ratio={16 / 9}>
                                    <Image
                                        alt="Image Course"
                                        source={{
                                            uri: PATH.pathlpkimage + item.image_thumbnail,
                                        }}
                                    />
                                </AspectRatio>
                            </Box>
                            <Stack paddingX={3} paddingY={5} space={2}>
                                <HStack space={1}>
                                    <Center bg="#FE730A" borderRadius={8} px="2" py="1">
                                        <Box
                                            _text={{
                                                fontFamily: 'Poppins-Regular',
                                                fontSize: 10,
                                                color: '#FAFAFA',
                                            }}
                                        >
                                            Terbaru
                                        </Box>
                                    </Center>
                                    <Center
                                        bg="#fff"
                                        borderRadius={8}
                                        borderWidth={1}
                                        borderColor={colors.bgGrey300}
                                        px="2"
                                        py="1">
                                        <Box
                                            _text={{
                                                fontFamily: 'Poppins-Regular',
                                                fontSize: 10,
                                            }}>
                                            Terbaru
                                        </Box>
                                    </Center>
                                </HStack>
                                <AppText
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    size={10}
                                    font_type="semibold"
                                    style={{ lineHeight: 16 }}>
                                    {item.title}
                                </AppText>
                                <HStack alignContent={'center'} space={2}>
                                    <AntDesign name="star" color={colors.warning500} size={14} />
                                    <AppText size={10} color="secondary">
                                        {`${item.rating.toFixed(1)} (${toCurrency(
                                            item.review_count * 1,
                                        )}) Ulasan`}
                                    </AppText>
                                </HStack>
                                {/* <LPKBadge lpk={item.lpk} instruktur={item.course_instructor} /> */}
                                <HStack alignItems="center" space={2}>
                                    <Center bg="#EA3445" borderRadius={8} px="2" py="1">
                                        <Box
                                            _text={{
                                                fontFamily: 'Poppins-Bold',
                                                fontSize: 10,
                                                color: 'white',
                                            }}>
                                            20 %
                                        </Box>
                                    </Center>
                                    <AppText
                                        size={10}
                                        color="secondary"
                                        style={{ textDecorationLine: 'line-through' }}>
                                        Rp. {toCurrency(item.price_before * 1)},-
                                    </AppText>
                                </HStack>
                                <AppText size={16} font_type={'bold'}>
                                    Rp. {toCurrency(item.price * 1)},-
                                </AppText>
                            </Stack>
                        </Box>
                    </Box>
                </VStack>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <Tabs.FlatList
                    ListHeaderComponent={headerFlatlist}
                    data={dataCourse}
                    renderItem={renderItem}
                    numColumns={2}
                    refreshing={loading}
                    onRefresh={handleRefresh}
                    contentContainerStyle={{ paddingTop: 10 }}
                />
                {loading && <CardCourseSkeleton />}
            </SafeAreaView>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <VStack>
                        <AppText size={16} font_type="bold">
                            Kategori
                        </AppText>
                        <ScrollView style={{ height: 100 }}>
                            <HStack
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}
                                space={3}>
                                {kategori.map(item => (
                                    <TouchableOpacity key={item.title} onPress={() => handleSelectCategory(item)}>
                                        <Box
                                            borderWidth={1}
                                            borderRadius={20}
                                            h={10}
                                            paddingX={2}
                                            mb={2}
                                            justifyContent="center"
                                            key={item.title}
                                            style={{
                                                borderColor:
                                                    item.title === selectedCategory
                                                        ? '#00B683'
                                                        : 'lightgrey',
                                                backgroundColor:
                                                    item.title === selectedCategory ? '#E8FFF3' : 'white',
                                            }}>
                                            <AppText
                                                alignSelf="center"
                                                style={{
                                                    color: item.title === selectKind ? 'success' : 'default',
                                                }}>
                                                {item.title}
                                            </AppText>
                                        </Box>
                                    </TouchableOpacity>
                                ))}
                            </HStack>
                        </ScrollView>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <AppText size={16} font_type="bold">
                                Jenis Kelas
                            </AppText>
                        </Box>

                        <Box height={10} justifyContent="center" width={60}>
                            {Array.isArray(jenisKelas) && jenisKelas.map(item => (
                                <TouchableOpacity key={item.label} onPress={() => handleSelectCategory(item)}>
                                    <Box
                                        borderWidth={1}
                                        borderRadius={20}
                                        h={10}
                                        paddingX={2}
                                        mb={2}
                                        justifyContent="center"
                                        key={item.label}
                                        style={{
                                            borderColor:
                                                item.label === selectKind ? '#00B683' : 'lightgrey',
                                            backgroundColor:
                                                item.label === selectKind ? '#E8FFF3' : 'white',
                                        }}>
                                        <AppText
                                            alignSelf="center"
                                            style={{
                                                color: item.label === selectKind ? 'success' : 'default',
                                            }}>
                                            {item.label}
                                        </AppText>
                                    </Box>
                                </TouchableOpacity>
                            ))}

                        </Box>

                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <AppText size={16} font_type="bold">
                                Tingkat
                            </AppText>
                        </Box>
                        <HStack
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                display: 'flex',
                                flexWrap: 'wrap',
                            }}
                            space={3}>
                            {Array.isArray(tingkat) && tingkat.map((item, index) => (
                                <TouchableOpacity key={item.label} onPress={() => handleSelectCategory(item)}>
                                    <Box
                                        borderWidth={1}
                                        borderRadius={20}
                                        h={10}
                                        paddingX={2}
                                        mb={2}
                                        justifyContent="center"
                                        key={item.label}
                                        style={{
                                            borderColor:
                                                item.label === selectedTingkat
                                                    ? '#00B683'
                                                    : 'lightgrey',
                                            backgroundColor:
                                                item.label === selectedTingkat ? '#E8FFF3' : 'white',
                                        }}>
                                        <AppText
                                            alignSelf="center"
                                            style={{
                                                color: item.label === selectKind ? 'success' : 'default',
                                            }}>
                                            {item.label}
                                        </AppText>
                                    </Box>
                                </TouchableOpacity>
                            ))}

                        </HStack>
                        <Box w="100%" h={60} px={4} justifyContent="center">
                            <AppText size={16} font_type="bold">
                                Rating
                            </AppText>
                        </Box>
                        <HStack space={3} mb={4}>
                            {rate.map((item: any) => (
                                    <TouchableOpacity  key={item.value} onPress={() => handleSelectCategory(item)}>
                                        <Box
                                            borderWidth={1}
                                            borderRadius={20}
                                            h={10}
                                            paddingX={4}
                                            mb={2}
                                            justifyContent="center"
                                            key={item.value}
                                            // borderColor={colors.bgGrey300}
                                            style={{
                                                borderColor:
                                                    item.value === selectedRate ? '#00B683' : 'lightgrey',
                                                backgroundColor:
                                                    item.value === selectedRate ? '#E8FFF3' : 'white',
                                            }}>
                                            <AppText
                                                alignSelf="center"
                                                style={{
                                                    color: item.label === selectKind ? 'success' : 'default',
                                                }}>
                                                <Ionicons name="star" color={colors.warning500} />{' '}
                                                {item.label}
                                            </AppText>
                                        </Box>
                                    </TouchableOpacity>
                                ))
                                .reverse()}
                        </HStack>

                        <HStack mb={6}>
                            <Button
                                color="white"
                                variant="ghost"
                                w={'30%'}
                                rounded={20}
                                onPress={() => handleReset()}>
                                <AppText color="success">Hapus Filter</AppText>
                            </Button>
                            <Button
                                bg={colors.buttonsubmitlpk}
                                w={'70%'}
                                h={10}
                                rounded={10}
                                onPress={handleFilter}>
                                <AppText color={'white'}>Terapkan Filter</AppText>
                            </Button>
                        </HStack>
                    </VStack>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
}

export default LpkPageDetail_Class;
