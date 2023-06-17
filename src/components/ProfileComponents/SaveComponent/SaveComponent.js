import { View, Text, TextInput } from 'react-native'
import React from 'react'

const SaveComponent = () => {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  return (
    <View>
      <Text>SaveComponent good morning</Text>
      <TextInput

        multiline
        numberOfLines={4}

        onChangeText={text => onChangeText(text)}
        value={value}
        style={{ padding: 10 , borderWidth : 1}}
      />
    </View>
  )
}

export default SaveComponent