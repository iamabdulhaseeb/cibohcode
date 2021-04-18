import React, { useState,useRef } from 'react';
import {View,TouchableOpacity,Text,StyleSheet,Pressable} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

export default ForgotPassword = props => {
    const [otp1,setotp1] = useState('');
    const [otp2,setOtp2] = useState('');
    const [otp3,setOtp3] = useState('');
    const [otp4,setOtp4] = useState('');
    const otp1Ref = useRef();
    const otp2Ref = useRef();
    const otp3Ref = useRef();
    const otp4Ref = useRef();
    const gottenOtp = props.route.params.otp;
    const otp = JSON.stringify(gottenOtp);
    console.log("🚀 ~ file: otp.js ~ line 20 ~ otp", otp)
    const email = props.route.params.email;
    return (
        <View style={{
            flex:1,
            backgroundColor:'white'
        }}>
            <StatusBar backgroundColor={colors.primary}/>
             <View style={{
                 width:'100%',
                 height:60,
                 backgroundColor:colors.primary,
                 padding:10,
                 justifyContent:'space-between',
                 flexDirection:'row',
                 alignItems:'center',
                 marginBottom:10,
             }}>
                <Pressable
                onPress={() => {
                    alert('hey')
                    props.navigation.goBack()
                }}
                style={{
                    flexDirection:'row',
                }}>
<MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{right:10}} />
                    <Text style={{color:'white',fontSize:19,marginLeft:10,fontFamily:'sofiaprolight'}}>Verify</Text>
                </Pressable>
              
            </View>
             <View style={{alignSelf:'center',flex:1,justifyContent:'center',alignItems:'center',width:'100%'}}>
                 {/* <View style={{
                     width:'90%',
                     padding:10
                 }}> 
                 <Text style={{
                     fontSize:30,
                     fontFamily:'sofiaprolight',
                     marginLeft:'10%'
                 }}>Verify</Text>
                 </View> */}
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                <TextInput
                ref={otp1Ref}
                 value={otp1}
                 onChangeText={op1 => {
                    setotp1(op1);
                    otp2Ref.current.focus();
                 }}
                 style={styles.otp}
                 />
                     <TextInput
                     ref={otp2Ref}
                 value={otp2}
                 onChangeText={op2 => {
                    setOtp2(op2);
                    otp3Ref.current.focus();
                 }}
                 style={styles.otp}
                 />
                    <TextInput
                    ref={otp3Ref}
                 value={otp3}
                 onChangeText={op3 => {
                    setOtp3(op3)
                     otp4Ref.current.focus();
                 }}
                 style={styles.otp}
                 />
                    <TextInput
                    ref={otp4Ref}
                 value={otp4}
                 onChangeText={op4 => setOtp4(op4)}
                 style={styles.otp}
                 />
                </View>
                 <Text style={{fontFamily:'sofiaprolight',color:'grey',marginTop:10,fontSize:12}}>The Otp is sent to your email address. <Text style={{fontWeight:'bold',color:'blue'}}>Resend</Text></Text>
                 <TouchableOpacity
                 onPress={() => {
                     const str = '';
                     const finalstr =  str.concat(otp1,otp2,otp3,otp4);
                     const num = parseInt(finalstr);
                     if(num === gottenOtp) {
                        props.navigation.navigate('changePassword',{
                            email:email
                        })
                     } else {
                         Alert.alert('Invalid Otp','You have entered invalid or expired otp');
                         return;
                     }
                 }}
                 style={{
                 paddingHorizontal:50,borderWidth:1,
                 padding:10,borderColor:colors.primary,backgroundColor:colors.primary,borderRadius:10,marginTop:15
             }}>
                 <Text style={{color:'white',fontFamily:'sofiaprolight',fontSize:16}}>Send</Text>
             </TouchableOpacity>
             </View>
             
        </View>
    )
}
const styles = StyleSheet.create({
    otp:{
        width:50,
        height:55,
        borderWidth:1,
        borderColor:'darkgrey',
        borderRadius:20,
        fontFamily:'sofiaprolight',
        margin:5,
        fontSize:30,
        textAlign:'center',
        color:'black'
    }
})