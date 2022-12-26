import { Alert, StyleSheet, View, Dimensions, TouchableOpacity, TextInput, ScrollView, } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lonicons from 'react-native-vector-icons/Ionicons';
import { Button, Text } from '@rneui/base';
import { AuthContext } from '../auth/AuthProvider';
import { firebase } from '@react-native-firebase/auth';

const Welcome = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { signin } = useContext(AuthContext);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const touchSignIn = () => {
        signin(email, password);
        // navigation.navigate('TapStack');
    }
    const forgetPasswords = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
           alerForgetPasswords();
        })
        .catch((error) =>{
            alert('Error: ' + error)
        })
    }

    const alerForgetPasswords = () => {
        Alert.alert(
          "เราได้ส่งอีเมลไปให้คุณแล้ว",
          "โปรดตรวจสอบอีเมลทั้งหมดของคุณหรือจดหมายขยะเพื่อรีเซ็ตรหัสผ่าน",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }

    return (
        <ScrollView >
            <View style={styles.container}>
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
                        <Lonicons name={ secureTextEntry? 'eye' : 'eye-off' } style={styles.eye}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { if (email == '') {
                        Alert.alert("แจ้งเตือน","โปรดกรอกอีเมล")
                    } else {forgetPasswords()}}}>
                        <Text style={styles.textForgetPass}>
                            ลืมรหัสผ่าน
                        </Text>
                    </TouchableOpacity>
                    <Button
                        onPress={() => { if (email == ''|| password == ''){ Alert.alert("แจ้งเตือน","โปรดกรอกอีเมลและรหัสผ่าน") }else{touchSignIn()}}}
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
                        <Text style={styles.textThree}>
                            ไม่มีบัญชีใช่ไหม ? กดลงชื่อเพื่อเข้าใช้
                            {/* Don’t have account? Sign Up */}
                        </Text>
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
        color: '#5DB075',
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
        marginTop: 139,
        left: 308,
    },
    eye:{
        fontSize: 20,
    },
    textForgetPass:{
        color: '#5DB075',
        top: 10,
        fontFamily: 'NotoSansThai-SemiBold',
        left:130,
    },
})