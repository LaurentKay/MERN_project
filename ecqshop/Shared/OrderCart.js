import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrafficLight from './STyledComponents/TrafficLight';
import EcqButton from './STyledComponents/EcqButton';
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';

const codes = [
    {name: 'pending', code:'3'},
    {name: 'shipped', code:'2'},
    {name: 'delivered', code:'1'}
]
const OrderCart = (props) =>{
    console.log('What is in it Now::???::::: ', props);
    const [orderStatus, setOrderStatus] = useState();
    const [statusText, setStatusText] = useState();
    const [statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();

    useEffect(() =>{
        if(props.editMode){
            AsyncStorage.getItem('jwt')
            .then((res) =>{
                setToken(res);
            })
            .catch((error) =>console.log(error));
        }
        
        if(!props.DelStatus){ // === "DelStatus"
            setOrderStatus(<TrafficLight unavailable></TrafficLight>);
            setStatusText("pending");
            setCardColor('#E74C3C');
        }else if(props.DelStatus == "Shipped"){
            setOrderStatus(<TrafficLight limited></TrafficLight>);
            setStatusText("shipped");
            setCardColor('#F1C40F');
        }else{
            setOrderStatus(<TrafficLight available></TrafficLight>);
            setStatusText("delivered");
            setCardColor('#2ECC71');
        }

        return () =>{
            setOrderStatus();
            setStatusText();
            setCardColor();
        }
    },[]);

    const updateOrder = () =>{
        const config = {
            headers:{
                Authorization: `Beared ${token}`
            },
        }
        const order = {
            city:props.account_addr_city,
            country: props.account_addr_country,
            dateOrdered: props.created_dt,
            id: props.account_id,
            orderIitems:props.orderIitems,
            phone: props.account_addr_phone,
            shippingAddress1: props.shippingAddress1,
            shippingAddress2: props.shippingAddress2,
            status: statusChange,
            totalPrice: props.order_total_price,
            user: props.user,
            zip: props.zip
        }
        axios
        .put(`${baseURL}orders/${props.id}`, order, config)
        .then((res) =>{
            if(res.status == 200 || res.status == 201){
                Toast.show({
                    topOffset: 60,
                    type: 'success',
                    text1: 'Order Updated',
                    text2: '',
                });
                setTimeout(() =>{
                    props.navigation.navigate("Products");
                }, 500);
            }
        })
        .catch((error) =>{
            Toast.show({
                topOffset: 60,
                type: 'error',
                text1: 'Something went wrong',
                text2: 'Please try again',
            });
        })    
    }
    return(
        <View style={[{backgroundColor: cardColor}, styles.container]}>
            <View style={styles.title}>
                <Text>Order Number: #{props.order_number}</Text>
            </View>
            <View style={{margin:10}}>
                <Text>Status: {statusChange} { orderStatus}</Text>
                <Text>Address: {props.account_addr_street} {props.account_addr_street_ext}</Text>
                <Text>City: {props.account_addr_city}</Text>
                <Text>Country: {props.account_addr_country}</Text>
                <Text>Date Ordered: {props.created_dt.split("T")[0]}</Text>
                <View style={styles.priceContainer}>
                    <Text>Price: </Text>
                    <Text style={styles.price}>R {props.order_total_price}</Text>
                </View>
                {props.editMode ? (
                <View>
                    <Picker
                        iosIcon={<Icon color={'#007aff'} name='arrow-down' />}
                        style={{width:undefined}}
                        selectedValue={statusChange}
                        placeholder="Change Status"
                        itemStyle={{color:'#007aff'}}
                        onValueChange={(e) => setStatusChange(e)}
                    >
                    {codes.map((c) => {
                        return <Picker.Item key={c.code} label={c.name} value={c.code} />
                    })} 
                    </Picker>
                    <EcqButton
                    secondary
                    lager
                    onPress={() => updateOrder()}
                    >
                        <Text style={{color:'white'}}>Update</Text>
                    </EcqButton>
                </View>
                ):null}
               
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        padding:20,
        margin:10,
        borderRadius:10,
    },
    title:{
        backgroundColor:'#62B1F6',
        padding:5,
    },
    priceContainer:{
        marginTop:10,
        alignSelf:'flex-end',
        flexDirection:'row',
    },
    price:{
        color:'white',
        fontWeight:'bold',
    }
})
export default OrderCart