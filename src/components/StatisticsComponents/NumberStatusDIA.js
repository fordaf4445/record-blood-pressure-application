import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NumberStatusDIA = () => {
  return (
    <View style={styles.container}>
      <Text style={{left:-1,fontFamily:'NotoSansThai-Bold',fontSize:25,}}>67</Text>
    </View>
    
    
  )
}

export default NumberStatusDIA

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:45,
        
    }
})