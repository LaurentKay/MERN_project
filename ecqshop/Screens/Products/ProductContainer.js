import React, {useState, useCallback}  from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import deepDiffer from 'react-native/Libraries/Utilities/differ/deepDiffer';
import { VStack, Icon,Input, Text, NativeBaseProvider, Container } from 'native-base';
//import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ProductList from './ProductList';
import SearchedProduct from './SearchedProducts';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import CustomSlider from '../../Shared/CustomerSlider';
import CustomeCarousel from '../../Shared/CustomeCarousel';
//import data from '../../Shared/data';
//const data = require('../../assets/data/products.json');
//const productsCategories = require('../../assets/data/categories.json');

var { width, height } = Dimensions.get('window');
const ProductContainer = (props) =>{
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect((
        useCallback(
            () => {
                // setFocus(false);
                // setActive({
                //     "_id": "all",
                //     "name": "All"
                //   });
                //setActive(productsCategories[0]);
                // Products call
                axios
                    .get(`${baseURL}fe/home`)
                    .then((res) => {
                        console.log('The url:::: ', res.data[0][0]);
                        setProducts(res.data);
                        setProductsFiltered(res.data);
                        setInitialState(res.data);
                        setProductsCtg(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log('Api call error', error, baseURL);
                        setLoading(false);
                    });
                // Categories
                axios
                    .get(`${baseURL}fe/categories`)
                    .then((res) =>{
                        const data = [{
                            "department_id": "all",
                            "product_department": "All"
                          }, ...res.data];
                        setCategories(data);
                        setActive(data[0]);
                    })
                    .catch((error) => {
                        console.log('Api call error', error);
                    });
                return () =>{
                    setProducts([]);
                    setProductsFiltered([]); 
                    setFocus();
                    setCategories([]);
                    setActive();
                    setInitialState([]);
                }
            },[],
        )
    ));
    const searchProduct = (text) =>{
        setProductsFiltered(
            products.map((i) => i.filter(p => p.product_name.toLowerCase().includes(text.toLowerCase())))
        );
    }
    const openList = () =>{
        props.navigation.navigate("Search Screen");
        //setFocus(true);
    }
    const onBlur = () =>{
        setFocus(false);
    }
    //Categories ctg === 'all' i.category._id === ctg
    const changeCtg = (ctg) =>{
        {
            //console.log(ctg, ctg === categories[0]._id);
            ctg === categories[0].department_id ?
            [setProductsCtg(initialState), setActive(categories[0])] :
            [setProductsCtg(products.map((i) => i.filter(p => p.department_id === ctg))), setActive(categories.find((c) => c.department_id === ctg))];
        }
    }
    return(
        <>
        {loading == false ? (
        <NativeBaseProvider>
        <VStack space={1}>
                <Input
                    placeholder="Search"
                    width="100%"
                    borderRadius="20"
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                    InputLeftElement={
                        <Icon
                            ml="2"
                            size="5"
                            color="gray.500"
                            //as={<Ionicons name="ios-search" />}
                        />
                    }
                    InputRightElement={
                        focus ? (
                        <Icon
                          ml="2"
                          size="5"
                          color="gray.500"
                          onPress={onBlur}
                         // as={<Ionicons name="ios-close" />}
                        />
                        ) : null
                      }
                />
                {focus == true ? (
                    <SearchedProduct 
                        navigation={props.navigation}
                        productsFiltered={productsFiltered}
                    />
                ) : 
                    (
                    <ScrollView>
                    <View>
                        <View>
                            <Banner />
                        </View>
                        {/* <View>
                            <CategoryFilter 
                                categories={categories}
                                categoryFilter={changeCtg} 
                                productsCtg ={productsCtg}
                                active = {active}
                                setActive={setActive}
                            />
                        </View> */}
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[0]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[1]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[2]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[3]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[4]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[5]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[6]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[7]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[8]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[9]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[10]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[11]} navigation={props.navigation} />
                        </View>
                        <View style={styles.carouContainer}>
                            <CustomeCarousel data={productsCtg[12]} navigation={props.navigation} />
                        </View>
                        {/*productsCtg.length > 0 ? (
                            <View style={styles.listContainer}>
                                {productsCtg.map((item, index) =>{
                                    return(
                                        <ProductList
                                            navigation={props.navigation}
                                           key={index}
                                           item={item}
                                        />
                                    );
                                })}
                            </View>
                        ):(
                            <View style={[styles.center, { height: height / 2}, {color:'black'}]}>
                                <Text>No products found!</Text>
                            </View>
                        )*/}
                        
                    </View>
                    </ScrollView>
                )}
            
        </VStack>
        </NativeBaseProvider>
        ):(
            //Loading
            <NativeBaseProvider>
            <Container style={[styles.center, {backgroundColor:"#f2f2f2"}]}>
                <ActivityIndicator size="large" color="red" />
            </Container>
            </NativeBaseProvider>
        )}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      flexWrap: "wrap",
      backgroundColor: "gainsboro",
    },
    listContainer: {
        height: ( width / 1.7 ) * 113,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        overflow:'scroll',
      },
    center: {
        //height: height / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    carouContainer:{
        backgroundColor:'#fff',
        //alignItems:'center',
        //justifyContent:'center',
        //padding:50,
        marginBottom:20
    }
  });
export default ProductContainer