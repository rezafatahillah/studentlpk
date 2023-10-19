import { AppText } from 'components/Text';
import { Button, Divider, HStack, View } from 'native-base';
import React from 'react'
import QRCodeScanner from "react-native-qrcode-scanner";
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from 'types/RouteType';
const ScanBarcode = () => {
    const navigation = useNavigation<StackNavigation>();
    const onScanQRCode = (event) => {
        if (event && event?.data) {
            const regex = /NO_CERT=([A-Z0-9-]+)/;
            const match = event?.data.toUpperCase().match(regex);
            var data = match ? match[1] : '';
            navigation.navigate('cek_certificate', { cer_no: data });
        }
    };
    return (
        <QRCodeScanner
            onRead={onScanQRCode}
            topContent={
                <>
                    <AppText >
                        Scan QRCode yang ada di Sertifikat
                    </AppText>
                    <Divider />
                </>
            }
            bottomContent={
                <View>
                    <Button colorScheme={'success'} onPress={() => navigation.navigate('cek_certificate',{})}>Kembali</Button>
                </View>
            }
        />
    )
}

export default ScanBarcode