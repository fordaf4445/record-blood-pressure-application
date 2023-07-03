import { View, Text, TextInput, StyleSheet, Alert, PermissionsAndroid, Platform, Linking } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@rneui/base';
import { NativeBaseProvider, VStack, HStack } from 'native-base';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";

const SaveComponent = () => {


  async function requestExternalWritePermissions() {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('ได้รับสิทธิ์ในการเขียนไฟล์แล้ว');
        createPDF();
      } else {
        console.log('ไม่ได้รับสิทธิ์ในการเขียนไฟล์');
        Alert.alert('', 'หากต้องการบันทึกไฟล์ให้ไปที่การตั้งค่าและเปิดการอนุญาตสำหรับพื้นที่เก็บข้อมูล', [
          { text: 'ไม่อนุญาต', style: 'cancel' },
          { text: 'ไปที่การตั้งค่า', onPress: () => {Linking.openSettings();} }
        ],{cancelable : true})
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการขอสิทธิ์:', err);
      console.warn(err);
    }
  }



  const createPDF = async () => {
    const option = {
      html: '<h1>TANACH TAKHAMTIENG</h1>',
      fileName: 'test',
      directory: 'Download',
    };
    try {
      const file = await RNHTMLtoPDF.convert(option)

      console.log(file.filePath);

      Alert.alert('Successfully Exported', 'Path:' + file.filePath, [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'เปิด', onPress: () => openFile(file.filePath) }
      ], { cancelable: true });
    } catch (e) {
      console.log('Save File Failed' + e.message);
      Alert.alert('Save File Failed', '' + e.message);
    }

  };

  const openFile = (filePath) => {
    const path = filePath; //absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        console.log("open local success");
      })
      .catch(() => {
        console.log("open local fail");
      });
  };

  return (
    <NativeBaseProvider>
      <VStack style={styles.mainBorder}>
        <VStack space={2} style={{ justifyContent: "center", flex: 1, alignItems: "center", }}>
          <Text style={{ fontSize: 20 }}>TEST Genarete PDF</Text>
          <Button
            title={"GENERETE PDF"}
            buttonStyle={{
              borderRadius: 10,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#5DB075",
            }}
            onPress={() => { requestExternalWritePermissions(); }} />
        </VStack>
      </VStack>
    </NativeBaseProvider>
  )
}

export default SaveComponent

const styles = StyleSheet.create({
  mainBorder: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#fff",
  },
});