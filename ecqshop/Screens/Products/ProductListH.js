import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import ProductCardH from './ProductCardH';

var {width} = Dimensions.get('window');

const ProductListH = (props) =>{

    const {item} = props;
    console.log('ProductListH=> ', item);
    return(
        <TouchableOpacity style={{width: width, backgroundColor:'white'}}
            onPress={() => props.navigation.navigate("Product Details", {item: {item:item}})}
        >
            <View style={{width: width, backgroundColor: 'gainsboro'}}
            >
                <ProductCardH {...item} key={item.product_Id} />
            </View>
        </TouchableOpacity>
    )
}
export default ProductListH