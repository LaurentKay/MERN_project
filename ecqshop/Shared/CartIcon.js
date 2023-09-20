import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Text, NativeBaseProvider } from 'native-base';

import {connect} from 'react-redux';

const CartIcon = (props) =>{
    return(
    <>
    {props.cartItems.length ? (
        <NativeBaseProvider style={styles.containet}>
        <Badge style={styles.badge}>
            <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
        </NativeBaseProvider>
    ):null}
    </>
    );
};

const mapStateToProps = state =>{
    const {cartItems} = state;
    return {cartItems : cartItems}
};

const styles = StyleSheet.create({
    containet:{
        top:-40,
        zIndex:1000,
        backgroundColor:'black',
    },
    badge:{
        width:25,
        position:'absolute',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        top:-30,
        right:-10,
        backgroundColor:'red',
        borderRadius:50
    },
    text:{
        fontSize:12,
        width:100,
        fontWeight:'bold',
        top:-2,
        right:-45,
    }
})
export default connect(mapStateToProps, null)(CartIcon);