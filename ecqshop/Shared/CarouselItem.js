import React from 'react';
import { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Pressable, StyleSheet,Dimensions, Image } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
export const SLIDER_WIDTH = screenWidth + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
function CarouselItem({ item, index }){
    //console.log('Item::::: ', item.product_img_path);
    const url = `https://ecquatorial.com/public/images/${item.product_img_path}`;
    return (
        <Pressable onPress={() => alert('Image description: ' + item.description)}>
            <View style={styles.container} key={index}>
                <Image 
                    style={[styles.image]}
                    //style={{width: 40, height: 20}}
                    resizeMode="contain"
                    source={{uri: url}}
                    />
                <Text style={styles.header} numberOfLines={2}>
                    {item.product_name}
                </Text>
                <Text style={styles.body}>The body</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        width:ITEM_WIDTH,
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
        fontSize:28,
        fontWeight:'bold',
        paddingLeft:20,
        paddingTop:20
    },
    body:{
        color:'#222',
        fontSize:18,
        paddingLeft:20,
        paddingRight:20
    },
    title: {
        fontSize: 20,
        width: screenWidth /2,
    },
    item: {
        flexDirection:'column',
        width: '100%',
        height: screenWidth - 60, //height will be 20 units less than screen width.
        paddingTop:50,
        paddingBottom:50,
        marginBottom:30
    },
    imageContainer: {
        //flex: 1,
        borderRadius: 5,
        backgroundColor: 'lightblue',
        marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
    },
    image:{
        width:ITEM_WIDTH,
        height:300,
        // ...StyleSheet.absoluteFillObject,
        // marginTop:50,
        // width: screenWidth / 1.4 ,
        // height: screenWidth - 60, //'100%',
         resizeMode: 'cover',
        //position: 'absolute',
    },
    dotContainre: {
        backgroundColor: 'rgb(230, 0, 0)',
    },
    dotStyle:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'black',
    },
    inactiveDotStyle:{
        backgroundColor:'rgb(255, 230,230)',
    },
});

export default CarouselItem;