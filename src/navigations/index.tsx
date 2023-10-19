
import {createStackNavigator} from '@react-navigation/stack';
import StackNavigation from './StackNavigation';
import TabNavigation from './TabsNavigation';
import React from 'react';
const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabnav"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="stacknav"
        component={StackNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
