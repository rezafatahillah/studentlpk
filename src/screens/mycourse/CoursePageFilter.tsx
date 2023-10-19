import React, { useEffect, useState } from 'react';
import { Actionsheet, Box, Button, HStack, ScrollView, VStack, Select, View, Spinner } from 'native-base';
import { AppText } from '../../components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import categorie from 'services/category';
import kind from 'services/kind';
import level from 'services/level';
import ICategorie from 'types/ICategorie';
import IKind from 'types/courses/IKind';
import ILevel from 'types/courses/ILevel';
import { TouchableOpacity } from 'react-native';

interface PropsData {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilter: (categories: string[], jenisKelas: string[], tingkat: string[], rate: string[]) => void;
}

const CoursePageFilter = ({ isOpen, onClose, onApplyFilter }: PropsData) => {
    const [kategori, setKategori] = useState<ICategorie[]>([]);
    const [jenisKelas, setJenisKelas] = useState<IKind>();
    const [tingkat, setTingkat] = useState<ILevel>();
    const rate = [
        { value: '5', label: '5' },
        { value: '4', label: '4' },
        { value: '3', label: '3' },
        { value: '2', label: '2' },
        { value: '1', label: '1' },
    ];

    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedJenisKelas, setSelectedJenisKelas] = useState<string[]>([]);
    const [selectedTingkat, setSelectedTingkat] = useState<string[]>([]);
    const [selectedRate, setSelectedRate] = useState<string[]>([]);

    const category = () => {
        setLoading1(true);
        categorie
            .getCategory()
            .then((res) => {
                setKategori(res);
                setLoading1(false);
            })
            .catch((error) => {
                console.log(`Error while getting category: ${error}`);
                setLoading1(false);
            });
    };

    const jenis = () => {
        setLoading2(true);
        kind
            .getKind()
            .then((res) => {
                setJenisKelas(res);
                setLoading2(false);
            })
            .catch((error) => {
                console.log(`Error while getting kind: ${error}`);
                setLoading2(false);
            });
    };

    const grade = () => {
        setLoading3(true);
        level
            .getLevel()
            .then((res) => {
                // console.log(res)
                setTingkat(res);
                setLoading3(false);
            })
            .catch((error) => {
                console.log(`Error while getting kind: ${error}`);
                setLoading3(false);
            });
    };

    const handleCategoryChange = (value: string) => {
        const selected = [...selectedCategories];
        const index = selected.indexOf(value);
        if (index !== -1) {
            selected.splice(index, 1);
        } else {
            selected.push(value);
        }
        setSelectedCategories(selected);
    };

    const handleJenisKelasChange = (value: string) => {
        const selected = [...selectedJenisKelas];
        const index = selected.indexOf(value);
        if (index !== -1) {
            selected.splice(index, 1);
        } else {
            selected.push(value);
        }
        setSelectedJenisKelas(selected);
    };

    const handleTingkatChange = (value: string) => {
        const selected = [...selectedTingkat];
        const index = selected.indexOf(value);
        if (index !== -1) {
            selected.splice(index, 1);
        } else {
            selected.push(value);
        }
        setSelectedTingkat(selected);
    };

    const handleRateChange = (value: string) => {
        const selected = [...selectedRate];
        const index = selected.indexOf(value);
        if (index !== -1) {
            selected.splice(index, 1);
        } else {
            selected.push(value);
        }
        setSelectedRate(selected);
    };

    const handleClearFilter = () => {
        setSelectedCategories([]);
        setSelectedJenisKelas([]);
        setSelectedTingkat([]);
        onApplyFilter([], [], [], []);
        onClose();
    };

    const handleApplyFilter = () => {
        onApplyFilter(selectedCategories, selectedJenisKelas, selectedTingkat, selectedRate);
        onClose();
    };

    useEffect(() => {
        category();
        jenis();
        grade();
    }, []);

    return (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
                <VStack>
                    <AppText size={16} font_type="bold">Kategori</AppText>
                    {loading1 ? (
                        <Spinner />
                    ) : (
                        <ScrollView style={{ height: 100 }}>
                            <HStack
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}
                                space={3}>
                                {kategori.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleCategoryChange(item.uuid)}
                                        style={{
                                            marginRight: 8,
                                        }}
                                    >
                                        <Box
                                            borderWidth={1}
                                            borderRadius={20}
                                            h={10}
                                            paddingX={2}
                                            mb={2}
                                            justifyContent="center"
                                            style={{
                                                borderColor: selectedCategories.indexOf(item.uuid) !== -1 ? '#00B683' : 'lightgrey',
                                                backgroundColor: selectedCategories.indexOf(item.uuid) !== -1 ? '#E8FFF3' : 'white',
                                            }}

                                        >
                                            <AppText alignSelf="center">{item.title}</AppText>
                                        </Box>
                                    </TouchableOpacity>
                                ))}

                            </HStack>
                        </ScrollView>
                    )}

                    <AppText size={16} font_type="bold">Jenis Kelas</AppText>
                    {loading2 ? (
                        <Spinner />
                    ) : (
                        <ScrollView style={{ height: 50 }}>
                            <HStack
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}
                                space={3}>
                                {Array.isArray(jenisKelas) && jenisKelas.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleJenisKelasChange(item.code_name)}
                                        style={{
                                            marginRight: 8,
                                        }}
                                    >
                                        <Box
                                            borderWidth={1}
                                            borderRadius={20}
                                            h={10}
                                            paddingX={2}
                                            mb={2}
                                            justifyContent="center"
                                            style={{
                                                borderColor: selectedJenisKelas.indexOf(item.code_name) !== -1 ? '#00B683' : 'lightgrey',
                                                backgroundColor: selectedJenisKelas.indexOf(item.code_name) !== -1 ? '#E8FFF3' : 'white',
                                            }}

                                        >
                                            <AppText alignSelf="center">{item.label}</AppText>
                                        </Box>
                                    </TouchableOpacity>
                                ))}
                            </HStack>
                        </ScrollView>
                    )}

                    <AppText size={16} font_type="bold">Tingkat</AppText>
                    {loading3 ? (
                        <Spinner />
                    ) : (
                        <ScrollView style={{ height: 50 }}>
                            <HStack
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}
                                space={3}>
                                {Array.isArray(tingkat) && tingkat.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleTingkatChange(item.code_name)}
                                        style={{
                                            marginRight: 8,
                                        }}
                                    >
                                        <Box
                                            borderWidth={1}
                                            borderRadius={20}
                                            h={10}
                                            paddingX={2}
                                            mb={2}
                                            justifyContent="center"
                                            style={{
                                                borderColor: selectedTingkat.indexOf(item.code_name) !== -1 ? '#00B683' : 'lightgrey',
                                                backgroundColor: selectedTingkat.indexOf(item.code_name) !== -1 ? '#E8FFF3' : 'white',
                                            }}

                                        >
                                            <AppText alignSelf="center">{item.label}</AppText>
                                        </Box>
                                    </TouchableOpacity>
                                ))}
                            </HStack>
                        </ScrollView>
                    )}

                    <AppText size={16} font_type="bold">Rating</AppText>
                    <ScrollView horizontal>
                        <HStack>
                            {Array.isArray(rate) && rate.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleRateChange(item.value)}
                                    style={{
                                        marginRight: 8,
                                    }}
                                >
                                    <Box
                                        borderWidth={1}
                                        borderRadius={10}
                                        h={10}
                                        paddingX={2}
                                        mb={2}
                                        justifyContent="center"
                                        style={{
                                            borderColor: selectedRate.indexOf(item.value) !== -1 ? '#00B683' : 'lightgrey',
                                            backgroundColor: selectedRate.indexOf(item.value) !== -1 ? '#E8FFF3' : 'white',
                                        }}

                                    >
                                        <HStack style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <MaterialIcons name="star" size={16} color="gold" />
                                            <AppText alignSelf="center">{item.label}</AppText>
                                        </HStack>

                                    </Box>
                                </TouchableOpacity>
                            ))}
                        </HStack>
                    </ScrollView>

                    <HStack mb={6} space={2} p={2}>
                        <Button bg="blue.500" w={'50%'} h={10} rounded={10} onPress={handleClearFilter}>
                            Hapus Filter
                        </Button>

                        <Button bg="blue.500" w={'50%'} h={10} rounded={10} onPress={handleApplyFilter}>
                            Terapkan Filter
                        </Button>
                    </HStack>
                </VStack>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default CoursePageFilter;