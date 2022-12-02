import React from 'react';
// import { View, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';

const ButtonComponent = ({label,style}) => {

    return (
        <Button
            title={label}
            titleStyle={{ fontFamily: 'NotoSansThai-Bold' }}
            buttonStyle={[{
                backgroundColor: '#5DB075',
                borderRadius: 30,
                height: 50,
                width: 212,
            },style]}
            containerStyle={{
                // marginHorizontal: 50,
                marginVertical: 10,
                marginTop: 20,
                alignItems: 'center',

            }} />
    )
}

export default ButtonComponent;
