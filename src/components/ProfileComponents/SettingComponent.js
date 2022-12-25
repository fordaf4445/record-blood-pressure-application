import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, Alert } from 'react-native'
import { Button } from '@rneui/base';
import React, { useState, useEffect } from 'react'
import { firebase } from '@react-native-firebase/auth';

const SettingComponent = () => {
  const [userData, setUserData] = useState('');
  const db = firebase.firestore();
  const rePasswords = firebase.auth();

  const getUser = async () => {
    db.collection('dataUser')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        } else {
          console.log('error get data');
        }
      })
  }

  const touchUpdate = async () => {
    db.collection('dataUser')
      .doc(firebase.auth().currentUser.uid)
      .update({
        username: userData.username,
        hight: userData.hight,
        weight: userData.weight,
        age: userData.age,
      })
      .then(() => {
        console.log('User Update Success');
        alert('User Update Success');
      })
  }

  const touchResetPasswords = () => {
    rePasswords.sendPasswordResetEmail(firebase.auth().currentUser.email)
    .then(() => {
      alertResetPasswords();
    }).catch((error) => {
      alert(error)
    });
  }

  useEffect(() => {
    getUser()
  }, []);

  const alertResetPasswords = () => {
    Alert.alert(
      "เราได้ส่งรหัสไปให้คุณที่ : " + userData.email,
      "โปรดตรวจสอบอีเมลทั้งหมดของคุณหรือจดหมายขยะเพื่อรีเซ็ตรหัสผ่าน",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>


      <View style={styles.container}>
        {/* <Text style={styles.textMain}> ลงทะเบียน </Text> */}
        <Text style={[styles.textcolor, { right: 153 }]}>อีเมล</Text>
        <Text style={{ fontSize: 20, marginLeft: -104, color: "black" }}>{userData.email}</Text>
        <Text style={[styles.textcolor, { top: 15, right: 132 }]}>ยูสเซอร์เนม</Text>
        <TextInput
          value={userData ? userData.username : ''}
          onChangeText={(txt) => setUserData({ ...userData, username: txt })}
          style={styles.inputView}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.textcolor}>น้ำหนัก</Text>
          <Text style={[styles.textcolor, { marginLeft: 130 }]}>ส่วนสูง</Text>
        </View>
        <View style={styles.innerContainerSmall}>
          <TextInput style={styles.inputSmall}
            keyboardType='numeric'
            maxLength={3}
            value={userData ? userData.weight : ''}
            onChangeText={(txt) => setUserData({ ...userData ,  weight : txt })}
          />
          <View style={styles.textSmall}>
            <Text style={styles.textSmall}>kg.</Text>
          </View>
          <TextInput style={[styles.inputSmall, { marginLeft: 30 }]}
            keyboardType='numeric'
            maxLength={3}
            value={userData ? userData.hight : ''}
            onChangeText={(txt) => setUserData({ ...userData ,  hight : txt})}
          />
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
            maxLength={3}
            value={userData ? userData.age : ''}
            onChangeText={(txt) => setUserData({ ...userData , age : txt})}
          />
          <Text style={[styles.inputSmall2, { marginLeft: 59 }]}>{userData.sex}</Text>
        </View>
        
        <View style={{ flex: 1, top: 120,}}>
        <Button
            title="รีเซ็ตรหัสผ่าน"
            buttonStyle={{
              backgroundColor: 'red',
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
            onPress={touchResetPasswords}
          />
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
            onPress={touchUpdate}
          />
        </View>
      </View>

    </View>

  )
}

export default SettingComponent

const styles = StyleSheet.create({
  ActivityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: "large",
  },
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
    padding: 10,
    width: 112,
    fontSize: 20,
  },
  inputSmall2: {
    borderRadius: 15,
    height: 50,
    padding: 10,
    width: 112,
    fontSize: 20,
    color:"black",
  },
  textMain: {
    fontSize: 35,
    fontFamily: 'NotoSansThai-SemiBold'
  },
  textSmall: {
    marginLeft: 5,
    justifyContent: 'center',
  },

});