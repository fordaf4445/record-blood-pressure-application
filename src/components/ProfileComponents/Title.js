import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '@react-native-firebase/auth'

const Title = () => {

    const [weight, setWeight] = useState('');
    const [hight, setHight] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');

    useEffect(() => {
        firebase.firestore().collection('dataUser')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setWeight(snapshot.data().userDetail)
                setHight(snapshot.data().userDetail)
                setAge(snapshot.data().userDetail)
                setSex(snapshot.data().userDetail)
            } else {
                console.log(' Data user do not exist');
                alert('ข้อมูลบางส่วนไม่ครบถ้วน');
                setWeight('?');
                setHight('?');
                setAge('?');
                setSex('?');
            }
        })
    },[]);

    return (
        <View style={{ top: 5 }}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textStyle}>น้ำหนัก</Text>
                <Text style={styles.textStyle}>  {weight.weight}</Text>
                <Text style={styles.textStyle}>  กก.</Text>
                <Text style={styles.textStyle}>  ส่วนสูง</Text>
                <Text style={styles.textStyle}>  {hight.hight}</Text>
                <Text style={styles.textStyle}>  ซม.</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textStyle}>อายุ</Text>
                <Text style={styles.textStyle}>  {age.age}</Text>
                <Text style={styles.textStyle}>  ปี</Text>
                <Text style={styles.textStyle}>  เพศ</Text>
                <Text style={styles.textStyle}>  {sex.sex}</Text>
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