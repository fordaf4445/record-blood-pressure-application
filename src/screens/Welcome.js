import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREENHEIGHT = Dimensions.get('window').height;
const SCREENWIDTH = Dimensions.get('window').width;

const Welcome = () => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.iconView}><Icon name='heartbeat' style={styles.icon} /></View>

            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    แอปพลิเคชัน{'\n'}
                    บันทึกความดันโลหิต
                </Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sigup')}>
                    <Text style={[styles.text, {
                        fontFamily: 'AlongSansExtraBold',
                        fontSize: 20,
                        color: 'black',
                        top: 0,
                        alignSelf: 'center'
                    }]}>
                        ลงทะเบียน
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.text, {
                        fontFamily: 'AlongSansSemiBold',
                        fontSize: 20,
                        color: 'white',
                        top: 100,
                        alignSelf: 'center',

                    }]}>
                        เข้าสู่ระบบ
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    iconView: {
        justifyContent: "center",
        alignItems: "center",
        height: SCREENHEIGHT / 1.75,
        width: SCREENWIDTH,
    },
    icon: {
        fontSize: 250,
        color: "#5DB075",
    },

    textContainer: {
        height: SCREENHEIGHT,
        width: SCREENWIDTH,
        backgroundColor: "#5DB075",
        top: SCREENHEIGHT - (SCREENHEIGHT),
        borderTopLeftRadius: 75,
        borderTopRightRadius: 75,
    },
    text: {
        fontFamily: 'pd-ebi',
        fontSize: 38,
        color: 'white',
        top: 35,
        textAlign: 'center'
    },

    button: {
        backgroundColor: 'white',
        width: '80%',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 75,
        top: 70,
    }
})