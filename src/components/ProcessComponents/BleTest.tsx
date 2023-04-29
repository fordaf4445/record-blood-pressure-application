import React, { useState } from 'react';
import {
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  Permission,
} from 'react-native';
import DeviceInfo from 'react-native-device-info'

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
  //Is a device connected?
  const [isConnected, setIsConnected] = useState(false);

  //What device is connected?
  const [connectedDevice, setConnectedDevice] = useState<Device>();

  const [message, setMessage] = useState('Nothing Yet');
  const [temperature, setTemperature] = useState('Waiting for Temperature');

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
      } else {
        console.log('permission denied');
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

      } else {
        console.log('Permission denied');

      };
    };


    await BLTManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      if (scannedDevice && scannedDevice.name == 'BLEExample') {
        BLTManager.stopDeviceScan();
        connectDevice(scannedDevice);
      }
    });

    // stop scanning devices after 5 seconds
    await setTimeout(() => {
      BLTManager.stopDeviceScan();
      console.log("Not found Device stopDeviceScan!");
    }, 5000);

  }

  // handle the device disconnection (poorly)
  async function disconnectDevice() {
    console.log('Disconnecting start');

    if (connectedDevice != null) {
      const isDeviceConnected = await connectedDevice.isConnected();
      if (isDeviceConnected) {
        BLTManager.cancelTransaction('messagetransaction');
        BLTManager.cancelTransaction('nightmodetransaction');

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
    <VStack borderWidth={1} width={"100%"} height={"100%"} alignItems={"center"} justifyContent={"center"} space={3}>
      <TouchableOpacity>
        {!isConnected ? (
          <Button
            title="Connect"
            onPress={() => {
              scanDevices();
            }}
            disabled={false}
          />
        ) : (
          <Button
            title="Disonnect"
            onPress={() => {
              disconnectDevice();
            }}
            disabled={false}
          />
        )}
      </TouchableOpacity>
      <Text>Waiting for Blutooth</Text>
      <Text>Temperature</Text>
      <Text>{temperature}</Text>
    </VStack>
  );
};

export default BleTest;

const styles = StyleSheet.create({
  contrainer: {

  },
});

