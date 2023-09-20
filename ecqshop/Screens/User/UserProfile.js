import React, { useContext, useState, useCallback, useEffect} from 'react';
import {Button, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Container, NativeBaseProvider } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';
import OrderCart from '../../Shared/OrderCart';

const UserProfile = (props) =>{
    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState();
    const [orders, setOrders] = useState();

    useFocusEffect(

        useCallback(() =>{
        if(context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null ){
                props.navigation.navigate("Login");
            }

        AsyncStorage.getItem("jwt")
        .then((res) =>{
            console.log('The user??????? ===> ', context);
            axios
                .get(`${baseURL}users/${context.stateUser.user.id}`,{
                    headers:{ Authorization: `Bearer ${res}`},
                })
                .then((user) =>{
                    //console.log('The profile::::=> ', user);
                    setUserProfile(user.data)
                });
        })
        .catch(error => console.log(error));

        AsyncStorage.getItem("jwt")
        .then((res) =>{
            axios
            .get(`${baseURL}orders/mine`,{
                headers:{
                    Authorization: `Bearer ${res}`,
                },
            })
            .then((x) =>{
                console.log('The profile Other::::=> ', x.data);
                const data = x.data.orders;
                const userOrders = data.filter(
                    (order) => order.account_id === context.stateUser.user.id
                );
                setOrders(userOrders);
            })
            .catch((error) => console.log(error));
        })
        .catch(error => console.log(error));

        return () =>{
            setUserProfile();
            setOrders();
        }
    },[context.stateUser.isAuthenticated]));
    return(
        <NativeBaseProvider>
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{fontSize:30}}>
                    {userProfile ? userProfile.account_firstname : ""}
                </Text>
                <View style={{marginTop: 20}}>
                    <Text style={{margin: 10}}>
                        Email: {userProfile ? userProfile.account_email : ""}
                    </Text>
                    <Text style={{margin: 10}}>
                        Phone: {userProfile ? userProfile.account_addr_phone : ""}
                    </Text>
                </View>
                <View style={{marginTop:80,width:200}}>
                    <Button style={{color:'white'}} title={"Sign Out"} onPress={() =>[
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]} />
                </View>
                <View style={styles.order}>
                    <Text style={{fontSize:20}}>My Orders</Text>
                    <View>
                        {orders ? (
                            orders.map((x,index) =>{
                                let ord = {};
                                Object.assign(ord, userProfile, x );
                                return <OrderCart key={index} {...ord} />
                            })
                        ):(
                            <View style={styles.order}>
                                <Text>You have no Orders</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
    },
    subContainer:{
        alignItems:"center",
        marginTop: 60
    },
    order:{
        marginTop:20,
        alignItems:'center',
        marginBottom:60,
    }
})
export default UserProfile;