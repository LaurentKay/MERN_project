import React, { useCallback, useState } from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import { VStack, Input, NativeBaseProvider, Container  } from 'native-base';
//import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem from './ListItem';
import EcqButton from '../../Shared/STyledComponents/EcqButton';

var { height, width } = Dimensions.get('window');

const ListHeader = () =>{
    return(
        <View
           elevation={1}
           style={styles.listHeader} >
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'600'}}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'600'}}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'600'}}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{fontWeight:'600'}}>Price</Text>
            </View>
        </View>
    )
}
const Products = (props) =>{
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () =>{
                //Get token
                AsyncStorage.getItem('jwt')
                    .then(res =>{
                        setToken(res)
                    })
                    .catch((error) => console.log(error));
                
                axios
                .get(`${baseURL}admin`)
                .then((res) =>{
                    console.log('Any ret???::::: => ', res.data.rows);
                    setProductList(res.data.rows);
                    setProductFilter(res.data.rows);
                    setLoading(false);
                });

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                };
            },[],
        )
    )
    const searchProduct = (text) =>{
        if(text == ""){
            setProductFilter(productList);
        }
        setProductFilter(
            productList.filter((i) =>
               i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }
    const deleteProduct = (id) =>{
        axios
            .delete(`${baseURL}products/${id}`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id);
                setProductFilter(products);
            })
            .catch((error) => console.log(error));
    }
    return(
        <NativeBaseProvider>
        <View style={styles.conatainer}>
            <View style={styles.buttonContainer}>
                <EcqButton
                    secondary
                    medium
                    onPress={() =>props.navigation.navigate("Orders")}
                >
                    <Icon name="shopping-bag" size={18} color="white"/>
                    <Text style={styles.buttonText}>Orders</Text>
                </EcqButton>
                <EcqButton
                    secondary
                    medium
                    onPress={() =>props.navigation.navigate("ProductForm")}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Products</Text>
                </EcqButton>
                <EcqButton
                    secondary
                    medium
                    onPress={() =>props.navigation.navigate("Categories")}
                >
                    <Icon name="plus" size={18} color="white"/>
                    <Text style={styles.buttonText}>Categories</Text>
                </EcqButton>
            </View>
            <View>
                <Input
                        placeholder="Search"
                        width="100%"
                        borderRadius="20"
                        //onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                        InputLeftElement={
                            <Icon
                                ml="2"
                                size={5}
                                color="black"
                                //as={<Ionicons name="ios-search" />}
                            />
                        }
                        // InputRightElement={
                        //     focus ? (
                        //     <Icon
                        //       ml="2"
                        //       size={5}
                        //       color="black"
                        //       onPress={onBlur}
                        //       as={<Ionicons name="ios-close" />}
                        //     />
                        //     ) : null
                        //   }
                />
            </View>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large"  color="red" />
                </View>
            ): (
                <FlatList
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({item, index}) =>(
                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            delete={deleteProduct}
                        />
                    )}
                    keyExtractor={(item) =>item.id}
                />
            )}
        </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    listHeader:{
        flexDirection:'row',
        padding:5,
        backgroundColor:'gainsboro',
    },
    headerItem:{
        margin: 3,
        width: width / 6,
    },
    spinner:{
        height: height / 2,
        alignItems:'center',
        justifyContent: 'center'
    },
    conatainer:{
        marginBottom:160,
        backgroundColor:'white',
    },
    buttonContainer:{
        margin:20,
        alignSelf:'center',
        flexDirection:'row',
    },
    buttonText:{
        marginLeft:4,
        color:'white',
    },
});
export default Products;