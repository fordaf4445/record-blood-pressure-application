import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  NativeBaseProvider,
  HStack,
  VStack,
} from 'native-base';
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';
import { ProgressChart } from 'react-native-chart-kit';
const Statistics = () => {
  const startofWeek = moment().startOf('week').valueOf();
  const endofWeek = moment().endOf('week').valueOf();
  const startofMonth = moment().startOf('month').valueOf();
  const endofMonth = moment().endOf('month').valueOf();

  const [bloodPressure, setBloodPressure] = useState([]);
  const [avgSYS, setAvgSYS] = useState(0);
  const [avgDIA, setAvgDIA] = useState(0);
  const [avgBPM, setAvgBPM] = useState(0);
  const [colorSelectWeek, setColorSelectWeek] = useState();
  const [colorSelectMonth, setColorSelectMonth] = useState();
  const [colorSelectAll, setColorSelectAll] = useState('#5DB075');
  const db = firebase.firestore();

  //first method use firestore(data) filter week,month,All
  <>
    {/* const getWeek = () => {
    db.collection('dataUser')
    .doc(firebase.auth().currentUser.uid)
    .collection('BloodPressure')
    .where("timestamp",">=",startofWeek)
    .where("timestamp","<=",endofWeek)
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot.docs.map(doc => doc.data()));
   }).catch((err) => {
    console.log("Error: " + err);
   })
    
  };

  const getMonth = () => {
    db.collection('dataUser')
    .doc(firebase.auth().currentUser.uid)
    .collection('BloodPressure')
    .where("timestamp",">=",startofMonth)
    .where("timestamp","<=",endofMonth)
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot.docs.map(doc => doc.data()));
   }).catch((err) => {
    console.log("Error: " + err);
   })
    
  }; */}
  </>

  //second method use firestore(data) set(data) one time and use set(data) filter week,month,all
  useEffect(() => {
    const subscriber = db.collection("dataUser")
      .doc(firebase.auth().currentUser.uid)
      .collection('BloodPressure')
      .onSnapshot(querySnapshot => {
        const bloodPressure = [];

        querySnapshot.forEach(documentSnapshot => {
          bloodPressure.push({
            ...documentSnapshot.data(),
            // key: documentSnapshot.id,

          });
        });

        setBloodPressure(bloodPressure);
        const initialValue = { SYS: 0, DIA: 0, BPM: 0 };
        const total = bloodPressure.reduce((acc, val) => {
          acc.SYS += parseFloat(val.SYS);
          acc.DIA += parseFloat(val.DIA);
          acc.BPM += parseFloat(val.BPM);
          return acc;
        }, initialValue);

        const avgAll = [{
          SYS: Number((total.SYS / bloodPressure.length).toFixed(2)),
          DIA: Number((total.DIA / bloodPressure.length).toFixed(2)),
          BPM: Number((total.BPM / bloodPressure.length).toFixed(2)),
        }];
        avgAll.map(item => {
          return (setAvgSYS(item.SYS), setAvgDIA(item.DIA), setAvgBPM(item.BPM))
        });
      });
    return () => subscriber();
  }, []);

  const getDataWeekAvg = () => {
    const Week = bloodPressure.filter(item => {
      return item.timestamp >= startofWeek && item.timestamp <= endofWeek;
    })

    const initialValue = { SYS: 0, DIA: 0, BPM: 0 }
    const total = Week.reduce((acc, val) => {
      acc.SYS += parseFloat(val.SYS);
      acc.DIA += parseFloat(val.DIA);
      acc.BPM += parseFloat(val.BPM);
      return acc;
    }, initialValue);

    const avgWeek = [{
      SYS: Number((total.SYS / Week.length).toFixed(2)),
      DIA: Number((total.DIA / Week.length).toFixed(2)),
      BPM: Number((total.BPM / Week.length).toFixed(2)),
    }];

    console.log(avgWeek);

    avgWeek.map(item => {
      return (setAvgSYS(item.SYS), setAvgDIA(item.DIA), setAvgBPM(item.BPM))
    })

    setColorSelectWeek('#5DB075')
    setColorSelectMonth('#838383')
    setColorSelectAll('#838383')
  };

  const getDataMonthAvg = () => {
    const Month = bloodPressure.filter(item => {
      return item.timestamp >= startofMonth && item.timestamp <= endofMonth;
    })
    const initialValue = { SYS: 0, DIA: 0, BPM: 0 }
    const total = Month.reduce((acc, val) => {
      acc.SYS += parseFloat(val.SYS);
      acc.DIA += parseFloat(val.DIA);
      acc.BPM += parseFloat(val.BPM);
      return acc;
    }, initialValue);

    const avgMonth = [{
      SYS: Number((total.SYS / Month.length).toFixed(2)),
      DIA: Number((total.DIA / Month.length).toFixed(2)),
      BPM: Number((total.BPM / Month.length).toFixed(2)),
    }];

    console.log(avgMonth);

    avgMonth.map(item => {
      return (setAvgSYS(item.SYS), setAvgDIA(item.DIA), setAvgBPM(item.BPM))
    })
    setColorSelectWeek('#838383')
    setColorSelectMonth('#5DB075')
    setColorSelectAll('#838383')
  };

  const getDataAllAvg = () => {
    // const All = bloodPressure.map(item => {
    //   return item;
    // })
    const initialValue = { SYS: 0, DIA: 0, BPM: 0 }
    const total = bloodPressure.reduce((acc, val) => {
      acc.SYS += parseFloat(val.SYS);
      acc.DIA += parseFloat(val.DIA);
      acc.BPM += parseFloat(val.BPM);
      return acc;
    }, initialValue);

    const avgAll = [{
      SYS: Number((total.SYS / bloodPressure.length).toFixed(2)),
      DIA: Number((total.DIA / bloodPressure.length).toFixed(2)),
      BPM: Number((total.BPM / bloodPressure.length).toFixed(2)),
    }];

    console.log(avgAll);

    avgAll.map(item => {
      return (setAvgSYS(item.SYS), setAvgDIA(item.DIA), setAvgBPM(item.BPM))
    });
    setColorSelectWeek('#838383')
    setColorSelectMonth('#838383')
    setColorSelectAll('#5DB075')
  };

  const configProgressChartSYS = {
    backgroundGradientFrom: "#ffff",
    backgroundGradientTo: "#ffff",
    color: (opacity = 1) => `rgba(255,0, 0, ${opacity})`,
    barPercentage: 0.5,
  };
  const configProgressChartDIA = {
    backgroundGradientFrom: "#ffff",
    backgroundGradientTo: "#ffff",
    color: (opacity = 1) => `rgba(164, 191, 67, ${opacity})`,
    barPercentage: 0.5,
  };
  const configProgressChartBPM = {
    backgroundGradientFrom: "#ffff",
    backgroundGradientTo: "#ffff",
    color: (opacity = 1) => `rgba(35, 175, 214, ${opacity})`,
    barPercentage: 0.5,
  };

  const dataSYSProgressChart = {
    data: [avgSYS / 210]
  };
  const dataDIAProgressChart = {
    data: [avgDIA / 210]
  };
  const dataBPMProgressChart = {
    data: [avgBPM / 210]
  };


  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.textHeader}>สถิติ</Text>
      </View>
      <View style={styles.borderStatistics}>
        <NativeBaseProvider>
          <View>
            <HStack justifyContent="space-around" width="100%" paddingLeft="1.5" paddingRight="1.5">
              <ProgressChart
                data={dataSYSProgressChart}
                width={110}
                height={110}
                strokeWidth={5}
                radius={45}
                chartConfig={configProgressChartSYS}
                hideLegend={true} />
              <ProgressChart
                data={dataDIAProgressChart}
                width={110}
                height={110}
                strokeWidth={5}
                radius={45}
                chartConfig={configProgressChartDIA}
                hideLegend={true} />
              <ProgressChart
                data={dataBPMProgressChart}
                width={110}
                height={110}
                strokeWidth={5}
                radius={45}
                chartConfig={configProgressChartBPM}
                hideLegend={true} />
            </HStack>
            <HStack position="absolute" alignItems="center"
              width="100%" marginTop="16.5%" flex={1}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.titleProgressChart, { color: "#FF0000" }]}>SYS</Text></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.titleProgressChart, { color: "#A4BF43" }]}>DIA</Text></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.titleProgressChart, { color: "#23AFD6" }]}>BPM</Text></View>
            </HStack>
            <HStack position="absolute"
              width="100%" marginTop="10%" flex={1}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.numberProgressChart}>{avgSYS.toFixed(0)}</Text></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.numberProgressChart}>{avgDIA.toFixed(0)}</Text></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.numberProgressChart}>{avgBPM.toFixed(0)}</Text></View>
            </HStack>
            <HStack position="absolute"
              width="100%" marginTop="5%" flex={1}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.avgTitle}>ค่าเฉลี่ย</Text></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.avgTitle}>ค่าเฉลี่ย</Text></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.avgTitle}>ค่าเฉลี่ย</Text></View>
            </HStack>
          </View>
          <HStack space="25%" justifyContent="center">
            <TouchableOpacity
              onPress={() => { getDataWeekAvg() }}>
              <Text style={[styles.selectContainer, { color: colorSelectWeek, }]}>
                สัปดาห์
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { getDataMonthAvg() }}>
              <Text style={[styles.selectContainer, { color: colorSelectMonth, }]}>
                เดือน
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { getDataAllAvg() }}>
              <Text style={[styles.selectContainer, { color: colorSelectAll, }]}>
                ทั้งหมด
              </Text>
            </TouchableOpacity>
          </HStack>
          <Button
            title='test'
            onPress={() => console.log(bloodPressure)} />
        </NativeBaseProvider>
      </View>
    </View>
  )
};

export default Statistics

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBar: {
    alignItems: 'center',
    marginTop: 20,
  },
  textHeader: {
    fontSize: 35,
    fontFamily: 'NotoSansThai-Bold',
    color: 'black',
  },
  borderStatistics: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
    borderColor: '#e8e8e8',
    backgroundColor: 'white',
  },
  numberProgressChart: {
    fontSize: 20,
    fontFamily: 'NotoSansThai-SemiBold'

  },
  titleProgressChart: {
    fontSize: 18,
    fontFamily: 'NotoSansThai-Bold'
  },
  avgTitle: {
    fontSize: 12,
    fontFamily: 'NotoSansThai-Regular'
  },
  selectContainer: {
    fontSize: 15,
    fontFamily: "NotoSansThai-SemiBold",

  },
});