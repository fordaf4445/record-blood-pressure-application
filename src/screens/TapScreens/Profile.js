import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox, Image } from 'react-native';
import { Button, Input, makeStyles, Text, Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Inicon from 'react-native-vector-icons/dist/Ionicons'
import Calendar from '../../components/ProfileComponents/Calendar';
import Savefile from '../../components/ProfileComponents/Savefile';



const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#5DB075', flex: 1 }}>
                <View style={[styles.titleBar]}>
                    <Text style={styles.text}>setting</Text>
                    <Text style={styles.textHeader}>Profile</Text>
                    <Text style={styles.text}>Logout</Text>
                </View>
                <View style={{ alignSelf: "center", top: 20 }}>
                    <View style={styles.profileImage}>
                        <Image source={require('../../../assets/image/309636722_486518313145837_1138442271353624644_n.jpg')}
                            style={styles.image} />
                    </View>
                    <View style={styles.add}>
                        <Inicon name='ios-add-circle' size={40} color='#838383' />
                    </View>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <View style={{ flex: 1, }}></View>
                <View style={{ flex: 6, alignItems: 'center' }}>
                    <Text style={styles.textUsername}>Usernames</Text>
                    <Text style={{ fontSize: 16, fontFamily: 'NotoSansThai-Bold' }}>ข้อมูลส่วนตัว</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <Text>น้ำหนัก</Text><Text> 42</Text><Text>  กก.</Text><Text>  ส่วนสูง</Text><Text>  158</Text><Text>  ซม.</Text>
                    </View>
                    <View style={{ flexDirection: 'row', right: 35, }}>
                        <Text>อายุ</Text><Text> 26</Text><Text>  ปี</Text><Text>  เพศ</Text><Text>  หญิง</Text>
                    </View>
                        <Button
                            title={<Calendar/>}
                            icon={{
                                name: 'calendar',
                                type: 'antdesign',
                                size: 40,
                            }}
                            iconContainerStyle={{ right: 40 }}
                            buttonStyle={{
                                borderBottomWidth: 1,
                                borderColor: 'black',
                                backgroundColor: ''
                            }}
                            containerStyle={{
                                width: '90%',
                                top: 20
                            }}
                        />
                        <Button
                            title={<Savefile/>}
                            icon={{
                                name: 'file-send-outline',
                                type: 'material-community',
                                size: 45,
                                
                            }}
                            iconContainerStyle={{ right: 40 }}
                            buttonStyle={{
                                borderBottomWidth: 1,
                                borderColor: 'black',
                                backgroundColor: ''
                            }}
                            containerStyle={{
                                width: '90%',
                                top: 20,
                                // right: 10,
                                
                            }}
                        />
                </View>
            </View>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: "space-between",
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
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'white',
    },
    add: {
        backgroundColor: "#4144B",
        position: "absolute",
        bottom: -9,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textHeader: {
        fontSize: 35,
        fontFamily: 'NotoSansThai-Bold',
        color: 'white',
    },
    text: {
        fontSize: 16,
        fontFamily: 'NotoSansThai-Regular',
        color: 'white',
        top: 20,
    },
    textUsername: {
        fontSize: 30,
        fontFamily: 'NotoSansThai-Bold',
        color: 'black',
    },
})