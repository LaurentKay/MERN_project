import React, { useState } from 'react';
import {StyleSheet} from 'react-native';
import {Text, Box, ListItem, Avatar } from 'native-base';

const CartItem = (props) =>{
    const data = props.item.item.product;
    const [quantity, setQuantity] = useState(props.item.item.quantity);

    return(<></>);
};

rex