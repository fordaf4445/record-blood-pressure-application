import React, { createContext, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import { Alert, Text, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [hight, setHight] = useState('');
    const [sex, setSex] = useState('');
    const [weight, setWeight] = useState('');
    return (
        <AuthContext.Provider
            value={{
                user,setUser,username,setUsername,email,setEmail,password,setPassword,
                age,setAge,hight,setHight,sex,setSex,weight,setWeight,
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
                        await auth().createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            firebase.firestore().collection('dataUser')
                            .doc(firebase.auth().currentUser.uid)
                            .set({
                                email,
                                password,
                                username : username,
                            })
                        })
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
