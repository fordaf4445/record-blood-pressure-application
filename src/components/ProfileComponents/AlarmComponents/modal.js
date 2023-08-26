import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, } from '@rneui/base';
import {
  NativeBaseProvider,
  ScrollView,
  Center,
  HStack,
  VStack,
  Heading,
  Input,
  Select,
  Switch,
  Image,
  Modal,
  Radio,
} from 'native-base';
import { TimePicker } from 'react-native-wheel-picker-android';
import moment, { now } from 'moment';
import PushNotification from 'react-native-push-notification';

const AlarmModal = (
  addAlarm,
  setAddAlarm,
  setAlarmList,
) => {

  const hours = [];
  const minutes = [];

  const [createDate, setCreateDate] = useState(new Date());
  const [createTitle, setCreateTitle] = useState('');
  const [createText, setCreateText] = useState('');
  const [createRepeat, setCreateRepeat] = useState("day");


  for (let i = 1; i <= 12; i++) hours.push(i + '');

  for (let i = 0; i < 60; i++) {
    if (i >= 0 && i < 10) minutes.push('0' + i);
    else minutes.push(i + '');
  };

  const dateToTime = currDate => {
    return moment(currDate).format('LT');
  };

  function createAlarm() {

    const date = new Date(createDate);
    date.setSeconds(0)
    if (new Date() > createDate) {
      date.setDate(date.getDate() + 1);
    }
    console.log(date);
    console.log(new Date() + "=" + createDate);
    try {
      PushNotification.localNotificationSchedule({
        channelId: "alarm",
        title: createTitle,
        message: createText,
        date: new Date(date),
        smallIcon: "ic_small_icon",
        color: "#5DB075",
        // when: Date.now(),
        repeatType: createRepeat,
        vibrate: true,
        vibration: 1000,
      });
      Alert.alert('ตั้งการแจ้งเตือนสำเร็จ', createTitle + '   เวลา : ' + dateToTime(createDate), [
        { text: 'OK', onPress: () => { setAddAlarm(false), setCreateTitle(''), setCreateText(''), console.log('OK Pressed') } },
      ]);
    }
    catch (e) {
      console.log("Error + " + e)
      alert("Error + " + e);
    }
  };

  const getNotification = () => {
    PushNotification.getScheduledLocalNotifications((notifications) => {
      setAlarmList(notifications);
      console.log(notifications);
    })
  };

  return addAlarm ? (
    <ScrollView>
      <Modal isOpen={addAlarm} closeOnOverlayClick={true} avoidKeyboard={true}>

        <Modal.Content width="90%" height="100%">
          <Modal.Header style={{ backgroundColor: "#5DB075" }}>
            <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "white" }}
            >เพิ่มการแจ้งเตือน</Text></Modal.Header>

          <Modal.Body>

            <Center>
              <VStack space={2.5}>
                <Text style={styles.fontMain}>เวลา</Text>
                <TimePicker
                  initDate={createDate}
                  hours={hours}
                  minutes={minutes}
                  onTimeSelected={currDate => setCreateDate(currDate)}
                  style={{ height: 200, width: 100 }}
                  itemTextSize={25}
                  selectedItemTextSize={30}
                  selectedItemTextColor={'#333333'}
                  itemTextColor={'#bbbbbb'}
                  hideIndicator={true}
                // format24={true}
                />
                <Text style={[styles.fontMain, { marginTop: 15, }]}>หัวข้อ</Text>
                <TextInput
                  placeholder="เพิ่มหัวข้อ"
                  onChangeText={createTitle => setCreateTitle(createTitle)}
                  value={createTitle}
                  style={styles.inputTitle}
                  multiline={true}
                />
                <Text style={styles.fontMain}>รายละเอียด</Text>
                <TextInput
                  placeholder="เพิ่มรายละเอียด"
                  onChangeText={createText => setCreateText(createText)}
                  value={createText}
                  style={styles.inputText}
                  multiline={true}
                />
                <Radio.Group name="sexGroup" accessibilityLabel='sex' value={createRepeat}
                  onChange={nextValue => { setCreateRepeat(nextValue); }} flexDirection="row" marginTop={2.5}>
                  <Radio colorScheme="emerald" value='day' my={1}>
                    ทุกวัน
                  </Radio>
                  <Radio colorScheme="emerald" value='undefined' my={1} marginLeft={10}>
                    วันเดียว
                  </Radio>
                </Radio.Group>
                {/* <HStack justifyContent="space-between" >
                  <Text style={styles.fontMain}>สั่นเมื่อมีการเตือน</Text>
                  <Switch
                    size="md"
                    colorScheme="emerald"
                    isChecked={createVibration}
                    onToggle={() => toggleCreateVibration()}
                  />
                </HStack> */}

                <HStack marginTop={200} ></HStack>
              </VStack>
            </Center>
          </Modal.Body>

          <Modal.Footer>
            <Button
              title="ยกเลิก"
              titleStyle={{ fontFamily: 'NotoSansThai-Bold', fontSize: 13 }}
              buttonStyle={{
                backgroundColor: 'red',
                borderRadius: 30,
                height: 40,
                width: 80,
              }}
              containerStyle={{
                marginRight: 25,
              }}
              onPress={() => {
                setAddAlarm(false);
                setCreateTitle('');
                setCreateText('');
              }} />

            <Button
              title="ตกลง"
              titleStyle={{ fontFamily: 'NotoSansThai-Bold', fontSize: 13 }}
              buttonStyle={{
                backgroundColor: '#5DB075',
                borderRadius: 30,
                height: 40,
                width: 80,
              }}
              onPress={() => {
                if (createTitle === '') {
                  Alert.alert("ไม่สามารถเว้นว่างหัวข้อการเตือนได้")
                } else { createAlarm(), getNotification() }
              }} />

          </Modal.Footer>

        </Modal.Content>

      </Modal>
    </ScrollView>
  ) : null;
};

