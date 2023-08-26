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
} from 'react-native';
import DeviceInfo from 'react-native-device-info'
import { Overlay } from '@rneui/base';
import { VStack, HStack, NativeBaseProvider, } from 'native-base';

import base64 from 'react-native-base64';

// import CheckBox from '@react-native-community/checkbox';
import { BleManager, Device } from 'react-native-ble-plx';
import { LogBox } from 'react-native';



LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const BLTManager = new BleManager();

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';

const MESSAGE_UUID = '6d68efe5-04b6-4a85-abc4-c2670b7bf7fd';

const TEMPERATURE_UUID = '29100b0e-b298-11ed-afa1-0242ac120002';


const BleTest = () => {
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [overlaySuccess, setOverlaySuccess] = useState(false);
  const [overlayFail, setOverlayFail] = useState(false);
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState<Device>();

  const [message, setMessage] = useState('Nothing Yet');
  const [temperature, setTemperature] = useState("");

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
          { text: 'ไปที่การตั้งค่า', onPress: () => {Linking.openSettings();} }
        ],{cancelable : true})
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
          { text: 'ไปที่การตั้งค่า', onPress: () => {Linking.openSettings();} }
        ],{cancelable : true})
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

        //Message
        device
          .readCharacteristicForService(SERVICE_UUID, MESSAGE_UUID)
          .then(valenc => {
            setMessage(base64.decode(valenc?.value));
          });
        //TemperatureValue
        device
          .readCharacteristicForService(SERVICE_UUID, TEMPERATURE_UUID)
          .then(valenc => {
            setTemperature(base64.decode(valenc?.value));
          });


        //monitor values and tell what to do when receiving an update

        //Message
        device.monitorCharacteristicForService(
          SERVICE_UUID,
          MESSAGE_UUID,
          (error, characteristic) => {
            if (characteristic?.value != null) {
              setMessage(base64.decode(characteristic?.value));
              console.log(
                'Message update received: ',
                base64.decode(characteristic?.value),
              );
            }
          },
          'messagetransaction',
        );

        //TemperatureValue   
        device.monitorCharacteristicForService(
          SERVICE_UUID, TEMPERATURE_UUID,
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

        console.log('Connection established');
      });
  }

  return (
    <VStack width={"100%"} height={"100%"} alignItems={"center"} justifyContent={"center"} space={3}>
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
      {!isConnected ? (
        <VStack alignItems={"center"} space={3}>

          <TouchableOpacity style={styles.buttonOpacity}
            onPress={() => { scanDevices() }}>
            <Text style={styles.buttonText}>เชื่อมต่อ</Text>
          </TouchableOpacity>
        </VStack>
      ) : (
        <VStack alignItems={"center"} space={3}>
          <Text style={{ fontSize: 20, fontFamily: "NotoSansThai-Bold", color: " #000" }}>{temperature.substring(0, 6) + " mmHg"}</Text>
          <TouchableOpacity style={styles.buttonOpacity}
            onPress={() => { disconnectDevice() }}>
            <Text style={styles.buttonText}>ยกเลิกการเชื่อมต่อ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOpacity}
            onPress={() => { console.log(connectedDevice?.id );
             }}>
            <Text style={styles.buttonText}>try!</Text>
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
});

