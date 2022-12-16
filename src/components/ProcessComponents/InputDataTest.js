import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'


const InputDataTest = () => {

    const [sys, setSys] = useState('');
    const [dia, setDia] = useState('');
    const [bpm, setBpm] = useState('');

    return (

        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: "flex-start", left: 50 }}>
                <View>
                    <TextInput style={styles.inputSYS}
                        keyboardType='numeric' />
                </View>
                <View>
                    <TextInput style={styles.inputDIA}
                        keyboardType='numeric' />
                </View>
                <View>
                    <TextInput style={styles.inputBPM}
                        keyboardType='numeric' />
                </View>
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