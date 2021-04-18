import axios from "axios"
import { Alert } from "react-native";
import { AsyncStorage } from "react-native"
import { baseUrl } from "../config/baseUrl"

export const getPaymentStatus = async(id) => {
    try {
     const getPayAPIResponse = await axios.get(`${baseUrl}/payment/payment-status/${id}`);
     return getPayAPIResponse.data;
    }catch(e) {
        console.log(e);
      Alert.alert('Error',JSON.stringify(e.response.data));
    }
};