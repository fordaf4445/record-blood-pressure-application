import React, {useEffect, useState}from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import TapStack from './TapStack';




const Stack = createStackNavigator();

export default function AuthStack () {
    // const [isFirstTime, setIsFirstTime] = useState(null);
    // let routesName;

    // useEffect(() => {
    //     AsyncStorage.getItem('alreadyLaunched').then((value) => {
    //         if (value == null) {
    //             AsyncStorage.setItem('alreadyLaunched', 'true');
    //             setIsFirstTime(true);
    //         } else{
    //             setIsFirstTime(false);
    //         }
    //     });
    // }, []);

    // if (isFirstTime == null) {
    //     return null;
    // } else if (isFirstTime == true) {
    //     routesName = 'Welcome';
    // } else {
    //     routesName = 'Welcome';
    // }


    return (
            <Stack.Navigator
            initialRouteName='Welcome'
            screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='Welcome' component={Welcome}/>
                <Stack.Screen name='Signup' component={Signup}/>
                {/* <Stack.Screen name='TapStack'component={TapStack}/> */}
        </Stack.Navigator>
    )
}