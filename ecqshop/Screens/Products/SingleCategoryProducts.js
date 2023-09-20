import axios from 'axios';
import { Container, NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { colors } from 'react-native-elements';
import baseURL from '../../assets/common/baseUrl';
import { Encrypt } from '../../Shared/utils';
import ProductList from './ProductList';
var width = Dimensions.get('window');
const SingleCategoryProducts = (props) =>{
    const [products, setProducts] = useState([]);
    const [subCat, setSubCat] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        const depId = props.route.params.depId; 
        const fetchProductsPerCat = async () =>{
            axios.get(`${baseURL}fe/perCat/${depId}`)
            .then((res) =>{
                console.log('SinglePerCat => ', res.data);
                setProducts(res.data.products);
                setSubCat(res.data.sub);
                setLoading(false);
            })
            .catch(error => {console.log('SinglePerCat => ', error), setLoading(false);});
        }
        fetchProductsPerCat();
        return () =>{
            setProducts([]);
            setSubCat([]);
        }
    },[]);
    const handleCat = (id, title) =>{
        props.navigation.navigate('SingleSubCategoryProducts', {catId:id, title });
    }
    return (
        <>
        {loading == false ? (
        <ScrollView>
         {subCat.length > 0 ?
           <>
            <View>
                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={(item,index) =>(
                        <ProductList
                            navigation={props.navigation}
                            key={index}
                            item={item}
                        />
                    )}
                />
            </View>
            <View style={{paddingHorizontal:20, paddingBottom:10,paddingTop:10,backgroundColor:'white'}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>More Categories</Text>
            </View>
            </>
           :
           <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:10}}>
               <Text style={{fontSize:18}}>No product in this category</Text>
           </View>
           }
            <View>
                {subCat.map(sb =>(
                    <TouchableOpacity key={sb.cat_id} onPress={() => handleCat(Encrypt(`catId=${sb.cat_id}`, "rks8kc1cu0k14e6lbbvjk5sap7"), sb.cat_description)}>
                        <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:10}}>
                            <Text style={{fontSize:16}}>{sb.cat_description}</Text>
                        </View>
                        <View style={{height:1, backgroundColor:colors.grey0, marginLeft:5, marginRight:5}} />
                    </TouchableOpacity>
                ))}
            </View> 
        </ScrollView>
        ):(
            //Loading
            <NativeBaseProvider>
            <Container style={[styles.center, {backgroundColor:"#f2f2f2"}]}>
                <ActivityIndicator size="large" color="red" />
            </Container>
            </NativeBaseProvider>
        )}
        </>
    );
};
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
export default SingleCategoryProducts;