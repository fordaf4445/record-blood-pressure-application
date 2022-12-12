import React from 'react';
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import AuthStack from './src/navigation/AuthStack';
import TapStack from './src/navigation/TapStack'
import { NavigationContainer } from '@react-navigation/native';
import TestFireStore from './src/screens/TapScreens/testfirestore'
const App = () => {

  // const androidPermissions = async () => {
  //   try{
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOACTAION,
  //       {
  //         title: 'อนุญาตให้ใช้ที่อยู่',
  //         message: 
  //           'Travel needs access to your location ' +
  //           'so you can find the nearest courier.',
  //         buttonNeutral: 'Remind Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED){
  //       console.log('สามารถใช้ได้');
  //     } else {
  //       console.log('โดนปฏิเสธ');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  // useEffect( () => {
  //     androidPermissions();
  // }, [])

  return(
    <NavigationContainer>
      <TapStack/>
      {/* <AuthStack/> */}
      {/* <TestFireStore/> */}
    </NavigationContainer>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App

