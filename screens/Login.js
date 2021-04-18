import React, { useState } from 'react';
import { Image,StatusBar, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
// import Constants from 'expo-constants'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons'

import logo from "../assets/images/loginLogo.png";
import colors from '../config/colors';
import { Alert } from 'react-native';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import { Toast } from 'native-base';
import { ToastAndroid } from 'react-native';
import {GoogleSignin,statusCodes} from '@react-native-community/google-signin';
// import * as Facebook from 'expo-facebook';
import Spinner from 'react-native-loading-spinner-overlay';
import { getPaymentStatus } from '../Sdk/service';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from 'react-native-fbsdk';
import * as paymentStatusActions from '../Sdk/Store/Actions/paymentAction';
import { useDispatch } from 'react-redux';

function Login({ navigation }) {

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(appleAuthRequestResponse)
    setLoading(true);
    const socialLoginApiResponse = await axios.post(`${baseUrl}/user/apple-authenticate`, {
        firstname: appleAuthRequestResponse.fullName.givenName,
        lastname: appleAuthRequestResponse.fullName.familyName,
        phone: '0345311234387286',
        email: appleAuthRequestResponse.email,
        provider:'apple',
        flag: 'signup',
        appleId:appleAuthRequestResponse.user
    });
    ToastAndroid.showWithGravity(`Welcome to Ciboh ${user.givenName}`, ToastAndroid.LONG, ToastAndroid.CENTER);
    await AsyncStorage.setItem('user', JSON.stringify(socialLoginApiResponse.data));
    setLoading(false);
    navigation.navigate('HomeTabs')  
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }
    const dispatch = useDispatch();
    const [email,setEmail] = useState('amemon90@gmail.com');
    const [password,setPassword] = useState('Property');
    const [loading,setLoading] = useState(false);
//     async function logIn() {
//         try {
//           await Facebook.initializeAsync({
//             appId: '132949285406045',
//           });
//           const {
//             type,
//             token,
//             expirationDate,
//             permissions,
//             declinedPermissions,
//           } = await Facebook.logInWithReadPermissionsAsync({
//             permissions: ['public_profile'],
//           });
//           console.log(permissions);
//           if (type === 'success') {
//             // Get the user's name using Facebook's Graph API
            // const response = await axios.get(`https://graph.facebook.com/me?fields=id,first_name,last_name,email,birthday&access_token=${token}`
            // );
// //             https://graph.facebook.com/me/permissions?
// //   access_token=(access-token)
// //   &debug=all
            // const fbRes = await axios.get(`https://graph.facebook.com/${usr["id"]}?&access_token=${token}`,{
            //     "fields":"id,email"
            // });
//             console.log('response of user',response.data);
//             SocialLoginAPICall('facebook',response.data);
//           } else {
//             // type === 'cancel'
//           }
//         } catch ({ message }) {
//            console.log(message); 
//           alert(`Facebook Login Error: ${message}`);
//         }
//       }
    // const signInAsync = async () => {
    //     try {
    //         const { type, accessToken, user } = await GoogleSignin.logInAsync();
              
    //           if (type === 'success') {
    //             /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
    //             console.log(user);
    //             // Alert.alert('Use',JSON.stringify(user.givenName));
    //             SocialLoginAPICall('google',user);
    //           }
    //     } catch ({ message }) {
    //       alert('login: Error:' + message);
    //     }
    //   };
    const signInAsync = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          const UserToBeSent = {
            firstname:userInfo.user.givenName,
            lastname:userInfo.user.familyName,
            email:userInfo.user.email,
            id:userInfo.user.id
          }
          await SocialLoginAPICall('google',UserToBeSent);
        //   this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              alert('cancelled')
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
              alert('progress')
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            alert('not avai')
          } else {
              Alert.alert('e',JSON.stringify(error))
            // some other error happened
          }
        }
      };
      const FacebookLogin = async() => {
        try {
     
            const fbLoginResponse =  await LoginManager.logInWithPermissions(['email','public_profile']);
            console.log('facebook response',JSON.stringify(fbLoginResponse));
            // if(fbLoginResponse.isCancelled) {
            //   return;
            // } else {
              const gettingToken = await AccessToken.getCurrentAccessToken();
              console.log("🚀 ~ file: index.js ~ line 457 ~ SigningUpWithFacebook ~ gettingToken", gettingToken)
              const accessToken = AccessToken.getCurrentAccessToken().then(async(res) => {
                const response = await axios.get(`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${res.accessToken}`,{
                  'fields':'email'
                }
                );
                Alert.alert('rr',JSON.stringify(response.data))
                const userr = {
                  first_name:response.data.first_name,
                  last_name:response.data.last_name,
                  email:response.data.email,
                  id:response.data.id
                }
                SocialLoginAPICall('facebook',userr);
              })
              // const usertoken = userInfo.idToken;
              // const facebookLoginResponse = await Axios.post(`${baseUrl}${loginWithGoogle}`,{
              //   access_token:accessToken,
              //   channel:'FACEBOOK'
              // },{
              //   params:{
              //     platform:APPLICATIONGLOBAL.PLATFORM.Mobile.value
              //   },
              //   headers:await AuthenticateRequest()
              // });
    
    
              // userJwt.user._RolesArray = userRoles.map(r => r.Id);          
    
              // await SetUserLoginData(facebookLoginResponse.data);
              // await SetCurrentUserData(facebookLoginResponse.data);
              // console.log("🚀 ~ file: index.js ~ line 140 ~ loginFunction ~ loginResponse", facebookLoginResponse.data);
              // const userJwt = facebookLoginResponse.data;
              // const userRoles = await GetUserRoles(facebookLoginResponse.data.user);
              // userJwt.user._Roles = userRoles;
              // await SetCurrentUser(userJwt.user);
              // await SetCurrentUserId(userJwt.user.Id);
      
              // // userJwt.user._RolesArray = userRoles.map(r => r.Id);
              // dispatch(StoreUserDataAction.storeUserData(userJwt.user));
              // console.log('Response of google signin',facebookLoginResponse.data);
              // setLoading(false);
              // props.navigation.navigate('Home');
              
            
          //}
          setLoading(false);
        } catch (e) {
          setLoading(false);
          console.log(e);
          setLoading(false);
        }
      }   
     
    const SocialLoginAPICall = async(provider,user) => {
        try {
            setLoading(true);
         const socialLoginApiResponse = await axios.post(`${baseUrl}/user/sociallogins`,{
            firstname:provider === 'facebook' ? user.first_name : user.firstname,
            lastname:provider === 'facebook' ? user.last_name : user.lastname,
            phone:'0345311234387286',
            email:user.email,
            provider:provider === 'facebook' ? 'facebook' : 'google',
            ...((provider === 'google') ? { googleId: user.id } : {facebookId:user.id}),
            flag:'login'
         });
         setLoading(false);
         ToastAndroid.showWithGravity(`Welcome to Ciboh ${user.firstname}`,ToastAndroid.LONG,ToastAndroid.CENTER);
       const payRes = await getPaymentStatus(socialLoginApiResponse.data.data[0]._id);
       dispatch(paymentStatusActions.setPaymentStatus(payRes))
       setPassword('');
        await AsyncStorage.setItem('user',JSON.stringify(socialLoginApiResponse.data));
         setLoading(false);
         navigation.navigate('HomeTabs')
        } catch(e) {
          setLoading(false)
           console.log(e); 
           Alert.alert('Error',JSON.stringify(e.response.data.Message));
        }
    }
    const LoginFunction = async() => {
        try {
          setLoading(true);
          const loginApiResponse = await axios.post(`${baseUrl}/user/login`,{
            email:email,
            password:password,
        });
          setLoading(false);
          if(loginApiResponse.data.success === false){
              Alert.alert('Error',JSON.stringify(loginApiResponse.data.info.message));
              return;
          } else {
            const payRes = await getPaymentStatus(loginApiResponse.data.data[0]._id);
            dispatch(paymentStatusActions.setPaymentStatus(payRes))
            setPassword(''); 
          navigation.navigate('HomeTabs');
          await AsyncStorage.setItem('user',JSON.stringify(loginApiResponse.data));
          }
        }catch(e) {
          console.log(e);
            setLoading(false);
            console.log(e)
           Alert.alert('Error',JSON.stringify(e.response.data));
        } 
    }
    return (
        <SafeAreaView style={styles.container}>
            <Spinner visible={loading}/>
            <StatusBar style="auto" backgroundColor="#E8D5D4" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.shopingContainer}>
                    {/* logo */}
                    <View style={{ flex: 1, top: "10%", flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Image source={logo} />
                    </View>

                    {/* welcome */}
                    <View style={{ marginTop: "20%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: RFPercentage(4), color: colors.primary, fontFamily: 'Zermatt-First' }} >Welcome Sarah</Text>
                        <Text style={{ maxWidth: 330, fontSize: RFPercentage(2), marginTop: 6, fontFamily: 'sofiaprolight' }} >Try out different dishes, create your own recipe and share them with others</Text>
                    </View>

                    {/* input feilds */}
                    <View style={{ marginTop: "6%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.8) }} >Email</Text>
                            <TextInput 
                            value={email}
                            onChangeText={em => setEmail(em)}
                            style={{ fontSize: 17, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <View style={{ marginTop: "5%" }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.8) }} >Password</Text>
                            <TextInput
                            value={password}
                            secureTextEntry={true}
                            onChangeText={ps => setPassword(ps)}
                            style={{ fontSize: 17, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ForgotPassword')
                        }}
                        style={{ marginTop: "2%",alignSelf:'flex-end' }} >
                            <Text numberOfLines={1} style={{ borderBottomWidth: 1, borderBottomColor: colors.primary, color: colors.primary, fontFamily: 'sofiaprolight', fontSize: RFPercentage(1.7) }} >Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={LoginFunction} style={{ backgroundColor: colors.primary, alignItems: 'center', marginTop: "10%",borderWidth:1,borderColor:'transparent',borderRadius:4 }} >
                            {loading ? 
                            <View style={{flexDirection:'row'}}> 
                            <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2.1), color: 'white' }} >Signing</Text>
                            <ActivityIndicator color='white' size='small' style={{left:20}}/>
                            </View>:
                            <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2.1), color: 'white' }} >Sign in</Text>
                            }
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={{ marginTop: RFPercentage(4), marginBottom: RFPercentage(5), width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <View>
                            <Text style={{ fontSize: RFPercentage(2.5), color: colors.primary, fontFamily: 'Zermatt-First' }} >Sign In With {Platform.OS === 'android' ? 'Google' : 'Apple'}/Facebook?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: "100%" }}>
                        {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  async(data) => {
                    Alert.alert('token',JSON.stringify(await data.toString()))
                    console.log(await data.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
                            <TouchableOpacity onPress={FacebookLogin} style={{ marginLeft: RFPercentage(1.5), width: '45%', backgroundColor: '#3b5999', alignItems: 'center', marginTop: RFPercentage(2), marginBottom: RFPercentage(3) }} >
                                <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(1.7), color: 'white' }} >Facebook</Text>
                            </TouchableOpacity>
                            {Platform.OS === 'android' ?
                                <TouchableOpacity onPress={signInAsync} style={{ marginLeft: RFPercentage(1.5), width: '45%', backgroundColor: '#4081ec', alignItems: 'center', marginTop: RFPercentage(2), marginBottom: RFPercentage(3) }} >
                                    <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(1.7), color: 'white' }} >Google</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={onAppleButtonPress} style={{ justifyContent: 'center', flexDirection: 'row', borderColor: 'black', borderWidth: 1, marginLeft: RFPercentage(1.5), width: '45%', backgroundColor: 'white', alignItems: 'center', marginTop: RFPercentage(2), marginBottom: RFPercentage(3) }} >
                                    <MaterialCommunityIcons style={{ paddingLeft: 10 }} name='apple' color="black" size={RFPercentage(2.5)} />
                                    <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, paddingLeft: 1, fontSize: RFPercentage(1.7), color: 'black' }} >Apple</Text>
                                </TouchableOpacity>
                            }
                        </View>

                    </View>


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8D5D4',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight + 20,
        flexDirection: 'column',
        width: '100%'
    },
    scrollView: {
        // backgroundColor: 'red',
        flex: 1,

        width: '90%',
    },

    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 40,
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
})

export default Login;