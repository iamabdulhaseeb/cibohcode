import { Alert } from "react-native";
import { exp } from "react-native-reanimated";

export const paymentStatus = 'paymentStatus';
export const setPaymentStatus = status => {
    return({
        type:paymentStatus,
        status:status
    })
};
