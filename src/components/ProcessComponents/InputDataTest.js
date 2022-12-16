import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/base';

const InputDataTest = () => {

    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [bpm, setBpm] = useState('');

    return (

        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: "flex-start", left: 50, top: 20 }}>
                <View style={{ flexDirection: "row" }}>
                    <TextInput style={styles.inputSYS}
                        keyboardType='numeric' />
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
                        keyboardType='numeric' />
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
                        keyboardType='numeric' />
                    <View style={{ top: 20, left: 25 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#71C7E2" }}>
                            PLUSE
                        </Text>
                        <Text>
                            bpm
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: "center",bottom:20 }}>
                <Button
                    title={"เพิ่ม"}
                    titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
                    buttonStyle={{
                        backgroundColor: '#5DB075',
                        borderRadius: 30,
                        height: 50,
                        width: 200,
                    }} />
            </View>
        </View>
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