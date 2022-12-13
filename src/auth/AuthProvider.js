import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                signin: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (err) {
                        console.log('signInWithEmailAndPassword fail');
                    } console.log("signIn");
                },

                signup: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (err) {
                        console.log('createUserWithEmailAndPassword fail');
                    } console.log("signUp");

                },

                signout: async () => {
                    try {
                        await auth().signOut();
                    } catch (err) {
                        console.log('singOut error');
                    } console.log("signOut");
                }
            }}>
                {children}
        </AuthContext.Provider>
    );

};

