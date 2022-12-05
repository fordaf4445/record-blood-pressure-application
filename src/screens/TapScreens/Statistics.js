import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { ProgressChart } from 'react-native-chart-kit';
import ProgressChartComponent from '../../components/StatisticsComponents/ProgressChartComponent';

const Statistics = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.textHeader}>สถิติ</Text>
            </View>
            <View style={{alignItems:'center'}}>
               <ProgressChartComponent/> 
               <Text style={{position:'absolute',top:100,right:330}}>test</Text>
            </View>

        </View>
    )
}

export default Statistics

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleBar: {
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 16,
    },
    textHeader: {
        fontSize: 35,
        fontFamily: 'NotoSansThai-Bold',
    },
})