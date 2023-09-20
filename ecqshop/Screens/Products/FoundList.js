import React from 'react';
import {Box, Avatar, Text, Pressable, HStack, VStack, Spacer } from 'native-base';

const FoudList = (props) => {
    //console.log('What: ', props);
    const {item}  = props;
    return(
        <Box>
        <Pressable onPress={() => {
            props.navigation.navigate("Product Details", {item: item})
        }}>
            <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                    <Avatar size="48px" source={{uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}} />
                    <VStack>
                        <Text color="coolGray.800" _dark={{color: 'warmGray.50'}} bold>
                            {item.name}
                        </Text>
                        <Text color="coolGray.600" _dark={{color:'warmGray.50.200'}}>
                            {item.description}
                        </Text>
                    </VStack>
                </HStack>  
            </Box>
        </Pressable>
        </Box>
    );
}

export default FoudList;