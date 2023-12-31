import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, Dimensions, TextInput, StyleSheet } from 'react-native';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EcqButton from '../../Shared/STyledComponents/EcqButton';

var {width} = Dimensions.get('window');

const Item = (props) =>{
    return(
        <View style={styles.item}>
            <Text>{props.item.name}</Text>
            <EcqButton
                danger
                medium
                onPress={() => props.delete(props.item._id)}
            >
                <Text style={{color:'white', fontWeight:'bold'}}>Delete</Text>
            </EcqButton>
        </View>
    )
}
const Categories = (props) =>{

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [token, setToken] = useState('');

    useEffect(() =>{
        AsyncStorage.getItem('jwt')
        .then((res) =>{
            setToken(res);
        })
        .catch((error) => console.log(error));

        axios
            .get(`${baseURL}categories`)
            .then((res) =>{
                setCategories(res.data);
            })
            .catch((error) => alert("Error loading categories"));

        return () =>{
            setCategories([]);
            setToken();
        }
    },[]);
    const addCategory = () => {
        const category = {
            name: categoryName
        };

        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        };
        axios
            .post(`${baseURL}categories`, category, config)
            .then((res) => setCategories([...categories, res.data]))
            .catch((error) => alert("Error loading categories"));

        setCategoryName('');
    };
    const deleteCategory = (id) =>{
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        };
        axios
            .delete(`${baseURL}categories/${id}`, config)
            .then((res) =>{
                const newCategories = categories.filter((item) => item.id !== id);
                setCategories(newCategories)
            })
            .catch((error) => alert("Error loading categories"));
    }
    return(
        <View style={{position:'relative', height:'100%'}}>
            <View style={{marginBottom:60}}>
                <FlatList
                    data={categories}
                    renderItem={({item, index}) =>(
                        <Item item={item} index={index} delete={deleteCategory} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add Category</Text>
                </View>
                <View style={{width: width /2}}>
                    <TextInput
                        value={category}
                        style={styles.input}
                        onChangeText={(text) =>setCategoryName(text)}
                    />
                </View>
                <View>
                    <EcqButton
                        medium
                        primary
                        onPress={() => addCategory()}
                    >
                        <Text style={{color:'white', fontWeight:'bold'}}>Submit</Text>
                    </EcqButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar:{
        backgroundColor:'white',
        width:width,
        height:60,
        padding:2,
        flexDirection:'row',
        justifyContent:'space-between',
        position:'absolute',
        bottom:0,
        left:0,
    },
    input:{
        height:40,
        borderColor:'grey',
        borderWidth:1,
    },
    item:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: 'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius: 5,
    }
})
export default Categories;