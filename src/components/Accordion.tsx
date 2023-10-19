import { HStack, View, useToast } from 'native-base';
import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AppText } from './Text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'config/colors';
import { IModuleContent, IQuis, ITopic } from 'types/ILmsCourse';
interface AccordionProps {
    title: string;
    data: IModuleContent<ITopic | IQuis>[];
    actionSelect:Function
}
const Accordion: React.FC<AccordionProps> = ({ title, data,actionSelect }) => {
    const [expanded, setExpanded] = useState(false);
    const toast = useToast();
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
    const selectTopic = (item) => {
        console.log("ACCORDION",item.progress)
        actionSelect({
            uuid:item.uuid,
            content_type:item.content_type,
            progress_status:item.progress.progress_status
        });
        // toast.show({
        //     title: "Seected",
        //     placement: "top",
        // })
    }
    return (
        <View style={styles.container}>
            <View backgroundColor={'#EEEFF0'} padding={3} >
                <TouchableOpacity onPress={toggleAccordion}>
                    <HStack justifyContent={'space-between'}>
                        <HStack flex={1} space={2} alignContent='center'>
                            <Ionicons color={isAllTopicsComplete(data) ? colors.success700 : colors.bgGrey700} name='checkmark-circle' size={20} />
                            <AppText size={14}>{title}</AppText>
                        </HStack>
                        <Ionicons color={'#000'} name={expanded ? 'chevron-up' : 'chevron-down'} size={20} />
                    </HStack>
                </TouchableOpacity>
            </View>
            {expanded && (
                data?.map((item, index) => (
                    <TouchableOpacity  key={index} onPress={()=>selectTopic(item)}>
                        <View  key={index} flexWrap={'wrap'} paddingX={10} paddingY={3} style={styles.item}>
                            <HStack  space={2} alignContent="center">
                                <Ionicons
                                    color={item.progress.progress_status === 'PS3' ? colors.success700 : colors.bgGrey200}
                                    name={item.content_type === 'MC1' && item.content.resource_type === 'RT2' ? 'play-circle-outline' : 'document-outline'}
                                    size={20} />
                                <AppText   color={item.progress.progress_status === 'PS3' ? 'success' : ''} size={14} style={styles.itemText}>{item?.content?.title}</AppText>
                            </HStack>
                        </View>
                    </TouchableOpacity>
                ))
            )}
        </View>
    );
};

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

export default Accordion;
