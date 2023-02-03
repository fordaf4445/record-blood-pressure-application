import React, { useState } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';


const Prosess = () => {

    const navigation = useNavigation();

    function clickInput() {

        return (
            <View style={{ height: 150, alignItems: "center", flex: 1 }}>
                <Button
                    onPress={() => { navigation.navigate('InputDataTest') }}
                    title={"เพิ่มข้อมูลด้วยตัวเอง"}
                    titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
                    buttonStyle={{
                        backgroundColor: 'red',
                        borderRadius: 30,
                        height: 50,
                        width: 212,
                    }}
                    containerStyle={{
                        // marginHorizontal: 50,
                        marginVertical: 10,
                        marginTop: 25,
                        alignItems: 'center',
                    }}
                />
                <Text style={[styles.text, { color: "red", }]}>กดเพื่อเพิ่มข้อมูลด้วยตัวเอง</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Image source={require("../../../assets/image/wifi-connection.png")}
                        style={{ width: 200, height: 200 }} />
                    <Text></Text>
                    <View style={styles.slideLeft}>
                        <FontAwesome5 name='chevron-circle-left' style={{fontSize:20, color:"#5DB075"}}  />
                        <Text style={{fontFamily:'NotoSansThai-SemiBold',color:'#5DB075'}}>  เลื่อนไปทางซ้ายเพื่อเพิ่มข้อมูลด้วยตัวเอง</Text>
                    </View>
                </View>
                <GestureHandlerRootView style={{ top: 30 }}>
                    <Swipeable
                        renderRightActions={clickInput}>
                        <View style={{ height: 150, }}>
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
                                    marginTop: 25,
                                    alignItems: 'center',
                                }}
                            />
                            <Text style={styles.text}>เชื่อมต่อบลูทูธเพื่อเพิ่มข้อมูลความดันโลหิต</Text>
                        </View>
                    </Swipeable>
                </GestureHandlerRootView>

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
        backgroundColor: "#f2f2f2",
    },
    slideLeft: {
        position: 'absolute',
        top: 500,
        left:-35,
        flexDirection:"row",

    },
});