import { useNavigation } from "@react-navigation/native";
import colors from "config/colors";
import { Avatar, Badge, Box, Button, Divider, HStack, Image, Stack, Text, VStack, Center, Spacer } from "native-base";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigation, TabNavigation } from 'types/RouteType';
import { AppText } from "./Text";
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { setDataLogin, logout } from '@redux/apps/LoginSlice';

const CardProfileAfterLogin = () => {
    const navigationStack = useNavigation<StackNavigation>();
    const redux_profile = useAppSelector(state => state.login);
    console.log(redux_profile)
    const dispatch = useAppDispatch();
    const LogoutUser = () => {
        dispatch(logout());
        navigationStack.navigate('loginpage');
    };
    const onPressHandler = () => {
        // Logika yang ingin Anda jalankan ketika TouchableOpacity ditekan
    };

    return (
        <SafeAreaView style={styles.container}>
            <HStack marginBottom={10} space={5} alignItems={'center'}>
                <Avatar
                    bg="#00bcd44a"
                    alignSelf="center"
                    size="lg"
                    source={require('@assets/images/avatar-01.png')}
                />
                <VStack>
                    <AppText font_type="medium">
                        {redux_profile.dataLogin.fullname}
                    </AppText>
                    <AppText  style={{ color: colors.profile_title }}>
                        {redux_profile.dataLogin.username}
                    </AppText>
                </VStack>
            </HStack>
            <ListSettings />
            <TouchableOpacity onPress={LogoutUser}>
                <Box
                    h="50px"
                    borderBottomWidth="1"
                    _dark={{
                        borderColor: '#779ca591',
                    }}
                    borderColor="#779ca591"
                    pl={['0', '4']}
                    pr={['0', '5']}
                    py="2">
                    <HStack space={[2, 3]} justifyContent="space-between">
                        <MaterialCommunityIcons
                            name="logout"
                            color={'#4b5157'}
                            size={25}
                        />
                        <VStack>
                            <AppText font_type="medium" size={14} style={{ color: colors.profile_title }}>
                                Logout
                            </AppText>
                        </VStack>
                        <Spacer />
                        <AppText>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                color={'#888b8f'}
                                size={25}
                            />
                        </AppText>
                    </HStack>
                </Box>
            </TouchableOpacity>
            <VStack alignSelf="center" mt={4}>
                <VStack paddingX={12}>
                    <TouchableOpacity onPress={onPressHandler}>
                        <AppText font_type="medium">Version 1.0.0</AppText>
                    </TouchableOpacity>
                </VStack>
                <VStack paddingX={5}>
                    <TouchableOpacity
                        onPress={() => navigationStack.navigate('sertifikasi')}>
                        <AppText font_type="medium" color="success">
                            Kebijakan Sertifikasi
                        </AppText>
                    </TouchableOpacity>
                </VStack>
                <TouchableOpacity
                    onPress={() => navigationStack.navigate('refund')}>
                    <AppText font_type="medium" color="success">
                        Kebijakan Return & Refund
                    </AppText>
                </TouchableOpacity>
            </VStack>
        </SafeAreaView>
    );
}

const ListSettings = () => {
    const navigationStack = useNavigation<StackNavigation>();

    return (
        <Box>
            <TouchableOpacity
                onPress={() => navigationStack.navigate('AccountSetting' as never)}>
                <HStack justifyContent="space-between">
                    <HStack space={3}>
                        <MaterialCommunityIcons
                            name="account-outline"
                            color={'#4b5157'}
                            size={25}
                        />
                        <AppText font_type="medium" size={14} style={{ color: colors.profile_title }}>
                            Pengaturan Akun
                        </AppText>
                    </HStack>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        color={'#888b8f'}
                        size={25}
                    />
                </HStack>
                <Divider marginY={5} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigationStack.navigate('my_certificate' as never)}>
                <HStack justifyContent="space-between">
                    <HStack space={3}>
                        <MaterialCommunityIcons
                            name="certificate-outline"
                            color={'#4b5157'}
                            size={25}
                        />
                        <AppText font_type="medium" size={14} style={{ color: colors.profile_title }}>
                            Sertifikat Saya
                        </AppText>
                    </HStack>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        color={'#888b8f'}
                        size={25}
                    />
                </HStack>
                <Divider marginY={5} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigationStack.navigate('trans_history' as never)}>
                <HStack justifyContent="space-between">
                    <HStack space={3}>
                        <MaterialCommunityIcons
                            name="clipboard-list-outline"
                            color={'#4b5157'}
                            size={25}
                        />
                        <AppText font_type="medium" size={14} style={{ color: colors.profile_title }}>
                            Riwayat Pembelian
                        </AppText>
                    </HStack>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        color={'#888b8f'}
                        size={25}
                    />
                </HStack>
                <Divider marginY={5} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigationStack.navigate('ChangePassword' as never)}>
                <HStack justifyContent="space-between">
                    <HStack space={3}>
                        <MaterialCommunityIcons
                            name="lock-outline"
                            color={'#4b5157'}
                            size={25}
                        />
                        <AppText font_type="medium" size={14} style={{ color: colors.profile_title }}>
                            Keamanan Akun
                        </AppText>
                    </HStack>
                    <MaterialCommunityIcons
                        name="chevron-right"
                        color={'#888b8f'}
                        size={25}
                    />
                </HStack>
                <Divider marginY={5} />
            </TouchableOpacity>

        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        // backgroundColor: '#dad9db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'black',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    headerTittle: {
        color: '#1d64f2',
    },
    headerBoxSettings: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 250,
        width: '100%',
        paddingTop: 20,
    },
});

export default CardProfileAfterLogin;