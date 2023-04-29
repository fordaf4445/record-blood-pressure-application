import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox, Image, TouchableOpacity, ActivityIndicator, Animated, Text } from 'react-native';
// import { Button, Text, } from '@rneui/base';
import { AuthContext } from '../../auth/AuthProvider';
import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, HStack, VStack } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = () => {

    const touchSignout = () => { signout(); }
    const navigation = useNavigation();
    const { signout } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const subscribe =
            firebase.firestore().collection('dataUser')
                .doc(firebase.auth().currentUser.uid)
                .onSnapshot((docsnapshot) => {
                    setName(docsnapshot.data());
                    setLoading(false);
                });
        return () => subscribe();
    }, []);

    if (loading) {
        return (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 1, }}>
                <Animated.Image
                    source={require("../../../assets/gif/heartLoading.gif")}
                    style={{ width: 70, height: 70 }}
                    resizeMode='cover' />
                {/* <ActivityIndicator size='large' /> */}
                <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "#000" }}>กำลังโหลด..</Text>
            </View>)
    };



    return (
        <NativeBaseProvider>
            <VStack style={styles.container} alignItems="center" >
                <VStack backgroundColor="#5DB075" width="100%" height="32%" borderBottomRadius={150} paddingTop={5}
                    style={{
                        shadowColor: "#000", elevation: 20,
                    }}>
                    <HStack justifyContent="space-around" >
                        <TouchableOpacity onPress={() => { navigation.navigate('SettingComponent') }}>
                            <Text style={styles.text}>ตั้งค่าผู้ใช้</Text>
                        </TouchableOpacity>
                        <Text style={styles.textHeader}>Profile</Text>
                        <TouchableOpacity onPress={touchSignout}>
                            <Text style={styles.text}>ออกระบบ</Text>
                        </TouchableOpacity>
                    </HStack>
                    <View style={{ alignSelf: "center", top: 35, }}>
                        <View style={styles.profileImage}>
                            <Image source={{ uri: name.image }}
                                style={styles.image} />
                        </View>
                    </View>
                </VStack>
                <View style={{ width: "90%", height: "20%", marginTop: 65, alignItems: "center", }} >
                    <Text style={styles.textUsername} >{name.username}</Text>
                    <VStack alignItems="flex-start" width="90%" space={2} padding={3} paddingLeft={7} borderRadius={30} backgroundColor="#fff"
                        marginTop={1}
                        style={{
                            shadowColor: "#5DB075",
                            elevation: 10,
                        }}>
                        <HStack space={3} alignItems="center">
                            <HStack space={3} width="45%">
                                <View style={styles.borderIconInfomation}>
                                    <MaterialCommunityIcons
                                        name="weight"
                                        size={15}
                                        color="#fff"
                                    />
                                </View>
                                <Text style={styles.textInfomation}>น้ำหนัก  {name.weight}  กก.</Text>
                            </HStack>

                            <View style={styles.borderIconInfomation}>
                                <MaterialCommunityIcons
                                    name="human-male-height"
                                    size={15}
                                    color="#fff"
                                />
                            </View>
                            <Text style={styles.textInfomation}>ส่วนสูง  {name.hight}  ซม.</Text>
                        </HStack>
                        <HStack space={3} alignItems="center">
                            <HStack space={3} width="45%">
                                <View style={styles.borderIconInfomation}>
                                    <MaterialIcons
                                        name="data-usage"
                                        size={15}
                                        color="#fff"
                                    />
                                </View>
                                <Text style={styles.textInfomation}>อายุ {name.age}  ปี</Text>
                            </HStack>
                            <View style={styles.borderIconInfomation}>
                                <FontAwesome
                                    name="intersex"
                                    size={15}
                                    color="#fff"
                                />
                            </View>
                            <Text style={styles.textInfomation}>เพศ {name.sex}</Text>
                        </HStack>
                    </VStack>
                </View>
                <VStack width="97%" height="38%"  alignItems="center" backgroundColor="#fff" space={3}>
                    <TouchableOpacity style={styles.layer} activeOpacity={0.9}
                        onPress={() => navigation.navigate('AlarmComponent')}>
                        <HStack alignItems="center" width="100%" height="100%" paddingLeft={2} space={5} >
                            <View style={styles.borderIcon}>
                               <Ionicons
                               name='alarm'
                               size={30}
                               color="#5DB075"/>
                            </View>
                            <VStack >
                                <Text style={styles.textTitle}>การแจ้งเตือน</Text>
                                <Text style={styles.textLitle}>ตั้งการแจ้งเตือนและกำหนดการต่าง ๆ</Text>
                            </VStack>
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.layer} activeOpacity={0.9}
                        onPress={() => navigation.navigate('SaveComponent')}>
                        <HStack alignItems="center" width="100%" height="100%" paddingLeft={2} space={5} >
                            <View style={styles.borderIcon}>
                               <MaterialCommunityIcons
                               name='file-move'
                               size={30}
                               color="#5DB075"/>
                            </View>
                            <VStack >
                                <Text style={styles.textTitle}>บันทึกข้อมูลเป็นไฟล์เอกสาร</Text>
                                <Text style={styles.textLitle}>บันทึกข้อมูลในฟอร์มเอกสารเพื่อส่งออก</Text>
                            </VStack>
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.layer} activeOpacity={0.9}
                        onPress={() => navigation.navigate('HelpAndAboutComponent')}>
                        <HStack alignItems="center" width="100%" height="100%" paddingLeft={2} space={5} >
                            <View style={styles.borderIcon}>
                               <MaterialCommunityIcons
                               name='help-circle'
                               size={30}
                               color="#5DB075"/>
                            </View>
                            <VStack >
                                <Text style={styles.textTitle}>Help & About </Text>
                                <Text style={styles.textLitle}>เกี่ยวกับแอพและช่วยเหลือ</Text>
                            </VStack>
                        </HStack>
                    </TouchableOpacity>
                </VStack>
            </VStack>
        </NativeBaseProvider>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleBar: {
        marginTop: 20,
        marginHorizontal: 16,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 100,
    },
    profileImage: {
        width: 175,
        height: 175,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: "#fff",
        shadowColor: "#000",
        elevation: 20,
    },
    textHeader: {
        fontSize: 35,
        fontFamily: 'NotoSansThai-Bold',
        color: '#fff',
    },
    text: {
        fontSize: 16,
        fontFamily: 'NotoSansThai-Bold',
        color: '#fff',
        marginTop: 20,
    },
    textTitle: {
        fontSize: 19,
        fontFamily: 'NotoSansThai-Bold',
        color: '#fff',
    },
    textLitle: {
        fontFamily: 'NotoSansThai-Regular',
        color: '#fff',
    },
    textUsername: {
        fontSize: 26,
        fontFamily: 'NotoSansThai-Bold',
        color: '#000',
    },
    borderDetail: {
        // borderWidth: 1,
        width: "95%",
        height: "62%",
        marginTop: 20,
        // borderRadius: 15,
        // borderColor: '#e8e8e8',
        // backgroundColor: 'white',
        // shadowColor: "#000",
        // elevation: 4,
    },
    layer: {
        // borderWidth: 1,
        width: "90%",
        height: "28%",
        borderRadius: 30,
        // borderColor: '#e8e8e8',
        backgroundColor: '#5db075',
        shadowColor: "#000",
        elevation: 10,
        paddingLeft: 10,
    },
    borderIcon: {
        // borderWidth:1,
        width: 55,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        shadowColor: "#000",
        elevation: 10,
        backgroundColor: '#fff',
    },
    borderIconInfomation: {
        // borderWidth:1,
        width: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        shadowColor: "#000",
        elevation: 5,
        backgroundColor: '#5DB075',
    },
    textInfomation: {
        fontFamily: 'NotoSansThai-Regular',
        color: '#000',
        fontSize: 14,
    },
});