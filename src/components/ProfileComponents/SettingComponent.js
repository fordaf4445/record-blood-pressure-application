import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput, } from 'react-native'
import { Button } from '@rneui/base';
import React, { useState, useEffect } from 'react'
import { firebase } from '@react-native-firebase/auth';

const SettingComponent = () => {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState('');
  const [hight, setHight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  const touchUpdate = () => {
    db.collection('dataUser')
      .doc(firebase.auth().currentUser.uid)
      .update({
        username: username,
        'userDetail.age': age,
        'userDetail.hight': hight,
        'userDetail.weight': weight
      })
      .then(function (docRef) {
        alert("อัพเดทข้อมูลสำเร็จ");
        console.log("Updata Complete",);
      })
      .catch(function (err) {
        alert("Error");
        console.log(err);
      })
  }

  useEffect(() => {
    const unsubscribe =
      db.collection('dataUser')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((docsnapshot) => {
          setData(docsnapshot.data());
          setLoading(false);
        });
    return () => unsubscribe();
  }, [])
  if (loading) {
    return <View style={styles.ActivityIndicatorContainer} ><ActivityIndicator /></View>
  }
  return (
    <View style={{ flex: 1 }}>


      <View style={styles.container}>
        {/* <Text style={styles.textMain}> ลงทะเบียน </Text> */}
        <Text style={[styles.textcolor, { right: 153 }]}>อีเมล</Text>
        <Text style={{ fontSize: 20, marginLeft: -104, color: "black" }}>{data.email}</Text>
        <Text style={[styles.textcolor, { top: 15, right: 132 }]}>ยูสเซอร์เนม</Text>
        <TextInput
          style={styles.inputView}
          placeholderTextColor="gray"
          onChangeText={(username) => setUsername('' ? 'dfgfdg' : username)}
        >{data.username}</TextInput>
        <View style={styles.innerContainer}>
          <Text style={styles.textcolor}>น้ำหนัก</Text>
          <Text style={[styles.textcolor, { marginLeft: 130 }]}>ส่วนสูง</Text>
        </View>
        <View style={styles.innerContainerSmall}>
          <TextInput style={styles.inputSmall}
            keyboardType='numeric'
            maxLength={3}
            onChangeText={(weight) => { setWeight(weight) }}
          >{data.userDetail.weight}</TextInput>
          <View style={styles.textSmall}>
            <Text style={styles.textSmall}>kg.</Text>
          </View>
          <TextInput style={[styles.inputSmall, { marginLeft: 30 }]}
            keyboardType='numeric'
            maxLength={3}
            onChangeText={(hight) => { setHight(hight) }}>{data.userDetail.hight}</TextInput>
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
            onChangeText={(age) => { setAge(age) }}>{data.userDetail.age}</TextInput>
          <Text style={[styles.inputSmall, { marginLeft: 59 }]}>{data.userDetail.sex}</Text>
        </View>
        <View style={{ flex: 1, top: 200, backgroundColor: "pink" }}>
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
            onPress={touchUpdate} />
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
  textMain: {
    fontSize: 35,
    fontFamily: 'NotoSansThai-SemiBold'
  },
  textSmall: {
    marginLeft: 5,
    justifyContent: 'center',
  },

});