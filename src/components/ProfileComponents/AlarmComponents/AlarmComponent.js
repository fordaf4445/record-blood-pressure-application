import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, } from '@rneui/base';
import {
  NativeBaseProvider,
  Center,
  HStack,
  VStack,
  Heading,
  Input,
  Select,
  Switch,
  Modal,
  Tag,
  Image,
  Link,
  IconButton,
  InfoOutlineIcon,
  SmallCloseIcon,
  ScrollView,
  Text,
} from 'native-base';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { AlarmModal, EditAlarm } from './modal';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

const AlarmComponent = () => {
  const [alarmList, setAlarmList] = useState([]);
  const [addAlarm, setAddAlarm] = useState(false);
  const [editAlarm, setEditAlarm] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editCreateDate, setEditCreateDate] = useState(new Date());
  const [editTitle, setEditTitle] = useState(null);
  const [editText, setEditText] = useState(null);
  const [editRepeat, setEditRepeat] = useState(null);



  useEffect(() => {
    createChannel()
    PushNotification.getScheduledLocalNotifications((notifications) => {
      setAlarmList(notifications);
      console.log(notifications);
    });
  }, [])

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: "alarm",
      channelName: "My channel",
      playSound: true,
      soundName: "ringtone.mp3",
    },
      (created) => console.log(`createChannel returned '${created}'`))
  }

  const dateToTime = currDate => {
    return moment(currDate).format('hh:mm A');
  };

  const getNotification = () => {
    PushNotification.getScheduledLocalNotifications((notifications) => {
      setAlarmList(notifications);
    })
  };

  const deleteAlarmAll = () => {
    const delAlarm = () => {
      PushNotification.cancelAllLocalNotifications();
    };
    Alert.alert("แจ้งเตือน!", "การล้างการแจ้งเตือนจะเป็นการลบแจ้งเตือนทั้งหมดที่คุณมี",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => { delAlarm(), getNotification() } },
      ])

  };

  const deleteAlarm = alarm => {
    const del = () => {
      PushNotification.cancelLocalNotification(alarm.id)
    };
    Alert.alert("ลบการแจ้งเตือน ?", "คุณจะไม่สามารถเปลี่ยนกลับได้!",
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        { text: 'OK', onPress: () => { del(), getNotification() } },
      ])
  };

  const openEditAlarm = alarm => {

    setEditId(alarm.id)
    setEditCreateDate(alarm.date)
    setEditTitle(alarm.title)
    setEditText(alarm.message)
    setEditRepeat(alarm.repeatInterval)

    setEditAlarm(true)
  };



  return (
    <NativeBaseProvider>

      <Center>
        <VStack style={{ height: "99%", width: "98%", alignItems: "center", }}>
          <VStack style={styles.borderAlarmComponent} >
            {AlarmModal(
              addAlarm,
              setAddAlarm,
              setAlarmList,
            )}
            {EditAlarm(
              editAlarm,
              setEditAlarm,
              alarmList,
              setAlarmList,
              editId,
              editCreateDate,
              editTitle,
              editText,
              editRepeat,
              setEditId,
              setEditCreateDate,
              setEditTitle,
              setEditText,
              setEditRepeat,
            )}
            {alarmList.length != 0 ?
              (<HStack justifyContent="flex-end" marginRight={17}>
                <TouchableOpacity
                  onPress={() => { deleteAlarmAll() }}>
                  <Text fontFamily="NotoSansThai-Bold" color="#5DB075" fontSize={15}>ล้างการแจ้งเตือน</Text>
                </TouchableOpacity>
              </HStack>) : (<HStack></HStack>)}
            <ScrollView>
              {alarmList.length != 0 ? (

                alarmList.sort((a, b) => a.id - b.id).map((alarm) => {

                  return (
                    <HStack style={styles.cradList} justifyContent="space-between" key={alarm.id}>
                      <TouchableOpacity style={{ flexDirection: "row" }}
                        onPress={() => { openEditAlarm(alarm) }}>
                        <HStack alignItems="center">
                          <Text fontSize={25} style={styles.cradTime}>{dateToTime(alarm.date)}</Text>
                        </HStack>
                        <View style={{ position: "absolute", marginTop: 43, marginLeft: 5 }}>
                          <Text style={{ color: "#838383", fontFamily: "NotoSansThai-Regular" }}>
                            {alarm.repeatInterval == 'day' ? ('ทุกวัน') : ('วันเดียว')}
                          </Text>
                        </View>
                        <HStack alignItems="center" w="55%" marginLeft="3%">
                          <Text fontSize={15} style={styles.cradTitles} isTruncated
                            marginTop={1.5}>{alarm.title}</Text>
                        </HStack>
                      </TouchableOpacity>
                      <HStack alignItems="center">
                        <TouchableOpacity
                          onPress={() => { deleteAlarm(alarm) }}>
                          <Feather
                            name='x-circle'
                            size={27}
                          />
                        </TouchableOpacity>
                      </HStack>
                    </HStack>
                  )
                })

              ) :
                (<VStack space={2} style={{ flex: 1, alignItems: "center", justifyContent: "center", height: "90%", marginTop: "60%" }}>
                  <IconM
                    name='clock-plus-outline'
                    size={60}
                    color="#5DB075"
                  />
                  <Text fontSize={18} style={{ fontFamily: "NotoSansThai-SemiBold", }}
                  >ไม่มีรายการแจ้งเตือน</Text>
                </VStack>
                )}
            </ScrollView>
          </VStack >
          <Button
            title="เพิ่มการแจ้งเตือน"
            titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
            buttonStyle={{
              backgroundColor: '#5DB075',
              borderRadius: 30,
              height: 50,
              width: 170,
            }}
            onPress={() => { setAddAlarm(true) }}
          />
        </VStack>
      </Center>

    </NativeBaseProvider>
  )
}

export default AlarmComponent

const styles = StyleSheet.create({
  borderAlarmComponent: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#e8e8e8',
    backgroundColor: 'white',
    height: '90%',
    width: '100%',
    marginTop: 5,
    marginBottom: 10,
    padding: 15,
    paddingTop: 5,
  },
  cradList: {
    marginTop: 10,
    // marginLeft: 20,
    marginRight: 6,
    height: 65,
    // borderWidth: 1,
    borderColor: "#D2CFC8",
    backgroundColor: "#FFFFFF",
    paddingLeft: 17,
  },
  cradTime: {
    fontFamily: "NotoSansThai-Regular",
    color: "#000",

    // 
  },
  cradTitles: {
    fontFamily: "NotoSansThai-Regular",
    color: "#000",

  },
  deleteContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "15%",
    height: "100%",
  },
})