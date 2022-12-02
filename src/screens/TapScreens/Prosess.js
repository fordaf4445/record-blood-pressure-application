import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import ButtonComponent from '../../components/ButtonComponent';

const Prosess = () => {

    return (
        <View style={styles.container}>
            <View style={{ flex:1,alignItems: 'center',justifyContent:'space-around'}}>
                <View style={{flex:3,justifyContent:'center'}}>
                    <Image source={require("../../../assets/image/wifi-connection.png")}
                        style={{ width: 200, height: 200 }} />
                    <Text></Text>
                </View>
                <View>
                    <ButtonComponent
                        label={"เชื่อมต่อบลูทูธ"}
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


});