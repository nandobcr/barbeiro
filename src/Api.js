import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://api.b7web.com.br/devbarber/api';
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export default {
    checkToken: async(token) => {
        const data = JSON.stringify({token});
        const response = await axios.post(`${BASE_API}/auth/refresh`, data, config);
        const responseJson = await response.data;
        return responseJson; 
    },
    signIn:  async(email, password) => {
        const data = JSON.stringify({email, password});
        const response = await axios.post(`${BASE_API}/auth/login`, data, config);
        const responseJson = await response.data;
        return responseJson; 
    },
    signUp: async(name, email, password) => {
        const data = JSON.stringify({name, email, password});
        const response = await axios.post(`${BASE_API}/user`, data, config);
        const responseJson = await response.data;
        return responseJson; 
    },
    getBarbeiros: async(lat = null, lng = null, address = null) => {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address${address}`);
        const responseJson = response.data;
        return responseJson;
    }
}