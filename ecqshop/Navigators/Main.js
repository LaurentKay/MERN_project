import React, {useContext, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Stacks
import HomeNavigator from './HomeNavigator';
import UserNavigator from './UserNavigator';
import CartIcon from '../Shared/CartIcon';
import CartNavigator from './CartNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';
import MoreCategoriesNovigator from './MoreCatNavigator';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { fontSize } from 'styled-system';
//import UserMenu from '../Screens/User/UserMenu';
import LoginRegisterNavigator from './LoginRegisterNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const  Tab = createBottomTabNavigator();

const Main = () =>{
    const context = useContext(AuthGlobal);
    const getToken = async () =>{
        const token = await AsyncStorage.getItem('Token');
        console.log('This is the toke:::::=> ', token);
        if(!token){
            tokenHandler();
        }
    }
    const tokenHandler = async () =>{
        const token = await messaging()
            .getToken(firebase.app().options.messagingSenderId);
        AsyncStorage.setItem("Token", token);
    }
    const setupCloudMessaging = async () =>{
        const authStatus = await messaging().requestPermission();
        const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if(enabled){
            console.log('Authorization status: ', authStatus);
        }
        //It will trigger when app was in background
        messaging().onNotificationOpenedApp(remoteMessage =>{
            //Notificadtion caused app to open from background state:'
            //alert(JSON.stringify(remoteMessage));
            showNotification(remoteMessage.notification);
            //console.log(navigation);
            //navigation.navigate(removeMessage.data.type);
        });
        //It will trigger when app was in quit mode(state)
        messaging().getInitialNotification().then(removeMessage =>{
            //check whether an initial notification is available
            if(removeMessage){
                //alert(JSON.stringify(remoteMessage));
                showNotification(remoteMessage.notification);
                //console.log(navigation);
                //setInitialRoute(removeMessage.data.type);
            }
        });
        //If app is on forground
        messaging().onMessage(remoteMessage =>{
            //Notification caused app to open from background state:'
            //console.log(JSON.stringify(remoteMessage));
            showNotification(remoteMessage.notification);
        })
    }
    useEffect(() =>{
        //Get the firebase token here
        getToken();
        setupCloudMessaging();
    },[]);
    const showNotification = (notification) =>{
        console.log('The notific::::: => ', notification);
        PushNotification.localNotification({
            vibrate:true, // (optional) default:true
            vibration: 300,
            importance: 'high',
            soundName: 'default',
            channelId:'ecquatorial-channel-id',
            title: notification.title,
            message: notification.body,
        });
    };
    return(
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerShown:false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#e91e63'
            }}
        >
            <Tab.Screen 
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabelStyle:{
                        fontSize:14
                    },
                    tabBarIcon:( {color }) =>(
                        <Icon 
                          name="home"
                          style={{position: 'relative'}}
                          color={color}
                          size={30}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Categories"
                component={MoreCategoriesNovigator}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabelStyle:{
                        fontSize:14,
                        textAlign:'center'
                    },
                    tabBarIcon:({color}) =>(
                        <Icon  
                            name="ellipsis-h"
                            style={{position:'relative'}}
                            color={color}
                            size={30}
                        />
                    )
                }
                }
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabelStyle:{
                        fontSize:14
                    },
                    tabBarIcon:({color}) =>(
                        <View>
                        <Icon 
                          name="shopping-cart"
                          style={{position: 'relative'}}
                          color={color}
                          size={30}
                        />
                        <CartIcon />
                        </View>
                    )
                }}
            />

            {context.stateUser.user.isAdmin === true ? (
            <Tab.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabelStyle:{
                        fontSize:14
                    },
                    tabBarIcon:({color}) =>(
                        <Icon 
                          name="cog"
                          color={color}
                          size={30}
                        />
                    )
                }}
            />
            ) : context.stateUser.user.isBuyer === true ? (
            <Tab.Screen
                name="My Account"
                component={UserNavigator}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabelStyle:{fontSize:14},
                    tabBarIcon:({color}) =>(
                        <Icon
                         name="user"
                         color={color}
                         size={30}
                        />
                    ),
                    headerShown:true,
                    title:'My Account'
                }}
            />
            ): (
            <Tab.Screen
                name="Account"
                component={LoginRegisterNavigator}
                options={{
                    tabBarShowLabel:true,
                    tabBarLabelStyle:{
                        fontSize:14
                    },
                    tabBarIcon:({color}) =>(
                        <Icon 
                          name="user"
                          color={color}
                          size={30}
                        />
                    )
                }}
            />)}
        </Tab.Navigator>
    );
};

export default Main;