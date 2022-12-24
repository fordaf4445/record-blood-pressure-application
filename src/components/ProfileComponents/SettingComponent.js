import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { firebase } from '@react-native-firebase/auth';
const SettingComponent = () => {
  const [data , setData] = useState('');
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
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
        <View style={{ backgroundColor: "white", }}>
          <Text style={{ fontSize: 24 }}>App</Text>
          <Text style={{ fontSize: 24 }}>{data.username}</Text>
          <TextInput
          style={styles.inputView}>{data.username}</TextInput>
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
});