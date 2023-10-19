import MyLoading from "components/MyLoading";
import { AppText } from "components/Text";
import { Button, Divider, HStack, Image, Input, VStack, View } from "native-base";
import React from "react";
import PDFView from 'react-native-pdf';
const CekCertificate = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState<string>('');
    const [cerno, setCerno] = React.useState<string>('');
    const onSearchCer = () => {
        console.log("SEARCH TEXT", searchText);
        setCerno(searchText.toUpperCase());
        setLoaded(true);
    }
    const handleInputChange = (text: string) => {
        setSearchText(text);
    };
    return (
        <VStack flex={1} space={3}>
            {loading ? (<MyLoading />)
                :
                (
                    <>
                        <View px={2} py={5} bgColor={'#fff'}>
                            <VStack space={3}>
                                <HStack space={2}>
                                    <Input w={'75%'} value={searchText} onChangeText={handleInputChange} placeholder="Masukkan nomor sertifikat" />
                                    <Button onPress={onSearchCer} w={'23%'} colorScheme={'success'}>Periksa</Button>
                                </HStack>
                                <HStack justifyContent={'space-between'} alignItems={'center'}>
                                    <Divider w={'40%'} />
                                    <AppText color="secondary">Atau</AppText>
                                    <Divider w={'40%'} />
                                </HStack>
                                <Button onPress={onSearchCer} colorScheme={'success'} variant={'outline'} >Scan QR Code</Button>
                            </VStack >
                        </View >
                        <View height={'100%'} px={2} py={5} bgColor={'#fff'}>
                            {!loaded ? (
                                <View p={3}>
                                    <VStack space={2} alignItems={'center'}>
                                        <Image alt="certificate empty" source={require('@assets/images/noresult.png')} />
                                        <AppText size={14} font_type="semibold">Sertifikat Tidak Ditemukan</AppText>
                                        <AppText color="secondary">Kami tidak dapat menemukan kecocokan untuk kode yang anda masukkan, silahkan masukkan ulang kode</AppText>
                                    </VStack>
                                </View>
                            ) : (<PDFView
                                enablePaging
                                style={[{
                                    height: '30%',
                                }]}
                                trustAllCerts={false}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    console.log(`Number of pages: ${numberOfPages}`);
                                }}
                                source={{ uri: 'https://api.student.rumahlpk.com/api/certificate/download/' + cerno }}
                                onLoadProgress={(val) => {
                                    console.log("PROGRESS S", val);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                    setLoaded(false)
                                }}
                            />)}

                        </View>
                    </>
                )}
        </VStack >
    )
}
export default CekCertificate;