import React, { useState } from 'react';
import {
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import DeviceInfo from 'react-native-device-info'
import { Overlay, color } from '@rneui/base';
import { VStack, HStack, NativeBaseProvider, } from 'native-base';
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';
import base64 from 'react-native-base64';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";

// import CheckBox from '@react-native-community/checkbox';
import { BleManager, Device } from 'react-native-ble-plx';
import { LogBox } from 'react-native';



LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

// const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';

const TEMPERATURE_UUID = '29100b0e-b298-11ed-afa1-0242ac120002';
const SYS_PREESURE_UUID = 'e1b726f3-cb7b-48f2-a0c4-f6114f82cfab';
const DIA_PREESURE_UUID = '75ee5b29-53fd-4dd7-a1d0-f2e416ed2344';
const PLUSE_BPM_UUID = '4de2b4f9-935e-4bc1-94db-b6972383afd4';


const BleTest = () => {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [overlaySuccess, setOverlaySuccess] = useState(false);
  const [overlayFail, setOverlayFail] = useState(false);
  const [overlayAddData, setOverlayAddData] = useState(false);
  const [visible, setVisible] = useState(false);
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState<Device>();

  const [sysPressureValue, setsysPressureValue] = useState("0");
  const [diaPressureValue, setdiaPressureValue] = useState("0");
  const [pluseValue, setpluseValue] = useState("0");
  const [temperature, setTemperature] = useState("");

  const dateToTime = current => {
    return moment(current).format('L LT');
  };
  // Scans availbale BLT Devices and then call connectDevice
  async function scanDevices() {
    const apiLevel = await DeviceInfo.getApiLevel();
    if (apiLevel < 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permission Localisation Bluetooth',
          message: 'Requirement for Bluetooth',
          buttonNeutral: 'Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission granted');
        connectBluetooth();
      } else {
        console.log('permission denied');
        Alert.alert('', 'หากต้องการเชื่อมต่อให้ไปที่การตั้งค่าและเปิดการอนุญาตทั้งหมด', [
          { text: 'ไม่อนุญาต', style: 'cancel' },
          { text: 'ไปที่การตั้งค่า', onPress: () => { Linking.openSettings(); } }
        ], { cancelable: true })
      }

    } else {
      const bleScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
      );
      const bleConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      );
      const bleLocation = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (bleScan === PermissionsAndroid.RESULTS.GRANTED && bleConnect === PermissionsAndroid.RESULTS.GRANTED
        && bleLocation === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission granted');
        connectBluetooth();
      } else {
        console.log('Permission denied');
        Alert.alert('', 'หากต้องการเชื่อมต่อให้ไปที่การตั้งค่าและเปิดการอนุญาตทั้งหมด', [
          { text: 'ไม่อนุญาต', style: 'cancel' },
          { text: 'ไปที่การตั้งค่า', onPress: () => { Linking.openSettings(); } }
        ], { cancelable: true })
      };
    };
  };

  //function connectBluetooth
  const connectBluetooth = async () => {

    await setOverlayLoading(true);

    await BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
        setOverlayFail(true);
        setOverlayLoading(false);
      }

      if (scannedDevice && scannedDevice.name == 'BLEExample') {
        BLTManager.stopDeviceScan();
        connectDevice(scannedDevice);
        setOverlaySuccess(true);
        setOverlayLoading(false);
      } else {

        BLTManager.stopDeviceScan();
        setOverlayLoading(false);
        setOverlayFail(true);
        console.log("scannedDevice Failed");
        console.log("stopScanningDevice");

      }
    });
  };

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
    console.log('Disconnecting start');

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('temperaturetransaction');

        BLTManager.cancelDeviceConnection(connectedDevice.id).then(() =>
          console.log('Disconnect completed'),
        );
      }

      const connectionStatus = await connectedDevice.isConnected();
      if (!connectionStatus) {
        setIsConnected(false);
      }
    }
  }

  //Connect the device and start monitoring characteristics
  async function connectDevice(device: Device) {
    console.log('connecting to Device:', device.name);

    device
      .connect()
      .then(device => {
        setConnectedDevice(device);
        setIsConnected(true);
        return device.discoverAllServicesAndCharacteristics();
      })
      .then(device => {
        //  Set what to do when DC is detected
        BLTManager.onDeviceDisconnected(device.id, (error, device) => {
          console.log('Device Disconnect');
          setIsConnected(false);
        });

        //Read inital values

        //TemperatureValue
        device
          .readCharacteristicForService(SERVICE_UUID, TEMPERATURE_UUID)
          .then(valenc => {
            setTemperature(base64.decode(valenc?.value));
          });

        device
          .readCharacteristicForService(SERVICE_UUID, SYS_PREESURE_UUID)
          .then(valenc => {
            setsysPressureValue(base64.decode(valenc?.value));
          });

        device
          .readCharacteristicForService(SERVICE_UUID, DIA_PREESURE_UUID)
          .then(valenc => {
            setdiaPressureValue(base64.decode(valenc?.value));
          });

        device
          .readCharacteristicForService(SERVICE_UUID, PLUSE_BPM_UUID)
          .then(valenc => {
            setpluseValue(base64.decode(valenc?.value));
          });




        //monitor values and tell what to do when receiving an update

        //TemperatureValue update
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          TEMPERATURE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setTemperature(base64.decode(characteristic?.value));
              console.log(
                'Temperature Update received : ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'temperaturetransaction'
        );

        //BloodPRessureValue update
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          SYS_PREESURE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setsysPressureValue(base64.decode(characteristic?.value));
              console.log(
                'sys update received: ',
                base64.decode(characteristic?.value),
              );
              setOverlayAddData(true);
            }
          },
          'sysPressuretransaction',
        );

        device.monitorCharacteristicForService(
          SERVICE_UUID,
          DIA_PREESURE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setdiaPressureValue(base64.decode(characteristic?.value));
              console.log(
                'dia update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'diaPressuretransaction',
        );

        device.monitorCharacteristicForService(
          SERVICE_UUID,
          PLUSE_BPM_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setpluseValue(base64.decode(characteristic?.value));
              console.log(
                'pluse update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'plusetransaction',
        );


        console.log('Connection established');
      });
  }

  let colorBoloodPresure;
  let typeBoloodPresure;
  if (Number(sysPressureValue) > 160) {
    colorBoloodPresure = "#EF553C"
    typeBoloodPresure = "ความดันโลหิตสูง ระยะที่ 2"
  } else if (Number(sysPressureValue) >= 141) {
    colorBoloodPresure = "#F1815C"
    typeBoloodPresure = "ความดันโลหิตสูง ระยะที่ 1"
  } else if (Number(sysPressureValue) >= 121) {
    colorBoloodPresure = "#EEC151"
    typeBoloodPresure = "ความดันโลหิตสูงขั้นต้น"
  } else if (Number(sysPressureValue) >= 91) {
    colorBoloodPresure = "#B8DE9A"
    typeBoloodPresure = "ปกติ"
  } else {
    colorBoloodPresure = "#71C7E2"
    typeBoloodPresure = "ความดันโลหิตต่ำ"
  }

  //update pressure
  function updatePressure() {
    if (Number(temperature.substring(0, 6)) < 10) {
      return 0;
    } else {
      return Number(temperature.substring(0, 6)).toFixed(0);
    }
  }

  async function addInformationFireStore() {
    await setVisible(true)
    let type;
    if (Number(sysPressureValue) > 160) {
      type = "ความดันโลหิตสูง ระยะที่ 2"
    } else if (Number(sysPressureValue) >= 141) {
      type = "ความดันโลหิตสูง ระยะที่ 1"
    } else if (Number(sysPressureValue) >= 121) {
      type = "ความดันโลหิตสูงขั้นต้น"
    } else if (Number(sysPressureValue) >= 91) {
      type = "ปกติ"
    } else {
      type = "ความดันโลหิตต่ำ"
    }

    if (currentUser !== null) {
      await db.collection('dataUser')
        .doc(currentUser.uid)
        .collection('BloodPressure')
        .add({
          SYS: Number(sysPressureValue).toFixed(0),
          DIA: Number(diaPressureValue).toFixed(0),
          BPM: Number(pluseValue).toFixed(0),
          timestamp: Date.now(),
          TYPE: type,
          TIME: dateToTime(Date.now()),
        })
        .then(function (docRef) {
          setVisible(false)
          console.log("Document written with ID: ", docRef.id);
          // Alert.alert("เพิ่มข้อมูลสำเร็จ")
          Alert.alert(
            "บันทึกข้อมูลสำเร็จ",
            "",
            [
              { text: "OK", onPress: () => { setOverlayAddData(false), setsysPressureValue('0'), setdiaPressureValue('0'), setpluseValue('0') } }
            ]
          );

        })
        .catch(function (err) {
          console.log("Error adding information: ", err);
          Alert.alert("เพิ่มข้อมูลไม่สำเร็จ !!" + err.message)
        })
      { type }

    } else {

      console.log("currentUser = null ");
    };


  }

  const BMIDetail = () => {
    const filepath = 'KnowYourNumners.pdf';
    const destPath = `${RNFS.DocumentDirectoryPath}/${filepath}`

    RNFS.copyFileAssets(filepath, destPath)
      .then(() => {
        FileViewer.open(destPath);
        console.log('Successfully copied' + destPath);
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      });
    // console.log(destPath);

  };


  return (
    <VStack width={"100%"} height={"100%"} alignItems={"center"} justifyContent={"center"} >

      {/* OverlayLoading */}
      <Overlay isVisible={overlayLoading} overlayStyle={{ borderRadius: 25, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "center", width: 300 }}>
          <Animated.Image
            source={require("../../../assets/gif/heartLoading.gif")}
            style={{ width: 70, height: 70 }}
            resizeMode='cover' />
          {/* <ActivityIndicator size='large' /> */}
          <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>กรุณารอสักครู่..</Text>
          <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 15, color: "#000" }}>คำแนะนำ: หากรอนานเกินไปกรุณาเปิดปิดบลูทูธ</Text>
        </View>
      </Overlay>
      <Overlay isVisible={overlaySuccess} overlayStyle={{ borderRadius: 25, backgroundColor: "#fff" }} onPressOut={() => { setOverlaySuccess(false) }}>
        <View style={{ alignItems: "center", justifyContent: "space-between", width: 150, }}>
          <Animated.Image
            source={require("../../../assets/gif/wired-outline-1103-confetti.gif")}
            style={{ width: 70, height: 70 }}
            resizeMode='cover' />
          {/* <ActivityIndicator size='large' /> */}
          <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>เชื่อมต่อสำเร็จ</Text>
        </View>
      </Overlay>
      <Overlay isVisible={overlayFail} overlayStyle={{ borderRadius: 25, backgroundColor: "#fff" }} onPressOut={() => { setOverlayFail(false) }}>
        <View style={{ alignItems: "center", width: 250 }}>
          <Animated.Image
            source={require("../../../assets/gif/wired-outline-1140-error.gif")}
            style={{ width: 70, height: 70 }}
            resizeMode='cover' />
          {/* <ActivityIndicator size='large' /> */}
          <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>เชื่อมต่อไม่สำเร็จ</Text>
          <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 16, color: "#000" }}>ตรวจสอบบลูทูธและเชื่อมต่ออีกครั้ง</Text>
        </View>
      </Overlay>
      <Overlay isVisible={visible} overlayStyle={{ borderColor: "red", borderRadius: 25, backgroundColor: "#fff" }}>
        <View style={{ alignItems: "center", width: 150 }}>
          <Animated.Image
            source={require("../../../assets/gif/heartLoading.gif")}
            style={{ width: 70, height: 70 }}
            resizeMode='cover' />
          {/* <ActivityIndicator size='large' /> */}
          <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>กรุณารอสักครู่..</Text>
        </View>
      </Overlay>

      {/* Overlay add data */}

      <Overlay isVisible={overlayAddData} overlayStyle={{ borderRadius: 25, backgroundColor: "#fff", height: "68%" }} >
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack style={styles.contrainerOverlayaddData}>
            <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>การวัดความดันโลหิตเสร็จสิ้น</Text>
            <VStack width={"95%"} padding={2} space={1} justifyContent={"space-around"}>
              <Text style={{ fontFamily: "NotoSansThai-Regular", fontSize: 16, color: "#000" }}>ความดันโลหิตตัวบน</Text>
              <HStack style={styles.inPutDataManualLayer} space={3} >
                <VStack style={styles.inputLayerFront} backgroundColor={"#ff0000"} borderRadius={15}>
                  <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#fff" }}>
                    SYS
                  </Text>
                  <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#fff" }}>
                    mmgh
                  </Text>
                </VStack>
                <View style={[styles.inputNumLayer, { borderColor: "#ff0000" }]}>
                  <Text style={[styles.textNumber, { color: "#ff0000" }]}>{Number(sysPressureValue).toFixed(0)}</Text>
                </View>
              </HStack>

              <Text style={{ fontFamily: "NotoSansThai-Regular", fontSize: 16, color: "#000" }}>ความดันโลหิตตัวล่าง</Text>
              <HStack style={styles.inPutDataManualLayer} space={3} >
                <VStack style={styles.inputLayerFront} backgroundColor={"#A4BF43"} borderRadius={15}>
                  <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#fff" }}>
                    DIA
                  </Text>
                  <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#fff" }}>
                    mmgh
                  </Text>
                </VStack>
                <View style={[styles.inputNumLayer, { borderColor: "#A4BF43" }]}>
                  <Text style={[styles.textNumber, { color: "#A4BF43" }]}>{Number(diaPressureValue).toFixed(0)}</Text>
                </View>
              </HStack>

              <Text style={{ fontFamily: "NotoSansThai-Regular", fontSize: 16, color: "#000" }}>อัตราการเต้นของหัวใจ</Text>
              <HStack style={styles.inPutDataManualLayer} space={3} >
                <VStack style={styles.inputLayerFront} backgroundColor={"#23AFD6"} borderRadius={15}>
                  <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 15, color: "#fff" }}>
                    PULSE
                  </Text>
                  <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#fff" }}>
                    bpm
                  </Text>
                </VStack>
                <View style={[styles.inputNumLayer, { borderColor: "#23AFD6" }]}>
                  <Text style={[styles.textNumber, { color: "#23AFD6" }]}>{Number(pluseValue).toFixed(0)}</Text>
                </View>
              </HStack>
              <VStack space={1}>
                <Text style={{ fontFamily: "NotoSansThai-Regular", fontSize: 16, color: "#000" }}>ประเภทความดันโลหิตของคุณคือ :</Text>
                <View style={[styles.contrinerType, { backgroundColor: colorBoloodPresure }]}>
                  <Text style={{ fontFamily: "NotoSansThai-Regular", fontSize: 16, color: "#000" }}>{typeBoloodPresure}</Text>
                </View>
              </VStack>
              <HStack marginTop={5} justifyContent={"space-around"} height={12}>
                <TouchableOpacity style={[styles.contrainerButton, { backgroundColor: "red" }]}
                  onPress={() => { setOverlayAddData(false), setsysPressureValue('0'), setdiaPressureValue('0'), setpluseValue('0') }}>
                  <View>
                    <Text style={styles.buttonText}>ยกเลิก</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contrainerButton}
                  onPress={() => { addInformationFireStore() }}>
                  <View>
                    <Text style={styles.buttonText}>บันทึก</Text>
                  </View>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>

        </ScrollView>
      </Overlay>


      {/* Body */}
      {!isConnected ? (
        <VStack alignItems={"center"} space={3} >
          <VStack style={styles.contrainerDisConnected}>
            <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>กรุณากดเชื่อมต่อเพื่อเชื่อมต่อแอพพลิเคชันกับเครื่องวัดความดันโลหิต</Text>
          </VStack>
          <TouchableOpacity style={styles.buttonOpacity}
            onPress={() => { scanDevices() }}>
            <Text style={styles.buttonText}>เชื่อมต่อ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contrainerDetail}
          onPress={() => {BMIDetail()}}>
            <Text style={{ fontFamily: "NotoSansThai-Regular", fontSize: 15, color: "#000" }}>กดตรงนี้เพื่อดูข้อมูลเกี่ยวกับวิธีการวัดความดันโลหิต*</Text>
          </TouchableOpacity>
        </VStack>
      ) : (
        <VStack alignItems={"center"} space={3} style={styles.contrainerIsConnected} >
          <HStack width={"100%"}>
            <Text style={{ fontSize: 35, fontFamily: "NotoSansThai-Bold", color: "black" }}>ระดับความดัน</Text>
          </HStack>
          <HStack width={"60%"} justifyContent={'space-around'}>
            <View style={{ width: "50%", alignItems: "center" }}>
              <Text style={{ fontSize: 40, fontFamily: "NotoSansThai-Bold", color: "black" }}>{updatePressure()}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 25, fontFamily: "NotoSansThai-Bold", color: "black", marginTop: 15 }}>mmHg</Text>
            </View>
          </HStack>
          <TouchableOpacity style={[styles.buttonOpacity, { backgroundColor: "red" }]}
            onPress={() => { disconnectDevice() }}>
            <Text style={styles.buttonText}>ยกเลิกการเชื่อมต่อ</Text>
          </TouchableOpacity>
        </VStack>
      )}
    </VStack>
  );
};

