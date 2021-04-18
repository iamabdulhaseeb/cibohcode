import React from 'react';
import {TouchableOpacity,View,Text, Alert} from 'react-native';
import Stripe from 'tipsi-stripe';

Stripe.setOptions({
  publishableKey: 'pk_test_51IPaEECcBMJQip68344dF7r9mRCppFAcgU8MrcGzCI4y85TdoMK8sjd8IhsfnFkCqZst6RNJpipnEq19d3cddwdh00MnnmArsj',
  androidPayMode: 'test', // test || production
});
export default App = props => {
  const canUserPay = async() => {
    try {
      const device_supported = await Stripe.deviceSupportsAndroidPay();
    const can_make_android_pay_payments = await Stripe.canMakeNativePayPayments();

    const token = await Stripe.paymentRequestWithNativePay({
      total_price: '10',
      currency_code: 'USD',
      line_items: [
        {
          currency_code: 'USD',
          description: 'Annual subscription',
          total_price: '10',
          unit_price: '10',
          quantity: '1',
        }
      ]
    });
    Alert.alert('nati',JSON.stringify(token));
    } catch(e) {
      console.log(e);
    }
  }
  return (
    <View style={{flex:1,backgroundColor:"white"}}> 
      <TouchableOpacity onPress={canUserPay}>
        <Text>Pay by google</Text>
      </TouchableOpacity>
    </View>
  )
}