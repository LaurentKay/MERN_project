import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {Picker } from '@react-native-community/picker';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import EcqButton from '../../Shared/STyledComponents/EcqButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import Error from '../../Shared/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
//import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';

const productForm = (props) =>{
    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategories] = useState();
    const [categories, setCategory] = useState();
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    useEffect(() =>{

        if(!props.route.params){
            setItem(null);
        }else{
            setItem(props.route.params.item);
            setBrand(props.route.params.item.brand);
            setName(props.route.params.item.name);
            setPrice(props.route.params.item.price.toString());
            setDescription(props.route.params.item.description);
            setMainImage(props.route.params.item.image);
            setImage(props.route.params.item.image);
            setCategory(props.route.params.item.category._id);
            setCountInStock(props.route.params.item.countInStock.toString());
        }
        AsyncStorage.getItem('jwt')
            .then((res) =>{
                setToken(res);
            })
            .catch((error) =>console.log(error));
        //Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) =>alert("Error to load categories"));

        //Image Picker
        (async () =>{
            if(Platform.OS !== "web"){
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if(status !== "granted"){
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
        return () =>{
            setCategories([]);
        }
    },[]);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4, 3],
            quality: 1
        });

        if(!result.cancelled){
            setMainImage(result.uri);
            setImage(result.uri);
        }
    };
    const addProduct = () =>{
        if(name == "" || brand == "" || price == "" || description == "" || category == "" || countInStock == ""){
            setError("Please fill in the form correctly");
        }

        let formData = new FormData();
        const newImageUri = "file:///" + image.split("file:/").join("");
        formData.append("image", {
            uri:newImageUri,
            type:mime.getType(newImageUri),
            name:newImageUri.split('/').pop()
        });
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeature", isFeatured);

        const config = {
            Headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        };
        if(item !== null){
            axios
                .put(`${baseURL}products/${item.id}`, formData, config)
                .then((res) =>{
                    if(res.status == 200 || res.status == 201){
                        Toast.show({
                            topOffset:60,
                            type:'success',
                            text1:'Product successfuly updated',
                            text2:''
                        });
                        setTimeout(() =>{
                            props.navigation.navigate("Products");
                        }, 500);
                    }
                })
                .catch((err) =>{
                    Toast.show({
                        topOffset:60,
                        type:'error',
                        text1:'Something went wrong',
                        text2:'Please try again'
                    });
                });
        }else{
            axios
                .post(`${baseURL}products`,formData, config)
                .then((res) =>{
                    if(res.status == 200 || res.status == 201){
                        Toast.show({
                            topOffset:60,
                            type:'success',
                            text1:'New Product added',
                            text2:''
                        });
                        setTimeout(() =>{
                            props.navigation.navigate("Products");
                        }, 500);
                    }
                })
                .catch((err) =>{
                    Toast.show({
                        topOffset:60,
                        type:'error',
                        text1:'Something went wrong',
                        text2:'Please try again'
                    });
                });
        }
    }
    return(
        <FormContainer title="Add Product">
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: mainImage}} />
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Icon style={{color:'white'}} name='camera' />
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
                <Text style={{textDecorationLine: "underline"}}>Brand</Text>
            </View>
            <Input
                placeholder="Brand"
                name="brand"
                value={brand}
                onChangeText={(text) =>setBrand(text)}
            />
            <View style={styles.label}>
                <Text style={{textDecorationLine: "underline"}}>Name</Text>
            </View>
            <Input
                placeholder="Name"
                name="Name"
                value={name}
                onChangeText={(text) =>setName(text)}
            />
            <View style={styles.label}>
                <Text style={{textDecorationLine: "underline"}}>Price</Text>
            </View>
            <Input
                placeholder="Price"
                name="price"
                value={price}
                keyboardType={"numeric"}
                onChangeText={(text) =>setPrice(text)}
            />
            <View style={styles.label}>
                <Text style={{textDecorationLine: "underline"}}>Count In Stock</Text>
            </View>
            <Input
                placeholder="Stock"
                name="stock"
                value={countInStock}
                keyboardType={"numeric"}
                onChangeText={(text) =>setCountInStock(text)}
            />
            <View style={styles.label}>
                <Text style={{textDecorationLine: "underline"}}>Description</Text>
            </View>
            <Input
                placeholder="Description"
                name="description"
                value={description}
                onChangeText={(text) =>setDescription(text)}
            />
            <Picker
                selectedValue={pickerValue}
                onValueChange={(itemValue) => [setPickerValue(itemValue), setCategory(itemValue)]}
                iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                style={{width: undefined}}
                placeholder="Select your Category"
                itemStyle={{color: '#007aff'}}
            >
                {categories.map((c) =>{
                    return <Picker.Item key={c.id} label={c.name} value={c.id} />
                })}
            </Picker>
            {error ? <Error message={error} /> : null}
            <View style={styles.buttonContainer}>
                <EcqButton
                    large
                    primary
                    onPress={() =>addProduct()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </EcqButton>
            </View>
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    label:{
        width:'80%',
        marginTop: 10,
    },
    buttonContainer:{
        width:'80%',
        marginBottom:80,
        marginTop:20,
        alignItems:'center'
    },
    buttonText:{
        color:'white',
    },
    imageContainer:{
        width:200,
        height:200,
        borderStyle:'solid',
        borderWidth: 8,
        padding: 0,
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: '#E0E0E0',
        elevation: 10,
    },
    image:{
        width:'100%',
        height:'100%',
        borderRadius:100
    },
    imagePicker:{
        position:'absolute',
        right:5,
        bottom:5,
        backgroundColor:'grey',
        padding:8,
        borderRadius:100,
        elevation:20,
    }
})
export default productForm;