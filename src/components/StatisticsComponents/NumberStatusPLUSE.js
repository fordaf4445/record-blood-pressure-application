import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NumberStatusPLUSE = () => {
  return (
    <View style={styles.container}>
      <Text style={{left:135,fontFamily:'NotoSansThai-Bold',fontSize:25,}}>75</Text>
    </View>
    
    
  )
}

export default NumberStatusPLUSE

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:45,
        
    }
})