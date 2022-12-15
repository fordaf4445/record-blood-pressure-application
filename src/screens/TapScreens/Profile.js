import React, { useState, useEffect, useContext} from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox, Image } from 'react-native';
import { Button, Input, makeStyles, Text, Icon } from '@rneui/base';
import Inicon from 'react-native-vector-icons/dist/Ionicons'
import Calendar from '../../components/ProfileComponents/Calendar';
import Savefile from '../../components/ProfileComponents/Savefile';
import Title from '../../components/ProfileComponents/Title';
import { AuthContext } from '../../auth/AuthProvider';
import auth, { firebase } from '@react-native-firebase/auth';
const Profile = () => {

    const touchSignout = () => {
        signout();
    }
    const { signout } = useContext(AuthContext);
    const [name, setName] = useState('');

    useEffect(() => {
        firebase.firestore().collection('dataUser')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists) {
                setName(snapshot.data())
            }
            else {
                console.log('User does not exist');
            }
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#5DB075', flex: 1 }}>
                <View style={[styles.titleBar]}>
                    <Text style={styles.text}>setting</Text>
                    <Text style={styles.textHeader}>Profile</Text>
                    <Text style={styles.text}
                     onPress={touchSignout}>Logout</Text>
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
                <View style={{ flex: 7, alignItems: 'center'}}>
                    <Text style={styles.textUsername} >{name.username}</Text>
                    <Text style={{ fontSize: 16, fontFamily: 'NotoSansThai-Bold' }}>ข้อมูลส่วนตัว</Text>
                    <Title />
                    <Button
                        title={<Calendar />}
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
                        title={<Savefile />}
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