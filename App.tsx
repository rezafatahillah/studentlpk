const Stack = createNativeStackNavigator();
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
false;
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@screens/initscreen/SplashScreen';
import StackNavigation from 'navigations/StackNavigation';
import {NativeBaseProvider} from 'native-base';
import {persistor, store } from './src/redux/store'
import { Provider } from 'react-redux';
import customTheme from 'config/theme';

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  React.useEffect(() => {
    const value = setInterval(() => {
      if (!hideSplashScreen) {
        setHideSplashScreen(true);
      } else {
        clearInterval(value);
      }
    }, 1000);
    return () => {
      clearInterval(value);
    };
  }, [hideSplashScreen]);

  return (
    <>
    <Provider store={store}>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          {!hideSplashScreen ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          ) : (
            <StackNavigation />
          )}
        </NavigationContainer>
      </NativeBaseProvider>
      </Provider>
    </>
  );
};

export default App;