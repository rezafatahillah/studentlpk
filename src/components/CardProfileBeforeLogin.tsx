import { useNavigation } from "@react-navigation/native";
import colors from "config/colors";
import { Button, HStack, VStack, View } from "native-base";
import React from 'react';
import { StackNavigation, TabNavigation } from 'types/RouteType';
import { AppText } from "./Text";

const CardProfileBeforeLogin = () => {
    
    const navigationStack = useNavigation<StackNavigation>();
    const ToLoginPage = () => {
        navigationStack.navigate('loginpage');
    };
    const ToRegistrationPage = () => {
        // navigationStack.navigate('loginpage');
    };

    return (
        <View flex={1} backgroundColor={'#fff'} style={{ padding: 15 }}>
            <VStack marginTop={10}>
                <AppText size={16} font_type="bold">
                    Profil Anda
                </AppText>
                <AppText color='secondary'>
                    Masuk untuk memulai mencari hal apa yang Anda minati.
                </AppText>
            </VStack>
            <Button onPress={ToLoginPage} marginTop={20} colorScheme={'success'}>
                <AppText color={colors.white} font_type="semibold">
                    Masuk
                </AppText>
            </Button>
            <HStack space={2} marginTop={4}>
                <AppText color='secondary'>Belum Punya Akun?</AppText>
                <AppText onPress={ToRegistrationPage} color="success" font_type="semibold">
                    Daftar
                </AppText>
            </HStack>
        </View>
    );
}

export default CardProfileBeforeLogin;