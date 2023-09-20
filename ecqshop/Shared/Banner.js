import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper/src';

var { width } = Dimensions.get('window');
/*
'../assets/banner/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
            '../assets/banner/D7P_yLdX4AAvJWO.jpg', 
            '../assets/banner/gardening-banner.jpg'*/
const Banner = () =>{
    const [bannerData, setBannerData] = useState([]);

    useEffect(() =>{
        setBannerData([
            'https://ecquatorial.com/public/logos/banner1.jpg',
            'https://ecquatorial.com/public/logos/banner2.jpg',
            'https://ecquatorial.com/public/logos/banner3.jpg',
            'https://ecquatorial.com/public/logos/banner4.jpg',
            'https://ecquatorial.com/public/logos/banner5.jpg',
            'https://ecquatorial.com/public/logos/banner6.jpg',
        ]
            );

        return () => {
            setBannerData([]);
        }
    },[]);
    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.swiper}>
                <Swiper
                  style={{height: width / 2}}
                  showButtons={false}
                  autoplay={true}
                  autoplayTimeout={2}
                >
                    {bannerData.map((item) =>{
                        //console.log(item);
                        return(
                            <Image
                              key={item}
                              style={styles.imageBanner}
                              resizeMode="contain"
                              source={{uri: item}}
                            />
                        );
                    })}
                </Swiper>
                <View style={{height: 20}}></View>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'gainsboro',
    },
    swiper:{
        width: width,
        alignItems:'center',
        marginTop: 10
    },
    imageBanner:{
        height: width / 2,
        width: width - 40,
        borderRadius:  10,
        marginHorizontal: 20,
    }
})

export default Banner;