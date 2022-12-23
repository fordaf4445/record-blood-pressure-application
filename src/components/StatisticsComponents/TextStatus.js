import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const TextStatus = () => {
  return (
    <View style={styles.container}>
      <Text style={{right:109,fontFamily:'NotoSansThai-Bold',color:'#FF0000'}}>SYS</Text>
      <Text style={{left:3,fontFamily:'NotoSansThai-Bold',color:'#B8DE9A'}}>DIA</Text>
      <Text style={{left:110,fontFamily:'NotoSansThai-Bold',color:'#23AFD6'}}>bpm</Text>
    </View>
  )
}

export default TextStatus

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        position:'absolute',
        top:75,
    }
})