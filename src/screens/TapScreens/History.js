import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth, { firebase } from '@react-native-firebase/auth';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const History = () => {
    const db = firebase.firestore()
    const [loading, setLoading] = useState(true);
    const [bloodPressure, setloodPressure] = useState([]);

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

    if (loading) {
        return <ActivityIndicator />
    }


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
                                <Text style={styles.textTimeBpm}>   {item.timestamp}</Text>
                                <Text style={styles.textTimeBpm}> | {item.BPM} bpm</Text>
                            </View>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.textHeader}>ประวัติ</Text>
            </View>
            <View>

            </View>
            <View style={styles.borderHistory}>
                <FlatList
                    data={bloodPressure}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={(item) => item.key}
                />
            </View>
        </View>
    )
}

export default History

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
        color: 'black',
    },
    borderHistory: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        margin: 20,
        paddingTop: 10,
        paddingBottom: 5,
        borderColor: '#e8e8e8',
        backgroundColor: 'white',
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
        width: "20%",
        borderRadius:100,
    }
});