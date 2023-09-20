import React from 'react';
import { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Pressable, StyleSheet,Dimensions, Image } from 'react-native';

const {width} = Dimensions.get('window');
const SPACING = 5;
const ITEM_LENGTH = width * 0.5; //Item is a square. Therefore, its height and width are of the same length
const  BORDER_RADIUS = 20;
const CarouselItemSl = (props) =>{
    //console.log('Item::::: ', props);
    const {item, navigation,index} = props
    const data = {item:item};
    const url = `https://ecquatorial.com/public/images/${item.product_img_path}`;
    return (
        <Pressable onPress={() => navigation.navigate('Product Details', {item:data, navigation:navigation})} style={styles.itemContent} key={index}>
            <View style={styles.container1} >
                <Image 
                    style={[styles.image]}
                    resizeMode="contain"
                    source={{uri: url}}
                    />
                <Text style={styles.header} numberOfLines={2}>
                    {item.product_name}
                </Text>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', padding:8, width:ITEM_LENGTH}}>
                    <Text style={styles.body}>R{item.product_price}</Text>
                    {item.Discount ?
                        <Text style={{fontSize:14, color:'red',fontWeight:'bold'}}>R{item.discounted_price}</Text>:
                        null
                    }
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    itemContent:{
        marginHorizontal:SPACING * 3,
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:BORDER_RADIUS + SPACING * 2,
    },
    container1: {
        backgroundColor: 'white',
        borderRadius: 8,
        width:ITEM_LENGTH,
        paddingBottom:40,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation:7
        //paddingTop: 30,
    },
    header: {
        color:'#222',
        fontSize:14,
        fontWeight:'bold',
        paddingLeft:10,
        paddingTop:10
    },
    body:{
        color:'#222',
        fontSize:16,
        fontWeight:'600',
        // paddingLeft:20,
        // paddingRight:20
    },
    image:{
        width:ITEM_LENGTH , //ITEM_WIDTH,
        height:ITEM_LENGTH,
        // ...StyleSheet.absoluteFillObject,
        // marginTop:50,
        // width: screenWidth / 1.4 ,
        // height: screenWidth - 60, //'100%',
         resizeMode: 'cover',
        //position: 'absolute',
    },
});

export default CarouselItemSl;