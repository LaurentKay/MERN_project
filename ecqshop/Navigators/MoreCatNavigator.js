import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import moreCategories from '../MoreCategories';
import SingleCategoryProducts from '../Screens/Products/SingleCategoryProducts';
import SingleSubCategoryProducts from '../Screens/Products/SingleSubCategoryProducts';

const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="More Categories"
                component={moreCategories}
                options={{
                    headerShown:true,
                    title:"More Categories",
                    headerTitleAlign:'center'
                }}
               
            />
            <Stack.Screen
                name="Single Category_Products"
                component={SingleCategoryProducts}
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
                name="SingleSubCategoryProducts"
                component={SingleSubCategoryProducts}
                options={({route}) => ({title: route.params.title})}
            />
        </Stack.Navigator>
    );
};

export default function MoreCategoriesNovigator(){
    return <MyStack />;
}