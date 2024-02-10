import {
  View, Text, TouchableOpacity, ActivityIndicator, StyleSheet,
  TextInput, Alert, ScrollView, ImageBackground
}
  from 'react-native'
import { Button, color } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import { firebase } from '@react-native-firebase/auth';
import { NativeBaseProvider, VStack, HStack, Center } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';


const SettingComponent = () => {
  const [userData, setUserData] = useState('');
  const db = firebase.firestore();
  const rePasswords = firebase.auth();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [getURL, setGetURL] = useState(null);

  useEffect(() => {
    db.collection('dataUser')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        } else {
          console.log('error get data');
        }
      })
  }, []);

  const touchUpdate = async () => {
    try {
      db.collection('dataUser')
        .doc(firebase.auth().currentUser.uid)
        .update({
          username: userData.username,
          hight: userData.hight,
          weight: userData.weight,
          age: userData.age,
          image: getURL != null ? (getURL._j) : (userData.image),
        })
        .then(() => {
          console.log('User Update Success');
          Alert.alert('อัพเดทข้อมูลสำเร็จ');
        });
    } catch (e) {
      alert("error: " + e.message)
    }
  }

  const touchResetPasswords = () => {
    rePasswords.sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        Alert.alert(
          "เราได้ส่งอีเมลไปให้คุณที่ : " + userData.email,
          "โปรดตรวจสอบอีเมลทั้งหมดของคุณหรือจดหมายขยะเพื่อตั้งรหัสผ่านใหม่",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }).catch((error) => {
        alert(error)
      });
  };

  const selectImage = () => {
    const option = {
      maxWidth: 2000,
      maxheight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const uploadImage = async (source) => {
      const { uri } = source;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = uri;

      const storageRef = storage().ref(filename);
      const task = storageRef.putFile(uploadUri);
      setUploading(true);
      // setTransferred(0);

      task.on('state_changed', snapshot => {
        console.log(
          `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
        );
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });

      try {
        await task;
        const url = storageRef.getDownloadURL();
        console.log(url);
        setGetURL(url);

      } catch (e) {
        console.error(e);
      }
      setTimeout(() => {
        setUploading(false);
        setTransferred(0);
      }, 1000)
    };

    launchImageLibrary(option, response => {
      if (response.didCancel) {
        console.log('User cancel Imagr Picker');
      } else if (response.error) {
        console.log('Image Error:', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log(source);
        setImage(source);
        uploadImage(source);
      }
    });
  };

  return (
    <NativeBaseProvider>
      <Center>
        <VStack style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack justifyItems="center" alignItems="center" padding={25}>
              <TouchableOpacity onPress={() => { selectImage() }}>
                <HStack >
                  <ImageBackground
                    // require("../../../assets/image/blank-profile-picture-973460.png")
                    source={image == null ? ({ uri: userData.image }) : (image)}
                    style={{ height: 120, width: 120 }}
                    imageStyle={{ borderRadius: 100 }}>
                    <View style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <MaterialCommunityIcons
                        name="camera"
                        size={35}
                        color="#fff"
                        style={{
                          opacity: 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: '#fff',
                          borderRadius: 100,
                        }}
                      />
                    </View>
                  </ImageBackground>
                </HStack>
              </TouchableOpacity>
              {uploading ? (
                <View style={styles.progressBarContainer}>
                  <Progress.Bar progress={transferred} width={100} color="#5DB075"
                  />
                </View>
              ) : (
                null
              )}
              <VStack justifyContent="flex-start" width="100%" space={1.5} marginTop={5}>
                <Text style={styles.textcolor}>อีเมล</Text>
                <Text style={{ fontSize: 20, color: "black", fontFamily: 'NotoSansThai-Bold' }}>{userData.email}</Text>
                <Text style={styles.textcolor}>ยูสเซอร์เนม</Text>
                <TextInput
                  value={userData ? userData.username : ''}
                  onChangeText={(txt) => setUserData({ ...userData, username: txt })}
                  style={styles.inputView}
                />
                <HStack space={125}>
                  <Text style={styles.textcolor}>น้ำหนัก</Text>
                  <Text style={styles.textcolor}>ส่วนสูง</Text>
                </HStack>
                <HStack>
                  <HStack alignItems="center">
                    <TextInput style={styles.inputSmall}
                      keyboardType='numeric'
                      maxLength={3}
                      value={userData ? userData.weight : ''}
                      onChangeText={(txt) => setUserData({ ...userData, weight: txt })}
                    />
                    <Text style={styles.textSmall}>kg.</Text>
                  </HStack>
                  <HStack alignItems="center">
                    <TextInput style={[styles.inputSmall, { marginLeft: 30 }]}
                      keyboardType='numeric'
                      maxLength={3}
                      value={userData ? userData.hight : ''}
                      onChangeText={(txt) => setUserData({ ...userData, hight: txt })}
                    />
                    <Text style={styles.textSmall}>cm.</Text>
                  </HStack>
                </HStack>
                <HStack space={145}>
                  <Text style={styles.textcolor}>อายุ</Text>
                  <Text style={styles.textcolor}>เพศ</Text>
                </HStack>
                <HStack space={50}>
                  <TextInput style={styles.inputSmall}
                    keyboardType='numeric'
                    maxLength={3}
                    value={userData ? userData.age : ''}
                    onChangeText={(txt) => setUserData({ ...userData, age: txt })}
                  />
                  <Text style={styles.inputSmall2}>{userData.sex}</Text>
                </HStack>
              </VStack>
              <Button
                title="ตั้งรหัสผ่านใหม่"
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
                onPress={() => {
                  userData.username == '' || userData.weight == '' || userData.hight == '' || userData.age == '' ?
                  (Alert.alert("อัพเดทข้อมูลไม่สำเร็จ", "ไม่สามารถเว้นช่องว่างได้")) : (touchUpdate())
                }}
              />
            </VStack>
          </ScrollView>
        </VStack>
      </Center>
    </NativeBaseProvider>
  )
};

export default SettingComponent

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#e8e8e8',
    backgroundColor: "white",
    height: "99%",
    width: "98%",
    shadowColor: "#000",
    elevation: 10,
  },
  inputView: {
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 10,
    width: 343,
    fontSize: 20,
    shadowColor: "#000",
    elevation: 10,
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
    shadowColor: "#000",
    elevation: 10,
  },
  inputSmall2: {
    borderRadius: 15,
    borderColor: '#E8E8E8',
    height: 50,
    padding: 10,
    width: 112,
    fontSize: 20,
    color: "black",
    fontFamily: 'NotoSansThai-SemiBold',
  },
  textMain: {
    fontSize: 35,
    fontFamily: 'NotoSansThai-SemiBold',
  },
  textSmall: {
    marginLeft: 5,
    justifyContent: 'center',
    fontFamily: "NotoSansThai-SemiBold",
    color: "black",
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  progressBarContainer: {
    marginTop: 20
  },
});