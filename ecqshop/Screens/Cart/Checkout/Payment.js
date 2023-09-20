import React, { useState } from 'react';
import { View, Button, FlatList, ScrollView} from 'react-native';
import {Box, Pressable, Text, Radio, Icon, Heading, NativeBaseProvider, HStack, VStack, Spacer} from 'native-base';
import {Picker } from '@react-native-community/picker'

const methods = [
    {name: 'Instant EFT', value:'eft'},
    {name: 'Credit Card', value:'cc'},
    {name: 'Debit Card', value:'dc'},
    {name: 'Scode', value:'sc'},
    {name: 'Masterpass', value:'mp'},
    {name: 'Mobicredit', value:'mc'},
    {name: 'Cash On Delivery', value:'Cash'},
];
const fdate = (step) =>{
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + step);
     return targetDate;
}

const Delmethods = [
    {name: 'I will collect my order', value:-1},
    {name: fdate(0).toString().substr(0,15), value: 0},
    {name: fdate(1).toString().substr(0,15), value:1},
    {name: fdate(8).toString().substr(0,15), value:8},
    {name: fdate(4).toString().substr(0,15), value:4},
    {name: fdate(5).toString().substr(0,15), value:5},
    {name: fdate(6).toString().substr(0,15), value:6},
];


const Payment = (props) =>{
    let order = props.route.params;
    
    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    const [delopt, setDelOption] = useState();

    const bigAppl = (items) =>{
        console.log('=======> ', props.route.params);
        var iLarge = 0;
        for(var l = 0; l < items.length; l++){
              if((items[l].cat_id >= 22 && items[l].cat_id <= 27) || (items[l].cat_id=== 29)){
                  iLarge++;
              }
        }
        return iLarge;
      }
    const delFee = (dt, para) =>{
        var dayDel=150;
        const bigApp = 300;
        const iLarge = bigAppl(order.order.orderItems);
        if(para === 0){
            if(dt.getDay() === 6 || dt.getDay() === 0){
                dayDel += 120;
            }
            if(iLarge > 0){
                dayDel += iLarge * bigApp;
            }
        }else if(para === 1){
            if(dt.getDay() === 6 || dt.getDay() === 0){
                dayDel += 95;
            }
            if(iLarge > 0){
                dayDel += iLarge * bigApp;
            }
        }else if(para === 8){
            if(dt.getDay() === 6 || dt.getDay() === 0){
                dayDel += 100;
            }
            if(iLarge > 0){
                dayDel += iLarge * bigApp;
            }
        }else if(para === 4 || para === 5 || para === 6){
            if(dt.getDay() === 6 || dt.getDay() === 0){
                dayDel += 100;
            }else{
                dayDel += dayDel * 20/100;
                if(dayDel > 500){
                    dayDel = 0;
                }
            }
            if(iLarge > 0){
                dayDel += iLarge * bigApp;
            }
            //alert('ANd here? ' + dayDel);
        }
        return dayDel;
    }
    function getOrderNum(){ 
        return (Date.now() + ( (Math.random()*100000).toFixed())).toString().substr(4, 13);
    }
    const hpayment = (ord) =>{
        let delAmount;
        if(delopt !== "-1"){
            delAmount = delFee(fdate(delopt), delopt);
          }else{
            delAmount = 0;
          }
        Object.assign(ord, {deliveryOption:delopt, delAmount, paymentMethod:selected, ordernumber:getOrderNum()});
        console.log('The Order object::: ', ord);
        props.navigation.navigate("Confirm", {order:ord})
    }
    const Item = ({item}) => {
        console.log("Payment=>", item, 'Pay===> ', selected);
        //const { item } = props;
        return (
            <Box>
            <Pressable onPress={() => setSelected(item.value)} bg="white">
                <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={5}>
                        <VStack>
                            <Text color="coolGray.800" _dark={{color: 'warmGray.50'}} bold>
                                {item.name}
                            </Text>
                        </VStack>
                        <Spacer />
                        <VStack>
                            <Radio value={item.value} selected={selected == item.value}/>
                        </VStack>
                    </HStack>  
                </Box>
            </Pressable>
            </Box>
        )
    };
    //
    const ItemDel = ({item}) => {
        console.log("Delivery=>", item, 'Del ===> ', delopt);
        //const { item } = props;
        return (
            <Box>
            <Pressable onPress={() => setDelOption(item.value)} bg="white">
                <Box pl="4" pr="5" py="2">
                    <HStack alignItems="center" space={5}>
                        <VStack>
                            <Text color="coolGray.800" _dark={{color: 'warmGray.50'}} bold>
                                {item.name}
                            </Text>
                        </VStack>
                        <Spacer />
                        <VStack>
                            <Radio value={item.value} selected={delopt == item.value}/>
                        </VStack>
                    </HStack>  
                </Box>
            </Pressable>
            </Box>
        )
    };
    return(
        <NativeBaseProvider>
        <ScrollView style={{flex:1}}>
        <Box>
            <Heading style={{padding:8}}>Choose your payment method</Heading>
            <Box>
            <Radio.Group
                    name="myRadioGroup"
                    accessibilityLabel="favorite number"
                    value={selected}
                    onChange={(nextValue) => setSelected(nextValue)}
                    >
                <FlatList
                    keyExtractor={mtd =>mtd.name}
                    data={methods}
                    renderItem={mtd => Item(mtd)}
                />
            </Radio.Group>
            </Box>
            <Heading style={{padding:8}}>Choose your Delivery Options</Heading>
            <Box>
            <Radio.Group
                    name="myDelGroup"
                    accessibilityLabel="favorite number"
                    value={delopt}
                    onChange={(nextValue) => setDelOption(nextValue)}
                    >
                <FlatList
                    keyExtractor={mtd =>mtd.name}
                    data={Delmethods}
                    renderItem={mtd => ItemDel(mtd)}
                />
                </Radio.Group>
                
                <View style={{marginTop:60, alignSelf:'center', paddingBottom:8}}>
                    <Button 
                        title="Confirm"
                        onPress={() => hpayment(order.order)} />
                </View>
            </Box>
        </Box>
        </ScrollView>
        </NativeBaseProvider>
    );
};

export default Payment;