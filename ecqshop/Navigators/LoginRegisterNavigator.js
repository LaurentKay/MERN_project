import React from 'react';
import {createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#e91e63'
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown:false
                }}
            />
             <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown:false
                }}
            />
             {/* <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown:false
                }}
            /> */}
        </Stack.Navigator>
    )
}

export default function LoginRegisterNavigator(){
    return <MyStack />
}