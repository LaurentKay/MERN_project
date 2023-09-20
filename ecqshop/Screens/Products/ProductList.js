import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import ProductCard from './ProductCard';

var {width} = Dimensions.get('window');

const ProductList = (props) =>{

    const {item} = props;
    //console.log('=> ', item);
    return(
        <View style={{flex:1,margin:2}}>
        <TouchableOpacity style={{width: '50%'}}
            onPress={() => props.navigation.navigate("Product Details", {item: item})}
        >
            <View style={{width: width / 2, backgroundColor: 'gainsboro'}}
            >
                <ProductCard {...item.item} key={item.item.product_Id} />
                {/*item.map(p => <ProductCard {...p} key={p.product_Id} />)*/}
            </View>
        </TouchableOpacity>
        </View>
    )
}
export default ProductList