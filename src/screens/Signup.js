import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import { Button, Text, Overlay } from '@rneui/base';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AuthContext } from '../auth/AuthProvider';
import Lonicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
    // const navigation = useNavigation();

    const { username, setUsername } = useContext(AuthContext);
    const { email, setEmail } = useContext(AuthContext);
    const { password, setPassword } = useContext(AuthContext);
    const { age, setAge } = useContext(AuthContext);
    const { hight, setHight } = useContext(AuthContext);
    const { sex, setSex } = useContext(AuthContext);
    const { weight, setWeight } = useContext(AuthContext);
    const { signup } = useContext(AuthContext);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const { visible, setVisible } = useContext(AuthContext);

    // function addDataUser() {
    //     firestore()
    //     .collection('dataUser')
    //     .add({
    //         username : username,
    //         email : email,
    //         password : password,
    //         userDetail : {
    //             age: age,
    //             hight: hight,
    //             sex: sex,
    //             weight: weight,
    //         }
    //     })
    //     // navigation.navigate('TapStack')exit
    // };

    const touchSignUp = () => {
        setVisible(true);
        signup(email, password);
        // addDataUser();
    }

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
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
                <View style={styles.container}>
                    {/* <Text style={styles.textMain}> ลงทะเบียน </Text> */}
                    <Text style={[styles.textcolor, { top: 15, right: 136 }]}>ชื่อผู้ใช้งาน</Text>
                    <TextInput
                        style={styles.inputView}
                        placeholder="ชื่อผู้ใช้งาน"
                        placeholderTextColor="gray"
                        value={username}
                        onChangeText={(username) => { setUsername(username) }}
                    />
                    <Text style={[styles.textcolor, { top: 15, right: 153 }]}>อีเมล</Text>
                    <TextInput
                        style={styles.inputView}
                        placeholder="อีเมล"
                        placeholderTextColor="gray"
                        value={email}
                        onChangeText={(email) => { setEmail(email) }}
                    />
                    <Text style={[styles.textcolor, { top: 15, right: 141 }]}>รหัสผ่าน</Text>
                    <TextInput
                        style={styles.inputView}
                        placeholder="รหัสผ่าน"
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
                    <View style={styles.innerContainer}>
                        <Text style={styles.textcolor}>น้ำหนัก</Text>
                        <Text style={[styles.textcolor, { marginLeft: 130 }]}>ส่วนสูง</Text>
                    </View>
                    <View style={styles.innerContainerSmall}>
                        <TextInput style={styles.inputSmall}
                            keyboardType='numeric'
                            maxLength={3}
                            value={weight}
                            onChangeText={(weight) => { setWeight(weight) }}></TextInput>
                        <View style={styles.textSmall}>
                            <Text style={{fontFamily: "NotoSansThai-Regular",}}>กก.</Text>
                        </View>
                        <TextInput style={[styles.inputSmall, { marginLeft: 30 }]}
                            keyboardType='numeric'
                            maxLength={3}
                            value={hight}
                            onChangeText={(hight) => { setHight(hight) }}></TextInput>
                        <View style={styles.textSmall}>
                            <Text style={{fontFamily: "NotoSansThai-Regular",}}>ซม.</Text>
                        </View>
                    </View>
                    <View style={styles.innerContainer}>
                        <Text style={styles.textcolor}>อายุ</Text>
                        <Text style={[styles.textcolor, { marginLeft: 150 }]}>เพศ</Text>
                    </View>
                    <View style={styles.innerContainerSmall}>
                        <TextInput style={styles.inputSmall}
                            keyboardType='numeric'
                            maxLength={3}
                            value={age}
                            onChangeText={(age) => { setAge(age) }}></TextInput>
                        <BouncyCheckbox
                            style={{ marginLeft: 60 }}
                            text="ชาย"
                            textStyle={{
                                fontFamily: "NotoSansThai-Regular", color: "black",
                                textDecorationLine: "none",
                            }}
                            textContainerStyle={{ marginLeft: 5 }}
                            size={22}
                            fillColor="#5DB075"
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: "red" }}
                            innerIconStyle={{ borderWidth: 2, }}
                            value={sex}
                            onPress={() => { setSex("ชาย") }}
                        />
                        <BouncyCheckbox
                            style={{ marginLeft: 30 }}
                            text="หญิง"
                            textStyle={{
                                fontFamily: "NotoSansThai-Regular", color: "black",
                                textDecorationLine: "none",
                            }}
                            textContainerStyle={{ marginLeft: 5 }}
                            size={22}
                            fillColor="#5DB075"
                            unfillColor="#FFFFFF"
                            iconStyle={{ borderColor: "red" }}
                            innerIconStyle={{ borderWidth: 2, }}
                            value={sex}
                            onPress={() => { setSex("หญิง") }}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <Button
                            title="ยืนยัน"
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
                            titleStyle={{ fontFamily: 'NotoSansThai-SemiBold' }}
                            onPress={() => {
                                username == '' || email == '' || password == '' || age == '' || hight == '' || sex == '' || weight == '' ?
                                    (Alert.alert("ลงทะเบียนไม่สำเร็จ", "ไม่สามารถเว้นช่องว่างได้"))
                                    : (touchSignUp())
                            }} />
                    </View>
                </View>

            </View>
        </ScrollView>

    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 10,
        paddingLeft: 15,
        marginTop: 20,
        width: 343,
        fontSize: 16,
        fontFamily: "NotoSansThai-Regular",
        justifyContent: 'center',
        
    },
    textcolor: {
        color: '#5DB075',
        fontSize: 16,
        fontFamily: 'NotoSansThai-SemiBold'
    },
    innerContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 10,
    },
    innerContainerSmall: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 2.5,
    },
    inputSmall: {
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        padding: 15,
        width: 112,
        fontSize: 20,
    },
    textMain: {
        fontSize: 35,
        fontFamily: 'NotoSansThai-SemiBold'
    },
    textSmall: {
        marginLeft: 5,
        justifyContent: 'center',
        
    },
    secureIcon: {
        position: 'absolute',
        marginTop: 276,
        left: 340,
    },
    eye: {
        fontSize: 25,
    },

})
