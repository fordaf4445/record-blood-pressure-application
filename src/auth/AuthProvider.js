import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert, Text, View, StyleSheet } from 'react-native';

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
                        console.log("signIn");
                    } catch (err) {
                        console.log('signInWithEmailAndPassword fail');
                    }
                },

                signup: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                        console.log("signUp");
                    } catch (err) {
                        console.log('createUserWithEmailAndPassword fail');
                    }

                },

                signout: async () => {
                    try {
                        await auth().signOut();
                        console.log("signOut");
                    } catch (err) {
                        console.log('singOut error');
                    }
                }
            }}>
            {children}
        </AuthContext.Provider>
    );

};

