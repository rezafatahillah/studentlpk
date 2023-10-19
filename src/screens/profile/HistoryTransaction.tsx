
import { Box, CheckIcon, Divider, HStack, Icon, Image, Input, ScrollView, Select, Skeleton, View, VStack } from "native-base";

import React from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardHistory from "components/CardHistory";
import type ICardHistory from "types/ICardHistory";
import profileServices from "services/profileServices";
import { RefreshControl } from 'react-native';

const HistoryTransaction = () => {
    const [status, setStatus] = React.useState("");
    const [histories, setHistories] = React.useState<ICardHistory[]>([]);
    const [refresh, setRefresh] = React.useState<boolean>(false);
    const getHistory = () => {
        setRefresh(true);
        profileServices.histTrans().then(response => {
            setRefresh(false);
            setHistories(response);
        }).catch(err => {
            setRefresh(false);
            console.log("err from component", err)
        })
    }
    React.useEffect(() => {
        getHistory();
    }, [])
    const onRefresh = async () => {
        await getHistory();
        return
    }
    const skeletoncomp = [] as Element[]
    for (var i = 0; i < 3; i++) {
        skeletoncomp.push(
            <Box key={i} bg="white" style={{ borderWidth: 1 }} mb={5} borderColor="coolGray.200" borderRadius="8">
                <HStack padding={5} justifyContent={'space-between'}>
                    <Skeleton h="4" w={150} />
                    <Skeleton h="4" w={100} />
                </HStack>
                <Divider />
                <VStack>
                    <HStack padding={5} space={2}>
                        <Skeleton h={65} w={100} />
                        <VStack space={2} flex={1}>
                            <Skeleton.Text />
                            <HStack space={2}>
                                <Skeleton h={50} w={50} />
                                <VStack space={2}>
                                    <Skeleton h="4" w={100} />
                                    <Skeleton h="4" w={100} />
                                </VStack>
                            </HStack>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 10 }}>
                <VStack>
                    <Input backgroundColor={'white'} InputLeftElement={
                        <Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />}
                        placeholder="Cari transaksimu disini" />
                    <HStack style={{ marginVertical: 10 }}>
                        <Input marginRight={4} w={{
                            base: "46%",
                            md: "25%"
                        }} backgroundColor={'white'} InputLeftElement={
                            <Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />}
                            placeholder="Cari transaksimu disini" />
                        <Select onValueChange={itemValue => setStatus(itemValue)} minWidth={'50%'} accessibilityLabel="Semua Status" placeholder="Semua Status" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }}  >
                            <Select.Item label="Semua Status" value="" />
                            <Select.Item label="Di Batalkan" value="ux" />
                            <Select.Item label="Menunggu Pembayaran" value="web" />
                            <Select.Item label="Lunas" value="cross" />
                        </Select>
                    </HStack>
                </VStack>
            </View>
            <Divider />

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={onRefresh}
                    />}
                style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>
                {
                    refresh ? skeletoncomp : histories?.map((item, index) => (
                        <CardHistory data={item} key={index} />
                    ))}
            </ScrollView>
        </View>
    )
}

export default HistoryTransaction;