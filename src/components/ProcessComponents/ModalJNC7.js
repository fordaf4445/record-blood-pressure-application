import { View, Text, ScrollView, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    NativeBaseProvider,
    Center,
    HStack,
    VStack,
    Select,
    Switch,
    
    Modal,
    Radio,
  } from 'native-base';

const ModalJNC7 = (
    openModalJNC7,
    setOpenModalJNC7
    ) => {
    return openModalJNC7 ? (
        <ScrollView>
            <Modal isOpen={openModalJNC7} closeOnOverlayClick={true} avoidKeyboard={true}>
                <Modal.Content width="100%" height="100%">
                    <Modal.Header>
                        <VStack>
                        <Text style={{color:"#000", fontFamily:"NotoSansThai-SemiBold", fontSize:16}}>การแบ่งระดับความดันโลหิตสูงของผู้ใหญ่</Text>
                        <Text style={{color:"#000", fontFamily:"NotoSansThai-SemiBold", fontSize:16}}>ตามวิธีของ JNC 7</Text>
                        </VStack>
                    </Modal.Header>
                    <Modal.Body>
                        <Image
                        source={require("../../../assets/image/ClassificationBloodpressure.png")}
                        style={{width:"100%",height:300}}
                        
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                        title='close'
                        onPress={() =>{setOpenModalJNC7(!openModalJNC7)}}/>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </ScrollView>
    ):(null)
}

export {ModalJNC7} 