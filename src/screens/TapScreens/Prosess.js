import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';


const Prosess = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Image source={require("../../../assets/image/wifi-connection.png")}
                        style={{ width: 200, height: 200 }} />
                    <Text></Text>
                </View>
                <View style={{ bottom: 20 }}>
                    <Button
                        onPress={ () => { navigation.navigate('InputDataTest')}}
                        title={"ทดสอบข้อมูลเพิ่ม"}
                        titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
                        buttonStyle={{
                            backgroundColor: '#5DB075',
                            borderRadius: 30,
                            height: 50,
                            width: 212,
                        }}
                        containerStyle={{
                            // marginHorizontal: 50,
                            marginVertical: 10,
                            marginTop: 20,
                            alignItems: 'center',
                        }}
                    />
                    <Text>^^^^^^^ไม่มีเครื่องวัดความดันหรออีดอก กดปุ่มบนสิ^^^^^^^</Text>
                </View>
                <View>
                    <Button
                        title={"เชื่อมต่อบลูทูธ"}
                        titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
                        buttonStyle={{
                            backgroundColor: '#5DB075',
                            borderRadius: 30,
                            height: 50,
                            width: 212,
                        }}
                        containerStyle={{
                            // marginHorizontal: 50,
                            marginVertical: 10,
                            marginTop: 20,
                            alignItems: 'center',
                        }}
                    />
                    <Text style={styles.text}>เชื่อมต่อบลูทูธเพื่อเพิ่มข้อมูลความดันโลหิต</Text>
                </View>
            </View>

        </View>
    )
}

export default Prosess;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        alignItems: 'center',
    },
    text: {
        color: '#5DB075',
        top: 10,
        fontFamily: 'NotoSansThai-SemiBold',
    },
    bottonStyle: {
        
    },
});