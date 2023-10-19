import { HStack, VStack, View, Badge, Box, Center, Image, Stack, Button } from 'native-base';
import React, { useEffect, useState } from "react";
import {
    useWindowDimensions,
    TouchableOpacity,
    Share
} from 'react-native';
import { AppText } from './Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '@itype/RouteType';
import service from 'services/service';
import colors from 'config/colors';
import { useAppSelector, useAppDispatch } from '@redux/hooks';

interface PropsData {
    val: string | undefined;
}

const CardButtonBuySnap = ({ val }: PropsData) => {

    const classUUID = val;

    const reduxProfile = useAppSelector(state => state.login);
    const navigationStack = useNavigation<StackNavigation>();
    const [paramSnap, setParamSnap] = useState<Object>({
        transaction_details: [
            {
                product_id: ''
            }
        ]
    })

    const getSnapToken = () => {

        // Update paramSnap state with new product_id
        if (classUUID) {

            if (reduxProfile.dataLogin.token) {
                const updatedParamSnap = {
                    ...paramSnap,
                    transaction_details: [
                        {
                            product_id: classUUID
                        }
                    ]
                };

                service.getSnapToken(updatedParamSnap).then((response) => {
                    // console.log("masuk:" + response)
                    // setSnapID(response)
                    navigationStack.navigate('payment', { screen: 'DetailProduct', params: { snap_token: response } } as never)
                }).catch((error) => {
                    console.log("error:" + error)
                    navigationStack.navigate('trans_history')
                });
            } else {
                navigationStack.navigate('loginpage')
            }

        }


    }

    useEffect(() => {
        console.log(classUUID)

    }, [classUUID]);

    return (
        <View>
            <Box
                backgroundColor={'#fff'}
                zIndex={999}
                padding={5}
                borderTopWidth={1}
                borderTopColor={colors.bgGrey200}
                style={{ bottom: 0, left: 0, right: 0, position: 'absolute' }}>
                <Button colorScheme={'success'} onPress={() => getSnapToken()}>
                    Beli Kelas
                </Button>
            </Box>
        </View>
    );
};

export default CardButtonBuySnap;
