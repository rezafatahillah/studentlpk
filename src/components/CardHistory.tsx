import { useNavigation } from "@react-navigation/native";
import colors from "config/colors";
import { Badge, Box, Divider, HStack, Image, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PATH from '@config/api';
import ICardHistory from "@itype/ICardHistory";
import { statusdic } from "config/dictionary";
import { toCurrency } from "config/tools";
import { StackNavigation } from "types/RouteType";
import { AppText } from "./Text";

interface PropsData {
    data: ICardHistory
}
const CardHistory = (data: PropsData) => {
    const item = data.data
    const navigation = useNavigation<StackNavigation>();
    return (
        <Box bg="white" style={{ borderWidth: 1 }} mb={5} borderColor="coolGray.200" borderRadius="8">
            <TouchableOpacity onPress={() => navigation.navigate('trans_detail',{...item} as never)}>
                <HStack style={[style.rowBetween, { padding: 10 }]}>
                    <HStack style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons style={{ marginEnd: 10 }} name='clock-time-four-outline' size={20} />
                        <AppText>{item.created_at}</AppText>
                    </HStack>
                    <Badge colorScheme={statusdic[item.trx_status].bgcolor}>
                        <AppText font_type="medium" color={statusdic[item.trx_status].bgcolor} >{item.status_transaksi}</AppText>
                    </Badge>
                </HStack>
                <Divider />
                <HStack style={{ padding: 10 }}>
                    <Image resizeMode="cover" style={style.courseimage} alt="Alternate Text"
                        source={{ uri: PATH.pathlpkimage + item.course_logo }} />
                    <VStack style={{ flex: 1 }}>
                        <AppText style={{ fontSize: 14, alignSelf: 'stretch' }}>
                            {item.title}
                        </AppText>
                        <HStack alignItems={'center'} marginTop={3}>
                            <Image size={50} marginRight={3} borderRadius={100} resizeMode="cover" alt="Logo LPK"
                                source={{ uri: PATH.pathlpkimage + item.lpk_logo }} />
                            <VStack style={{ flex: 1 }}>
                                <AppText >{item.lpk_name}</AppText>
                                <AppText color="secondary">Instruktur <AppText style={{ color: colors.success700 }}>{item.instructor}</AppText></AppText>
                            </VStack>
                        </HStack>
                    </VStack>
                </HStack>
                <VStack style={{ padding: 10 }}>
                    <AppText style={{ color: colors.bgGrey400 }}>Total Pembayaran</AppText>
                    <AppText style={{ fontSize: 16, fontWeight: '900' }}>Rp.{toCurrency(item.price)}</AppText>
                </VStack>

            </TouchableOpacity>
        </Box>
    );
}
const style = StyleSheet.create({
    cardtransaction: {
        borderColor: colors.LineColor200,
        borderRadius: 10,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    courseimage: {
        width: '30%',
        height: 75,
        borderRadius: 10,
        marginEnd: 10,
    }
});

export default CardHistory;