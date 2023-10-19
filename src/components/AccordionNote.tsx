import { Divider, HStack, VStack, View } from 'native-base';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AppText } from './Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'
import colors from 'config/colors';
import { INote } from 'types/ILmsNote';
import { INoteUI, formatDate } from 'config/tools';

interface AccordionProps {
    data: INoteUI;
    onEdit:(uuid:string,comment:string)=>void
    onDelete:(uuid:string)=>void
}
const AccordionNote = ({ data,onEdit,onDelete }: AccordionProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const toggleAccordion = () => {
        setExpanded(!expanded);
    };
    const isAllTopicsComplete = (data) => {
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item.progress.progress_status !== 'PS3') {
                return false;
            }
        }
        return true;
    };
    const onDeleteNote=(uuid:string)=>{
        onDelete(uuid)
    }
    const onEditNote=(uuid:string,comment:string)=>{
        onEdit(uuid,comment)
    }
    return (
        <View style={styles.container}>
            <View backgroundColor={'#EEEFF0'} padding={3} >
                <TouchableOpacity onPress={toggleAccordion}>
                    <HStack justifyContent={'space-between'}>
                        <HStack flex={1} space={2} alignContent='center'>
                            <AppText numberOfLines={1} size={14}>{data.title}</AppText>
                        </HStack>
                        <Ionicons color={'#000'} name={expanded ? 'chevron-up' : 'chevron-down'} size={20} />
                    </HStack>
                </TouchableOpacity>
            </View>
            {expanded && (
                data?.notes?.map((item, index) => (
                        <VStack key={index} flexWrap={'wrap'} space={3} paddingX={10} paddingY={3} style={styles.item}>
                            <HStack space={2} alignContent="center" justifyContent={'flex-start'}>
                                <AppText color='success'>{formatDate(item.created_at)}</AppText>
                                <Divider color='success.700' orientation='vertical' />
                                <View flex={1}>
                                    <AppText numberOfLines={1} color='success'>{item.title}</AppText>
                                </View>
                            </HStack>
                            <AppText>{item.comments}</AppText>
                            <HStack space={5}>
                                <TouchableOpacity onPress={()=>onEditNote(item.uuid,item.comments)}>
                                    <HStack space={2}>
                                        <MaterialCommunityIcons name={'note-edit-outline'} size={20} />
                                        <AppText>Edit</AppText>
                                    </HStack>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>onDeleteNote(item.uuid)} >
                                    <HStack space={2}  >
                                        <Ionicons name={'trash-outline'} size={20} />
                                        <AppText>Hapus</AppText>
                                    </HStack>
                                </TouchableOpacity>
                            </HStack>
                        </VStack>
                ))
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgGrey50,
        elevation: 2,
    },
    header: {
        padding: 10,
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: colors.LineColor100,
    },
    itemText: {
        fontSize: 14,
    },
});

export default AccordionNote