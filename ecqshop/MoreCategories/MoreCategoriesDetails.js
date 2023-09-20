import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from 'react-native-elements';
import { Encrypt } from '../Shared/utils';

const MoreCategoriesDetails = (props) =>{
    console.log('Any Props??? => ', props.navigation.navigate);
    const handleCat = (dpID, title) =>{
        props.navigation.navigate("Single Category_Products", {depId:dpID, title, navigation:props.navigation});
    }
    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=1", "rks8kc1cu0k14e6lbbvjk5sap7"), "Baby Products")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-baby-stroller-50.png')} />
                            {/* <Icon name="baby" size={20} color='blue' /> */}
                            <Text style={{fontSize:16,width:'80%'}}>Baby Accessories</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=17", "rks8kc1cu0k14e6lbbvjk5sap7"), "Beauty Products")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-perfume-bottle-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Beauty Accessories</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=2", "rks8kc1cu0k14e6lbbvjk5sap7"), "Books and Courses")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-book-64.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Books &amp; Courses</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=16", "rks8kc1cu0k14e6lbbvjk5sap7"), "Cameras")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-camera-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Cameras</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=3", "rks8kc1cu0k14e6lbbvjk5sap7"), "Cellphones & Tablets")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-cellphone-99.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Cellphones &amp; Tablets</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=4", "rks8kc1cu0k14e6lbbvjk5sap7"), "Computers")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-workstation-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Computers</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=5", "rks8kc1cu0k14e6lbbvjk5sap7"), "Electronics")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-tv-80.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Electronics</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=6", "rks8kc1cu0k14e6lbbvjk5sap7"), "Fashions")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-jumper-64.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Fashions &amp; Accessories</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=7", "rks8kc1cu0k14e6lbbvjk5sap7"), "Games")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-games-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Games, Movies &amp; Musics</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=11", "rks8kc1cu0k14e6lbbvjk5sap7"), "Groceries")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-shopping-cart-60.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Groceries</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=12", "rks8kc1cu0k14e6lbbvjk5sap7"), "Office Stationeries")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-office-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Office Stationeries</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=8", "rks8kc1cu0k14e6lbbvjk5sap7"), "Health Products")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-health-64.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Health</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=10", "rks8kc1cu0k14e6lbbvjk5sap7"), "Home & Kitchen")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-cooker-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Home &amp; Kitchens</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=9", "rks8kc1cu0k14e6lbbvjk5sap7"), "Home DIY")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-jigsaw-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Home, Gardens &amp; DIY</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=14", "rks8kc1cu0k14e6lbbvjk5sap7"), "Pets")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-pet-commands-stay-80.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Pets</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=13", "rks8kc1cu0k14e6lbbvjk5sap7"), "Sports")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-discus-throw-100.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Sport</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCat(Encrypt("depId=15", "rks8kc1cu0k14e6lbbvjk5sap7"), "Travel & Outdoors")}>
                    <View style={{paddingHorizontal:20, paddingBottom:10, paddingTop:20, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',width:'80%'}}>
                            <Image style={{width:30,height:30}} resizeMode="contain" source={require('../assets/icons8-suitcase-80.png')} />
                            <Text style={{fontSize:16,width:'80%'}}>Travel &amp; Outdoors</Text>
                        </View>
                    </View>
                    <View style={{height:1, backgroundColor:colors.grey0,marginLeft:5,marginRight:5}} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default MoreCategoriesDetails;