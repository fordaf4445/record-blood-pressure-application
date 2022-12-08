import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import TapStack from './TapStack';



const Stack = createStackNavigator();

export default function AuthStack () {
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