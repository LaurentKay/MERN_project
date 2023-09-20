import React from 'react';
import {createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/User/Login';
import Register from '../Screens/User/Register';
import UserProfile from '../Screens/User/UserProfile';
import UserMenu from '../Screens/User/UserMenu';
import returnForm from '../Screens/User/ReturnForm';
import EditUserForm from '../Screens/User/EditUserForm';

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
                name="menu"
                component={UserMenu}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="Returns"
                component={returnForm}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="EditUser"
                component={EditUserForm}
                options={{
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default function UserNavigator(){
    return <MyStack />
}