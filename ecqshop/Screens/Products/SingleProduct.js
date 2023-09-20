import React, { useEffect, useState } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Box, Heading, Right, NativeBaseProvider } from 'native-base';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import EcqButton from '../../Shared/STyledComponents/EcqButton';
import TrafficLight from '../../Shared/STyledComponents/TrafficLight';
import { Encrypt } from '../../Shared/utils';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import CustomeCarousel from '../../Shared/CustomeCarousel';

const SingleProduct = (props) =>{
    const [item, setItem] = useState({});
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("");
    const [simProd, setSimProd] = useState([]);
    const [productId, setProductId] = useState();
    console.log('Item', item);
    //const productId = Encrypt(item.product_Id+',=','somethingsecret');
    useEffect(() =>{
        console.warn('useEffect????::::: SingleProduct ');
        //const productId = Encrypt(item.product_Id+',=','somethingsecret');
        if(props.route.params.item.item){
            setItem(props.route.params.item.item);
            setProductId(Encrypt(item.product_Id+',=','somethingsecret'));
        }
        if(props.route.params.item.product_quantity == 0){
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unavailable");
        }else if(props.route.params.item.product_quantity <= 5){
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock");
        }else{
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available");
        }
        //Fetch similar products
        const fetchSimilar = async () =>{
            axios.get(`${baseURL}fe/${productId}`)
            .then((res) =>{
                console.log('Similar Prod:::: ', res.data.simProd);
                setSimProd(res.data.simProd);
            })
            .catch((error) => console.log('Api call error  ', error));
        }
        fetchSimilar();
        return () =>{
            setAvailability(null);
            setAvailabilityText("");
            setSimProd([]);
        }
    }, [productId, item, props.route.params.item.item]);
    const url = `https://ecquatorial.com/public/images/${item.product_img_path}`;
     return(
         <NativeBaseProvider>
         <View style={styles.container}>
            {/*<Heading style={{ alignSelf: 'center' }}>Product Details</Heading>*/}
             <ScrollView style={{marginBottom: 80, padding:5}}>
                 <View style={styles.imageContainer}>
                     <Image style={styles.image}
                        source={{uri: url}}
                        resizeMode="contain"
                    />
                 </View>
                 <View style={styles.contentContainer}>
                     <Text style={styles.contentHeader}>{item.product_name}</Text>
                     <Text style={styles.contentText}>{item.brand}</Text>
                 </View>
                 <View style={styles.availabilityContainer}>
                     <View style={styles.availability}>
                         <Text style={{marginRight:10}}>
                            Availability: { availabilityText}
                         </Text>
                         {availability}
                    </View>
                    <Text>{item.product_desc}</Text>
                 </View>
                 {simProd.length > 0 ?
                 <View>
                     <Text style={{fontSize:18, fontWeight:'900',marginBottom:8, marginLeft:5}}>Similar Products:</Text>
                     <CustomeCarousel data={simProd} navigation={props.navigation} />
                     {/*simProd.map((p, index) =>(
                         <View key={index}>
                             <Text>{p.product_name}</Text>
                         </View>
                     ))*/}
                 </View>:null
                 }
             </ScrollView>
             <View style={styles.bottomContainer}>
                 <Box>
                     <Text style={styles.price}>R{item.product_price}</Text>
                 </Box>
                 {item.discounted_price > 0 ?
                 <Box>
                     <Text style={styles.specialPrice}>R{item.discounted_price}</Text>
                 </Box>:null
                 }
                 <Box>
                     <EcqButton primary medium onPress={() =>{props.addItemToCart({product:item.product_Id, name:item.product_name, price:item.discounted_price > 0 ? item.discounted_price : item.product_price}),
                            Toast.show({
                                topOffset:60,
                                type: "success",
                                text1: `${item.product_name} added to Cart`,
                                text2: "Go to your cart to compote order"
                            })}} >
                                <Text style={{color:'white'}}>Add</Text>
                    </EcqButton>
                 </Box>
             </View>
         </View>
         </NativeBaseProvider>
     );
};

const mapDispatchToProps = dispatch =>{
    return {
        addItemToCart: ({product, name, price}) =>
            dispatch(actions.addToCart({qty: 1, product, name, price}))
    }
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative',
        height:'100%',
        width:'100%'
    },
    imageContainer:{
        backgroundColor:'white',
        padding:0,
        margin:0,
    },
    image:{
        width: '100%',
        height: 250,
    },
    contentContainer:{
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
    },
    contentHeader:{
        fontWeight:'bold',
        marginBottom:20,
    },
    contentText:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:20
    },
    bottomContainer:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        left:0,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        width:'100%'
    },
    price:{
        fontSize:16,
        margin:20,
        color:'black',
        fontWeight:'bold',
    },
    specialPrice:{
        fontSize:18,
        margin:20,
        fontWeight:'bold',
        color:'red',
    },
    availabilityContainer:{
        marginBottom:20,
        alignItems:'center'
    },
    availability:{
        flexDirection:'row',
        marginBottom:10,
    },
});

export default connect(null, mapDispatchToProps)(SingleProduct);