import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import BouncyCheckbox from "react-native-bouncy-checkbox";

// const navigation = useNavigation();
const Signup = () => {
    const [password, setPassword] = useState('');
    return (
        <View style={{ flex: 1 }}>


            <View style={styles.container}>
                <Text style={styles.textMain}> ลงทะเบียน </Text>
                <TextInput
                    style={styles.inputView}
                    placeholder="Username"
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.inputView}
                    placeholder="Email"
                    placeholderTextColor="gray"
                />
                <TextInput
                    style={styles.inputView}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    name="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                    secureTextEntry
                    value={password}
                    enablesReturnKeyAutomatically
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.innerContainer}>
                    <Text style={styles.textcolor}>น้ำหนัก</Text>
                    <Text style={[styles.textcolor, { marginLeft: 130 }]}>ส่วนสูง</Text>
                </View>
                <View style={styles.innerContainerSmall}>
                    <TextInput style={styles.inputSmall}
                        keyboardType='numeric'
                        maxLength={3}> </TextInput>
                    <View style={styles.textSmall}>
                        <Text style={styles.textSmall}>kg.</Text>
                    </View>
                    <TextInput style={[styles.inputSmall, { marginLeft: 30 }]}
                        keyboardType='numeric'
                        maxLength={3}> </TextInput>
                    <View style={styles.textSmall}>
                        <Text>cm.</Text>
                    </View>
                </View>
                <View style={styles.innerContainer}>
                    <Text style={styles.textcolor}>อายุ</Text>
                    <Text style={[styles.textcolor, { marginLeft: 150 }]}>เพศ</Text>
                </View>
                <View style={styles.innerContainerSmall}>
                    <TextInput style={styles.inputSmall}
                        keyboardType='numeric'
                        maxLength={3}> </TextInput>
                    <BouncyCheckbox
                        size={25}
                        fillColor="red"
                        unfillColor="#FFFFFF"
                        text="ชาย"
                        iconStyle={{ borderColor: "red" }}
                        innerIconStyle={{ borderWidth: 1 }}
                        textStyle={{ fontFamily: "NotoSansThai-Bold" }}
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
                        titleStyle={{ fontFamily: 'NotoSansThai-SemiBold' }} />
                </View>
            </View>

        </View>

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
        padding: 15,
        marginTop: 20,
        width: 343,
        fontSize: 20,
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


})