const EditAlarm = (
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
) => {
  const hours = [];
  const minutes = [];

  for (let i = 1; i <= 12; i++) hours.push(i + '');

  for (let i = 0; i < 60; i++) {
    if (i >= 0 && i < 10) minutes.push('0' + i);
    else minutes.push(i + '');
  };

  const dateToTime = currDate => {
    return moment(currDate).format('LT');
  };

  function createAlarm() {

    const date = new Date(editCreateDate);
    date.setSeconds(0)
    if (new Date() < editCreateDate) {
      date.setDate(date.getDate() - 1);
    } else {
      date.setDate(date.getDate() + 1)
    };
    console.log(date);
    console.log(new Date() + "=" + editCreateDate);
    try {
      PushNotification.localNotificationSchedule({
        channelId: "alarm",
        id: editId,
        title: editTitle,
        message: editText,
        date: new Date(date),
        smallIcon: "ic_small_icon",
        color: "#5DB075",
        // when: Date.now(),
        repeatType: editRepeat,
        vibrate: true,
        vibration: 1000,
      });
    }
    catch (e) {
      console.log("Error + " + e)
      alert("Error + " + e);
    }
  };

  const getNotification = () => {
    PushNotification.getScheduledLocalNotifications((notifications) => {
      setAlarmList(notifications);
      console.log(notifications);
    })
  };


  return editAlarm ? (
    <ScrollView>
      <Modal isOpen={editAlarm} closeOnOverlayClick={true} avoidKeyboard={true} >

        <Modal.Content width="90%" height="100%">
          <Modal.Header style={{ backgroundColor: "#71C7E2" }}>
            <Text style={{ fontFamily: "NotoSansThai-Bold", fontSize: 18, color: "white" }}
            >แก้ไขการแจ้งเตือน</Text></Modal.Header>

          <Modal.Body>

            <Center>
              <VStack space={2.5}>
                <Text style={styles.fontMain}>เวลา</Text>
                <TimePicker
                  initDate={editCreateDate}
                  hours={hours}
                  minutes={minutes}
                  onTimeSelected={currDate => setEditCreateDate(currDate)}
                  style={{ height: 200, width: 100 }}
                  itemTextSize={25}
                  selectedItemTextSize={30}
                  selectedItemTextColor={'#333333'}
                  itemTextColor={'#bbbbbb'}
                  hideIndicator={true}
                // format24={true}
                />
                <Text style={[styles.fontMain, { marginTop: 15, }]}>หัวข้อ</Text>
                <TextInput
                  placeholder="เพิ่มหัวข้อ"
                  onChangeText={editTitle => setEditTitle(editTitle)}
                  value={editTitle}
                  style={styles.editInputTitle}
                  multiline={true}
                />
                <Text style={styles.fontMain}>รายละเอียด</Text>
                <TextInput
                  placeholder="เพิ่มรายละเอียด"
                  onChangeText={editText => setEditText(editText)}
                  value={editText}
                  style={styles.editInputText}
                  multiline={true}
                />
                <Radio.Group name="sexGroup" accessibilityLabel='sex' value={editRepeat}
                  onChange={nextValue => { setEditRepeat(nextValue); }} flexDirection="row" marginTop={2.5}>
                  <Radio colorScheme="emerald" value='day' my={1}>
                    ทุกวัน
                  </Radio>
                  <Radio colorScheme="emerald" value='undefined' my={1} marginLeft={10}>
                    วันเดียว
                  </Radio>
                </Radio.Group>
                <Button
                  title="Try!"
                  titleStyle={{ fontFamily: 'NotoSansThai-Bold', fontSize: 13 }}
                  buttonStyle={{
                    backgroundColor: 'red',
                    borderRadius: 30,
                    height: 40,
                    width: 80,
                  }}
                  containerStyle={{
                    marginRight: 25,
                  }}
                  onPress={() => {
                    console.log(new Date());
                  }} />
                <HStack marginTop={200} ></HStack>
              </VStack>
            </Center>

          </Modal.Body>

          <Modal.Footer>
            <Button
              title="ยกเลิก"
              titleStyle={{ fontFamily: 'NotoSansThai-Bold', fontSize: 13 }}
              buttonStyle={{
                backgroundColor: 'red',
                borderRadius: 30,
                height: 40,
                width: 80,
              }}
              containerStyle={{
                marginRight: 25,
              }}
              onPress={() => {
                setEditAlarm(false);
              }} />

            <Button
              title="แก้ไข"
              titleStyle={{ fontFamily: 'NotoSansThai-Bold', fontSize: 13 }}
              buttonStyle={{
                backgroundColor: '#5DB075',
                borderRadius: 30,
                height: 40,
                width: 80,
              }}
              onPress={() => {
                if (editTitle === '') {
                  Alert.alert("ไม่สามารถเว้นว่างหัวข้อการเตือนได้")
                } else { createAlarm(), getNotification(), setEditAlarm(false) }
              }} />

          </Modal.Footer>

        </Modal.Content>

      </Modal>
    </ScrollView>
  ) : null;
};

export { AlarmModal, EditAlarm };

const styles = StyleSheet.create({
  inputTitle: {
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#B8DE9A',
    fontSize: 15,
    paddingLeft: 15,
  },
  inputText: {
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#B8DE9A',
    fontSize: 15,
    paddingLeft: 15,
  },
  fontMain: {
    fontFamily: "NotoSansThai-SemiBold",
    fontSize: 18,
    color: "black",
  },
  editInputTitle: {
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#71C7E2',
    fontSize: 15,
    paddingLeft: 15,
  },
  editInputText: {
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#71C7E2',
    fontSize: 15,
    paddingLeft: 15,
  },
});