import React from 'react';
import Toast from 'react-native-toast-message';
import {StyleSheet, View, Dimensions, Image, Text, Button} from 'react-native';

import {connect} from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import EcqButton from '../../Shared/STyledComponents/EcqButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

var {width} = Dimensions.get('window');

const ProductCard = (props) =>{
    console.log('What: ', props);
    const {  product_img_path, product_quantity:countInStock, product_name, product_price, discounted_price} = props;
    const url = `https://ecquatorial.com/public/images/${product_img_path}`;
    //console.log('What: ', url);
    return(
        <View style={styles.container}>
            <Image 
                style={styles.image}
                //style={{width: 40, height: 20}}
                resizeMode="contain"
                source={{uri: url}}
                />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {product_name.length > 30 ? product_name.substring(0, 30 -3) + '...' : product_name}
            </Text>
            <Text style={styles.price}>R{product_price}</Text>
            {discounted_price > 0 ?
            <Text style={styles.priceSpecial}>R{discounted_price}</Text>:
            null
            }
            {Number(countInStock) > 0 ? (
                <View style={{marginBottom: 60}}>
                    <EcqButton 
                    primary
                    medium
                    onPress={() => [props.addItemToCart({product:props.product_Id, name:product_name, price: discounted_price > 0 ? discounted_price : product_price}),
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${product_name} added to Cart`,
                            text2: "Go to your cart to complete order"
                        })]} 
                    >
                        <FontAwesome5Icon name="shopping-cart" size={20} color="white" />
                        <Text style={{color:'white',paddingLeft:8}}>Add</Text>
                    </EcqButton>
                </View>
            ):<Text style={{marginTop:20}}>Currently Unavailable</Text>}
        </View>
    );
};

const mapDispatchToProps = dispatch =>{
    return {
        addItemToCart: ({product, name, price}) => dispatch(actions.addToCart({qty: 1, product, name, price})),
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width: width / 2 - 30,
        height: width / 1.5,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: 100,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 2,
    },
    card:{
        marginBottom: 10,
        height: width / 2 - 20 - 100,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title:{
        fontWeight: 'bold',
        fontSize: 14,
        textAlign:'center',
    },
    price:{
        fontSize: 14,
        color: 'black',
        marginTop: 10,
        fontWeight:'bold'
    },
    priceSpecial:{
        fontSize:16,
        color:'orange',
        marginTop:10,
        fontWeight:'bold',
    }
})
export default connect(null, mapDispatchToProps)(ProductCard);