import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const Profile = ()=> {
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:40,}}>Profile</Text>
        </View>
    )
}

export default Profile;