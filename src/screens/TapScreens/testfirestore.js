import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

const History = () => {
    const [email, setEmail] = useState('');
    const [password, setPasword] = useState('');
    const [userName, setUserName] = useState('');
    const data = {
        from : 'Tanach',
        message : "hi i'm tanach nice too meet you"
    }
    
    function messageRef(){
        firestore().collection('room').doc('roomA').collection('message').doc('message1').set(data);}
    
    function addDataUser() {
        firestore()
            .collection('dataUser')
            .add({
                email: email,
                password: password,
                userName: userName,
            })
            .then(() => {
                console.log('Data User added!!');
            })
    }
    
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 40, }}>History</Text>
            <Input style={styles.inputText}
                placeholder='Email'
                value={email} onChangeText={(email) => { setEmail(email) }} />
            <Input style={styles.inputText}
                placeholder='Password'
                value={password} onChangeText={(password) => {setPasword(password)}}/>
            <Input style={styles.inputText}
                placeholder='Username'
                value={userName} onChangeText={(Username) => {setUserName(Username)}}/>
            <Button onPress={addDataUser}> Submit </Button>
        </View>
    )

}

export default History;

const styles = StyleSheet.create({
    container: {
        marginRight: 50,
        marginLeft: 50,
    },
    textContainer: {
        marginTop: 100,
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 50,

    },
    inputText: {
        marginTop: 15,
    }
})