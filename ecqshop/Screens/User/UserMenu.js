import React, { useCallback } from 'react';
import {View, Text, ScrollView, TouchableOpacity, Linking, Alert, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from 'react-native-elements';

const supportedURL = "https://ecquatorial.com/faq";
const OpenURLButton = ({url, children}) =>{
    const handlePress = useCallback(async () =>{
        //Checking if the link is supported for links with customer URL scheme.
        const supported = await Linking.canOpenURL(url);
        Linking.openURL(url);
        // if(supported){
        //     //Opening the link with some app, if the URL scheme is "http" the web link should be Opened
        //     //by some browser in the mobile
        //     await Linking.openURL(url);
        // }else{
        //     Alert.alert(`Don't know how to open this URL: ${url} ${supported}`);
        // }
    }, [url]);
    return <Button title={children} onPress={handlePress} />;
}
const UserMenu = (props) =>{
    console.log('Any Props??? => ', props.navigation);
    const handleCat = (dpID, title) =>{
        props.navigation.navigate("Single Category_Products", {depId:dpID, title, navigation:props.navigation});
    }
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('User Profile')}>
                    <View style={{paddingHorizontal:8, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Icon name="shopping-bag" size={25} color='grey' />
                            <Text style={{fontSize:16,width:'80%'}}>Orders</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("Returns")}>
                    <View style={{paddingHorizontal:8, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Icon name="reply" size={25} color='grey' />
                            <Text style={{fontSize:16,width:'80%'}}>Returns</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("EditUser")}>
                    <View style={{paddingHorizontal:8, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            {/* <Image style={{width:30,height:30}} resizeMode="contain" source={require('../../assets/icons8-book-64.png')} /> */}
                            <Icon name="user" size={25} color='grey' />
                            <Text style={{fontSize:16,width:'80%'}}>Personal Details</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
                    <View style={{paddingHorizontal:8, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Icon name="cog" size={25} color='grey' />
                            <Text style={{fontSize:16,width:'80%'}}>Settings</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => props.navigation.navigate("HelpScreen")}> */}
                    <View style={{paddingHorizontal:8, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            {/* <Icon name="question-circle" size={25} color='grey' />
                            <Text style={{fontSize:16,width:'80%'}}>Help</Text> */}
                            <OpenURLButton url={supportedURL}>Help</OpenURLButton>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                {/* </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

export default UserMenu;