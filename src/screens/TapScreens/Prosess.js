import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Text, TouchableOpacity, Button, ScrollView, useWindowDimensions } from 'react-native';
import { FAB, Overlay } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { VStack, HStack, NativeBaseProvider, Link } from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';

import SlideInput from '../../components/ProcessComponents/SlideInput';


const Prosess = () => {
    const [openOverlayJNC7, setOpenOverlayJNC7] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [dotIndicator, setDotIndicator] = useState(0);
    const [visible, setVisible] = useState(false);
    const [dataUser, setDataUser] = useState('');
    const images = [{
        props: {
            source: require('../../../assets/image/ClassificationBloodpressure.png')
        }
    }];

    useEffect(() => {
        const subscribe =
            firebase.firestore().collection('dataUser')
                .doc(firebase.auth().currentUser.uid)
                .onSnapshot((doc) => {
                    setDataUser(doc.data().username)
                    console.log(doc.data().username);
                });
        return () => subscribe();
    }, []);

    const dateToTime = current => {
        return moment(current).format('DD/MM/YYYY');
    };

    const dateToDays = current => {
        return moment(current).format('dddd');
    };

    let ToDays;
    if (dateToDays(Date.now()) == 'Sunday') {
        ToDays = 'วันอาทิตย์'
    } else if (dateToDays(Date.now()) == 'Monday') {
        ToDays = 'วันจันทร์'
    } else if (dateToDays(Date.now()) == 'Tuesday') {
        ToDays = 'วันอังคาร'
    } else if (dateToDays(Date.now()) == 'Wednesday') {
        ToDays = 'วันพุธ'
    } else if (dateToDays(Date.now()) == 'Thursday') {
        ToDays = 'วันพฤหัสบดี'
    } else if (dateToDays(Date.now()) == 'Friday') {
        ToDays = 'วันศุกร์'
    } else {
        ToDays = 'วันเสาร์'
    }

    return (

        <NativeBaseProvider>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} >
                <VStack style={styles.container} space={5} backgroundColor={"#fff"}>
                    
                    {/* OverlayLoading */}
                    <Overlay isVisible={visible} overlayStyle={{ borderColor: "red", borderRadius: 25, backgroundColor: "#fff" }}>
                        <View style={{ alignItems: "center", width: 150 }}>
                            <Animated.Image
                                source={require("../../../assets/gif/heartLoading.gif")}
                                style={{ width: 70, height: 70 }}
                                resizeMode='cover' />
                            {/* <ActivityIndicator size='large' /> */}
                            <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>กรุณารอสักครู่..</Text>
                        </View>
                    </Overlay>

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
                                    <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#5DB075", fontSize: 16, borderBottomWidth: 1, borderBottomColor: "#5DB075" }}>
                                        อ่านเพิ่มเติมได้ที่นี่
                                    </Text>
                                </Link>
                            </VStack>
                        </VStack>
                    </Overlay>
                    
                    {/* HeadBody */}
                    <View style={styles.containerTitle}>
                        <HStack>
                            <Text style={[styles.textTitle, { color: "#5DB075" }]}>สวัสดี, </Text>
                            <Text style={[styles.textTitle, { color: "#5DB075" }]}>{dataUser}</Text>
                        </HStack>
                        <HStack alignItems={"center"} space={2}>
                            <Text style={styles.textTitle}>{ToDays}</Text>
                            <Text style={{ fontFamily: "NotoSansThai-SemiBold", }}>{dateToTime(Date.now())}</Text>
                        </HStack>
                    </View>

                    {/* SlideLnputContainer */}
                    <VStack style={styles.inputDataBluetooth} alignItems={"center"}  >
                        <ScrollView
                            horizontal={true}
                            decelerationRate={"fast"}
                            snapToInterval={1000}
                            showsHorizontalScrollIndicator={false}
                            // bounces={false}
                            // scrollEventThrottle={16}
                            // pagingEnabled
                            onScroll={
                                e => { setDotIndicator((e.nativeEvent.contentOffset.x).toFixed(2)) }
                            }
                        >
                            {SlideInput(setVisible)}
                        </ScrollView>
                        <VStack style={styles.indicatorContainer}>
                            <HStack style={[styles.normalDot, { width: dotIndicator <= 230 ? (16) : (8) }]} />
                            <HStack style={[styles.normalDot, { width: dotIndicator >= 230 ? (16) : (8) }]} />
                        </VStack>
                    </VStack>
                    
                    {/* LastBody */}
                    <VStack height="35%" width="100%" space={1.5} alignItems="center" >
                        <HStack alignItems="center" space={2} >
                            <Text style={{ fontFamily: "NotoSansThai-Regular", color: "#000", }}>
                                การแบ่งระดับความดันโลหิตในผู้ใหญ่
                            </Text>
                            <TouchableOpacity onPress={() => { setOpenOverlayJNC7(!openOverlayJNC7) }}>
                                <Entypo name='help-with-circle' size={18} color={"#5DB075"} />
                            </TouchableOpacity>
                        </HStack>
                        <VStack style={styles.inforMation} space={2}>
                            <HStack style={styles.inforMationLayer} alignItems={"center"} backgroundColor="white">
                                <HStack width={"55%"} justifyContent={"center"}><Text style={styles.inforMationtext}>ประเภท</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>SYS</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>DIA</Text></HStack>
                            </HStack>
                            <HStack style={styles.inforMationLayer} backgroundColor="#EF553C" alignItems={"center"}>
                                <HStack width={"55%"}><Text style={styles.inforMationtext}>ความดันโลหิตสูง ระยะที่ 2</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>&lt; 160</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>&lt; 100</Text></HStack>

                            </HStack>
                            <HStack style={styles.inforMationLayer} backgroundColor="#F1815C" alignItems={"center"}>
                                <HStack width={"55%"} ><Text style={styles.inforMationtext}>ความดันโลหิตสูง ระยะที่ 1</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>141-160</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>91-100</Text></HStack>
                            </HStack>
                            <HStack style={styles.inforMationLayer} backgroundColor="#EEC151" alignItems={"center"}>
                                <HStack width={"55%"} ><Text style={styles.inforMationtext}>ความดันโลหิตสูงขั้นต้น</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>121-140</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>81-90</Text></HStack>
                            </HStack>
                            <HStack style={styles.inforMationLayer} backgroundColor="#B8DE9A" alignItems={"center"}>
                                <HStack width={"55%"} ><Text style={styles.inforMationtext}>ปกติ</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>91-120</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>61-80</Text></HStack>
                            </HStack>
                            <HStack style={styles.inforMationLayer} backgroundColor="#71C7E2" alignItems={"center"}>
                                <HStack width={"55%"} ><Text style={styles.inforMationtext}>ความดันโลหิตต่ำ</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>&gt; 90</Text></HStack>
                                <HStack width={"22.5%"} justifyContent={"center"}><Text style={styles.inforMationtext}>&gt; 60</Text></HStack>
                            </HStack>
                        </VStack>
                    </VStack >
                </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}

export default Prosess;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        height: 700,
        marginTop: 20,
    },
    containerTitle: {
        position: "absolute",
        width: "100%",
        height: "100%",
        marginTop: 22,
    },
    textTitle: {
        fontFamily: 'NotoSansThai-Bold',
        fontSize: 25,
    },
    inputDataBluetooth: {
        width: "111%",
        height: "50%",
        backgroundColor: "white",
        // borderWidth: 1,
        marginTop: 10,
    },
    inforMation: {
        width: "100%",
        // height: "100%",
        borderRadius: 35,
        padding: 10,
        paddingTop: 5,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        elevation: 10,
        backgroundColor: "#fff",
    },
    inforMationLayer: {
        width: "100%",
        height: "12%",
        borderRadius: 25,
        paddingLeft: 15,
        shadowColor: "#000",
        elevation: 5,
    },
    inforMationtext: {
        color: '#000',
        fontFamily: 'NotoSansThai-Regular',
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#5DB075',
        marginHorizontal: 4,
    },
});