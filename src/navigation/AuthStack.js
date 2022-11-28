import React, { useEffect, useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
               
            
        </Stack.Navigator>
    )
}

export default AuthStack