import React, { useEffect} from 'react';
import { PermissionsAndroid } from 'react-native';
import AuthStack from './src/navigation/AuthStack'; 
const App = () => {

  const androidPermissions = async () => {
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOACTAION,
        {
          title: 'อนุญาตให้ใช้ที่อยู่',
          message: 
            'Travel needs access to your location ' +
            'so you can find the nearest courier.',
          buttonNeutral: 'Remind Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED){
        console.log('สามารถใช้ได้');
      } else {
        console.log('โดนปฏิเสธ');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect( () => {
      androidPermissions();
  }, [])

  return(
    <AuthStack/>
  )
}

export default App