export default BleTest;

const styles = StyleSheet.create({
  contrainer: {

  },
  buttonOpacity: {
    height: 45,
    width: 150,
    borderRadius: 25,
    backgroundColor: "#5DB075",
    shadowColor: "#000",
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "NotoSansThai-Bold",
    fontSize: 16,
    color: "#fff"
  },
  contrainerIsConnected: {
    height: "90%",
    width: "90%",
  },
  contrainerDisConnected: {
    height: "40%",
    width: 315,
  },
  contrainerOverlayaddData: {
    alignItems: "center",
    width: 320,
    paddingTop: 20,
  },
  inPutDataManualLayer: {
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    backgroundColor: "white",
    // shadowColor: "#000",
    // elevation: 10,
    // borderWidth: 1,
  },
  inputNumLayer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    height: 50,
    borderWidth: 1,
    width: 150,
    shadowColor: "#000",
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputLayerFront: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    shadowColor: "#000",
    elevation: 10,
  },
  textNumber: {
    fontFamily: "NotoSansThai-Regular",
    fontSize: 25,
    color: "#000"
  },
  contrinerType: {
    alignItems: "center",
    borderRadius: 100,
  },
  contrainerButton: {
    heigh: "100%",
    width: "40%",
    backgroundColor: "#5DB075",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5.5,
  },
  textButton: {
    fontFamily: "NotoSansThai-Bold",
    fontSize: 16,
    color: "#000"
  },
  contrainerDetail : {
    marginTop: 30 , 
    borderRadius:15,
    width:350,
    height:30,
    backgroundColor:"#B8DE9A",
    alignItems: "center",
    justifyContent: "center",
  },
});

