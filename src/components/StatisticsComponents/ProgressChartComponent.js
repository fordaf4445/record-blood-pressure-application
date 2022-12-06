import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import {ProgressChart} from "react-native-chart-kit";
  const chartConfigSYS = {
    backgroundGradientFrom: "#f2f2f2",
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#f2f2f2',
    
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const chartConfigDIA = {
    backgroundGradientFrom: "#f2f2f2",
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#f2f2f2',
    
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(184, 222, 154, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const chartConfigPULSE = {
    backgroundGradientFrom: "#f2f2f2",
    // backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#f2f2f2',
    
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(35, 175, 214, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const dataSYS = {
    // labels: ["Swim",], // optional
    data: [0.8,]
  };
  const dataDIA = {
    // labels: ["Swim",], // optional
    data: [0.4,]
  };
  const dataPULSE = {
    // labels: ["Swim",], // optional
    data: [0.5,]
  };
const screenWidth = Dimensions.get("window").width;
const ProgressChartComponent = () => {
  return (
    <View style={{flexDirection: 'row',}}>
        <ProgressChart
          data={dataSYS}
          width={135}
          height={135}
          strokeWidth={7}
          radius={45}
          chartConfig={chartConfigSYS}
          hideLegend={true}
        />
        <ProgressChart
          data={dataDIA}
          width={135}
          height={135}
          strokeWidth={7}
          radius={45}
          chartConfig={chartConfigDIA}
          hideLegend={true}
        />
        <ProgressChart
          data={dataPULSE}
          width={135}
          height={135}
          strokeWidth={7}
          radius={45}
          chartConfig={chartConfigPULSE}
          hideLegend={true}
        />
    </View>
  )
}

export default ProgressChartComponent