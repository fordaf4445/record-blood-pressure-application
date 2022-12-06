import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, CheckBox } from 'react-native';
import { Button, Input, makeStyles, Text } from '@rneui/base';
import ProgressChartComponent from '../../components/StatisticsComponents/ProgressChartComponent';
import PieChartComponent from '../../components/StatisticsComponents/PieChartComponent';
import TextStatus from '../../components/StatisticsComponents/TextStatus';
import NumberStatusSYS from '../../components/StatisticsComponents/NumberStatusSYS';
import NumberStatusDIA from '../../components/StatisticsComponents/NumberStatusDIA';
import NumberStatusPLUSE from '../../components/StatisticsComponents/NumberStatusPLUSE';


const Statistics = () => {
    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.textHeader}>สถิติ</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ProgressChartComponent />
                <NumberStatusSYS />
                <NumberStatusDIA />
                <NumberStatusPLUSE />
                <TextStatus />
            </View>
            <View style={{ flex: 1 }}>
                <View style={[{ flex: 1,backgroundColor:'pink'},styles.borderPieChart]}>

                </View>
                <View style={[{ flex: 1, alignItems: 'center' },styles.borderPieChart]}>
                    <PieChartComponent />
                </View>
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
    borderPieChart:{
        borderWidth:1,
        borderRadius:15,
        margin:5,
        borderColor: '#E8E8E8',
        backgroundColor: 'white',
        
    },
})