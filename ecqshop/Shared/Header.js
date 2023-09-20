import React from 'react';
import { StyleSheet, Image, View, SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon  from 'react-native-ionicons';
import CartIcon from './CartIcon';
const Header = (props) => {
    const navigation = useNavigation();
    const goToCart = () =>{
        navigation.navigate("Cart");
    }
    return (
        <SafeAreaView style={styles.header}>
            <Image
                source={require("../assets/logo192.jpg")}
                resizeMode="contain"
                style={{ height: 100, width: 200 }}
            />
            <View></View>
            <View key={6} style={{marginRight: 20, marginTop:30}} onPress={goToCart}>
                <Icon key={4}
                    onPress={goToCart}
                    name='cart'
                    size={40}
                    style={{ position: 'relative' }}
                />
                <CartIcon key={3} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
    }
});

export default Header;