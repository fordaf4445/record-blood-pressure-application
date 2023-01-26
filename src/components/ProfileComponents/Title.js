import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '@react-native-firebase/auth'

const Title = () => {

    // const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');

    useEffect(() => {
        const unsubscribe =
            firebase.firestore().collection('dataUser')
                .doc(firebase.auth().currentUser.uid)
                .onSnapshot((docsnapshot) => {
                    setData(docsnapshot.data());
                    // setLoading(false);
                });
        return () => unsubscribe();
    }, []);

    // if (loading) {
    //     return <View style={styles.ActivityIndicatorContainer} ><ActivityIndicator /></View>
    // }

    return (
        <View style={{ top: 5 }}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textStyle}>น้ำหนัก</Text>
                <Text style={styles.textStyle}>  {data.weight}</Text>
                <Text style={styles.textStyle}>  กก.</Text>
                <Text style={styles.textStyle}>  ส่วนสูง</Text>
                <Text style={styles.textStyle}>  {data.hight}</Text>
                <Text style={styles.textStyle}>  ซม.</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textStyle}>อายุ</Text>
                <Text style={styles.textStyle}>  {data.age}</Text>
                <Text style={styles.textStyle}>  ปี</Text>
                <Text style={styles.textStyle}>  เพศ</Text>
                <Text style={styles.textStyle}>  {data.sex}</Text>
            </View>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'NotoSansThai-Regular',
        color: 'black',
    }
})