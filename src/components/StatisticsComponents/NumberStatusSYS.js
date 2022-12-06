import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const NumberStatusSYS = () => {
  return (
    <View style={styles.container}>
      <Text style={{ right: 137, fontFamily: 'NotoSansThai-Bold', fontSize: 25, }}>135</Text>
    </View>
  )
}

export default NumberStatusSYS

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 45,

  }
})