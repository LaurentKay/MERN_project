import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button, Modal } from 'react-native';
import {Text, Box, Avatar, FlatList, NativeBaseProvider, Pressable, HStack, VStack} from 'native-base';
import { connect } from 'react-redux';
import {PayFastWebView} from '../PayFast/index';
import * as Actions from '../../../Redux/Actions/cartActions';
import { fontWeight } from 'styled-system';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');
const Confirm = (props) =>{
    const [success, setSuccess] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [paymentData, setPaymentData] = useState({});
    const finalOrder = props.route.params;

    //const confirmO = props.route.params;
    const Item = ({item}) => {
        console.log("Confirm=>", item.product.product_img_path);
        //const { item } = props;0619484743
        return (
            <Box>
            <Pressable onPress={() => {}}>
                <Box  pr="1" py="1">
                    <HStack alignItems="center" space={4} p={2}>
                        <Avatar size="md" source={{uri: `https://ecquatorial.com/public/images/${item.product.product_img_path}` }} />
                        <VStack>
                            <Text color="coolGray.800" _dark={{color: 'warmGray.50'}} style={{fontSize:12}} numberOfLines={3} bold>
                                {item.product.product_name.length > 30 ? item.product.product_name.substring(0, 30 - 3) + '...' : item.product.product_name}
                            </Text>
                        </VStack>
                        <VStack>
                            <Text color="coolGray.600" _dark={{color:'warmGray.200'}}>
                            R {item.product.dicsounted_price > 0 ? item.product.dicsounted_price : item.product.product_price} x { item.quantity}
                            </Text>
                        </VStack>
                    </HStack>  
                </Box>
            </Pressable>
            </Box>
        );
    };
    const getProductIDs = (ordItems) =>{
        var ids = "";
        var comma = "";
        for(var i = 0; i < ordItems.length; i++){
          ids += comma + ordItems[i].product;
          comma = ",";
        }
        return ids;
      }
    const confirmOrder = () =>{
        console.log('The Order:::: ', finalOrder.order);
        let {
            dateOrdered,
            orderItems,
            productsUpdate,
            totalPrice,
            deliveryOption,
            delAmount,
            paymentMethod,
            ordernumber
        } = finalOrder.order;

        let order = {
            dateOrdered,
            orderItems,
            productsUpdate,
            totalPrice,
            deliveryOption,
            delAmount,
            paymentMethod,
            ordernumber
        };
        order.totalPrice = order.totalPrice + order.delAmount;
        const shippingAddr = {name:finalOrder.order.user.account_addr_name, company:finalOrder.order.user.account_addr_company, 
            street:finalOrder.order.user.account_addr_street, suit:finalOrder.order.user.account_addr_street_ext, 
            city:finalOrder.order.user.account_addr_city, province:finalOrder.order.user.account_addr_state,
            country:finalOrder.order.user.account_addr_country, postal:finalOrder.order.user.account_addr_postal,
            phone:finalOrder.order.user.account_addr_phone};
        order.shippingAddr = shippingAddr;
        Object.assign(order, {...finalOrder.order.user});//.order.order;
        console.log('Object to Send:::: ', order);
        //return;
        //PayFast parameters
        const payFastData = {
            merchant_id : '14858998',
            merchant_key : 'cwu6enhuiope3',
            //return_url : 'http://www.yourdomain.co.za/return.php',
            //cancel_url : 'http://www.yourdomain.co.za/cancel.php',
            notify_url : 'https://api.ecquatorial.com/api/v1/orders/payfast',
            // Buyer details
            name_first : finalOrder.order.user.account_firstname,
            name_last  : finalOrder.order.user.account_lastname,
            email_address: finalOrder.order.user.account_email,
            cell_number: finalOrder.order.user.account_addr_phone,
            // Transaction details
            amount : (finalOrder.order.totalPrice + finalOrder.order.delAmount).toFixed(2),
            item_name : `Equatorial Order ${finalOrder.order.ordernumber}`,
            payment_method: `${finalOrder.order.paymentMethod}`,
            custom_int1: `${finalOrder.order.deliveryOption}`,
            custom_int2: finalOrder.order.user.account_id,
            custom_str1 : getProductIDs(finalOrder.order.orderItems),
        };

        console.log('The PayFast Object:::: ', payFastData);
        AsyncStorage.getItem("jwt")
        .then((res) =>{
            axios
                .post(`${baseURL}orders`, order, {
                    headers:{
                        Authorization: `Bearer ${res}`,
                    },
                })
                .then((res) =>{
                    if(res.status == 200 || res.status == 201){
                        Toast.show({
                            topOffset: 60,
                            type: 'success',
                            text1: 'Ecquatorial',
                            text2: 'Order Completed',
                        });
                        setTimeout(() =>{
                            props.clearCart();
                            // props.navigation.navigate("Cart");
                            setPaymentData(payFastData);
                            setModalVisible(true);
                        }, 500);
                    }
                })
                .catch((error) =>{
                    console.log('Order Create => ', error);
                    Toast.show({
                        topOffset: 60,
                        type: 'error',
                        text1: 'Something went wrong',
                        text2: 'Please try again',
                    });
                });
        }) 
        .catch((error) =>{
            Toast.show({
                topOffset:60,
                type:'error',
                text1: 'Ecquatorial',
                text2:'Could not retrieve the token, Please login to continue'
            });
        });
    }
    console.log('Confirm arr:: ', finalOrder);
    return(
        <NativeBaseProvider>
        <ScrollView style={{flex:1,padding:4}}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Confirm Order</Text>
            </View>
            {finalOrder ? 
                <>
             <View style={{borderWidth:1, borderColor:'orange',  width: width /1.05}}>
                 <Text style={styles.title}>Shipping To:</Text>
                 <View style={{padding:8}}>
                     <Text>Address: {finalOrder.order.user.account_addr_street}</Text>
                     <Text>Address 2: {finalOrder.order.user.accoun_addr_street_ext}</Text>
                     <Text>City: {finalOrder.order.user.account_addr_city}</Text>
                     <Text>Province: {finalOrder.order.user.account_addr_state}</Text>
                     <Text>Zip Code: {finalOrder.order.user.account_addr_postal}</Text>
                 </View>
                 <Text style={styles.title}>Items:</Text>
                 <FlatList
                    keyExtractor={item =>item.product_Id}
                    data={finalOrder.order.productsUpdate}
                    renderItem={item => Item(item)}
                 />
             </View>
             <View style={{borderWidth:1, borderColor:'orange', width: width /1.05,marginTop:5}}>
                 <Text style={styles.title}>Summary:</Text>
                 <View style={{flexDirection:'row',padding:8}}>
                     <Text>Delivery Cost: </Text>
                     <Text>R {finalOrder.order.delAmount}</Text>
                 </View>
                 <View style={{flexDirection:'row',padding:8}}>
                     <Text>Price: </Text>
                     <Text>R {finalOrder.order.totalPrice.toFixed(2)}</Text>
                 </View>
                 <View style={{flexDirection:'row',padding:8}}>
                     <Text style={{fontSize:20,fontWeight:'bold'}}>Total Price: </Text>
                     <Text style={{fontSize:20,fontWeight:'bold'}}>R {(finalOrder.order.totalPrice + finalOrder.order.delAmount).toFixed(2)}</Text>
                 </View>
             </View>
             <View style={{alignItems:'center', margin:20}}>
                 <Button title={'Place order'} onPress={confirmOrder} />
             </View>
             </>
             :null
             }
        </ScrollView>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}
        >
            <PayFastWebView sandbox={false} onClick={() => setModalVisible(false)} callback={setSuccess} passphrase={'Ecquatorial1'} signature={false} data={paymentData} />
        </Modal>
        {/* <Modal
            animationType="slide"
            transparent={true}
            visible={success}
            onRequestClose={() => {
            setModalVisible2(!success);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Congratulation! Your payment has been received. Continue shopping</Text>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible2(!success)}
                        >
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal> */}
        </NativeBaseProvider>
    );
};

const mapDispatchToProps = dispatch =>{
    return{
        clearCart: () => dispatch(Actions.clearCart()),
    }
}
const styles=StyleSheet.create({
    container:{
        paddingTop:200,
        //flex:1,
        //position:'absolute',
        top:0,
        height:height,
        padding:4,
        justifyContent:'center',
        alignItems:'center',
        bottom:100,
       // alignContent:'center',
        backgroundColor:'white',
    },
    titleContainer:{
        justifyContent:'center',
        alignItems:'center',
        margin:8,
    },
    title:{
        alignSelf:'center',
        margin: 8,
        fontSize:16,
        fontWeight:'bold',
    },
    listItem:{
        alignItems:'center',
        backgroundColor:'white',
        justifyContent:'center',
        width: width / 1.2,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
})
export default connect(null, mapDispatchToProps)(Confirm);