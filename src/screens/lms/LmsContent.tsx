import React from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import PDFView from 'react-native-pdf';
import { StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import PATH from '@config/api'
import { Box, Button, Divider, FormControl, HStack, Input, Modal, TextArea, VStack, View } from 'native-base';
import { AppText } from 'components/Text';
import colors from 'config/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from 'types/RouteType';
import { IContent, IQuis, ITopic } from 'types/ILmsCourse';
import { Batch } from 'types/IQuestion';
import { CurrentContent } from 'config/tools';
import courseService from '@services/courseService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalRating from 'components/ModalRating';

interface Props {
    course_uuid:string,
    slug: string,
    active?: CurrentContent,
    actionSelect: Function
}

const LmsContent = ({ course_uuid,slug, active, actionSelect }: Props) => {

    const [content, setContent] = React.useState<IContent<ITopic | IQuis>>({
        content: null
    });
    const navigation = useNavigation<StackNavigation>()
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const getCurrentContent = (slug: string, uuid: string, content_type: string) => {
        courseService.getcontent(slug, uuid, content_type).then(response => {
            const ret = response.data as unknown as IContent<IQuis | ITopic>;
            console.log("QUIS", response.data)
            setContent(ret);
            setRefresh(false);
        }).catch(error => {
            console.log("RESPONSE ERROR", error.response.data)
            actionSelect({});
            navigation.navigate('lmspage', { slug: slug })
        })
    }
    React.useEffect(() => {
        if (active?.uuid) {
            console.log("QUERY NOW")
            getCurrentContent(slug, active?.uuid ?? '', active?.content_type ?? '');
        }
    }, [active])
    const topiccontent = content?.content as ITopic
    const [playing, setPlaying] = React.useState(true);
    var height: any = Dimensions.get('window').height;
    const quiscontent = content?.content as IQuis
    const batch = content?.batch as Batch
    const RightAnswer = batch?.sum_point ?? 0 * batch?.question_qty ?? 0 / 100;
    const WrongAnswer = batch?.question_qty ?? 0 - RightAnswer;
    const [expand, setExpand] = React.useState(false);
    const onStateChange = React.useCallback((state) => {
        if (state === "ended" && active?.uuid) {
            console.log("Video Ended");
            setPlaying(false);
            courseService.submitYT(active?.uuid ?? '').then(response => {
                actionSelect({});
            }).catch(err => {
                console.log("VIDEO END DATA", err.response.data)
            })
        }
    }, []);
    const [modalVisible, setModalVisible] = React.useState(false);
    const onCloseModal=()=>{
        console.log("MODAL",modalVisible);
        setModalVisible(false)
        console.log("MODAL",modalVisible);
    }
    return (
        <>
            {
                active?.content_type === 'MC1' ? (
                    <>
                        {topiccontent?.resource_type === 'RT2' && (
                            <YoutubePlayer
                                height={height / 3}
                                play={playing}
                                videoId={topiccontent?.content.split('v=')[1]}
                                onChangeState={onStateChange}
                            />)}

                        {topiccontent?.resource_type === 'RT1' && (
                            <View style={[styles.container, {
                                height: expand ? '100%' : '35%',
                                position: expand ? 'absolute' : 'relative',
                            }]}>
                                <PDFView
                                    enablePaging
                                    style={[styles.pdf, {
                                        height: expand ? '100%' : '35%',
                                    }]}
                                    trustAllCerts={false}
                                    source={{ uri: PATH.pathlpkimage + topiccontent?.content }}
                                    onError={(error) => console.log('PDF Error: ', error)}
                                />
                                <View style={{ position: 'relative', width: '100%' }}>
                                    <Button onPress={() => setExpand(!expand)} colorScheme={'dark'} style={{ position: 'absolute', bottom: 5, right: 10 }}>
                                        <Ionicons size={20} name={expand ? 'contract' : 'expand'} />
                                    </Button>
                                </View>
                            </View>
                        )}
                    </>
                ) : (
                    <View height={'35%'} backgroundColor={'#fff'}>
                        {active?.progress_status == 'PS4' || active?.progress_status == 'PS3' ? (
                            <VStack space={2} padding={4}>
                                <AppText size={16} font_type='semibold'>Skor Ujian Anda {active?.progress_status}</AppText>
                                <HStack space={5}>
                                    <HStack alignItems={'flex-end'}>
                                        <AppText color={batch?.sum_point < batch?.pass_grade ? 'danger' : 'success'} style={{ lineHeight: 30 }} font_type='semibold' size={24}>{content?.batch?.sum_point ?? 0}</AppText>
                                        <AppText color={batch?.sum_point < batch?.pass_grade ? 'danger' : 'success'} size={10}>/100</AppText>
                                    </HStack>
                                    <HStack space={2} alignItems={'center'}>
                                        <AppText color='success' size={16}>{isNaN(RightAnswer) ? 0 : RightAnswer}</AppText>
                                        <AppText color='success'>Benar</AppText>
                                    </HStack>
                                    <HStack space={2} alignItems={'center'}>
                                        <AppText color='danger' size={16}>{isNaN(WrongAnswer) ? 0 : WrongAnswer}</AppText>
                                        <AppText color='danger'>Salah</AppText>
                                    </HStack>
                                </HStack>
                                {active?.progress_status == 'PS3' && (<Box borderWidth={1} rounded={'lg'} borderColor={'gray.300'} p={3}>
                                    <VStack space={1}>
                                        <AppText font_type='semibold'>Skor Anda Sudah Standar Kelulusan</AppText>
                                        <AppText size={10} color='secondary'>Selamat, Hasil Ujian Anda sudah mencapai batas kelulusan.</AppText>
                                        {batch?.sum_point < batch?.pass_grade && (
                                            <Button onPress={() => navigation.navigate('quizpage', { content: content as IContent<IQuis>, content_uuid: active?.uuid ?? '', slug: slug })} w={'150'} rounded={'xl'} colorScheme={'emerald'}><AppText color='white'>Ujian Ulang</AppText></Button>
                                        )}
                                        {(active?.content_type === 'MC5') && !active.is_rated && (
                                            <Button onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}
                                                w={'200'} rounded={'xl'} borderWidth={1} borderColor={'gray.600'} bgColor={'white'}><AppText >Beri Ulasan</AppText></Button>
                                        )}
                                        {(active?.content_type === 'MC5') && active.is_rated && (
                                            <Button onPress={() => navigation.navigate('certificateCourse', { slug: slug, title: 'ss' })}
                                                w={'200'} rounded={'xl'} colorScheme={'emerald'}><AppText color='white'>Lihat Sertifikat</AppText></Button>
                                        )}
                                    </VStack>
                                </Box>
                                )}
                                {active?.progress_status == 'PS4' && (<Box borderWidth={1} rounded={'lg'} borderColor={'gray.300'} p={3}>
                                    <VStack space={1}>
                                        <AppText font_type='semibold'>Skor Anda belum memenuhi Standar Kelulusan</AppText>
                                        <AppText size={10} color='secondary'>Maaf, Hasil Ujian Anda belum mencapai batas kelulusan. Silahkan lakukan ujian ulang</AppText>
                                        {batch?.sum_point < batch?.pass_grade &&  (
                                            <Button onPress={() => navigation.navigate('quizpage', { content: content as IContent<IQuis>, content_uuid: active?.uuid ?? '', slug: slug })} w={'100'} rounded={'xl'} colorScheme={'emerald'}><AppText color='white'>Ujian Ulang</AppText></Button>
                                        )}
                                    </VStack>
                                </Box>)}
                            </VStack>
                        ) : (
                            <VStack space={5} padding={5}>
                                <Box padding={4} borderWidth={1} borderColor={colors.bgGrey100} rounded={10}>
                                    <VStack space={3}>
                                        <HStack justifyContent={'space-between'}>
                                            <AppText color='secondary'>Jumlah Soal {JSON.stringify(active)}</AppText>
                                            <AppText font_type='semibold'>{quiscontent?.questions?.length}</AppText>
                                        </HStack>
                                        <HStack justifyContent={'space-between'}>
                                            <AppText color='secondary'>Nilai batas Kelulusan</AppText>
                                            <AppText font_type='semibold'>{quiscontent?.minimum_score}</AppText>
                                        </HStack>
                                    </VStack>
                                </Box>
                                {batch?.sum_point < batch?.pass_grade && (<Button onPress={() => navigation.navigate('quizpage', { content: content as IContent<IQuis>, content_uuid: active?.uuid ?? '', slug: slug })} colorScheme={'emerald'}>Mulai Ujian</Button>)}

                            </VStack>
                        )}
                    </View>
                )

            }
            <ModalRating visible={modalVisible} onClose={onCloseModal} course_uuid={course_uuid} onRefresh={actionSelect}/>
        </>

    )
}
export default LmsContent;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        elevation: 900000,
        width: '100%',

    },
    pdf: {
        flex: 1,
        width: '100%',
    },
});