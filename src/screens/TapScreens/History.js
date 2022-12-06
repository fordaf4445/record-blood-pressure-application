import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const History = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.textHeader}>ประวัติ</Text>
            </View>
            <View>

            </View>
            <View style={styles.borderHistory}>
                <ScrollView>

                </ScrollView>
            </View>
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBar: {
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 16,
    },
    textHeader: {
        fontSize: 35,
        fontFamily: 'NotoSansThai-Bold',
        color: 'black',
    },
    borderHistory:{
        flex:1,
        borderWidth:1,
        borderRadius:15,
        margin:20,
        borderColor: '#e8e8e8',
        backgroundColor: 'white',
        
    },
})