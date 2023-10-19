import { AppText } from "components/Text";
import { Divider, HStack, Image, ScrollView, VStack, View, Modal, Progress, Circle } from "native-base";
import React, { useEffect, useState } from "react";
import { ICertificate } from "types/ICertificate";
import PATH from '@config/api'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PDFView from 'react-native-pdf';
import Share from 'react-native-share';
import { TouchableOpacity, PermissionsAndroid } from "react-native";
import service from 'services/service';
import RNFS, { DownloadResult } from 'react-native-fs';

const CertificateByCourse = (props: any) => {

    const urlslug = props.route.params.slug;

    const [data, setData] = useState<ICertificate[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await service.getCertificateCourse(urlslug);
            setData(response);
        } catch (error) {
            console.log(error);
        }
    };

    const checkPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'App needs access to your storage to download files.',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const downloadPDF = async (url: string, filename: string) => {
        try {
            const isPermissionGranted = await checkPermission();

            if (!isPermissionGranted) {
                console.log('Storage permission denied.');
                return;
            }

            const downloadDest = `${RNFS.DownloadDirectoryPath}/${filename}`;
            const options = {
                fromUrl: url,
                toFile: downloadDest,
                background: true,
                progressDivider: 10,
                progressInterval: 1000,
            };

            const jobId: DownloadResult = RNFS.downloadFile(options);

            jobId
                .promise()
                .then((res) => {
                    console.log('File downloaded successfully');
                    onShare(downloadDest);
                })
                .catch((error) => {
                    console.log('Error while downloading', error);
                });

            jobId.progress((data: { bytesWritten: number; contentLength: number }) => {
                const progress = (data.bytesWritten / data.contentLength) * 100;
                setDownloadProgress(progress);
            });
        } catch (error) {
            console.log('Error while downloading', error);
        }
    };

    const onShare = async (filePath: string) => {
        try {
            const options = {
                type: 'application/pdf',
                url: `file://${filePath}`,
                title: 'Share PDF',
            };

            await Share.open(options);
        } catch (error) {
            console.log('Error while sharing:', error);
        }
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <ScrollView>
                <View flex={1} bgColor={'#fff'}>
                    <VStack p={3}>
                        {data.map((item, index) => (
                            <View key={index} p={2}>
                                <View>
                                    <AppText size={14} font_type='semibold'>{item.certificate_type_label}</AppText>
                                </View>

                                <PDFView
                                    key={item.certificate_no}
                                    enablePaging
                                    style={[{
                                        height: 200,
                                    }]}
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`Number of pages: ${numberOfPages}`);
                                    }}
                                    trustAllCerts={false}
                                    source={{ uri: `https://api.student.rumahlpk.com/api/certificate/download/${item?.certificate_no}` }}
                                    onError={(error) => console.log('PDF Error: ', error)}
                                />

                                <HStack space={2} mt={2} alignItems={'center'} justifyContent={'space-between'}>
                                    <HStack space={2} alignItems={'center'}>
                                        <Image rounded={100} size={8} alt='lpk logo' source={{ uri: PATH.pathlpkimage + item.logo }} />
                                        <AppText>{item.name}</AppText>
                                    </HStack>
                                    <HStack space={5}>
                                        <TouchableOpacity onPress={() => {
                                            openModal();
                                            downloadPDF(`https://api.student.rumahlpk.com/api/certificate/download/${item?.certificate_no}`, `${item?.certificate_no}.pdf`);
                                        }}>
                                            <AppText>
                                                <MaterialIcons name="file-download" color="#80848A" size={24} />
                                            </AppText>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => onShare(`${RNFS.DownloadDirectoryPath}/${item?.certificate_no}.pdf`)}>
                                            <AppText>
                                                <MaterialIcons name="share" color="#80848A" size={24} />
                                            </AppText>
                                        </TouchableOpacity>
                                    </HStack>
                                </HStack>
                            </View>
                        ))}
                    </VStack>
                </View>
            </ScrollView>

            <Modal isOpen={modalVisible} onClose={closeModal}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Downloading PDF</Modal.Header>
                    <Modal.Body>
                        <VStack space={4} alignItems="center">
                            {isDownloading && (
                                <Progress
                                    size={80}
                                    colorScheme="primary"
                                    value={downloadProgress}
                                />
                            )}
                            <AppText>{isDownloading ? `Downloading... ${downloadProgress.toFixed(2)}%` : 'Download completed!'}</AppText>
                        </VStack>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </View>
    );
};

export default CertificateByCourse;
