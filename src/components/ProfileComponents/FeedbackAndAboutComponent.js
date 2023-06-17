import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, VStack, HStack, Center } from 'native-base';

const FeedbackAndAboutComponent = () => {
  const [textFeedback, setTextFeedback] = useState('');

  return (
    <NativeBaseProvider>
      <VStack style={[{ height: "100%", width: "100%", }, styles.mainBorder]}>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <Image
            source={require('../../../assets/image/Feedback.png')}
          />
          <VStack style={styles.secondBorder}>
            <Text style={styles.fontTitle}>ข้อเสนอแนะเพิ่มเติม</Text>
            <View style={{ flex : 1}}>
              <TextInput
                multiline={true}
                onChangeText={textFeedback => setTextFeedback(textFeedback)}
                value={textFeedback}
                style={styles.inputFeedBackBorder}
              />
            </View>
          </VStack>
          <Text>kljhsdikjh</Text>
          <Text>kljhsdikjh</Text>
          <Text>kljhsdikjh</Text>
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
    elevation: 10,
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
})