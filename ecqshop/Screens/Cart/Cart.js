import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Button, Modal  } from 'react-native';
import { Text, Box, Avatar, Pressable, HStack, VStack, Heading, NativeBaseProvider, Spacer } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
//import { Entypo, MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import * as Actions from '../../Redux/Actions/cartActions';
import EcqButton from '../../Shared/STyledComponents/EcqButton';
import AuthGlobal from '../../Context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { Encrypt } from '../../Shared/utils';

var { height, width } = Dimensions.get('window');

const Cart = (props) => {

  const context = useContext(AuthGlobal);
  //var total = 0;
  console.log('CartItems: ', context);
  const [productUpdate, setProductUpdate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [isTv, setIsTv] = useState(false);
  useEffect(() => {
    getProducts();
    return () => {
      setProductUpdate();
      setTotalPrice();
      setIsTv(false);
    }
  }, [props]);

  const getProducts = () => {
    var products = [];
    props.cartItems.forEach(cart => {
      const productId = Encrypt(cart.product + ',=', 'somethingsecret');
      axios.get(`${baseURL}fe/${productId}`).then(data => {
        console.log('The Products::::::=> ', data.data.product);
        products.push({ product: data.data.product, quantity: cart.qty });
        setProductUpdate(products);
        var total = 0;
        products.forEach(p => {
          let price = 0;
          if (p.product.dicsounted_price > 0) {
            price = (total += Number(p.product.dicsounted_price) * Number(p.quantity));
          } else {
            price = (total += Number(p.product.product_price) * Number(p.quantity));
          }
          setTotalPrice(price.toFixed(2));
        });
      })
        .catch(e => { console.log(e) });
    });
  }
  const openModal = () =>{
    setModalVisible(!modalVisible);
  }
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  //   const deleteRow = (rowMap, rowKey) => {
  //     closeRow(rowMap, rowKey);
  //     const newData = [...listData];
  //     const prevIndex = listData.findIndex((item) => item.key === rowKey);
  //     newData.splice(prevIndex, 1);
  //     setListData(newData);
  //   };

  const Item = ({ item }) => {
    console.log("=>", item);
    const { product, quantity } = item;
    return (
      <Box style={{ flex: 1 }}>
        <Pressable onPress={() => { }} bg="white">
          <Box pl="3" pr="3" py="2">
            <HStack alignItems="center" space={3} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Avatar size="48px" source={{ uri: `https://ecquatorial.com/public/images/${product.product_img_path}` }} />
              <VStack>
                <Text style={{ fontSize: 12 }} color="coolGray.800" numberOfLines={2} _dark={{ color: 'warmGray.50' }} bold>
                  {product.product_name.length > 30 ? product.product_name.substring(0, 30 - 3) + '...' : product.product_name}
                </Text>

              </VStack>
              {/* <Spacer /> */}
              <VStack>
                <Text color="coolGray.600" _dark={{ color: 'warmGray.50.200' }} alignSelf="flex-start">
                  R {product.dicsounted_price > 0 ? product.dicsounted_price : product.product_price} x {quantity}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      </Box>
    )
  };
  const renderHiddenItem = (data) => {
    console.log('renderHiddenItem: ', data.item);
    const dta = { item: data.item.product };
    return (
      <HStack flex="1" pl="2" style={styles.hiddenContainer}>
        <Pressable
          w="70"
          ml="auto"
          bg="gray"
          justifyContent="center"
          onPress={() => props.navigation.navigate("Product Details", { item: dta })}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Icon
              name="ellipsis-h"
              size={32}
              color="gray"
            />
            <Text fontSize="xs" fontWeight="medium" color="gray">
              More
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="70"
          bg="red.500"
          justifyContent="center"
          onPress={() => props.removeFromCart(data.item)}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" space={2}>
            <Icon name="trash" size={32} color='white' />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );
  }

  return (
    <>
      <NativeBaseProvider>
        {/* <View style={{ flex: 1 }}> props.cartItems.length*/}
        {productUpdate ? (
          <Box bg="white" style={{ position: 'relative', height: height }} safeArea flex="1">
            <Box style={{ flex: 1, height: '5%', overflow: 'scroll' }}>
              {<Heading style={{ alignSelf: 'center' }}>Shopping Cart</Heading>}
              <SwipeListView
                style={{ flex: 1, position: 'relative' }}
                data={productUpdate}
                renderItem={Item}
                renderHiddenItem={renderHiddenItem}
                disableRightSwipe={true}
                // previewOpenDelay={3000}
                // friction={1000}
                // tension={40}
                // leftOpenValue={75}
                // stopLeftSwipe={75}
                // rightOpenValue={-75}

                rightOpenValue={-130}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
              />
            </Box>
            {/*isTv ?
             <View style={{borderWidth:1, borderColor:'orange', width: width, padding:8, bottom:81, position:'absolute'}}>
                 <Text style={{color:'red'}}>A valid TV licence will be required in order to complete your purchase of the TV product.</Text>
                 <Text style={{color:'red'}}>You will also be required to email / fax us an electronic copy of the TV licence holder's SA ID Book before we can dispatch your order.</Text>
                 <Text style={{color:'red'}}>Unfortunately we are not able to process purchases using Business TV licences.</Text>
             </View> :null*/}
            <View style={styles.bottomContainer}>
              {productUpdate.find(p => p.product.sub_id === 27) ?
                <View style={{ borderWidth: 1, borderColor: 'orange', width: width, padding: 8, position: 'relative', bottom: 24 }}>
                  <Text style={{ color: 'red' }}>A valid TV licence will be required in order to complete your purchase of the TV product.</Text>
                  <Text onPress={() => openModal()} style={{color:'blue'}}>Read More...</Text>
                </View> : null}
              <View style={styles.innerBottom}>
                <Box>
                  <Text style={styles.price}>R {totalPrice}</Text>
                </Box>
                <Box> {/* Right */}
                  <EcqButton danger medium onPress={() => props.clearCart()} >
                    <Text style={{ color: 'white' }}>Clear</Text>
                  </EcqButton>
                </Box>
                {context.stateUser.isAuthenticated ? (
                  <Box> {/* Right */}
                    <EcqButton primary medium onPress={() => props.navigation.navigate('Checkout', { cartItems: props.cartItems })} >
                      <Text style={{ color: 'white' }}>Checkout</Text>
                    </EcqButton>
                  </Box>
                ) : (
                  <Box> {/* Right */}
                    <EcqButton secondary medium onPress={() => props.navigation.navigate('Account', { screen: 'Login' })} >
                      <Text style={{ color: 'white' }}>Login</Text>
                    </EcqButton>
                  </Box>
                )}
              </View>
            </View>
          </Box>
        ) : (
          <Box style={styles.emptyContainer}>
            <Text>Looks like your cart is empty</Text>
            <Text>Add products to you cart to get started</Text>
          </Box>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ color: 'red' }}>A valid TV licence will be required in order to complete your purchase of the TV product.</Text>
              <Text style={{ color: 'red' }}>You will also be required to email / WhatsApp us an electronic copy of the TV licence holder's SA ID Book before we can dispatch your order.</Text>
              <Text style={{ color: 'red' }}>Unfortunately we are not able to process purchases using Business TV licences.</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </NativeBaseProvider>
    </>
  );
};

const mapStateToProps = state => {
  const { cartItems } = state;

  return {
    cartItems: cartItems,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(Actions.clearCart()),
    removeFromCart: (item) => dispatch(Actions.removeFromCart(item)),
  }
}
const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    width: width,
    bottom: 0,
    height: '40%'
  },
  bottomContainer: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    alignContent: 'center',
    backgroundColor: 'white',
    elevation: 20,
    width: width,
    height: 160
  },
  price: {
    fontSize: 18,
    bottom: 10,
    color: 'red',
    textAlignVertical: 'center',
    borderColor: 'white',
    //borderWidth:3
  },
  hiddenContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    //paddingRight: 25,
    //height: 70,
    //width: width / 1.2
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
modalText: {
    marginBottom: 15,
    textAlign: "center"
},
});
export default connect(mapStateToProps, mapDispatchToProps)(Cart);