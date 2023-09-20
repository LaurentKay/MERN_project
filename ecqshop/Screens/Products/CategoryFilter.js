import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import deepDiffer from 'react-native/Libraries/Utilities/differ/deepDiffer';

import { Badge, Text, FlatList} from 'native-base';

const Item = ({item,  categories, active, categoryFilter, productsCtg, setActive}) =>{
    //console.log("=>", item, active, deepDiffer(active, item));
    //const {item} = props;
    return(
    <TouchableOpacity
        key={item.department_id}
        onPress={() =>{
        categoryFilter(item.department_id), setActive(item)
        }}
    >
        <Badge
            style={[styles.center, 
                {margin: 5},
                active.department_id === item.department_id ? styles.active : styles.inactive]}
            >
                <Text style={{color: 'white'}}>{item.product_department}</Text>
        </Badge>
    </TouchableOpacity>)
}
const CategoryFilter = (props) =>{
    //console.log(props.categories);
    return(
            <FlatList 
                data={props.categories}
                horizontal={true}  style={{margin: 0, padding: 0, borderRadius: 0}}
                renderItem={({item}) => <Item
                                key={item.department_id}
                                item={item}
                                categories={props.categories}
                                active = {props.active}
                                categoryFilter={props.categoryFilter} 
                                productsCtg ={props.productsCtg}
                                setActive={props.setActive}/>}
                    keyExtractor={item => item.department_id}
            />        
    );
};

const styles = StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    active:{
        backgroundColor:'#03bafc'
    },
    inactive:{
        backgroundColor:'#a0e1eb'
    }
})
export default CategoryFilter;