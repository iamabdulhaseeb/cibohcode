import axios from 'axios';
// import { StatusBar } from 'expo-status-bar';
import React,{useEffect, useState} from 'react';
import { Alert, Platform } from 'react-native';
import { AsyncStorage } from 'react-native';
import {View,Text,TouchableOpacity,TextInput,ActivityIndicator,StatusBar} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../config/baseUrl';
import colors from '../config/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import { ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Stripe from 'tipsi-stripe';
import {getPaymentStatus} from '../Sdk/service';
import * as paymentStatusActions from '../Sdk/Store/Actions/paymentAction';
import {useDispatch} from 'react-redux';
export default Pay = props => {
    const [cardNumber,setCardNumber] = useState('4444444444444444');
    const [nameOnCard,setNameOnCard] = useState('');
    const [expiryYear,setexpiryYear] = useState();
    const [SecurityCode,setSecurityCode] = useState('123');
    const [expiryMonth,setExpiryMonth] = useState();
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState(null);
    const dispatch = useDispatch()
    const canUserPay = async() => {
        try {
            const options = {
                total_price: '80.00',
                currency_code: 'USD',
                shipping_address_required: false,
                billing_address_required: true,
                shipping_countries: ["US", "CA"],
                line_items: [{
                  currency_code: 'USD',
                  description: 'Ciboh Annual Subscription',
                  total_price: '24.99',
                  unit_price: '23.99',
                  quantity: '1',
                }],
              }
              
              const token = await Stripe.paymentRequestWithNativePay(options);
              Stripe.completeNativePayRequest()
              const createPayment = await axios.post(`${baseUrl}/payment/${user.data[0]._id}`,{
                email:user.data[0].email,
                id:paymentReq.data.id,
                amount:24.99,
                paymentById:user.data[0]._id,
                paymentBy:{
                    name:user.data[0].firstname + " " + user.data[0].lastname,
                    id:user.data[0]._id,
                }
            });
            const payRes = await getPaymentStatus(user.data[0]._id);
            dispatch(paymentStatusActions.setPaymentStatus(payRes))
            ToastAndroid.showWithGravity('You have successfully bought the annual package',ToastAndroid.CENTER,ToastAndroid.LONG);
        Alert.alert('nati',JSON.stringify(createPayment.data));
       
    } catch(e) {
          console.log(e);
        }
      }
      const ApplePayy = async() => {
        try {
            const items = [{
                label: 'Whisky',
                amount: '50.00',
              }, {
                label: 'Tipsi, Inc',
                amount: '50.00',
              }]
              
              const shippingMethods = [{
                id: 'fedex',
                label: 'FedEX',
                detail: 'Test @ 10',
                amount: '10.00',
              }]
              
            //   const options = {
            //     requiredBillingAddressFields: true,
            //     requiredShippingAddressFields: ['phone', 'postal_address'],
            //     shippingMethods,
            //   }
              
              const token = await Stripe.paymentRequestWithApplePay(items);
              Stripe.completeNativePayRequest()
              const createPayment = await axios.post(`${baseUrl}/payment/${user.data[0]._id}`,{
                email:user.data[0].email,
                id:token.tokenId,
                amount:24.99,
                paymentById:user.data[0]._id,
                paymentBy:{
                    name:user.data[0].firstname + " " + user.data[0].lastname,
                    id:user.data[0]._id,
                }
            });
            const payRes = await getPaymentStatus(user.data[0]._id);
            dispatch(paymentStatusActions.setPaymentStatus(payRes))
            ToastAndroid.showWithGravity('You have successfully bought the annual package',ToastAndroid.CENTER,ToastAndroid.LONG);
        Alert.alert('nati',JSON.stringify(payRes));
        console.log(token);
        } catch(e) {
          console.log(e);
        }
      }
    const GetUser = async () => {
        setLoading(true);
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        console.log("🚀 ~ file: Settings.js ~ line 61 ~ GetUser ~ parsed", parsed)
        setUser(parsed);
        setLoading(false);
        return parsed;
    }
    useEffect(() => {
        GetUser();
    },[]);
    
    const requestPayments = async() => {
       
        try {
         setLoading(true);
          const paymentReq = await axios.post('https://api.stripe.com/v1/tokens?card[number]=' + '5555555555554444' + '&card[exp_month]=' + expiryMonth + '&card[exp_year]=' + expiryYear + '&card[cvc]=' + SecurityCode + '&amount=' + Math.trunc(24.99) + '&currency=usd',null,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer sk_test_51IPaEECcBMJQip68UN7EYw19ie4GLdNqhoSv7DjG6MXAU28KDzZLgwxHW0HF17TFOj36fZqpdZk2Xcf30NG7CR9800g3fOca7b"
              }
          });
          const createPayment = await axios.post(`${baseUrl}/payment/${user.data[0]._id}`,{
              email:paymentReq.data.email,
              id:paymentReq.data.id,
              amount:24.99,
              paymentById:user.data[0]._id,
              paymentBy:{
                  name:user.data[0].firstname + " " + user.data[0].lastname,
                  id:user.data[0]._id,
              }
          });
          const payRes = await getPaymentStatus(user.data[0]._id);
          dispatch(paymentStatusActions.setPaymentStatus(payRes))
          ToastAndroid.showWithGravity('You have successfully bought the annual package',ToastAndroid.CENTER,ToastAndroid.LONG);
          setLoading(false);
        }catch(e) {
            setLoading(false);
            console.log(e);
            Alert.alert('Error',JSON.stringify(e.response.data));
        }

      };
      return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Spinner visible={loading}/>
            <StatusBar backgroundColor={colors.primary}/>
            <View style={{
                width:"100%",
                height:100,
                backgroundColor:colors.primary,
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Text style={{color:'white',fontSize:25,fontFamily:'sofiaprolight',top:10}}>Payment Invoice</Text>
            </View>
            <View style={{padding:10,width:'93%',alignSelf:'center'}}>
                <Text style={{padding:10,top:10,fontSize:19,fontFamily:'sofiaprolight'}}>Payment Amount</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                    <Text style={{fontSize:23,fontFamily:'sofiaprolight'}}>24.99$</Text>
                    <TouchableOpacity style={{padding:5,borderWidth:1,paddingHorizontal:30,borderColor:colors.secondary,backgroundColor:colors.secondary,borderRadius:10}}>
                        <Text style={{color:'grey',fontFamily:'sofiaprolight'}}>Yearly</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{alignSelf:'center',width:'90%',justifyContent:'flex-start',alignItems:'flex-start',margin:5}}>
                <Text style={{marginLeft:'3%',fontSize:20,fontFamily:'sofiaprolight',paddingBottom:10}}>Card Number</Text>
                <TextInput
                value={cardNumber}
                onChangeText={cn => setCardNumber(cn)}
                style={{
                    width:'93%',
                    height:50,
                    borderWidth:1,
                    alignSelf:'center',
                    borderColor:'grey',
                    borderRadius:10,
                    fontFamily:'sofiaprolight',
                    fontSize:19,
                    paddingLeft:10
                }}
                />
            </View>
            <View style={{alignSelf:'center',width:'90%',justifyContent:'flex-start',alignItems:'flex-start',margin:10}}>
                <Text style={{marginLeft:'3%',fontSize:20,fontFamily:'sofiaprolight',paddingBottom:10}}>Card Security</Text>
                <TextInput
                value={SecurityCode}
                placeholder='CVC'
                onChangeText={noc => setSecurityCode(noc)}
                style={{
                    width:'93%',
                    height:50,
                    borderWidth:1,
                    alignSelf:'center',
                    borderColor:'grey',
                    borderRadius:10,
                    fontFamily:'sofiaprolight',
                    fontSize:19,
                    paddingLeft:10
                }}
                />
            </View>
           
            <View style={{flexDirection:'row',alignSelf:'center',marginTop:20}}>
                <View style={{
                    width:'85%',borderColor:'grey',
                }}>
                    <Text style={{fontSize:19,fontFamily:'sofiaprolight',marginBottom:10}}>Expiry date</Text>
                   <View style={{flexDirection:'row'}}>
                   <TextInput
                   value={expiryMonth}
                   onChangeText={em => setExpiryMonth(em)}
                   placeholder='MM' style={{
                    borderWidth:1,borderTopLeftRadius:10,borderBottomLeftRadius:10,height:50,borderColor:'grey',borderRightWidth:0.3,
                    paddingLeft:10,
                    width:'50%',
                    fontFamily:'sofiaprolight',
                    fontSize:19
                    
                   }}/>
                    <TextInput 
                    value={expiryYear}
                    onChangeText={ey => setexpiryYear(ey)}
                    placeholder='YY' style={{
                    borderWidth:1,height:50,borderColor:'grey',borderRightWidth:0.3,
                    paddingLeft:10,width:'50%',
                    fontFamily:'sofiaprolight',
                    fontSize:19,borderTopRightRadius:10,borderBottomRightRadius:10
                    
                   }}/>
                   </View>
                </View>
               
            </View>
          
            <TouchableOpacity 
            onPress={requestPayments}
            style={{width:'85%',marginTop:30,height:50,borderWidth:1,borderColor:colors.primary,backgroundColor:colors.primary,alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:15}}>
                {
                    loading ? 
                    <ActivityIndicator color='white' size='small'/>
                    :

                    <Text style={{color:'white',fontSize:18,fontFamily:'sofiaprolight'}}>Pay 24.99$</Text>

                }
            </TouchableOpacity>
            <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:10}}>
                <View style={{
                    borderWidth:1,
                    borderColor:'black',
                    width:"35%"
                    }}/>
                <Text style={{fontSize:18,marginRight:10,marginLeft:10}}>OR</Text>
                <View style={{
                    borderWidth:1,
                    borderColor:'black',
                    width:"35%"
                    }}/>
            </View>
           {
               Platform.OS === 'ios' ?
               <TouchableOpacity 
               onPress={ApplePayy}
               style={{width:'85%',flexDirection:'row',alignItems:'center',marginTop:5,height:50,borderWidth:1,borderColor:'#555555',backgroundColor:'#555555',alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:15}}>
            <AntDesign name='apple1' color='white' size={20}/>
           <Text style={{color:'white',fontSize:18,fontFamily:'sofiaprolight',marginLeft:10}}>Apple Pay</Text>
   
               </TouchableOpacity>
               :
               <TouchableOpacity 
               onPress={canUserPay}
               style={{width:'85%',flexDirection:'row',alignItems:'center',marginTop:5,height:50,borderWidth:1,borderColor:'white',backgroundColor:'white',alignSelf:'center',justifyContent:'center',alignItems:'center',borderRadius:15}}>
            <AntDesign name='google' color='black' size={20}/>
           <Text style={{color:'black',fontSize:18,fontFamily:'sofiaprolight',marginLeft:10}}>Google Pay</Text>
   
               </TouchableOpacity>
           }
        </ScrollView>
    )
}