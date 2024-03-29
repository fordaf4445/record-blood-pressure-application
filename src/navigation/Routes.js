import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../auth/AuthProvider';
import AuthStack from './AuthStack';
import TapStack from './TapStack';

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    // const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ? <TapStack /> : <AuthStack />}
        </NavigationContainer>
    );
}