import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View } from 'react-native';

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const data = [
    {
        name: "ความดันโลหิตต่ำ",
        num: 5,
        color: "#71C7E2",
        legendFontColor: "#7F7F7F",
        legendFontSize: 14,
    },
    {
        name: "ปกติ",
        num: 8,
        color: "#B8DE9A",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "ความดันโลหิตสูงขั้นต้น",
        num: 2,
        color: "#EEC151",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "ความดันโลหิตสูง ระยะที่ 1",
        num: 3,
        color: "#F1815C",
        legendFontColor: "#7F7F7F",
        legendFontSize: 13,
    },
    {
        name: "ความดันโลหิตสูง ระยะที่ 2",
        num: 10,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 13,
    }
];

const PieChartComponent = () => {
    return (
        <View style={{right:90,top:30}}>
            <PieChart
                data={data}
                width={570}
                height={180}
                chartConfig={chartConfig}
                accessor={"num"}
                backgroundColor={"transparent"}
                // paddingLeft={"15"}
                center={[120, 5]}
                // absolute
            
            />
        </View>
    );
}

export default PieChartComponent;
