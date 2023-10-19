import { Box, Button, FormControl, HStack, TextArea, VStack } from 'native-base';
import React, { useRef } from 'react';
import { View, Modal, TextInput, StyleSheet, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { AppText } from './Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from 'config/colors';
import courseService from '@services/courseService';

interface Props {
    visible: boolean;
    onClose: () => void;
    course_uuid:string;
    onRefresh:Function
}

const ModalRating: React.FC<Props> = ({ visible, onClose,course_uuid,onRefresh }) => {
    const textInputRef = useRef<TextInput>(null);
    const [star, setStar] = React.useState(0);
    const [comment, setComment] = React.useState('');

    const selectStar = (star) => {
        setStar(star);
    }
    let starsComponent = [] as Element[]
    for (var i = 1; i <= 5; i++) {
        starsComponent.push(
            <TouchableOpacity key={i} onPress={selectStar.bind(null, i)}>
                <AntDesign color={colors.warning500} size={30} name={i <= star ? 'star' : 'staro'} />
            </TouchableOpacity>
        )
    }
    const submitRating = () => {
        console.log("RATING DATA", {
            rating: star,
            comment: comment,
            uuid:course_uuid
        })
        courseService.submitRating(star,comment,course_uuid).then(response=>{
            onRefresh({});
        })
    }
    return (
        <Modal animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => { }}>
                        <Box backgroundColor={'white'} p={4} borderTopLeftRadius={10} borderTopRightRadius={10}>
                            <VStack mt={5} space={2}>
                                <AppText size={16} font_type='semibold'>Beri Rating Kelas Ini</AppText>
                                <Box backgroundColor={'#1D242F'} p={2} rounded={'lg'}>
                                    <HStack alignItems={'center'} space={2}>
                                        <Ionicons color="white" size={16} name='information-circle' />
                                        <AppText color='white'>Berikan ulasan dan rating untuk mendapatkan sertifikat.</AppText>
                                    </HStack>
                                </Box>
                                <VStack space={3} justifyContent={'center'}>
                                    <AppText  alignSelf={'center'} size={16} font_type='semibold'>Beri Rating</AppText>
                                    <HStack justifyContent={'center'} space={3}>
                                        {starsComponent}
                                    </HStack>
                                </VStack>
                                <FormControl mt="3">
                                    <TextArea
                                        onChangeText={(txt: string) => setComment(txt)}
                                        multiline={true}
                                        value={comment}
                                        placeholder="Tuliskan pengalaman anda tentang kursus ini" autoCompleteType={undefined} />

                                    <AppText size={10} color='secondary'>{`Tidak menerima karakter khusus (;<>=‘%{}/[])`}</AppText>
                                </FormControl>
                                <Button onPress={submitRating} colorScheme={'emerald'}>Kirim</Button>
                            </VStack>
                        </Box>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    boxContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});

export default ModalRating;
