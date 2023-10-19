import { Box, Button, HStack } from 'native-base';
import React, { useRef } from 'react';
import { View, Modal, TextInput, StyleSheet, Keyboard } from 'react-native';
import { AppText } from './Text';
import courseService from '@services/courseService';

interface Props {
    visible: boolean;
    module_content_uuid:string|undefined;
    onClose: () => void;
    onSubmitNote:(note:string)=>void;
    comment?:string,
}

const ModalTextArea: React.FC<Props> = ({ visible,module_content_uuid, onClose,onSubmitNote,comment}) => {
    const textInputRef = useRef<TextInput>(null);

    const handleKeyboardDidShow = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };
    const [note, setNote] = React.useState(comment??'')
    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        return () => {
            Keyboard.removeAllListeners('keyboardDidShow');
        };
    }, []);
    React.useEffect(()=>{
        setNote(comment??'');
    },[comment])
    const submit=()=>{
        onSubmitNote(note??'')
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}

        >
            <View style={styles.container}>
                <Box backgroundColor='#fff'>
                    <TextInput
                        value={note}
                        onChangeText={(txt: string) => setNote(txt)}
                        ref={textInputRef}
                        style={styles.textInput}
                        multiline={true}
                        placeholder="Ketik catatan Anda di sini…"
                    />
                    <HStack justifyContent={'space-between'} paddingX={3} paddingY={2} >
                        <Button onPress={onClose} variant="outline" colorScheme={'light'}>
                            <AppText>Batal</AppText>
                        </Button>
                        <Button onPress={submit} backgroundColor={'success.600'}>
                            <AppText color='white'>Simpan</AppText>
                        </Button>
                    </HStack>
                </Box>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textInput: {
        width: '100%',
        minHeight: 100,
        backgroundColor: '#fff',
        padding: 10,
    },
});

export default ModalTextArea;
