import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwessome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Prosess from '../screens/TapScreens/Prosess';
import History from '../screens/TapScreens/History';
import Statistics from '../screens/TapScreens/Statistics';
import Profile from '../screens/TapScreens/Profile';

import InputDataTest from '../components/ProcessComponents/InputDataTest';

const Tab = createBottomTabNavigator();

const ProsessInputDataStack = createStackNavigator();

function ProsessInputData() {
    return (
        <ProsessInputDataStack.Navigator>
            <ProsessInputDataStack.Screen
                name="Prosess"
                component={Prosess}
                options={{ headerShown: false }} />
            <ProsessInputDataStack.Screen
                name="InputDataTest"
                component={InputDataTest} />
        </ProsessInputDataStack.Navigator>
    )
};

export default function TapStack() {
    return (
        <Tab.Navigator

            initialRouteName='Prosess'
            screenOptions={{
                tabBarActiveTintColor: '#5DB075',
                tabBarStyle: { height: 70 },
                tabBarLabelStyle: { marginBottom: 10, marginTop: -7 },
                headerShown: false,
            }}

        >
            <Tab.Screen name='ProsessInputData' component={ProsessInputData}
                options={{
                    tabBarLabel: 'เพิ่ม',
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" color={color} size={33} />
                    )
                }}
            />
            <Tab.Screen name='History' component={History}
                options={{
                    tabBarLabel: 'ประวัติ',
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <FontAwessome5 name="history" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name='Statistics' component={Statistics}
                options={{
                    tabBarLabel: 'สถิติ',
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen name='Profile' component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    // tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={30} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}



