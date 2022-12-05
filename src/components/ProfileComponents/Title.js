import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Title = () => {
    return (
        <View style={{ top: 5 }}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textStyle}>น้ำหนัก</Text>
                <Text style={styles.textStyle}>  42</Text>
                <Text style={styles.textStyle}>  กก.</Text>
                <Text style={styles.textStyle}>  ส่วนสูง</Text>
                <Text style={styles.textStyle}>  158</Text>
                <Text style={styles.textStyle}>  ซม.</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>
                <Text style={styles.textStyle}>อายุ</Text>
                <Text style={styles.textStyle}>  26</Text>
                <Text style={styles.textStyle}>  ปี</Text>
                <Text style={styles.textStyle}>  เพศ</Text>
                <Text style={styles.textStyle}>  หญิง</Text>
            </View>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'NotoSansThai-Regular',
        color: 'black',
    }
})