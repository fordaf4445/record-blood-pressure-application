import React, { createContext, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import { Alert, Text, View, StyleSheet } from 'react-native';

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
    const [data, setData] = useState('');
    const [visible, setVisible] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                user, setUser, username, setUsername, email, setEmail, password, setPassword,
                age, setAge, hight, setHight, sex, setSex, weight, setWeight, data, setData,
                visible, setVisible,

                signin: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                        await setVisible(false);
                    } catch (err) {
                        setVisible(false);
                        console.log('signInWithEmailAndPassword fail'),
                            Alert.alert("เข้าสู่ระบบไม่สำเร็จ", "อีเมลหรือรหัสผ่านของคุณไม่ถูกต้อง             โปรดลองอีกครั้ง",
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
                                        username: username,
                                        weight: weight,
                                        hight: hight,
                                        age: age,
                                        sex: sex,
                                        image: "https://firebasestorage.googleapis.com/v0/b/react-native-project-3ec06.appspot.com/o/blank-profile-picture-973460.png?alt=media&token=d841e70e-9c59-4d22-baea-f59ba0578cd2",
                                    })
                            })
                        await setVisible(false);
                    } catch (err) {
                        setVisible(false);
                        console.log(err);
                        Alert.alert("ลงทะเบียนไม่สำเร็จ","อีเมลนี้ถูกใช้ไปแล้วหรือรูปแบบอีเมลไม่ถูกต้อง โปรดตรวจสอบ");
                    }

                },

                signout: async () => {
                    try {
                        await auth().signOut();
                    } catch (err) {
                        console.log('singOut error');
                    }
                },

            }}>
            {children}
        </AuthContext.Provider>
    );

};

