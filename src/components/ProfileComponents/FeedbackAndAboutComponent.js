import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { NativeBaseProvider, VStack, HStack, Center } from 'native-base';

const FeedbackAndAboutComponent = () => {
  const [textFeedback, setTextFeedback] = useState('');
  const emailAddress = 'recordbloodpressure2023@gmail.com';
  const url = `mailto:${emailAddress}?subject=ข้อเสนอแนะเพิ่มเติม&body=${textFeedback}`;
  const submit = () => {
    const mailtoUrl = url;
    Linking.openURL(mailtoUrl);
  };

  return (
    <NativeBaseProvider>
      <VStack style={[{ height: "100%", width: "100%", }, styles.mainBorder]}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../../assets/image/Feedback.png')}
          />
          <VStack space={1.5} style={styles.secondBorder}>
            <Text style={styles.fontTitle}>ข้อเสนอแนะเพิ่มเติม</Text>
            <TextInput
              multiline={true}
              onChangeText={textFeedback => setTextFeedback(textFeedback)}
              value={textFeedback}
              style={styles.inputFeedBackBorder}
            />
            <TouchableOpacity style={styles.sendButtonStyle}
              onPress={submit}>
              <Text style={{ fontFamily: "NotoSansThai-Bold", color: "white" }}>
                ส่งข้อเสนอแนะ
              </Text>
            </TouchableOpacity>
          </VStack>
          <VStack space={1.5} style={styles.secondBorder}>
            <Text style={styles.fontTitle}>เกี่ยวกับแอพพลิเคชัน</Text>
            <View>
              <Text>app_name = record blood pressure</Text>
              <Text>version = 1.0.2</Text>
              <Text>create by react-native</Text>
            </View>
          </VStack>
          <VStack space={1.5} style={styles.secondBorder}>
            <Text style={styles.fontTitle}>เกี่ยวกับผู้จัดทำ</Text>
            <HStack space={2}>
              <Image
                source={require("../../../assets/image/profile1.png")}
                style={{ height: 125, width: 82 }}
                resizeMode='stretch' />
              <VStack>
                <Text style={styles.proFileFont}>
                  {'นาย ธนัช ตาคำเที่ยง'}
                  {'\n'}
                  {'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ตาก'}
                  {'\n'}
                  {'คณะวิศวกรรมศาสตร์'}
                  {'\n'}
                  {'สาขาวิศวกรรมไฟฟ้า'}
                  {'\n'}
                  {'สาขาวิชา วศ.บ.วิศวกรรมคอมพิวเตอร์'}
                </Text>
              </VStack>
            </HStack>
            <HStack space={2}>
              <Image
                source={require("../../../assets/image/profile1.png")}
                style={{ height: 125, width: 82 }}
                resizeMode='stretch' />
              <VStack>
                <Text style={styles.proFileFont}>
                  {'นาย ธนัช ตาคำเที่ยง'}
                  {'\n'}
                  {'มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ตาก'}
                  {'\n'}
                  {'คณะวิศวกรรมศาสตร์'}
                  {'\n'}
                  {'สาขาวิศวกรรมไฟฟ้า'}
                  {'\n'}
                  {'สาขาวิชา วศ.บ.วิศวกรรมคอมพิวเตอร์'}
                </Text>
              </VStack>
            </HStack>
          </VStack>

        </ScrollView>
      </VStack>
    </NativeBaseProvider>
  )
};

export default FeedbackAndAboutComponent

const styles = StyleSheet.create({
  mainBorder: {
    padding: 10,
    paddingTop: 5,
    shadowColor: "#000",
    elevation: 10,
    backgroundColor: "#fff",
  },
  secondBorder: {
    padding: 10,
    margin: 10,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    elevation: 6,
  },
  inputFeedBackBorder: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B8DE9A',
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 10,
  },
  fontTitle: {
    fontFamily: "NotoSansThai-Regular",
    fontSize: 15,
    color: "black",
  },
  sendButtonStyle: {
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5DB075",
  },
  proFileFont: {
    fontFamily: "NotoSansThai-Regular",
    color: "black",
  },
})