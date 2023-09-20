import { Platform } from "react-native";

//let baseURL = 'http://localhost:3000/api/v1/';//'https://api.ecquatorial.com/api/v1/'; // 'https://ecq-shop-server.herokuapp.com/api/v1/';
let baseURL = '';
{Platform.OS == 'android'
? baseURL = 'https://api.ecquatorial.com/api/v1/' //'http://192.168.144.161:3000/api/v1/'
: baseURL = 'https://api.ecquatorial.com/api/v1/'; //http://localhost:3000/api/v1/';//
}

export default baseURL;