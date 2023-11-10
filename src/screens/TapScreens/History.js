import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '@react-native-firebase/auth';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { Overlay } from '@rneui/base';
import { VStack, HStack, NativeBaseProvider } from 'native-base';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const History = () => {
    useEffect(() => {
        const subscriber = db.collection("dataUser")
            .doc(firebase.auth().currentUser.uid)
            .collection('BloodPressure')
            .orderBy("timestamp", "desc")
            .onSnapshot(querySnapshot => {
                const bloodPressure = [];

                querySnapshot.forEach(documentSnapshot => {
                    bloodPressure.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,

                    });
                });

                setloodPressure(bloodPressure);
                setLoading(false);
            });

        return () => subscriber();
    }, []);

    const db = firebase.firestore()
    const [loading, setLoading] = useState(true);
    const [bloodPressure, setloodPressure] = useState([]);
    const [calendarOverlay, setCalendarOverlay] = useState(false);
    const [selected, setSelected] = useState('');
    const [filteredBloodPressure, setFilteredBloodPressure] = useState(bloodPressure);
    const [filterDays, setFilterDays] = useState(7);
    const currentDate = moment().format('YYYY-MM-DD');

    // อัปเดตข้อมูลที่จะแสดงใน FlatList เมื่อวันที่ถูกเลือกในปฎิทิน
    useEffect(() => {
        if (selected) {
            const filteredData = bloodPressure.filter(item => moment(item.timestamp).format('YYYY-MM-DD') === selected);
            setFilteredBloodPressure(filteredData);
        } else {
            setFilteredBloodPressure(bloodPressure);
        }
    }, [selected, bloodPressure]);

    // อัปเดตข้อมูลที่จะแสดงใน FlatList เมื่อวันที่ถูกเลือกใน 7 , 30 วัน
    useEffect(() => {
        if (filterDays === 7) {
            const startDate = moment(currentDate).subtract(7, 'days').format('YYYY-MM-DD');
            const filteredData = bloodPressure.filter(item => moment(item.timestamp).isSameOrAfter(startDate));
            setFilteredBloodPressure(filteredData);
        } else if (filterDays === 30) {
            const startDate = moment(currentDate).subtract(30, 'days').format('YYYY-MM-DD');
            const filteredData = bloodPressure.filter(item => moment(item.timestamp).isSameOrAfter(startDate));
            setFilteredBloodPressure(filteredData);
        } else {
            setFilteredBloodPressure(bloodPressure);
        }
    }, [filterDays, bloodPressure]);

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

    const DatetoTime = currDate => {
        return moment(currDate).format('DD/MM/YY HH:mm น.');
    }

    LocaleConfig.locales['en'] = {
        monthNames: [
            'มกราคม',
            'กุมภาพันธ์',
            'มีนาคม ',
            'เมษายน',
            'พฤษภาคม ',
            'มิถุนายน',
            'กรกฎาคม ',
            'สิงหาคม',
            'กันยายน',
            'ตุลาคม',
            'พฤศจิกายน',
            'ธันวาคม'
        ],
        monthNamesShort: ['ม.ค.', 'ก.พ.', 'ก.พ.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'],
        dayNamesShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
        today: "วันนี้"
    };
    LocaleConfig.defaultLocale = 'en';

    function renderItem(item) {

        const del = () => {
            db.collection('dataUser')
                .doc(firebase.auth().currentUser.uid)
                .collection('BloodPressure')
                .doc(item.key).delete()
                .then(() => {
                    console.log('Item deleted successfully');
                })
                .catch((error) => {
                    console.error('Error deleting item:', error);
                });
        }

        function deleteItem() {
            return (
                <View style={styles.deleteContainer}>
                    <TouchableOpacity
                        onPress={() => del(item)}>
                        <FontAwesome5
                            name='trash'
                            size={20}
                            color="white" />
                    </TouchableOpacity>
                </View>
            )
        }


        let colorBoloodPresure;
        if (item.SYS > 160) {
            colorBoloodPresure = "#EF553C"
        } else if (item.SYS >= 141) {
            colorBoloodPresure = "#F1815C"
        } else if (item.SYS >= 121) {
            colorBoloodPresure = "#EEC151"
        } else if (item.SYS >= 91) {
            colorBoloodPresure = "#B8DE9A"
        } else {
            colorBoloodPresure = "#71C7E2"
        }
        return (
            <GestureHandlerRootView>
                <Swipeable
                    renderRightActions={deleteItem}>
                    <View style={styles.cradFlatlist}>
                        <View style={[styles.cradBloodPressure, { backgroundColor: colorBoloodPresure }]}>
                            <View style={styles.cradSYS}>
                                <Text style={styles.textSYSDIA}>{item.SYS}</Text>
                            </View>
                            <Text style={styles.textSYSDIA}>{item.DIA}</Text>
                        </View>
                        <View style={{ flex: 5, justifyContent: "center" }}>
                            <Text style={styles.textType}>   {item.TYPE}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.textTimeBpm}>   {DatetoTime(item.timestamp)}</Text>
                                <Text style={styles.textTimeBpm}> | {item.BPM} bpm</Text>
                            </View>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        )
    }

    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <Text style={styles.textHeader}>ประวัติ</Text>
                </View>
                <Overlay isVisible={calendarOverlay} overlayStyle={{ borderRadius: 25, backgroundColor: "#fff" }} onPressOut={() => { setCalendarOverlay(!calendarOverlay) }}>
                    <View >
                        <Calendar
                            onDayPress={day => {
                                setSelected(day.dateString);
                            }}
                            markedDates={{
                                [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#5DB075' }
                            }}
                            theme={{
                                dayTextColor: 'black',
                                todayTextColor: '#5DB075',
                                selectedDotColor: '#5DB075',
                                arrowColor: '#5DB075',
                                textDayFontFamily: 'NotoSansThai-Regular',
                                textMonthFontFamily: 'NotoSansThai-Regular',
                                textDayHeaderFontFamily: 'NotoSansThai-Regular',
                            }}
                        />
                    </View>
                </Overlay>
                <HStack justifyContent={"space-between"} style={styles.selectDate}>
                    <TouchableOpacity style={[styles.contrainerSelected, { backgroundColor: filterDays === "All" ? '#5DB075' : '#fff' }]} onPress={() => { setFilterDays("All") }}>
                        <Text style={[styles.textSelectDate, { color: filterDays === "All" ? '#fff' : '#000' }]}>ทั้งหมด</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.contrainerSelected, { backgroundColor: filterDays === 7 ? '#5DB075' : '#fff' }]} onPress={() => { setFilterDays(7) }}>
                        <Text style={[styles.textSelectDate, { color: filterDays === 7 ? '#fff' : '#000' }]}>7 วัน</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.contrainerSelected, { backgroundColor: filterDays === 30 ? '#5DB075' : '#fff' }]} onPress={() => { setFilterDays(30) }}>
                        <Text style={[styles.textSelectDate, { color: filterDays === 30 ? '#fff' : '#000' }]}>30 วัน</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.contrainerSelected, { backgroundColor: filterDays === "calendarSelect" ? '#5DB075' : '#fff' }]} onPress={() => { setCalendarOverlay(!calendarOverlay), setFilterDays("calendarSelect") }}>
                        <Text style={[styles.textSelectDate, { color: filterDays === "calendarSelect" ? '#fff' : '#000' }]}>เลือกเอง</Text>
                    </TouchableOpacity>
                </HStack>
                <View style={styles.borderHistory}>
                    <FlatList
                        data={filteredBloodPressure}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item) => item.key}
                    />
                </View>
            </View>
        </NativeBaseProvider>
    )
}

