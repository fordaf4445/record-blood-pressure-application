import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, } from '@rneui/base';
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';


const InputDataTest = () => {
    const db = firebase.firestore();
    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [bpm, setBpm] = useState('');

    const dateToTime = current => {
        return moment(current).format('L LT');
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         var date = new Date().toLocaleDateString();
    //         var time = new Date().toLocaleTimeString();
    //         setCurrentDate(date + " " + time);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [])

    function addInformationFireStore() {
        let type;
        if (sys > 160) {
            type = "ความดันโลหิตสูง ระยะที่ 2"
        } else if (sys >= 141) {
            type = "ความดันโลหิตสูง ระยะที่ 1"
        } else if (sys >= 121) {
            type = "ความดันโลหิตสูงขั้นต้น"
        } else if (sys >= 91) {
            type = "ปกติ"
        } else {
            type = "ความดันโลหิตต่ำ"
        }
        db.collection('dataUser')
            .doc(firebase.auth().currentUser.uid)
            .collection('BloodPressure')
            .add({
                SYS: sys,
                DIA: dia,
                BPM: bpm,
                timestamp: Date.now(),
                TYPE: type,
                TIME: dateToTime(Date.now()),
            })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                // Alert.alert("เพิ่มข้อมูลสำเร็จ")
                Alert.alert(
                    "เพิ่มข้อมูลสำเร็จ",
                    "",
                    [
                        { text: "OK", onPress: () => { setSys(''), setDia(''), setBpm('') } }
                    ]
                );

            })
            .catch(function (err) {
                console.log("Error adding information: ", err);
                Alert.alert("เพิ่มข้อมูลไม่สำเร็จ !!" + err.message)
            })
        { type }
    };

    return (

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={{ flex: 1, left: 50, top: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput style={styles.inputSYS}
                            keyboardType='numeric'
                            onChangeText={(sys) => setSys(sys)}
                            value={sys}
                            maxLength={3}
                        />
                        <View style={{ top: 20, left: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
                                SYS
                            </Text>
                            <Text>
                                mmgh
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput style={styles.inputDIA}
                            keyboardType='numeric'
                            onChangeText={(dia) => setDia(dia)}
                            value={dia}
                            maxLength={3}
                        />
                        <View style={{ top: 20, left: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#B8DE9A" }}>
                                DIA
                            </Text>
                            <Text>
                                mmgh
                            </Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput style={styles.inputBPM}
                            keyboardType='numeric'
                            onChangeText={(bpm) => setBpm(bpm)}
                            value={bpm}
                            maxLength={3}
                        />
                        <View style={{ top: 20, left: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#71C7E2" }}>
                                PLUSE
                            </Text>
                            <Text>
                                bpm
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignItems: "center", left: -50, top: 350 }}>
                        <Button
                            title={"เพิ่ม"}
                            titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
                            buttonStyle={{
                                backgroundColor: '#5DB075',
                                borderRadius: 30,
                                height: 50,
                                width: 200,
                            }}
                            onPress={() => {
                                if (sys == '' || dia == '' || bpm == '') {
                                    Alert.alert('ไม่สารมารถเพิ่มข้อมูลได้', 'ไม่มีข้อมูลใน SYS,DIA หรือ BPM')
                                } else { addInformationFireStore() }
                            }} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}


export default InputDataTest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    inputSYS: {
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        borderColor: 'red',
        padding: 15,
        marginTop: 20,
        width: 150,
        fontSize: 20,
    },
    inputDIA: {
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#B8DE9A',
        padding: 15,
        marginTop: 20,
        width: 150,
        fontSize: 20,
    },
    inputBPM: {
        backgroundColor: '#F6F6F6',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        borderColor: '#71C7E2',
        padding: 15,
        marginTop: 20,
        width: 150,
        fontSize: 20,
    },
});