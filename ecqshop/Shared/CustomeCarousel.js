import React from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, View, Pressable} from 'react-native';
import { ITEM_WIDTH } from './CarouselItem';
import CarouselItemSl from './CarouselItemSl';

const {width} = Dimensions.get('window');
const SPACING = 5;
const ITEM_LENGTH = width * 0.5; //Item is a square. Therefore, its height and width are of the same length
const  BORDER_RADIUS = 20;

// const CarouselItem = ({ item, index }) =>{
//     //console.log('Item::::: ', item.product_img_path);
//     const data = {item:item};
//     const url = `https://ecquatorial.com/public/images/${item.product_img_path}`;
//     return (
//         <Pressable onPress={() => props.navigation.navigate('Product Details', {item:data})} style={styles.itemContent} key={index}>
//             <View style={styles.container1} >
//                 <Image 
//                     style={[styles.image]}
//                     resizeMode="contain"
//                     source={{uri: url}}
//                     />
//                 <Text style={styles.header} numberOfLines={2}>
//                     {item.product_name}
//                 </Text>
//                 <Text style={styles.body}>R{item.product_price}</Text>
//                 {item.Discount ?
//                     <Text style={{fontSize:16, color:'red',fontWeight:'bold', paddingLeft:20, paddingRight:20}}>R{item.discounted_price}</Text>:
//                     null
//                 }
//             </View>
//         </Pressable>
//     );
// };
const CustomeCarousel = (props) =>{
    //console.log('ANy containt??? => ', props.data);
    //const url = `https://ecquatorial.com/public/images/${item.product_img_path}`;
    return (
        <View style={styles.container}>
            <FlatList
                data={props.data}
                renderItem={({item, index}) =>(
                    <CarouselItemSl
                        item={item}
                        index={index}
                        navigation={props.navigation}
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.product_Id}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container:{marginBottom:10},
    itemContent:{
        marginHorizontal:SPACING * 3,
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:BORDER_RADIUS + SPACING * 2,
    },
    itemText:{
        fontSize:20,
        position:'absolute',
        bottom: SPACING * 2,
        right: SPACING * 2,
        color: 'white',
        fontWeight: '600',
    },
    itemImage:{
        width:'100%',
        height: ITEM_LENGTH,
        borderRadius: BORDER_RADIUS,
        resizeMode: 'cover',
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
        fontSize:16,
        fontWeight:'bold',
        paddingLeft:20,
        paddingTop:20
    },
    body:{
        color:'#222',
        fontSize:16,
        fontWeight:'600',
        paddingLeft:20,
        paddingRight:20
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

export default CustomeCarousel;