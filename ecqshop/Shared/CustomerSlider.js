import * as React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselItem, { ITEM_WIDTH, SLIDER_WIDTH } from './CarouselItem';

//const { width } = Dimensions.get('window');
// sliderWidth: screenWidth,
// sliderHeight: screenWidth, 
// itemWidth: screenWidth - 100,
// hasParallaxImage: true,
const { width: screenWidth } = Dimensions.get('window');
export default function CustomSlider({ data }){
    const settings = {
        layout:'stack',
        layoutCardOffset:9,
        data: data,
        renderItem: CarouselItem,
        sliderWidth:SLIDER_WIDTH,
        itemWidth:ITEM_WIDTH,
        inactiveSlideShift:0,
        useScrollView:true,
        hasParallaxImage: true,
    };
    //console.log(data);
    return(
        <View style={styles.container}>
            <Carousel {...settings} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
    // title: {
    //     fontSize: 20,
    // },
    // item: {
    //     width: '100%',
    //     height: screenWidth - 20, //height will be 20 units less than screen width.
    // },
    // imageContainer: {
    //     flex: 1,
    //     borderRadius: 5,
    //     backgroundColor: 'lightblue',
    //     marginBottom: Platform.select({ ios: 0, android: 1 }), //handle rendering bug.
    // },
    // image:{
    //     //...StyleSheet.absoluteFillObject,
    //     width: screenWidth / 2 - 20 - 10,
    //     height: 100,
    //     resizeMode: 'contain',
    //     position: 'absolute',
    // },
    // dotContainre: {
    //     backgroundColor: 'rgb(230, 0, 0)',
    // },
    // dotStyle:{
    //     width:10,
    //     height:10,
    //     borderRadius:5,
    //     backgroundColor:'black',
    // },
    // inactiveDotStyle:{
    //     backgroundColor:'rgb(255, 230,230)',
    // },
});