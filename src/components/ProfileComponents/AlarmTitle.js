import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const AlarmTitle = () => {
  return (
    <View style={{right:21}}>
      <Text style={{fontSize:16,fontFamily:"NotoSansThai-Bold",color:'black'}}>การแจ้งเตือน</Text>
      <Text style={styles.textStyle}>ตั้งแจ้งเตือนและกำหนดการวัดความดัน</Text>
      <Text style={styles.textStyle}>ในแต่ละวัน</Text>
    </View>
  )
}

export default AlarmTitle

const styles = StyleSheet.create({
    textStyle: {
        fontFamily:'NotoSansThai-Regular',
        color: 'black',
    }
})