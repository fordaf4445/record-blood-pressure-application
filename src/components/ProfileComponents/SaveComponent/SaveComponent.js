import { View, Text, TextInput, StyleSheet, Alert, PermissionsAndroid, Platform, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from '@rneui/base';
import { NativeBaseProvider, VStack, HStack } from 'native-base';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import { firebase } from '@react-native-firebase/auth';

const SaveComponent = () => {

  const [userData, setUserData] = useState('');
  //User data
  useEffect(() => {
    const subscribe =
      firebase.firestore().collection('dataUser')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((docsnapshot) => {
          setUserData(docsnapshot.data());
        })
    return () => subscribe();
  }, [])


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
          { text: 'ไปที่การตั้งค่า', onPress: () => { Linking.openSettings(); } }
        ], { cancelable: true })
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการขอสิทธิ์:', err);
      console.warn(err);
    }
  }

  const data = {
    name: 'Tonny Hill',
    address: '101 E. Chapman Ave<br>Orange, CA 92866',
    phone: '98273-***11',
    company: 'Xyz Company',
    amount: '46899.50',
    amt: '53100.50',
  }


  const htmlContent =
    `
  <html>
          <head>
            <meta charset="utf-8">
            <title>Invoice</title>
            <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
            <style>
              ${htmlStyles}
            </style>
          </head>
          <body>
            <header>
              <h1>Invoice</h1>
              <address>
                <p>${data.name}</p>
                <p>${data.address}</p>
                <p>${data.phone}</p>
              </address>
            </header>
            <article>
              <h1>Recipient</h1>
              <address>
                <p>${data.company}<br>c/o ${data.name}</p>
              </address>
              <table class="meta">
                <tr>
                  <th><span>Invoice #</span></th>
                  <td><span>101138</span></td>
                </tr>
                <tr>
                  <th><span>Date</span></th>
                  <td><span>${new Date()}</span></td>
                </tr>
                <tr>
                  <th><span>Amount Due</span></th>
                  <td><span id="prefix">$</span><span>${data.amount}</span></td>
                </tr>
              </table>
              <table class="inventory">
                <thead>
                  <tr>
                    <th><span>Item</span></th>
                    <th><span>Description</span></th>
                    <th><span>Rate</span></th>
                    <th><span>Quantity</span></th>
                    <th><span>Price</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span>Front End Consultation</span></td>
                    <td><span>Experience Review</span></td>
                    <td><span data-prefix>$</span><span>${data.amt}</span></td>
                    <td><span>4</span></td>
                    <td><span data-prefix>$</span><span>${data.amt}</span></td>
                  </tr>
                </tbody>
              </table>
              <table class="balance">
                <tr>
                  <th><span>Total</span></th>
                  <td><span data-prefix>$</span><span>${data.amt}</span></td>
                </tr>
                <tr>
                  <th><span>Amount Paid</span></th>
                  <td><span data-prefix>$</span><span>0.00</span></td>
                </tr>
                <tr>
                  <th><span>Balance Due</span></th>
                  <td><span data-prefix>$</span><span>${data.amount}</span></td>
                </tr>
              </table>
            </article>
            <aside>
              <h1><span>Additional Notes</span></h1>
              <div>
                <p>A finance charge of 1.5% will be made on unpaid balances after 30 days.</p>
              </div>
            </aside>
          </body>
        </html>
  `;
  const createPDF = async () => {
    const option = {
      html: htmlContent,
      fileName: 'RBP' + Date.now(),
      directory: 'Documents',
    };
    try {
      const file = await RNHTMLtoPDF.convert(option)

      console.log(file.filePath);

      Alert.alert('ส่งออกไฟล์สำเร็จ!', 'ที่อยู่:' + file.filePath, [
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

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

/* table */

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }

body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }

header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */

article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: left; font-size: 125%; font-weight: bold; }

/* table meta & balance */

table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: right; width: 12%; }
table.inventory td:nth-child(4) { text-align: right; width: 12%; }
table.inventory td:nth-child(5) { text-align: right; width: 12%; }

/* table balance */

table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }

/* aside */

aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;