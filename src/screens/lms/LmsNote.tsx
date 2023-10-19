import { AppText } from 'components/Text';
import colors from 'config/colors';
import { Box, Button, Center, HStack, Image, Modal, Skeleton, TextArea, View, VStack } from 'native-base';
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, RefreshControl } from 'react-native'
import ModalTextArea from 'components/ModalTextArea';
import { INote } from 'types/ILmsNote';
import AccordionNote from 'components/AccordionNote';
import { groupDataByUUID, INoteUI } from 'config/tools';
import courseService from '@services/courseService';
interface Props {
    slug: string,
    module_content_uuid: string
}
const LmsNote = ({ slug, module_content_uuid }: Props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [confirmVisible, setConfirmVisible] = React.useState(false);
    const [notes, setnotes] = React.useState<INote[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<INoteUI[]>([]);
    const [selectedUuid, setSelectedUuid] = React.useState<string>('');
    const [selectedComment, setSelectedComment] = React.useState<string>('');
    const [isUpdate, setIsUpdate] = React.useState<boolean>(false);
    const queryNotes = () => {
        setLoading(true)
        courseService.myNotes(slug).then(ret => {
            setnotes(ret)
            setData(groupDataByUUID(ret));
            console.log("RET", ret);
            setLoading(false)
        })
    }
    useEffect(() => {
        queryNotes()
        setData(groupDataByUUID(notes));
    }, [])
    //
    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setConfirmVisible(false);
        setIsUpdate(false)
        setSelectedUuid('');
        setSelectedComment('');
        console.log('CLEAR COMMENT',selectedComment)
    };
    const onEdit =async (uuid: string, comment: string) => {
        setSelectedUuid(uuid);
        const commentss=await setSelectedComment(comment)
        console.log('EDITED COMMENT',comment)
        console.log('EDITED COMMENTSSS',commentss)
        setModalVisible(true);
    }

    const confirmDelete = () => {
        handleCloseModal()
        courseService.deleteNote(selectedUuid).then(ret => {

            queryNotes()
        })
    }
    const onDelete = (uuid: string) => {
        setConfirmVisible(true)
        setSelectedUuid(uuid);
    }
    const accordiondata = () => {
        return (
            data?.map((item, index) => (
                <AccordionNote onEdit={onEdit} onDelete={onDelete} data={item} key={index} />
            ))
        )
    }
    const onSubmitNote = (note: string) => {
        if (isUpdate) {
            console.log("MASUK SUMIT EDIT",note)
            handleCloseModal()
            courseService.updateNote(note, module_content_uuid).then(ret => {
                queryNotes()
               
            })
         }
        else {
            console.log("MASUK SUMIT NEW",note)
            courseService.submitNote(note, module_content_uuid).then(ret => {
                queryNotes()
                handleCloseModal()
            })
        }

    }
    return (
        <View flex={1}>
            <Modal isOpen={confirmVisible} onClose={setConfirmVisible} size={'md'}>
                <Modal.Content maxH="212">
                    <Modal.CloseButton />
                    <Modal.Body>
                        <VStack space={3} justifyContent={'center'} >
                            <AppText alignSelf='center' size={14} font_type='semibold'>Hapus Catatan?</AppText>
                            <AppText textAlign={'center'} color={'secondary'}>Apakah Anda yakin ingin menghapus catatan ini?</AppText>

                            <HStack justifyContent={'space-between'}>
                                <Button onPress={handleCloseModal} variant={'outline'}><AppText>Batalkan</AppText></Button>
                                <Button onPress={confirmDelete} colorScheme={'emerald'}><AppText color='white'>Ya,Hapus</AppText></Button>
                            </HStack>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
            <ModalTextArea visible={modalVisible} comment={selectedComment} onSubmitNote={onSubmitNote} module_content_uuid={module_content_uuid} onClose={handleCloseModal} />
            <HStack padding={4} borderBottomWidth={1} borderColor={colors.LineColor100} justifyContent={'space-between'}>
                <Box width={'60%'}>
                    <AppText>Klik Tombol disamping untuk menambah catatan</AppText>
                </Box>
                <Button colorScheme={'success'} onPress={handleOpenModal}>Tambah Catatan</Button>
            </HStack>
            {
                loading ? (
                    <VStack space={2} padding={2}>
                        <Skeleton w={'full'} />
                        <Skeleton w={'full'} />
                        <Skeleton w={'full'} />
                        <Skeleton w={'full'} />
                        <Skeleton w={'full'} />
                    </VStack>
                ) :
                    data?.length > 0 ? (
                        <ScrollView refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={queryNotes}
                            />
                        }>
                            {accordiondata()}
                        </ScrollView>
                    ) : (
                        <VStack justifyContent={'center'} padding={5} alignItems='center'>
                            <Image size={'xl'} alt='empty-image' source={require('@assets/images/empty_note.png')} />
                            <AppText size={18} font_type='bold'>Belum ada Catatan</AppText>
                            <AppText style={{ textAlign: 'center' }} color='secondary'>Tambahkan Catatan untuk mempermudah Anda dalam belajar</AppText>
                        </VStack>)
            }
        </View>
    )
}

export default LmsNote;

const style = StyleSheet.create({
    note_container: {
        position: 'absolute',
        flex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 999,
        zIndex: 999
    }
});