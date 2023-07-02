import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';


const SaveComponent = () => {
  let [name, setName] = useState("");

  const html = `
    <html>
      <body>
        <h1>Hi </h1>
        <p style="color: red;">Hello. Bonjour. Hola.</p>
      </body>
    </html>
  `;

  let generatePDF = async () => {
    const file = await printToFileAsync({
      html: html,
      base64: false
    });

    await shareAsync(file.uri);
    
  };

  return (
    <View style={styles.container}>
      <TextInput
      value={name}
      placeholder='Name'
      style={styles.inputTextName}
      onChangeText={(value) => setName(value)}/>
      <Button
       title='GeneratePDF'
       onPress={generatePDF}/>
    </View>
  );
}

export default SaveComponent

const styles = StyleSheet.create ({
    container : {
      flex : 1,
      backgroundColor : "#fff",
      justifyContent : "center",
      alignItems : "center",
    },
    inputTextName : {
      borderWidth : 1,
      borderRadius : 10,
      width: 200,
      marginBottom : 20,
    },
});