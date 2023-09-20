import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import AuthGlobal from '../../Context/store/AuthGlobal';
import EcqButton from '../../Shared/STyledComponents/EcqButton';

import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

const EditUserForm = (props) => {
    const context = useContext(AuthGlobal);

    const [email, setEmail] = useState(context.stateUser.userProfile.account_email || '');
    const [name, setName] = useState(context.stateUser.userProfile.account_firstname || '');
    const [lastname, setLastName] = useState(context.stateUser.userProfile.account_lastname || '');
    const [phone, setPhone] = useState(context.stateUser.userProfile.phone || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const update = () => {
        if (password !== confirmPassword) {
            setError('Password and confirm password are different, try again');
        }
        if (email === '' || name === '' || lastname === '' || phone === '' || password === '') {
            setError('Please fill in the form values correctly');
        }
        let user = {
            userId: context.stateUser.userProfile.account_id,
            name: name,
            lname: lastname,
            email: email,
            password: password,
            phone: phone,
        };
        AsyncStorage.getItem('jwt')
            .then((res) => {
                //setToken(res);
                axios
                    .put(`${baseURL}users/profile`, user, {
                        headers: {
                            Authorization: `Bearer ${res}`,
                        },
                    })
                    .then(res => {
                        if (res.status === 200) {
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: "Ecquatorial",
                                text2: "Account profile updated"
                            });
                            setTimeout(() => {
                                props.navigation.navigate("Home");
                            }, 500);
                        }
                    })
                    .catch(error => {
                        console.log('UpdateErr:::::  ', error);
                        Toast.show({
                            topOffset: 60,
                            type: "error",
                            text1: "Ecquatorial",
                            text2: "Unable to update Account"
                        });
                    });
            })
            .catch((error) => console.log(error));
    }
    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title="Edit User">
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder={"Last Name"}
                    name={"lastname"}
                    id={"lastname"}
                    value={lastname}
                    onChangeText={(text) => setLastName(text)}
                />
                <Input
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder={"Confirm Password"}
                    name={"confirmPassword"}
                    id={"confirmPassword"}
                    secureTextEntry={true}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </View>
                <View style={styles.buttonGroup}>
                    <EcqButton large primary onPress={() => update()} >
                        <Text style={{ color: 'white' }}>Update</Text>
                    </EcqButton>
                </View>
                {/* <View style={styles.buttonGroup}>
                    <EcqButton large secondary  onPress={() => props.navigation.navigate("Login")} >
                        <Text style={{color:'white'}}>Back to Login</Text>
                    </EcqButton>
                </View> */}
            </FormContainer>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        marginTop: 10,
        alignItems: 'center',
    }
})
export default EditUserForm;