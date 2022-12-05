import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const Calendar = () => {
  return (
    <View >
      <Text style={{fontSize:16,fontFamily:"NotoSansThai-Bold",color:'black'}}>ปฏิทินการแจ้งเตือน</Text>
      <Text style={styles.textStyle}>ตั้งแจ้งเตือนและกำหนดการความดัน</Text>
      <Text style={styles.textStyle}>ในแต่ละวัน</Text>
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
    textStyle: {
        fontFamily:'NotoSansThai-Regular',
        color: 'black',
    }
})