export default History

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
    borderHistory: {
        flex: 1,
        borderRadius: 15,
        margin: 20,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 10,
    },
    selectDate: {
        paddingLeft: 20,
        paddingRight: 20,
        // borderWidth: 1,
    },
    textSelectDate: {
        fontSize: 17,
        fontFamily: "NotoSansThai-SemiBold",
    },
    contrainerSelected: {
        // borderWidth: 1,
        width: 75,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        shadowColor: "#000",
        elevation: 10,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    cradFlatlist: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        flexDirection: "row",
        height: 65,
        borderBottomWidth: 1,
        borderBottomColor: "#D2CFC8",
        backgroundColor: "#FFFFFF",

    },
    cradBloodPressure: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 5,
    },
    cradSYS: {
        borderBottomWidth: 1,
        borderBottomColor: "white",
        width: "80%",
        alignItems: "center",
    },
    textSYSDIA: {
        fontFamily: "NotoSansThai-Regular",
        color: "white",
        fontSize: 15,
    },
    textType: {
        fontFamily: "NotoSansThai-Regular",
        color: "black",
        fontSize: 16,
    },
    textTimeBpm: {
        fontFamily: "NotoSansThai-Regular",
        fontSize: 14,
    },
    deleteContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        width: "18%",
        height: "100%",
        borderRadius: 100,
        marginRight: "2%",
    }
});