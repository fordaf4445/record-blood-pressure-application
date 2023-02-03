import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Text, TouchableOpacity, Button } from 'react-native';
import { FAB, Overlay } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { VStack, HStack, NativeBaseProvider, Link } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';

const Prosess = () => {
    const [changeMode, setChangeMode] = useState(true);
    const [openOverlayJNC7, setOpenOverlayJNC7] = useState(false);

    const navigation = useNavigation();
    const [openImage, setOpenImage] = useState(false);

    const images = [{
        props: {
            source: require('../../../assets/image/ClassificationBloodpressure.png')
        }
    }]

    return (
        <NativeBaseProvider>
            <VStack style={styles.container} space={5} backgroundColor={changeMode == true ? ("#fff") : ("#5DB075")}>
                <Overlay isVisible={openOverlayJNC7} onBackdropPress={() => { setOpenOverlayJNC7(!openOverlayJNC7) }} overlayStyle={{ backgroundColor: "#fff", height: "70%", width: "98%" }}>
                    <Overlay isVisible={openImage} onBackdropPress={() => { setOpenImage(!openImage) }}
                        overlayStyle={{ backgroundColor: "#fff", height: "60%", width: "98%", }}>
                        <ImageViewer
                            imageUrls={images}
                            backgroundColor={"#fff"}
                        />
                        <HStack position="absolute" width="100%" height="90%" justifyContent={"flex-end"} paddingTop={3}>
                            <TouchableOpacity onPress={() => { setOpenImage(!openImage) }}>
                                <MaterialCommunityIcons
                                    name='close-circle'
                                    size={30} />
                            </TouchableOpacity>
                        </HStack>
                    </Overlay>
                    <VStack>
                        <HStack justifyContent={"flex-end"}>
                            <TouchableOpacity onPress={() => { setOpenOverlayJNC7(!openOverlayJNC7) }}>
                                <MaterialCommunityIcons
                                    name='close-circle'
                                    size={30} />
                            </TouchableOpacity>
                        </HStack>
                        <TouchableOpacity onPress={() => { setOpenImage(!openImage) }}>
                            <Image
                                source={require('../../../assets/image/ClassificationBloodpressure.png')}
                                style={{ width: "100%", height: 350 }}
                                resizeMode='stretch'
                            />
                        </TouchableOpacity>
                        <VStack padding={2.5}>
                            <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#000", }}>
                                อ้างอิงจาก หนังสือคู่มือการให้ความรู้ เพื่อจัดการภาวะความดันโลหิตสูงด้วยตนเอง หน้าที่ 16.
                            </Text>
                            <Link href="http://www.imrta.dms.moph.go.th/imrta/images/data/ht20121024.pdf" >
                               <Text style={{fontFamily: "NotoSansThai-Regular", color: "#5DB075",fontSize:16, borderBottomWidth:1,borderBottomColor:"#5DB075" }}>
                                อ่านเพิ่มเติมได้ที่นี่
                                </Text> 
                            </Link>
                        </VStack>
                    </VStack>
                </Overlay>
                <VStack style={styles.inputDataBluetooth}>
                </VStack>
                <VStack height="37%" width="100%" borderWidth={1} space={1.5} alignItems="center">
                    <HStack alignItems="center" space={2} >
                        <Text style={{ fontFamily: "NotoSansThai-Regular", color: changeMode == true ? ("#000") : ("#fff") }}>
                            การแบ่งระดับความดันโลหิตสูงตามวิธี JNC 7
                        </Text>
                        <TouchableOpacity onPress={() => { setOpenOverlayJNC7(!openOverlayJNC7) }}>
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