import { View, Text, TextInput, StyleSheet, Alert, PermissionsAndroid, Linking, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from '@rneui/base';
import { NativeBaseProvider, VStack, HStack } from 'native-base';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from "react-native-file-viewer";
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';

const SaveComponent = () => {
  const startofWeek = moment().startOf('week').valueOf();
  const endofWeek = moment().endOf('week').valueOf();
  const startofMonth = moment().startOf('month').valueOf();
  const endofMonth = moment().endOf('month').valueOf();

  const [userData, setUserData] = useState('');
  const [bloodPressure, setBloodPressure] = useState([]);

  //request permission
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

  //User data
  useEffect(() => {
    const subscribe =
      firebase.firestore().collection('dataUser')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((docsnapshot) => {
          setUserData(docsnapshot.data());
        });

    const subscribeOntherData =
      firebase.firestore().collection('dataUser')
        .doc(firebase.auth().currentUser.uid)
        .collection('BloodPressure')
        .orderBy("timestamp", "desc")
        .onSnapshot((docsnapshot) => {
          const bloodPressure = docsnapshot.docs.map(
            documentSnapshot => ({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            })
          );
          setBloodPressure(bloodPressure);
        })
    return () => {
      subscribe();
      subscribeOntherData();
    }
  }, [])

  // bmiCalculator
  const weight = userData.weight;
  const hightInMeter = parseFloat(userData.hight) / 100;
  //calculate BMI Value
  const bmiValue = weight / (hightInMeter * hightInMeter);
  let statusBMI;
  if (bmiValue >= 30.0) {
    statusBMI = 'อ้วนมาก/โรคอ้วนระดับ 3';
  } else if (bmiValue >= 25.0 && bmiValue <= 29.9) {
    statusBMI = 'อ้วน/โรคอ้วนระดับ 2';
  } else if (bmiValue >= 23.0 && bmiValue <= 24.9) {
    statusBMI = 'ท้วม/โรคอ้วนระดับ 1';
  } else if (bmiValue >= 18.5 && bmiValue <= 22.9) {
    statusBMI = 'ปกติ (สุขภาพดี)';
  } else {
    statusBMI = 'น้ำหนักน้อย/ผอม';
  };

  // format time & date
  const currentDate = Date.now();
  const formatDate = (current, format) => {
    if (format === 'time') {
      return moment(current).format('HH:mm น.');
    } else if (format === 'date') {
      return moment(current).format('DD-MM-YYYY');
    } else {
      return '';
    }
  };

  //calculate persen 
  const calculatePersen = (dataLength, LowBloodPressure, NormalBloodPressure, ElevatedBloodPressure, HighBloodPressure1, HighBloodPressure2) => {
    let totaldata = dataLength;
    let data1 = LowBloodPressure;
    let data2 = NormalBloodPressure;
    let data3 = ElevatedBloodPressure;
    let data4 = HighBloodPressure1;
    let data5 = HighBloodPressure2;
    const persen = {
      persen1: Number(((data1 / totaldata) * 100).toFixed(0)),
      persen2: Number(((data2 / totaldata) * 100).toFixed(0)),
      persen3: Number(((data3 / totaldata) * 100).toFixed(0)),
      persen4: Number(((data4 / totaldata) * 100).toFixed(0)),
      persen5: Number(((data5 / totaldata) * 100).toFixed(0)),
    };
    return persen
  };
  //get avg week

  const Week = bloodPressure.filter(item => {
    return item.timestamp >= startofWeek && item.timestamp <= endofWeek;
  });

  const WeekLength = (length) => {
    let Value;
    if (length === 'low') {
      Value = Week.filter(item => { return (item.TYPE === 'ความดันโลหิตต่ำ') }).length
    } else if (length === 'normal') {
      Value = Week.filter(item => { return (item.TYPE === 'ปกติ') }).length
    } else if (length === 'elevate') {
      Value = Week.filter(item => { return (item.TYPE === 'ความดันโลหิตสูงขั้นต้น') }).length
    } else if (length === 'high1') {
      Value = Week.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 1') }).length
    } else if (length === 'high2') {
      Value = Week.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 2') }).length
    }
    return Value;
  }

  const avgWeek = (format) => {
    const intiialValues = { SYS: 0, DIA: 0, BPM: 0 };
    const total = Week.reduce((acc, val) => {
      acc.SYS += parseFloat(val.SYS);
      acc.DIA += parseFloat(val.DIA);
      acc.BPM += parseFloat(val.BPM);
      return acc;
    }, intiialValues);

    const avg = {
      SYS: Number((total.SYS / Week.length).toFixed(2)),
      DIA: Number((total.DIA / Week.length).toFixed(2)),
      BPM: Number((total.BPM / Week.length).toFixed(2)),
    };

    let Value;

    if (format === 'SYS') {
      Value = avg.SYS.toFixed(0)
    } else if (format === 'DIA') {
      Value = avg.DIA.toFixed(0)
    } else if (format === 'BPM') {
      Value = avg.BPM.toFixed(0)
    }
    return Value
  };

  const weekPersen = calculatePersen(Week.length, WeekLength('low'), WeekLength('normal'), WeekLength('elevate'), WeekLength('high1'), WeekLength('high2'));

  //get avg month
  const Month = bloodPressure.filter(item => {
    return item.timestamp >= startofMonth && item.timestamp <= endofMonth;
  });

  const MonthLength = (length) => {
    let Value;
    if (length === 'low') {
      Value = Month.filter(item => { return (item.TYPE === 'ความดันโลหิตต่ำ') }).length
    } else if (length === 'normal') {
      Value = Month.filter(item => { return (item.TYPE === 'ปกติ') }).length
    } else if (length === 'elevate') {
      Value = Month.filter(item => { return (item.TYPE === 'ความดันโลหิตสูงขั้นต้น') }).length
    } else if (length === 'high1') {
      Value = Month.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 1') }).length
    } else if (length === 'high2') {
      Value = Month.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 2') }).length
    }
    return Value;
  }

  const avgMonth = (format) => {
    const intiialValues = { SYS: 0, DIA: 0, BPM: 0 };
    const total = Month.reduce((acc, val) => {
      acc.SYS += parseFloat(val.SYS);
      acc.DIA += parseFloat(val.DIA);
      acc.BPM += parseFloat(val.BPM);
      return acc;
    }, intiialValues);

    const avg = {
      SYS: Number((total.SYS / Month.length).toFixed(2)),
      DIA: Number((total.DIA / Month.length).toFixed(2)),
      BPM: Number((total.BPM / Month.length).toFixed(2)),
    };

    let Value;

    if (format === 'SYS') {
      Value = avg.SYS.toFixed(0)
    } else if (format === 'DIA') {
      Value = avg.DIA.toFixed(0)
    } else if (format === 'BPM') {
      Value = avg.BPM.toFixed(0)
    }
    return Value
  };

  const monthPersen = calculatePersen(Month.length, MonthLength('low'), MonthLength('normal'), MonthLength('elevate'), MonthLength('high1'), MonthLength('high2'));

  //get avg all
  const All = bloodPressure;

  const AllLength = (length) => {
    let Value;
    if (length === 'low') {
      Value = All.filter(item => { return (item.TYPE === 'ความดันโลหิตต่ำ') }).length
    } else if (length === 'normal') {
      Value = All.filter(item => { return (item.TYPE === 'ปกติ') }).length
    } else if (length === 'elevate') {
      Value = All.filter(item => { return (item.TYPE === 'ความดันโลหิตสูงขั้นต้น') }).length
    } else if (length === 'high1') {
      Value = All.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 1') }).length
    } else if (length === 'high2') {
      Value = All.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 2') }).length
    }
    return Value;
  }

  const avgAll = (format) => {
    const intiialValues = { SYS: 0, DIA: 0, BPM: 0 };
    const total = All.reduce((acc, val) => {
      acc.SYS += parseFloat(val.SYS);
      acc.DIA += parseFloat(val.DIA);
      acc.BPM += parseFloat(val.BPM);
      return acc;
    }, intiialValues);

    const avg = {
      SYS: Number((total.SYS / All.length).toFixed(2)),
      DIA: Number((total.DIA / All.length).toFixed(2)),
      BPM: Number((total.BPM / All.length).toFixed(2)),
    };

    let Value;

    if (format === 'SYS') {
      Value = avg.SYS.toFixed(0)
    } else if (format === 'DIA') {
      Value = avg.DIA.toFixed(0)
    } else if (format === 'BPM') {
      Value = avg.BPM.toFixed(0)
    }
    return Value
  };

  const allPersen = calculatePersen(All.length, AllLength('low'), AllLength('normal'), AllLength('elevate'), AllLength('high1'), AllLength('high2'));

  //html
  const htmlContent =
    `<html>

    <head>
        <meta charset="UTF-8">
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap" rel="stylesheet">
        <style>
            * {
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
    
            h1 {
                font: bold 100% Noto Sans Thai;
                letter-spacing: 0.2em;
                text-align: center;
    
            }
    
            /* page */
            html {
                font: 16px/1 'Open Sans', sans-serif;
                overflow: auto;
            }
    
            html {
                background: #999;
                cursor: default;
            }
    
            body {
                box-sizing: border-box;
                margin: 0 auto;
                overflow: hidden;
                padding: 0.25in;
                font-family: 'Noto Sans Thai', sans-serif;
                
            }
    
            body {
                background: #FFF;
                border-radius: 1px;
                box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
                
            }
    
            /* header */
            header {
                margin: 0 0 0 0;
            }
    
            header::after {
                clear: both;
                content: "";
                display: table;
            }
    
            header h1 {
                background-color: black;
                border-radius: 0.25em;
                color: white;
                margin: 0 0 1em;
                padding: 0.5em 0;
                text-transform: uppercase;
            }
    
            header div {
                float: left;
                font-size: 80%;
                font-style: normal;
                line-height: 1.25;
                /* margin: 0 0 1em 0; */
            }
    
            header div p {
                margin: 0 0 0.25em;
            }
    
            /* table */
    
            table {
                font-size: 75%;
                table-layout: fixed;
                width: 100%;
            }
    
            table {
                border-collapse: separate;
                border-spacing: 2px;
            }
    
            table.tableAvg {
                /* float: left; */
                width: 40%;
                /* background-color: burlywood; */
                /* margin-right: 2em; */
            }
    
            th,
            td {
                border-width: 1px;
                padding: 0.5em;
                position: relative;
                text-align: left;
            }
    
            th,
            td {
                border-radius: 0.25em;
                border-style: solid;
            }
    
            th {
                background: #EEE;
                border-color: #BBB;
            }
    
            td {
                border-color: #DDD;
            }
    
            /* table Date */
            table.Date {
                float: right;
                width: 25%;
            }
    
            table.Date th {
                width: 30%;
            }
    
            /*box*/
            div.tableAvg {
                clear: both;
                /* margin-top: 8em; */
                /* background-color: aquamarine;
                border: 1px solid black; */
            }
    
            div.flex {
                display: flex;
            }
    
            div.texContents {
                margin-left: 10px;
                line-height: 1.4;
                font-size: 80%;
            }
        </style>
    </head>
    
    <body>
    
        <header>
            <h1>record blood pressure</h1>
            <div>
                <p>${userData.username}</p>
                <p>เพศ ${userData.sex} อายุ ${userData.age} ปี</p>
                <p>น้ำหนัก ${userData.weight} กก. ส่วนสูง ${userData.hight} ซม.</p>
                <p>ดัชนีมวลกาย(BMI) = ${bmiValue.toFixed(2)} ${statusBMI}</p>
            </div>
            <table class="Date">
                <tbody>
                    <tr>
                        <th>เวลา</th>
                        <td>${formatDate(currentDate, 'time')}</td>
                    </tr>
                    <tr>
                        <th>วันที่</th>
                        <td>${formatDate(currentDate, 'date')}</td>
                    </tr>
    
                </tbody>
            </table>
    
        </header>
        <br>
    
        <article>
            <h1 style="letter-spacing: normal;">ข้อมูลความดันโลหิต</h1>
            <h2 style="margin-bottom: 0.5em;">ค่าความดันโลหิตล่าสุด</h2>
            <table>
                <tbody>
                    <tr>
                        <th>วันเวลา</th>
                        ${bloodPressure.slice(0, 5).map((data) => `<td>${formatDate(data.timestamp,
                            'time')}<br />${formatDate(data.timestamp, 'date')}</td>`).join('')}
                    </tr>
                    <tr>
                        <th>ความดันตัวบน<br>(SYS)</th>
                        ${bloodPressure.slice(0, 5).map((data) => `<td>${data.SYS}</td>`).join('')}
                    </tr>
                    <tr>
                        <th>ความดันตัวล่าง<br>(DIA)</th>
                        ${bloodPressure.slice(0, 5).map((data) => `<td>${data.DIA}</td>`).join('')}
                    </tr>
                    <tr>
                        <th>อัตราการเต้นหัวใจ<br>(bpm)</th>
                        ${bloodPressure.slice(0, 5).map((data) => `<td>${data.BPM}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        </article>
        <br>
        <article>
            <p>ค่าเฉลี่ยความดันโลหิต</p>
            <br>
            <div class="tableAvg">
                <p>ค่าเฉลี่ยสัปดาห์</p>
                <br>
                <div class="flex">
                    <table class="tableAvg">
                        <tbody>
                            <tr>
                                <th>ความดันตัวบน<br>(SYS)</th>
                                <td>${avgWeek('SYS')}</td>
                            </tr>
                            <tr>
                                <th>ความดันตัวล่าง<br>(DIA)</th>
                                <td>${avgWeek('DIA')}</td>
                            </tr>
                            <tr>
                                <th>อัตราการเต้นหัวใจ<br>(bpm)</th>
                                <td>${avgWeek('BPM')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="texContents">
                        <p>การวัดความดันโลหิต ${Week.length} ครั้ง</p>
                        <br>
                        <p>${weekPersen.persen1}% ความดันโลหิตต่ำ</p>
                        <p>${weekPersen.persen2}% ความดันโลหิตปกติ</p>
                        <p>${weekPersen.persen3}% ความดันโลหิตสูงขั้นต้น</p>
                        <p>${weekPersen.persen4}% ความดันโลหิตสูง ระยะที่ 1</p>
                        <p>${weekPersen.persen5}% ความดันโลหิตสูง ระยะที่ 2</p>
                    </div>
                </div>
            </div>
            <br>
            <div class="tableAvg">
                <p>ค่าเฉลี่ยเดือน</p>
                <br>
                <div class="flex">
                    <table class="tableAvg">
                        <tbody>
                            <tr>
                                <th>ความดันตัวบน<br>(SYS)</th>
                                <td>${avgMonth('SYS')}</td>
                            </tr>
                            <tr>
                                <th>ความดันตัวล่าง<br>(DIA)</th>
                                <td>${avgMonth('DIA')}</td>
                            </tr>
                            <tr>
                                <th>อัตราการเต้นหัวใจ<br>(bpm)</th>
                                <td>${avgMonth('BPM')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="texContents">
                        <p>การวัดความดันโลหิต ${Month.length} ครั้ง</p>
                        <br>
                        <p>${monthPersen.persen1}% ความดันโลหิตต่ำ</p>
                        <p>${monthPersen.persen2}% ความดันโลหิตปกติ</p>
                        <p>${monthPersen.persen3}% ความดันโลหิตสูงขั้นต้น</p>
                        <p>${monthPersen.persen4}% ความดันโลหิตสูง ระยะที่ 1</p>
                        <p>${monthPersen.persen5}% ความดันโลหิตสูง ระยะที่ 2</p>
                    </div>
                </div>
            </div>
            <br>
            <div class="tableAvg">
                <p>ค่าเฉลี่ยทั้งหมด</p>
                <br>
                <div class="flex">
                    <table class="tableAvg">
                        <tbody>
                            <tr>
                                <th>ความดันตัวบน<br>(SYS)</th>
                                <td>${avgAll('SYS')}</td>
                            </tr>
                            <tr>
                                <th>ความดันตัวล่าง<br>(DIA)</th>
                                <td>${avgAll('DIA')}</td>
                            </tr>
                            <tr>
                                <th>อัตราการเต้นหัวใจ<br>(bpm)</th>
                                <td>${avgAll('BPM')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="texContents">
                        <p>การวัดความดันโลหิต ${All.length} ครั้ง</p>
                        <br>
                        <p>${allPersen.persen1}% ความดันโลหิตต่ำ</p>
                        <p>${allPersen.persen2}% ความดันโลหิตปกติ</p>
                        <p>${allPersen.persen3}% ความดันโลหิตสูงขั้นต้น</p>
                        <p>${allPersen.persen4}% ความดันโลหิตสูง ระยะที่ 1</p>
                        <p>${allPersen.persen5}% ความดันโลหิตสูง ระยะที่ 2</p>
                    </div>
                </div>
            </div>
            </div>
        </article>
    
    </body>
    
    </html>`;

  //create PDF file
  const createPDF = async () => {
    const option = {
      html: htmlContent,
      fileName: 'RBP',
      //  + Date.now()
      directory: 'Documents',
    };
    try {
      const file = await RNHTMLtoPDF.convert(option)

      console.log(file.filePath);

      Alert.alert('บันทึกข้อมูลสำเร็จ!', 'ที่อยู่:' + file.filePath, [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'เปิด', onPress: () => openFile(file.filePath) }
      ], { cancelable: true });
    } catch (e) {
      console.log('Save File Failed' + e.message);
      Alert.alert('Save File Failed', '' + e.message);
    }

  };

  //open file PDF location
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
      <View style={styles.container}>
        <VStack space={2} style={styles.mainBorder}>
          <View style={{alignItems: "center",}}>
          <Image
              source={require("../../../../assets/image/Hands-Synced.png")}
              style={{ height: 148, width: 200 }}
              resizeMode='stretch' />
          </View>
            <VStack style={styles.secoundBorder}>
              <Text style={{  marginBottom: 20, fontFamily: 'NotoSansThai-Regular', color: "#000" , }}>
                กดบันทึกเพื่อบักทึกข้อมูลเป็นไฟล์เอกสาร
              </Text>
              <Button
                title={"บันทึกข้อมูล"}
                buttonStyle={{
                  borderRadius: 10,
                  height: 40,
                  width: 250,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#5DB075",
                }}
                titleStyle={{
                  fontFamily:"NotoSansThai-Regular",
                }}
                onPress={() => { requestExternalWritePermissions(); }} />
            </VStack>
        </VStack>
      </View>
    </NativeBaseProvider>
  )
}

export default SaveComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  mainBorder: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 10,
  },

  secoundBorder: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 10,
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

