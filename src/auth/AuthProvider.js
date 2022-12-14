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
                    } catch (err) {
                        console.log('signInWithEmailAndPassword fail'),
                            Alert.alert("เข้าสู้ระบบไม่สำเร็จ", "อีเมลหรือรหัสผ่านของคุณไม่ถูกต้อง             โปรดลองอีกครั้ง",
                            );
                    }
                },

                signup: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (err) {
                        console.log('createUserWithEmailAndPassword fail');

                    }

                },

                signout: async () => {
                    try {
                        await auth().signOut();
                    } catch (err) {
                        console.log('singOut error');
                    }
                }
            }}>
            {children}
        </AuthContext.Provider>
    );

};

