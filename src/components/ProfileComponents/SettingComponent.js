import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const SettingComponent = () => {
  const LeftActions = () => {
    return(
      <View style={{backgroundColor:"green"}}>
        <TouchableOpacity>
            <Text>sdfsdfsdfsdf</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <GestureHandlerRootView>
    <Swipeable
    renderRightActions={LeftActions}
    >
      <View style={{backgroundColor:"white", height:50}}>
        <Text style={{ fontSize: 24 }}>App</Text>
      </View>
    </Swipeable>
    </GestureHandlerRootView>
  )
}

export default SettingComponent