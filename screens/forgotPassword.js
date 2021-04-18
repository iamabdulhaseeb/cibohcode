import React, { useState } from 'react';
import {View,TouchableOpacity,Text,ActivityIndicator} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import { Alert } from 'react-native';

export default ForgotPassword = props => {
    const [email,setEmail] = useState('');
    const [loading,setloading] = useState(false);
    const generateCode = async() => {
        try {
            setloading(true);
          const generateCodeAPIResponse = await axios.post(`${baseUrl}/forgot-password/generatecode`,{
              email:email
          });
          props.navigation.navigate('otp',
          {
            otp:generateCodeAPIResponse.data.token,
            email:email
          }
          )
          if(generateCodeAPIResponse.data.status === false ){
              return
          }
          Alert.alert('code',JSON.stringify(generateCodeAPIResponse.data))
          setloading(false);
          
        } catch(e) {
            setloading(false);
          console.log(e);
          console.log(e.response.data.message);
          Alert.alert('Error',JSON.stringify(e.response.data.message));
        }
    }
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
                 paddingBottom:10
             }}>
                <TouchableOpacity
                // onPress={() => {
                //     props.navigation.goBack()
                // }}
                style={{
                    flexDirection:'row',
                }}>
<MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{right:10}} />
                    <Text style={{color:'white',fontSize:19,marginLeft:10,fontFamily:'sofiaprolight'}}>Forgot Password</Text>
                </TouchableOpacity>
              
            </View>
             <View style={{alignSelf:'center',flex:1,justifyContent:'center',alignItems:'center',width:'100%'}}>
                 <View style={{
                     width:'90%',
                     padding:10
                 }}> 
                 <Text style={{
                     textAlign:'left',
                     fontSize:20,
                     fontFamily:'sofiaprolight'
                 }}>Email Address</Text>
                 </View>
                 <TextInput
                 value={email}
                 onChangeText={em => setEmail(em)}
                 style={{
                     width:'90%',
                     height:45,
                     borderWidth:1,
                     borderColor:'darkgrey',
                     borderRadius:10,
                     paddingLeft:10,
                     fontFamily:'sofiaprolight',
                     color:'black'
                 }}
                 placeholder='Your Email Address'
                 placeholderTextColor='black'
                 />
                 <Text style={{fontFamily:'sofiaprolight',color:'grey',marginTop:10}}>The Otp will be sent to email address.</Text>
                 <TouchableOpacity
                 onPress={generateCode}
                 style={{
                 paddingHorizontal:50,borderWidth:1,
                 padding:10,borderColor:colors.primary,backgroundColor:colors.primary,borderRadius:10,marginTop:15
             }}>
                 {
                     loading ? 
                     <ActivityIndicator
                     size='small'
                     color={'white'}
                     />
                     :
                     <Text style={{color:'white',fontFamily:'sofiaprolight',fontSize:16}}>Reset</Text>

                 }
             </TouchableOpacity>
             </View>
             
        </View>
    )
}