import React, { useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from '../screens/Welcome';
import Signup from '../screens/Signup';
import TapStack from './TapStack';

const Stack = createStackNavigator();
const AuthStack = () => {
    const [isFirstLaunch ,setIsFirstLaunch] = useState(null);
    let routName;

    useEffect( () => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
              AsyncStorage.setItem('alreadyLaunched', 'true'); 
              setIsFirstLaunch(true);
            } else {
              setIsFirstLaunch(false);
            }
          });
    }, []);

    if (isFirstLaunch === null) {
        return null;
    } else if (isFirstLaunch == true) {
        routName = 'Welcome';
    } 
    // else {
    //     routName = 'Login';
    // }

    return (
        <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='Welcome' component={Welcome}/>
                <Stack.Screen name='Signup' component={Signup}/>
                <Stack.Screen name='TapStack'component={TapStack}/>
        </Stack.Navigator>
    )
}

export default AuthStack