import React, { useState } from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { baseUrl } from '../config/baseUrl';

export default ForgotPassword = props => {
    const [newPassowrd,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState(''); 
    const [loading,setLoading] = useState(false);
    const email = props.route.params.email;
    const resetPassword = async() => {
        try {
            setLoading(true);
         const resetPasswordAPIResponse = await axios.post(`${baseUrl}/forgot-password/resetpassword`,{
             email:email,
             newpassword:confirmPassword
         });
         ToastAndroid.showWithGravity('Your password was reset successfully',ToastAndroid.LONG,ToastAndroid.BOTTOM);
         setLoading(false);
         props.navigation.navigate('Login');
        } catch(e) {
            console.log(e)
            setLoading(false);
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
             }}>
                <TouchableOpacity
                // onPress={() => {
                //     props.navigation.goBack()
                // }}
                style={{
                    flexDirection:'row',
                }}>
<MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{right:10}} />
                    <Text style={{color:'white',fontSize:19,marginLeft:10,fontFamily:'sofiaprolight'}}>Change Password</Text>
                </TouchableOpacity>
              
            </View>
             <View style={{alignSelf:'center',flex:1,justifyContent:'center',alignItems:'center',width:'100%'}}>
                 <View style={{
                     width:'90%',
                     padding:10
                 }}> 
                 <View>
                 <Text style={{
                     textAlign:'left',
                     fontSize:20,
                     fontFamily:'sofiaprolight',
                     marginBottom:15,
                     marginTop:10
                 }}>Change Password</Text>
                 <TextInput
                 value={newPassowrd}
                 onChangeText={np => setNewPassword(np)}
                 style={{
                     width:'95%',
                     height:45,
                     borderWidth:1,
                     borderColor:'darkgrey',
                     borderRadius:10,
                     paddingLeft:10,
                     fontFamily:'sofiaprolight'
                 }}
                 placeholder='New Password'
                 secureTextEntry={true}
                 />
                  </View>
                  <View>
                 
                 <TextInput
                 value={confirmPassword}
                 secureTextEntry
                 onChangeText={cp => setConfirmPassword(cp)}
                 style={{
                     width:'95%',
                     height:45,
                     borderWidth:1,
                     borderColor:'darkgrey',
                     borderRadius:10,
                     paddingLeft:10,
                     fontFamily:'sofiaprolight',
                     marginTop:10
                 }}
                 placeholder='Confirm password'
                 />
                  </View>
                 </View>
                 

                 <TouchableOpacity 
                 disabled={(newPassowrd === '' || confirmPassword === '') || newPassowrd !== confirmPassword ? true : false}
                 onPress={resetPassword}
                 style={{
                 paddingHorizontal:50,borderWidth:1,
                 padding:10,borderColor:colors.primary,backgroundColor:colors.primary,borderRadius:10,marginTop:15,
                 alignSelf:'flex-start',
                 marginLeft:'8%',
                 bottom:5,
                 opacity:newPassowrd === '' || confirmPassword === '' || newPassowrd !== confirmPassword ? 0.4 : 1
             }}>
                 {
                     loading ?
                     <ActivityIndicator
                     color='white'
                     size='small'
                     />
                     :
                     <Text style={{color:'white',fontFamily:'sofiaprolight',fontSize:16}}>Change</Text>

                 }
             </TouchableOpacity>
             </View>
             
        </View>
    )
}