
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from '@screens/homepage/HomePage';
import Wishlist from '@screens/auth/LoginPage';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from 'screens/profile/ProfileScreen';
import MyCoursePage from 'screens/mycourse/MyCoursePage';
import lpkpage from 'screens/lpkpage/LpkPageDetail';
import { TabsNavigationList } from 'types/RouteType';
const TabNavigation = () => {
    const Tab = createBottomTabNavigator<TabsNavigationList>();
    return (
        <Tab.Navigator initialRouteName="home" screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = '' as string;
                if (route.name === 'home') {
                    iconName = focused
                        ? 'home'
                        : 'home-outline';
                }
                else if (route.name === 'myclass') {
                    iconName = focused ? 'book' : 'book-outline';
                }else if (route.name === 'account') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00B683',
            tabBarInactiveTintColor: '#475467',
        })}>
            <Tab.Screen
                name="home"
                component={Homepage}
                options={{ headerShown: false, tabBarBadge: 3 }}
            />
            <Tab.Screen
                name="myclass"
                component={MyCoursePage}
                options={{ headerShown: false, title: 'Kelas Saya' }}
            />
            <Tab.Screen
                name="account"
                component={ProfileScreen}
                options={{ headerShown: false, title: 'Account' }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation;