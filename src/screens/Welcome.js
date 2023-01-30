import { Alert, StyleSheet, View, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Animated } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lonicons from 'react-native-vector-icons/Ionicons';
import { Button, Text, Overlay, color } from '@rneui/base';
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
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Overlay isVisible={visible}  overlayStyle={{ borderColor: "red", borderRadius:25, backgroundColor: "#fff" }}>
                    <View style={{alignItems:"center", width:150}}>
                        <Animated.Image
                            source={require("../../assets/gif/heartLoading.gif")}
                            style={{ width: 70, height: 70 }}
                            resizeMode='cover' />
                        {/* <ActivityIndicator size='large' /> */}
                        <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>กรุณารอสักครู่..</Text>
                    </View>
                </Overlay>
                <View style={styles.iconView}>
                    <Icon name='heartbeat' style={styles.icon} />
                </View>
                <View style={styles.container}>
                    <Text style={styles.textMain}>แอปพลิเคชัน</Text>
                    <Text style={styles.textMain}>บันทึกความดันโลหิต</Text>
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <Text style={styles.textSecond}>เข้าสู่ระบบ</Text>
                    <TextInput
                        style={styles.inputView}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        value={email}
                        onChangeText={(email) => { setEmail(email) }}
                    />
                    <TextInput
                        style={styles.inputView}
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
                    <TouchableOpacity style={styles.secureIcon}
                        onPress={() => { setSecureTextEntry((prev) => !prev) }}>
                        <Lonicons name={secureTextEntry ? 'eye' : 'eye-off'} style={styles.eye} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        email != '' ? (forgetPasswords()) : (Alert.alert("แจ้งเตือน", "โปรดกรอกอีเมล"));
                    }}>
                        <Text style={styles.textForgetPass}>
                            ลืมรหัสผ่าน
                        </Text>
                    </TouchableOpacity>
                    <Button
                        onPress={() => { if (email == '' || password == '') { Alert.alert("แจ้งเตือน", "โปรดกรอกอีเมลและรหัสผ่าน"), console.log(visible); } else { touchSignIn() } }}
                        title="เข้าสู่ระบบ"
                        titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
                        buttonStyle={{
                            backgroundColor: '#5DB075',
                            borderRadius: 30,
                            height: 50,
                            width: 343,
                        }}
                        containerStyle={{
                            // marginHorizontal: 50,
                            marginVertical: 10,
                            marginTop: 20,
                            alignItems: 'center',

                        }}
                    />
                    <TouchableOpacity onPress={() => { navigation.navigate('Signup') }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.textThree}>
                                ไม่มีบัญชีใช่ไหม ?
                                {/* Don’t have account? Sign Up */}
                            </Text>
                            <Text style={[styles.textThree, { color: "#5DB075" }]}> ลงชื่อเพื่อเข้าใช้</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
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
    },
    textSecond: {
        fontSize: 24,
        fontFamily: 'NotoSansThai-Bold',
        color: 'black',

    },
    textThree: {
        color: '#838383',
        top: 10,
        fontFamily: 'NotoSansThai-SemiBold',
    },
    inputView: {
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 15,
        marginTop: 20,
        width: 343,
        fontSize: 16,
        fontFamily: 'NotoSansThai-SemiBold',
    },
    secureIcon: {
        position: 'absolute',
        marginTop: 136,
        left: 308,
    },
    eye: {
        fontSize: 25,
    },
    textForgetPass: {
        color: '#5DB075',
        top: 10,
        fontFamily: 'NotoSansThai-SemiBold',
        left: 130,
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
})