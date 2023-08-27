import {
    View, Text, Button, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard,
    useWindowDimensions, TouchableOpacity, Alert
} from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';
import { VStack, HStack, NativeBaseProvider, Link } from 'native-base';
import BleTest from './BleTest';

const SlideInput = (
    setVisible
) => {
    const { width: windowWidth } = useWindowDimensions();
    const db = firebase.firestore();
    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [bpm, setBpm] = useState('');

    const dateToTime = current => {
        return moment(current).format('L LT');
    };

    async function addInformationFireStore() {
        await setVisible(true)
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

        await db.collection('dataUser')
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
                setVisible(false)
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
            <HStack space={50} justifyContent={"center"} alignItems={"center"} >
                {/* InputData form BlueTooth */}
                <VStack key={1} style={[styles.container, { width: windowWidth }]}>
                    <VStack paddingLeft={15}>
                        <Text style={styles.textMode}>เพิ่มข้อมูลจากเครื่องวัดความดันโลหิต</Text>
                    </VStack>
                    <VStack style={styles.inPutContainer}><BleTest /></VStack>
                </VStack>

                {/* InputDataManually */}
                <VStack key={2} style={[styles.container, { width: windowWidth }]}>
                    <VStack paddingLeft={15}>
                        <Text style={styles.textMode}>เพิ่มข้อมูลความดันโลหิตด้วยตัวเอง</Text>
                    </VStack>
                    <HStack style={styles.inPutContainer}>
                        <VStack width={"80%"} padding={2} space={3} justifyContent={"space-around"}>
                            <HStack style={styles.inPutDataManualLayer} space={3} >
                                <VStack style={styles.inputLayerFront} backgroundColor={"#ff0000"} borderRadius={15}>
                                    <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#fff" }}>
                                        SYS
                                    </Text>
                                    <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#fff" }}>
                                        mmgh
                                    </Text>
                                </VStack>
                                <TextInput style={[styles.inputNumLayer, { borderColor: "#ff0000", color: "#ff0000" }]}
                                    keyboardType='numeric'
                                    onChangeText={(sys) => setSys(sys)}
                                    value={sys}
                                    maxLength={3}
                                />
                            </HStack>

                            <HStack style={styles.inPutDataManualLayer} space={3} >
                                <VStack style={styles.inputLayerFront} backgroundColor={"#A4BF43"} borderRadius={15}>
                                    <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#fff" }}>
                                        DIA
                                    </Text>
                                    <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#fff" }}>
                                        mmgh
                                    </Text>
                                </VStack>
                                <TextInput style={[styles.inputNumLayer, { borderColor: "#A4BF43", color: "#A4BF43" }]}
                                    keyboardType='numeric'
                                    onChangeText={(dia) => setDia(dia)}
                                    value={dia}
                                    maxLength={3}
                                />
                            </HStack>

                            <HStack style={styles.inPutDataManualLayer} space={3} >
                                <VStack style={styles.inputLayerFront} backgroundColor={"#23AFD6"} borderRadius={15}>
                                    <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 15, color: "#fff" }}>
                                        PULSE
                                    </Text>
                                    <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#fff" }}>
                                        bpm
                                    </Text>
                                </VStack>
                                <TextInput style={[styles.inputNumLayer, { borderColor: "#23AFD6", color: "#23AFD6" }]}
                                    keyboardType='numeric'
                                    onChangeText={(bpm) => setBpm(bpm)}
                                    value={bpm}
                                    maxLength={3}
                                />
                            </HStack>

                        </VStack>
                        <TouchableOpacity style={styles.pushContainer}
                            onPress={() => {
                                if (sys == '' || dia == '' || bpm == '') {
                                    Alert.alert('ไม่สารมารถเพิ่มข้อมูลได้', 'ไม่มีข้อมูลใน SYS,DIA หรือ BPM')
                                } else { addInformationFireStore() }
                            }}>
                            <VStack>
                                <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#fff" }}>
                                    เพิ่ม
                                </Text>
                            </VStack>
                        </TouchableOpacity>
                    </HStack>
                </VStack>

            </HStack>
        </TouchableWithoutFeedback>
    )
}

export default SlideInput;

const styles = StyleSheet.create({
    container: {
        height: "90%",
        padding: 15,
        // borderWidth: 1,
        // borderColor: "red",
        paddingTop: 0,
    },
    inPutContainer: {
        borderRadius: 35,
        padding: 15,
        height: "100%",
        width: "100%",
        shadowColor: "#000",
        elevation: 5,
        backgroundColor: "#fff",
        // borderWidth: 1,
    },
    inPutDataManualLayer: {
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        backgroundColor: "white",
        shadowColor: "#000",
        elevation: 10,
    },
    pushContainer: {
        // borderWidth: 1,
        heigh: "100%",
        width: "20%",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5DB075",
        shadowColor: "#000",
        elevation: 10,
    },
    inputNumLayer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        height: 50,
        borderWidth: 1,
        paddingLeft: 20,
        width: 150,
        fontSize: 25,
        shadowColor: "#000",
        elevation: 5,
    },
    inputLayerFront: {
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        shadowColor: "#000",
        elevation: 10,
    },
    textMode: {
        fontFamily: "NotoSansThai-Bold",
        fontSize: 15,
        color: "#5DB075"
    },
});