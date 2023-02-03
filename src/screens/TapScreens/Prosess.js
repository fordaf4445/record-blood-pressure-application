import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Text, TouchableOpacity } from 'react-native';
import { Button, Input, makeStyles, FAB, color } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { VStack, HStack, NativeBaseProvider } from 'native-base';
import { ModalJNC7 } from '../../components/ProcessComponents/ModalJNC7';

const Prosess = () => {
    const [changeMode, setChangeMode] = useState(true);
    const [openModalJNC7, setOpenModalJNC7] = useState(false);

    const navigation = useNavigation();



    return (
        <NativeBaseProvider>
            <VStack style={styles.container} space={5} backgroundColor={changeMode == true ? ("#fff") : ("#5DB075")}>
                <VStack style={styles.inputDataBluetooth}>

                </VStack>
                <VStack height="37%" width="100%" borderWidth={1} space={1.5} alignItems="center">
                    <HStack alignItems="center" space={2} >
                        <Text style={{ fontFamily: "NotoSansThai-Regular", color: changeMode == true ? ("#000") : ("#fff") }}>
                            การแบ่งระดับความดันโลหิตสูงตามวิธี JNC 7
                        </Text>
                        <TouchableOpacity onPress={() => {setOpenModalJNC7(!openModalJNC7)}}>
                            <Entypo name='help-with-circle' size={18} color={changeMode == true ? ("#5DB075") : ("#fff")} />
                        </TouchableOpacity>
                    </HStack>
                    <VStack style={styles.inforMation} space={2}>
                        <HStack style={styles.inforMationLayer}>
                            <Text>ประเภท  SYS  DIA</Text>
                        </HStack>
                        <HStack style={styles.inforMationLayer}>
                            <Text>ความดันโลหิตสูง ระยะที่ 2</Text>
                        </HStack>
                        <HStack style={styles.inforMationLayer}>
                            <Text>ความดันโลหิตสูง ระยะที่ 1</Text>
                        </HStack>
                        <HStack style={styles.inforMationLayer}>
                            <Text>ความดันโลหิตสูงขั้นต้น</Text>
                        </HStack>
                        <HStack style={styles.inforMationLayer}>
                            <Text>ปกติ</Text>
                        </HStack>
                        <HStack style={styles.inforMationLayer}>
                            <Text>ความดันโลหิตต่ำ</Text>
                        </HStack>
                    </VStack>
                </VStack >
                <VStack style={styles.fabContainer} alignItems="flex-end" justifyContent="flex-end">
                    <HStack style={styles.inFabContainer} space={2}>
                        <Text>change mode Input</Text>
                        <FAB
                            onPress={() => { setChangeMode(!changeMode) }}
                            icon={
                                <FontAwesome
                                    name='refresh' size={25} color={changeMode == true ? ("#fff") : ("#5DB075")}
                                />}
                            color={changeMode == true ? ("#5DB075") : ("#fff")}
                            style={{}}
                        />
                    </HStack>
                </VStack>
                {ModalJNC7(
                    openModalJNC7,
                    setOpenModalJNC7
                )}
            </VStack>
        </NativeBaseProvider>
    )
}

export default Prosess;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        height: "100%",
    },
    inputDataBluetooth: {
        borderWidth: 1,
        width: "100%",
        height: "30%",
        borderRadius: 35,
    },
    inforMation: {
        borderWidth: 1,
        width: "100%",
        // height: "100%",
        borderRadius: 35,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    inforMationLayer: {
        borderWidth: 1,
        width: "100%",
        height: "11%",
    },
    fabContainer: {
        width: "100%",
        height: "25%",
        borderBottomColor: "red",
        borderWidth: 1,
    },
    inFabContainer: {
        alignItems: "center",
    },
    text: {
        color: '#5DB075',
        top: 10,
        fontFamily: 'NotoSansThai-SemiBold',
        backgroundColor: "#f2f2f2",
    },

});