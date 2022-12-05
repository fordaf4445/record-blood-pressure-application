import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const Savefile = () => {
  return (
    <View style={{marginRight:20}}>
      <Text style={{fontSize:16,fontFamily:"NotoSansThai-Bold",color:'black'}}>บันทึกข้อมูลเป็นไฟล์เอกสาร</Text>
      <Text style={styles.textStyle}>บันทึกข้อมูลในฟอร์มเอกสาร</Text>
      <Text style={styles.textStyle}>เพื่อส่งออก</Text>
    </View>
  )
}

export default Savefile

const styles = StyleSheet.create({
    textStyle: {
        fontFamily:'NotoSansThai-Regular',
        color: 'black',
    }
})