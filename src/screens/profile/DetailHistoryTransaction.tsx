import colors from "config/colors";
import { Badge, Divider, HStack, Image, Text, View, VStack, Box, Button } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import PATH from '@config/api';
import ICardHistory from "@itype/ICardHistory";
import { statusdic } from "config/dictionary";
import { toCurrency } from "config/tools";
import { AppText } from "components/Text";
import { StackNavigation } from '@itype/RouteType';
import { useNavigation } from '@react-navigation/native';

const DetailHistoryTransaction = ({ route, navigation }) => {
    const navigationStack = useNavigation<StackNavigation>();
    const item = route.params as ICardHistory;
    console.log(item)
    return (
        <VStack space={1}>
            <VStack space={4} style={{ backgroundColor: '#fff', padding: 20 }}>
                <HStack justifyContent={'space-between'}>
                    <AppText color={'secondary'}>No Invoice</AppText>
                    <AppText>{item.invoice_number}</AppText>
                </HStack>
                <HStack justifyContent={'space-between'}>
                    <AppText color={'secondary'}>Tanggal Pembelian</AppText>
                    <AppText>{item.created_at}</AppText>
                </HStack>
                <HStack justifyContent={'space-between'}>
                    <AppText color={'secondary'}>Status</AppText>
                    <Badge colorScheme={statusdic[item.trx_status].bgcolor}>
                        <AppText font_type="medium" color={statusdic[item.trx_status].bgcolor} >{item.status_transaksi}</AppText>
                    </Badge>
                </HStack>
            </VStack>
            <VStack style={{ backgroundColor: '#fff', padding: 20 }}>
                <AppText size={14} font_type="semibold" style={{ marginBottom: 15 }}>Detail Kelas</AppText>
                <VStack>
                    <HStack>
                        <Image resizeMode="cover" style={style.courseimage} alt="Alternate Text"
                            source={{ uri: PATH.pathlpkimage + item.course_logo }} />
                        <VStack space={2} style={{ flex: 1 }}>
                            <AppText style={{ fontSize: 13, alignSelf: 'stretch' }}>
                                {item.title}
                            </AppText>
                            <AppText size={14} font_type="medium">Rp.{toCurrency(item.price)}</AppText>
                            <HStack>
                                <Image size={35} borderRadius={100} resizeMode="cover" alt="Logo LPK"
                                    source={{ uri: PATH.pathlpkimage + item.lpk_logo }} />
                                <VStack>
                                    <AppText style={{ fontSize: 10 }}>{item.lpk_name}</AppText>
                                    <HStack alignItems={'center'}>
                                        <AppText size={8} color="secondary">Instruktur </AppText>
                                        <AppText size={8} color="success">{item.instructor}</AppText>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
            <VStack space={3} style={{ backgroundColor: '#fff', padding: 20 }}>
                <AppText style={{ fontSize: 16, fontWeight: '900', marginBottom: 15 }}>Detail Pembayaran</AppText>
                <HStack justifyContent={'space-between'}>
                    <AppText color={'secondary'}>Metode Pembayaran</AppText>
                    <AppText font_type="medium">{item.status_midtrans}</AppText>
                </HStack>
                <Divider />
                <HStack justifyContent={'space-between'}>
                    <AppText color={'secondary'}>Total Harga</AppText>
                    <AppText >Rp.{toCurrency(item.price)}</AppText>
                </HStack>
                <HStack justifyContent={'space-between'}>
                    <AppText color={'secondary'}>Potongan Harga</AppText>
                    <AppText >Rp.0</AppText>
                </HStack>
                <Divider />
                <HStack justifyContent={'space-between'}>
                    <AppText font_type="semibold">Total Pembelian</AppText>
                    <AppText font_type="semibold">Rp.{toCurrency(item.price)}</AppText>
                </HStack>
            </VStack>
            <Box
                backgroundColor={'#fff'}
                zIndex={999}
                padding={5}
                borderTopWidth={1}
                borderTopColor={colors.bgGrey200}
                style={{ bottom: 0, left: 0, right: 0, position: 'absolute' }}>
                <Button colorScheme={'success'} onPress={() => navigationStack.navigate('payment', { screen: 'DetailProduct', params: { snap_token: item.snap_token } } as never)}>
                    Lanjutkan Pembayaran
                </Button>
            </Box>
        </VStack>
    )
}
const style = StyleSheet.create({

    courseimage: {
        width: '25%',
        height: 60,
        borderRadius: 10,
        marginEnd: 10,
    }
});

export default DetailHistoryTransaction;