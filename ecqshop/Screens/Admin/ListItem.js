import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity, Dimensions, Button, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EcqButton from '../../Shared/STyledComponents/EcqButton';

var {width} = Dimensions.get('window');

const ListItem = (props) =>{
    const [modalVisible, setModalVisible] = useState(false);
    return(
        <View>
            <Modal animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() =>setModalVisible(false)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                underlayColor="#E8E8E8"
                                onPress={() =>{
                                    setModalVisible(false)
                                }}
                                style={{alignSelf:'flex-end', position:'absolute',top:5, right:10}}
                            >
                                <Icon name="close" size={20} />
                            </TouchableOpacity>
                            <EcqButton 
                                medium 
                                secondary
                                onPress={() =>[props.navigation.nagigate("ProductForm", {item: props}), setModalVisible(false)]}
                            >
                                <Text style={styles.textStyle}>Edit</Text>
                            </EcqButton>
                            <EcqButton 
                                medium 
                                danger
                                onPress={() =>[props.delete(props._id), setModalVisible(false)]}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </EcqButton>
                            {/* <Button title="Edit" onPress={() =>[props.navigation.nagigate("ProductForm"), setModalVisible(false)]} /> */}
                            {/* <Button title="Delete" onPress={() =>{}} /> */}
                        </View>
                    </View>
                </Modal>
            <TouchableOpacity 
             onPress={() =>{
                 props.navigation.navigate("Product Details", {item:props})
             }}
             onLongPress={() => setModalVisible(true)}
             style={[styles.container, { backgroundColor: props.index % 2 == 0 ? 'white' : 'gainsboro'}]}
             >
                 <Image
                    source={{uri:`https://ecquatorial.com/public/images/${props.product_img_path}`}}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.item}>{props.brand}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.product_name}</Text>
                {/* <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.category.name}</Text> */}
                <Text style={styles.item} >R {props.product_price}</Text>
             </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:5,
        width:width,
    },
    image:{
        borderRadius: 50,
        width: width / 6,
        height:20,
        margin: 2
    },
    item:{
        flexWrap:'nowrap',
        margin: 3,
        width: width / 6,
    },
    centeredView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:22,
    },
    modalView:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        padding:35,
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle:{
        color:'white',
        fontWeight:'bold'
    }
})
export default ListItem;