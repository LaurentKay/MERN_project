import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductContainer from '../Screens/Products/ProductContainer';
import SingleProduct from '../Screens/Products/SingleProduct';
import SearchScreen from '../Shared/SearchScreen';
import Orders from '../Screens/Admin/Orders';

const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
              name='Home'
              component={ProductContainer}
              options={{
                  headerShown:false
              }}
            />
            <Stack.Screen
                name="Search Screen"
                component={SearchScreen}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen 
              name='Product Details'
              component={SingleProduct}
              options={{
                headerShown:true,
                title:'Product Details'
            }}
            />
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={{
                    headerShown:false,
                    title:'Orders'
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator(){
    return <MyStack />
}