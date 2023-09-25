import { View, Text, StyleSheet, Button, TouchableOpacity, Alert, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  NativeBaseProvider,
  HStack,
  VStack,
  ScrollView,
} from 'native-base';
import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';
import { ProgressChart, LineChart, PieChart } from 'react-native-chart-kit';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Statistics = () => {
  const startofWeek = moment().startOf('week').valueOf();
  const endofWeek = moment().endOf('week').valueOf();
  const startofMonth = moment().startOf('month').valueOf();
  const endofMonth = moment().endOf('month').valueOf();

  const [bloodPressure, setBloodPressure] = useState(0);
  const [avgSYS, setAvgSYS] = useState(0);
  const [avgDIA, setAvgDIA] = useState(0);
  const [avgBPM, setAvgBPM] = useState(0);
  const [colorSelectWeek, setColorSelectWeek] = useState('#fff');
  const [colorSelectMonth, setColorSelectMonth] = useState('#fff');
  const [colorSelectAll, setColorSelectAll] = useState('#5DB075');
  const [textcolorSelectWeek, setTextColorSelectWeek] = useState('black');
  const [textcolorSelectMonth, setTextColorSelectMonth] = useState('black');
  const [textcolorSelectAll, setTextColorSelectAll] = useState('#fff');
  const [lineChartSYS, setLineChartSYS] = useState([0]);
  const [lineChartDIA, setLineChartDIA] = useState([0]);
  const [lineChartBPM, setLineChartBPM] = useState([0]);
  const [LineChartCount, setLineChartCount] = useState(0);

  const [lowBloodPressure, setLowBloodPressure] = useState(0);
  const [normalBloodPressure, setNormalBloodPressure] = useState(0);
  const [elevatedBloodPressure, setElevatedBloodPressure] = useState(0);
  const [highBloodPressure1, setHighBloodPressure1] = useState(0);
  const [highBloodPressure2, setHighBloodPressure2] = useState(0);

  const [loading, setLoading] = useState(true);

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
        const avg = () => {
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

          setLineChartSYS(bloodPressure.sort((a, b) => a.timestamp - b.timestamp).map(item => item.SYS))
          setLineChartDIA(bloodPressure.sort((a, b) => a.timestamp - b.timestamp).map(item => item.DIA))
          setLineChartBPM(bloodPressure.sort((a, b) => a.timestamp - b.timestamp).map(item => item.BPM))
          setLowBloodPressure(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตต่ำ') }).length)
          setNormalBloodPressure(bloodPressure.filter(item => { return (item.TYPE === 'ปกติ') }).length)
          setElevatedBloodPressure(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตสูงขั้นต้น') }).length)
          setHighBloodPressure1(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 1') }).length)
          setHighBloodPressure2(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 2') }).length)
          setLineChartCount(bloodPressure.length)
        };
        bloodPressure.length != 0 ? (avg()) : (setAvgSYS(0), setAvgDIA(0), setAvgBPM(0))
        setLoading(false);
      });
    return () => subscriber();
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

  const getDataWeekAvg = () => {
    const Week = bloodPressure.filter(item => {
      return item.timestamp >= startofWeek && item.timestamp <= endofWeek;
    });

    const avg = () => {
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
      });

      setLineChartSYS(Week.sort((a, b) => a.timestamp - b.timestamp).map(item => item.SYS))
      setLineChartDIA(Week.sort((a, b) => a.timestamp - b.timestamp).map(item => item.DIA))
      setLineChartBPM(Week.sort((a, b) => a.timestamp - b.timestamp).map(item => item.BPM))
      setLowBloodPressure(Week.filter(item => { return (item.TYPE === 'ความดันโลหิตต่ำ') }).length)
      setNormalBloodPressure(Week.filter(item => { return (item.TYPE === 'ปกติ') }).length)
      setElevatedBloodPressure(Week.filter(item => { return (item.TYPE === 'ความดันโลหิตสูงขั้นต้น') }).length)
      setHighBloodPressure1(Week.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 1') }).length)
      setHighBloodPressure2(Week.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 2') }).length)
      setLineChartCount(Week.length)
      setColorSelectWeek('#5DB075')
      setColorSelectMonth('#fff')
      setColorSelectAll('#fff')
      setTextColorSelectWeek('#fff')
      setTextColorSelectMonth('black')
      setTextColorSelectAll('black')
    };

    Week.length != 0 ? (avg())
      : (Alert.alert("ยังไม่มีข้อมูลของสัปดาห์นี้", "ข้อมูลของสัปดาห์จะเริ่มนับทุกวันอาทิตย์ของทุกสัปดาห์"), console.log("No data for this week"));
  };

  const getDataMonthAvg = () => {
    const Month = bloodPressure.filter(item => {
      return item.timestamp >= startofMonth && item.timestamp <= endofMonth;
    })

    const avg = () => {
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
      });
      setLineChartSYS(Month.sort((a, b) => a.timestamp - b.timestamp).map(item => item.SYS))
      setLineChartDIA(Month.sort((a, b) => a.timestamp - b.timestamp).map(item => item.DIA))
      setLineChartBPM(Month.sort((a, b) => a.timestamp - b.timestamp).map(item => item.BPM))
      setLowBloodPressure(Month.filter(item => { return (item.TYPE === 'ความดันโลหิตต่ำ') }).length)
      setNormalBloodPressure(Month.filter(item => { return (item.TYPE === 'ปกติ') }).length)
      setElevatedBloodPressure(Month.filter(item => { return (item.TYPE === 'ความดันโลหิตสูงขั้นต้น') }).length)
      setHighBloodPressure1(Month.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 1') }).length)
      setHighBloodPressure2(Month.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 2') }).length)
      setLineChartCount(Month.length)
      setColorSelectWeek('#fff')
      setColorSelectMonth('#5DB075')
      setColorSelectAll('#fff')
      setTextColorSelectWeek('black')
      setTextColorSelectMonth('#fff')
      setTextColorSelectAll('black')
    };

    Month.length != 0 ? (avg())
      : (Alert.alert("ยังไม่มีข้อมูลของเดือนนี้", "ข้อมูลของเดือนจะเริ่มนับทุกวันที่หนึ่งของทุกเดือน"), console.log("No data for this Month"));
  };

  const getDataAllAvg = () => {
    // const All = bloodPressure.map(item => {
    //   return item;
    // })
    const avg = () => {
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
      setLineChartSYS(bloodPressure.sort((a, b) => a.timestamp - b.timestamp).map(item => item.SYS))
      setLineChartDIA(bloodPressure.sort((a, b) => a.timestamp - b.timestamp).map(item => item.DIA))
      setLineChartBPM(bloodPressure.sort((a, b) => a.timestamp - b.timestamp).map(item => item.BPM))
      setLowBloodPressure(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตต่ำ') }).length)
      setNormalBloodPressure(bloodPressure.filter(item => { return (item.TYPE === 'ปกติ') }).length)
      setElevatedBloodPressure(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตสูงขั้นต้น') }).length)
      setHighBloodPressure1(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 1') }).length)
      setHighBloodPressure2(bloodPressure.filter(item => { return (item.TYPE === 'ความดันโลหิตสูง ระยะที่ 2') }).length)
      setLineChartCount(bloodPressure.length)
      setColorSelectWeek('#fff')
      setColorSelectMonth('#fff')
      setColorSelectAll('#5DB075')
      setTextColorSelectWeek('black')
      setTextColorSelectMonth('black')
      setTextColorSelectAll('#fff')
    };
    bloodPressure.length != 0 ? (avg()) : (Alert.alert("โอ๊ะโอ !", "ดูเหมือนว่าคุณยังไม่ได้เพิ่มข้อมูลเลย"));
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

  const chartConfigLine = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    useShadowColorFromDataset: true,

  };

  const dataChartLine = {
    datasets: [
      {
        data: lineChartSYS,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional

      },
      {
        data: lineChartDIA,
        color: (opacity = 1) => `rgba(164, 191, 67, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
      {
        data: lineChartBPM,
        color: (opacity = 1) => `rgba(35, 175, 214, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
    ],
  };

  const dataPie = [
    {
      name: "ความดันโลหิตต่ำ",
      count: lowBloodPressure,
      color: "#23AFD6",
      legendFontColor: "black",
      legendFontSize: 12
    },
    {
      name: "ปกติ",
      count: normalBloodPressure,
      color: "#A4BF43",
      legendFontColor: "black",
      legendFontSize: 12
    },
    {
      name: "ความดันโลหิตสูงขั้นต้น",
      count: elevatedBloodPressure,
      color: "#EEC151",
      legendFontColor: "black",
      legendFontSize: 12
    },
    {
      name: "ความดันโลหิตสูง ระยะที่ 1",
      count: highBloodPressure1,
      color: "#F1815C",
      legendFontColor: "black",
      legendFontSize: 12
    },
    {
      name: "ความดันโลหิตสูง ระยะที่ 2",
      count: highBloodPressure2,
      color: "#FF0000",
      legendFontColor: "black",
      legendFontSize: 12
    }
  ];

  const chartConfigPie = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.textHeader}>สถิติ</Text>
      </View>
      <NativeBaseProvider>
        <VStack style={styles.borderStatistics}>
          <ScrollView>
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
                <Text style={[styles.titleProgressChart, { color: "#23AFD6" }]}>PULSE</Text></View>
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
            <HStack space={16} justifyContent="center" marginTop="2%" marginBottom="3%" >
              <TouchableOpacity style={[styles.contrainerSelected,{backgroundColor :colorSelectWeek}]}
                onPress={() => { getDataWeekAvg() }}>
                <Text style={[styles.selectContainer, { color: textcolorSelectWeek, }]}>
                  สัปดาห์
                </Text>
              </TouchableOpacity >
              <TouchableOpacity style={[styles.contrainerSelected,{backgroundColor :colorSelectMonth}]}
                onPress={() => { getDataMonthAvg() }}>
                <Text style={[styles.selectContainer, { color: textcolorSelectMonth, }]}>
                  เดือน
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.contrainerSelected,{backgroundColor :colorSelectAll}]}
                onPress={() => { getDataAllAvg() }}>
                <Text style={[styles.selectContainer, { color: textcolorSelectAll, }]}>
                  ทั้งหมด
                </Text>
              </TouchableOpacity>
            </HStack>
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text style={{ fontFamily: "NotoSansThai-Regular", color: "black", fontSize: 12 }}>
                {"ทั้งหมด " + LineChartCount + " ครั้ง"}
              </Text>
              <LineChart
                data={dataChartLine}
                width={370}
                height={220}
                chartConfig={chartConfigLine}
                withDots={false}
                // fromNumber={220}
                withShadow={true}
                withVerticalLines={false}
              />
              <VStack position="absolute" alignItems="flex-start" marginTop={210} >
                <HStack>
                  <FontAwesome name='circle' color="#FF0000" style={{marginTop:3.5}} />
                  <Text style={styles.lineChartTitles}> ความดันโลหิตตัวบน (SYS)  </Text>
                  <FontAwesome name='circle' color="#A4BF43" style={{marginTop:3.5}}/>
                  <Text style={styles.lineChartTitles}> ความดันโลหิตตัวล่าง (DIA) </Text>
                </HStack>
                <HStack>
                  <FontAwesome name='circle' color="#23AFD6" style={{marginTop:3.5}}/>
                  <Text style={styles.lineChartTitles}> อัตราการเต้นของหัวใจ (PULSE)  </Text>
                </HStack>
              </VStack>
            </View>
            <VStack alignItems="center" marginTop={4}>
              <PieChart
                data={dataPie}
                width={360}
                height={180}
                chartConfig={chartConfigPie}
                accessor={"count"}
                backgroundColor={"transparent"}
                paddingLeft={"-47"}
                center={[30, 7]}
              />
            </VStack>
          </ScrollView>
        </VStack>
      </NativeBaseProvider>
    </View>




  )
};

export default Statistics

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    borderRadius: 15,
    margin: 5,
    backgroundColor: 'white',
    shadowColor: "#000",
    elevation: 10,
  },
  numberProgressChart: {
    fontSize: 20,
    fontFamily: 'NotoSansThai-SemiBold',
    color:"black",
  },
  titleProgressChart: {
    fontSize: 18,
    fontFamily: 'NotoSansThai-Bold'
  },
  avgTitle: {
    fontSize: 12,
    fontFamily: 'NotoSansThai-Regular',
    color:"black",
  },
  selectContainer: {
    fontSize: 17,
    fontFamily: "NotoSansThai-SemiBold",

  },
  lineChartTitles: {
    fontFamily: "NotoSansThai-Regular",
    color: "black",
  },
  contrainerSelected: {
    // borderWidth:1, 
    width:70 ,
    height:35,
    alignItems:"center",
    justifyContent: "center",
    borderRadius:25,
    shadowColor: "#000",
    elevation: 10,
  },
});