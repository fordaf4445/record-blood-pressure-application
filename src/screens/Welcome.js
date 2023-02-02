import { Alert, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Animated, Text } from 'react-native';
import React, { useState, useContext } from 'react';
import { NativeBaseProvider, VStack, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lonicons from 'react-native-vector-icons/Ionicons';
import { Overlay } from '@rneui/base';
import { AuthContext } from '../auth/AuthProvider';
import { firebase } from '@react-native-firebase/auth';


const Welcome = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { signin } = useContext(AuthContext);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const { visible, setVisible } = useContext(AuthContext);

    const touchSignIn = () => {
        setVisible(true);
        signin(email, password);
        // navigation.navigate('TapStack');

    }
    const forgetPasswords = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert(
                    "เราได้ส่งอีเมลไปให้คุณแล้ว",
                    "โปรดตรวจสอบอีเมลทั้งหมดของคุณหรือจดหมายขยะเพื่อรีเซ็ตรหัสผ่าน",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            })
            .catch((error) => {
                alert('Error: ' + error)
            })
    }

    return (
        <NativeBaseProvider>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <VStack style={styles.container}>
                    <Overlay isVisible={visible} overlayStyle={{ borderColor: "red", borderRadius: 25, backgroundColor: "#fff" }}>
                        <View style={{ alignItems: "center", width: 150 }}>
                            <Animated.Image
                                source={require("../../assets/gif/heartLoading.gif")}
                                style={{ width: 70, height: 70 }}
                                resizeMode='cover' />
                            {/* <ActivityIndicator size='large' /> */}
                            <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>กรุณารอสักครู่..</Text>
                        </View>
                    </Overlay>
                    <VStack alignItems="center" width="100%">
                        <Icon name='heartbeat' style={styles.icon} />
                        <Text style={styles.textMain}>แอปพลิเคชัน</Text>
                        <Text style={styles.textMain}>บันทึกความดันโลหิต</Text>
                    </VStack>
                    <VStack marginTop={5} width="95%" space={2.5} >
                        <VStack width="100%" alignItems="center" >
                            <Text style={styles.textSecond}>เข้าสู่ระบบ</Text>
                        </VStack>
                        <VStack width="100%" alignItems="center">
                            <VStack width="100%">
                                <TextInput
                                    style={styles.inputView}
                                    placeholder="Email"
                                    placeholderTextColor="gray"
                                    value={email}
                                    onChangeText={(email) => { setEmail(email) }}
                                />
                            </VStack>
                            <VStack width="100%">
                                <TextInput
                                    style={[styles.inputView, { marginTop: 15 }]}
                                    placeholder="Password"
                                    placeholderTextColor="gray"
                                    name="password"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="newPassword"
                                    secureTextEntry={secureTextEntry}
                                    value={password}
                                    enablesReturnKeyAutomatically
                                    onChangeText={(password) => setPassword(password)}
                                />
                            </VStack>
                        </VStack>
                        <VStack style={styles.secureIcon}>
                            <TouchableOpacity
                                onPress={() => { setSecureTextEntry((prev) => !prev) }}>
                                <Lonicons name={secureTextEntry ? 'eye' : 'eye-off'} style={styles.eye} />
                            </TouchableOpacity>
                        </VStack>
                        <TouchableOpacity onPress={() => {
                            email != '' ? (forgetPasswords()) : (Alert.alert("แจ้งเตือน", "โปรดกรอกอีเมล"));
                        }}>
                            <VStack width="100%" alignItems="flex-end"  >
                                <Text style={styles.textForgetPass}>
                                    ลืมรหัสผ่าน
                                </Text>
                            </VStack>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContrainer}
                            onPress={() => { if (email == '' || password == '') { Alert.alert("แจ้งเตือน", "โปรดกรอกอีเมลและรหัสผ่าน"), console.log(visible); } else { touchSignIn() } }}>
                            <VStack height="100%" alignItems="center" justifyContent="center">
                                <Text style={{ fontFamily: 'NotoSansThai-Bold', fontSize: 18, color: "#fff" }}>เข้าสู่ระบบ</Text>
                            </VStack>
                        </TouchableOpacity>
                        <VStack marginTop={5} alignItems="center">
                            <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.textThree}>
                                        ไม่มีบัญชีใช่ไหม ?
                                        {/* Don’t have account? Sign Up */}
                                    </Text>
                                    <Text style={[styles.textThree, { color: "#5DB075" }]}> ลงชื่อเพื่อเข้าใช้</Text>
                                </View>
                            </TouchableOpacity>
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    iconView: {
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 250,
        color: "#5DB075",
    },
    textMain: {
        fontSize: 30,
        fontFamily: 'NotoSansThai-Bold',
        color: "#000"
    },
    textSecond: {
        fontSize: 24,
        fontFamily: 'NotoSansThai-Bold',
        color: 'black',

    },
    textThree: {
        color: '#838383',
        fontFamily: 'NotoSansThai-SemiBold',
    },
    inputView: {
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 10,
        paddingLeft: 15,
        width: "100%",
        fontSize: 16,
        fontFamily: 'NotoSansThai-SemiBold',
        shadowColor: "#5DB075",
        elevation: 10,
    },
    secureIcon: {
        position: 'absolute',
        marginTop: 122,
        width: "96%",
        alignItems: "flex-end",
    },
    eye: {
        fontSize: 25,
    },
    textForgetPass: {
        color: '#5DB075',
        // top: 10,
        fontFamily: 'NotoSansThai-SemiBold',
        // left: 130,
    },

    textPrimary: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20,
    },
    textSecondary: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 17,
    },
    buttonContrainer: {
        width: "100%",
        height: 50,
        borderRadius: 30,
        backgroundColor: "#5DB075",
        shadowColor: "#000",
        elevation: 10,
    },
})