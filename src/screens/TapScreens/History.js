import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth, { firebase } from '@react-native-firebase/auth';

const History = () => {

    const [loading, setLoading] = useState(true);
    const [bloodPressure, seBloodPressure] = useState([]);

    useEffect(() => {
        const getData = firebase.firestore();
        const subscriber = getData.collection("dataUser")
        .doc(firebase.auth().currentUser.uid)
        .collection('BloodPressure')
        .orderBy("timestamp","desc")
        .onSnapshot(querySnapshot => {
            const bloodPressure = [];

            querySnapshot.forEach(documentSnapshot => {
                bloodPressure.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                    
                });
            });

            seBloodPressure(bloodPressure);
            setLoading(false);
        });

    return () => subscriber();
    },[]);

    if (loading) {
        return <ActivityIndicator />
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.textHeader}>ประวัติ</Text>
            </View>
            <View>

            </View>
            <View style={styles.borderHistory}>
                <FlatList
                data={bloodPressure}
                renderItem={({item}) => (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color:"red"}}>SYS: {item.SYS}</Text>
                        <Text>DIA: {item.DIA}</Text>
                        <Text>BPM: {item.BPM}</Text>
                        <Text>TIME: {item.timestamp}</Text>
                    </View>
                    )}
                // keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBar: {
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 16,
    },
    textHeader: {
        fontSize: 35,
        fontFamily: 'NotoSansThai-Bold',
        color: 'black',
    },
    borderHistory: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        margin: 20,
        borderColor: '#e8e8e8',
        backgroundColor: 'white',

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,

    },
    title: {
        fontSize: 32,
    },

});