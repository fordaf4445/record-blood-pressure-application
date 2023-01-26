import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { Button, Text, } from '@rneui/base';
import Inicon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'
import AlarmTitle from '../../components/ProfileComponents/AlarmTitle';
import Savefile from '../../components/ProfileComponents/Savefile';
import Title from '../../components/ProfileComponents/Title';
import { AuthContext } from '../../auth/AuthProvider';
import { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {

    const touchSignout = () => { signout(); }
    const navigation = useNavigation();
    const { signout } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [image, setImage] = useState("../../../assets/image/blank-profile-picture-973460.png");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe =
            firebase.firestore().collection('dataUser')
                .doc(firebase.auth().currentUser.uid)
                .onSnapshot((docsnapshot) => {
                    setName(docsnapshot.data());
                    setLoading(false);
                });
        return () => unsubscribe();
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
        <View style={styles.container}>
            <View style={{ backgroundColor: '#5DB075', flex: 1 }}>
                <View style={[styles.titleBar]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('SettingComponent') }}>
                        <Text style={styles.text}>setting</Text>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Profile</Text>
                    <TouchableOpacity onPress={touchSignout}>
                        <Text style={styles.text}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignSelf: "center", top: 20 }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../../assets/image/user.png")}
                            style={styles.image} />
                    </View>
                    <View style={styles.add}>
                        <TouchableOpacity>
                            <MaterialIcons name='add-photo-alternate' size={30} color='#fff' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 2 }}>
                <View style={{ flex: 1, }}></View>
                <View style={{ flex: 7, alignItems: 'center' }}>
                    <Text style={styles.textUsername} >{name.username}</Text>
                    <Text style={{ fontSize: 16, fontFamily: 'NotoSansThai-Bold' }}>ข้อมูลส่วนตัว</Text>
                    <Title />
                    <Button
                        title={<AlarmTitle />}
                        icon={
                            <Inicon name='alarm-outline' style={{ fontSize: 45, color: "black", marginRight: 65 }} />
                        }
                        buttonStyle={{
                            borderBottomWidth: 1,
                            borderColor: 'black',
                            backgroundColor: ''
                        }}
                        containerStyle={{
                            width: '90%',
                            top: 20
                        }}
                        onPress={() => navigation.navigate('AlarmComponent')}
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
        backgroundColor: "#838383",
        position: "absolute",
        bottom: 10,
        right: 10,
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        // borderWidth:1,
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
});