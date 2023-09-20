import React from 'react';
import {View, StyleSheet, Dimensions } from 'react-native';
import { Box, Content, Left, Body, FlatList, Thumbnail, Text} from 'native-base';
import FoudList from './FoundList';

var {width} = Dimensions.get('window');
const SearchedProduct = (props) =>{
    const {productsFiltered} = props;
    return(
        <Box style={{width:width}}>
            {productsFiltered.length > 0 ? (
            <FlatList
                data={productsFiltered}
                renderItem={({item}) => <FoudList
                            navigation={props.navigation}
                            key={item.id}
                            item={item}/>}
                    keyExtractor={item => item.name}
                />
            ) : (
                <View style={styles.center}>
                    <Text>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </Box>
    );
}
const styles = StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center',
    }
})
export default SearchedProduct;