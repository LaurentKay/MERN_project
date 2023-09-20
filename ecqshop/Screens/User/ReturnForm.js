import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import EcqButton from '../../Shared/STyledComponents/EcqButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import Error from '../../Shared/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Select, CheckIcon, NativeBaseProvider } from 'native-base';
import AuthGlobal from '../../Context/store/AuthGlobal';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
//import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
const oType = ['Return', 'Exchange'];
const returnForm = (props) => {
    const context = useContext(AuthGlobal);

    const [pickerValue, setPickerValue] = useState('');
    const [reason, setReason] = useState();
    const [pickerStatus, setStatus] = useState('');
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [recentOrders, setRecentOrders] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('jwt')
            .then((res) => {
                setToken(res);
                axios
                    .get(`${baseURL}orders/recentOrders`, {
                        headers: {
                            Authorization: `Bearer ${res}`,
                        },
                    })
                    .then((res) => {
                        setRecentOrders(res.data);
                        console.log('The orders No:::: ', res.data)
                    })
                    .catch((error) => alert("Error loading order numbers"));
            })
            .catch((error) => console.log(error));

        return () => {
            setRecentOrders([]);
        }
    }, []);
    const addReturn = () => {
        if (pickerStatus === "" || reason === "" || pickerValue === "") {
            setError("Please fill in the form correctly");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const retExch = {
            name: context.stateUser.userProfile.account_firstname,
            lname: context.stateUser.userProfile.account_lastname,
            email:context.stateUser.userProfile.account_email,
            ordernumber: pickerValue,
            statu: pickerStatus,
            reason: reason,
        }
        //console.log('The return:::: ', retExch, context.stateUser.userProfile);
        axios
            .put(`${baseURL}fe/retexchange`, retExch, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: `Ecquatorial`,
                        text2: `Your ${pickerStatus} successfuly submitted`
                    });
                    setTimeout(() => {
                        props.navigation.navigate('Home', { screen: 'Home' });
                    }, 500);
                }
            })
            .catch((err) => {
                console.log('What is the error:::::: ', err);
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'Something went wrong',
                    text2: 'Please try again'
                });
            });
    }
    return (
        <NativeBaseProvider>
        <FormContainer title="Exchange/Return">
            <Select
                selectedValue={pickerStatus}
                minWidth="200"
                accessibilityLabel="Choose Type"
                placeholder="Choose Type"
                _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                }}
                l
                style={{ borderColor: 'orange', borderRadius: 20 }}
                mt={1}
                onValueChange={(itemValue) => setStatus(itemValue)}>
                {oType.map((o, index) => (
                    <Select.Item label={o} value={o} key={index} />
                ))}
            </Select>
            <Select
                selectedValue={pickerValue}
                minWidth="200"
                accessibilityLabel="Choose Order Number"
                placeholder="Choose Order Number"
                _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />,
                }}
                l
                style={{ borderColor: 'orange', borderRadius: 20 }}
                mt={1}
                onValueChange={(itemValue) => setPickerValue(itemValue)}>
                {recentOrders.map((o, index) => (
                    <Select.Item label={o} value={o} key={index} />
                ))}
            </Select>
            {/* <View style={styles.label}>
                <Text style={{ textDecorationLine: "underline" }}>Reason</Text>
            </View> */}
            <Input
                placeholder="Reason"
                name="reason"
                value={reason}
                onChangeText={(text) => setReason(text)}
            />

            {error ? <Error message={error} /> : null}
            <View style={styles.buttonContainer}>
                <EcqButton
                    large
                    primary
                    onPress={() => addReturn()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </EcqButton>
            </View>
        </FormContainer>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    label: {
        width: '80%',
        marginTop: 10,
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 80,
        marginTop: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: 'solid',
        borderWidth: 8,
        padding: 0,
        justifyContent: 'center',
        borderRadius: 100,
        borderColor: '#E0E0E0',
        elevation: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    imagePicker: {
        position: 'absolute',
        right: 5,
        bottom: 5,
        backgroundColor: 'grey',
        padding: 8,
        borderRadius: 100,
        elevation: 20,
    }
})
export default returnForm;