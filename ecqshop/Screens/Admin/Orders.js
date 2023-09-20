import React, {useCallback, useState} from 'react';
import {View, FlatList, Text } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import {useFocusEffect } from '@react-navigation/native';
import OrderCart from '../../Shared/OrderCart';

const Orders = (props) =>{

    const [orderList, setOrderList] = useState();

    useFocusEffect(
        useCallback(
            () =>{
                getOrders();
                return () => {
                    setOrderList();
                }
            },[],
        )
    )
    const getOrders = () =>{
        axios
            .get(`${baseURL}orders/allorders`)
            .then((x) =>{
                console.log('Orders===> ', x.data);
                setOrderList(x.data);
            })
            .catch((error) => console.log(error));
    }
    return(
        <View>
            <FlatList
                data={orderList}
                renderItem={({item}) =>(
                    <OrderCart navigation={props.navigation} {...item} editMode={true} />
                )}
                keyExtractor={(item) =>item.id}
            />
        </View>
    )
}

export default Orders;