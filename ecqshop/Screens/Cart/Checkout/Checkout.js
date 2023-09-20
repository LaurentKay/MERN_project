import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import {Picker } from '@react-native-community/picker';
import { Select, CheckIcon, NativeBaseProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import AuthGlobal from '../../../Context/store/AuthGlobal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Encrypt } from '../../../Shared/utils';
import axios from 'axios';
import baseURL from '../../../assets/common/baseUrl';

const countries = require("../../../assets/data/countries.json");


const Checkout = (props) =>{
    const context = useContext(AuthGlobal);

    const [orderItems, setOrderItems] = useState();
    const [address, setAddress] = useState(context.stateUser.userProfile.account_addr_street || '');
    const [address2, setAddress2] = useState(context.stateUser.userProfile.account_addr_street_ext || '');
    const [city, setCity] = useState(context.stateUser.userProfile.account_addr_city || '');
    const [zip, setZip] = useState(context.stateUser.userProfile.account_addr_postal || '');
    const [country, setCountry] = useState(context.stateUser.userProfile.account_addr_state || '');
    const [phone, setPhone] = useState(context.stateUser.userProfile.account_addr_phone || '');
    const [user, setUser] = useState(context.stateUser.userProfile || '');
    const [productsUpdate, setProductUpdate] = useState();
    const [totalPrice, setTotalPrice] = useState();

    const getProducts = () => {
        var products = [];
        props.cartItems.forEach(cart => {
          const productId = Encrypt(cart.product + ',=', 'somethingsecret');
          axios.get(`${baseURL}fe/${productId}`).then(data => {
            console.log('The Products::::::=> ', data.data.product);
            products.push({product:data.data.product, quantity:cart.qty});
            setProductUpdate(products);
            var total = 0;
            products.forEach(p => {
              let price = 0;
              if (p.product.dicsounted_price > 0) {
                price = (total += Number(p.product.dicsounted_price) * Number(p.quantity));
              } else {
                price = (total += Number(p.product.product_price) * Number(p.quantity));
              }
              setTotalPrice(price);
            });
          })
            .catch(e => { console.log(e) });
        });
      }
    useEffect(() =>{
        
        setOrderItems(props.cartItems);

        if(context.stateUser.isAuthenticated){
            setUser(context.stateUser.userProfile);
            getProducts();
            // AsyncStorage.getItem("jwt")
            // .then((res) =>{
                 console.log('The user??????? ===> ', context.stateUser.userProfile.account_addr_street);
            //     axios
            //         .get(`${baseURL}users/${context.stateUser.user.id}`,{
            //             headers:{ Authorization: `Bearer ${res}`},
            //         })
            //         .then((user) =>{
                        //console.log('The profile::::=> ', user);
                        // setUser(context.stateUser.userProfile);
                        // setAddress(context.stateUser.userProfile.account_addr_street);
                        // setAddress2(context.stateUser.userProfile.account_addr_street_ext);
                        // setCity(context.stateUser.userProfile.account_addr_city);
                        // setZip(context.stateUser.userProfile.account_addr_postal);
                        // setCountry(context.stateUser.userProfile.account_addr_state);
                        // setPhone(context.stateUser.userProfile.account_addr_phone);
            //         });
            // })
            // .catch(error => console.log(error));
        }else{
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type:'error',
                text1:'Please log in to checkout',
                text2: ''
            });
        }

        return () =>{
            setOrderItems();
        }
    }, []);

    const checkOut = () =>{
        Object.assign(user, {
            account_addr_street: address,
            account_addr_street_ext: address2,
            account_addr_city: city,
            account_addr_postal: zip,
            account_addr_state: country,
            account_addr_phone: phone
        });
        let order = {
            dateOrdered: Date.now(),
            orderItems,
            status: '3',
            user,
            productsUpdate,
            totalPrice,
        };

        props.navigation.navigate("Payment", {order:order});
    }
    return(
        <NativeBaseProvider>
            <KeyboardAwareScrollView
                viewIsInsideTabBar={true}
                extraHeight={200}
                enableOnAndroid={true}
            >
                <FormContainer title={'Shipping Address'}>
                    <Input 
                        placeholder={"Phone"}
                        name={"phone"}
                        value={phone}
                        keyboardType={"numeric"}
                        onChangeText={(text) =>setPhone(text)}
                    />
                    <Input 
                        placeholder={"Shipping Address 1"}
                        name={"ShippingAddress1"}
                        value={address}
                        onChangeText={(text) =>setAddress(text)}
                    />
                    <Input 
                        placeholder={"Shipping Address 2"}
                        name={"ShippingAddress2"}
                        value={address2}
                        onChangeText={(text) =>setAddress2(text)}
                    />
                    <Input 
                        placeholder={"City"}
                        name={"City"}
                        value={city}
                        onChangeText={(text) =>setCity(text)}
                    />
                    <Input 
                        placeholder={"Zip Code"}
                        name={"zip"}
                        value={zip}
                        keyboardType={"numeric"}
                        onChangeText={(text) =>setZip(text)}
                    />
                    <Select
                        selectedValue={country}
                        minWidth="200"
                        accessibilityLabel="Choose Country"
                        placeholder="Choose Province"
                        _selectedItem={{
                            bg:'teal.600',
                            endIcon:<CheckIcon size="5" />,
                        }}
                        l
                        style={{borderColor:'orange', borderRadius:20}}
                        mt={1}
                        onValueChange={(itemValue) => setCountry(itemValue)}>
                            {countries.map((c,index) => (
                                <Select.Item label={c.name} value={c.code} key={index} />
                            ))}
                    </Select>
                    {/* <Picker
                        selectedValue={country}
                        onValueChange={(itemValue) => setCountry(itemValue)}
                        iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                        style={{width: undefined}}
                        placeholder="Select your country"
                    >
                        {countries.map((c,index) =>(
                        <Picker.Item label={c.name} value={c.code} key={index} />))}
                    </Picker> */}
                    <View style={{width:'80%', alignItems:'center', marginTop:10}} >
                        <Button title="Confirm" onPress={() => checkOut()} />
                    </View>
                </FormContainer>
            </KeyboardAwareScrollView>
        </NativeBaseProvider>
    );
};

const mapStateToProps = state => {
    const {cartItems} = state;
    return{
        cartItems:cartItems,
    };
};
export default connect(mapStateToProps, null)(Checkout);