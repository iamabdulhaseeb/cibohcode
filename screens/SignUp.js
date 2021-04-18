import React, { useState } from 'react';
import { StatusBar, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import { MaterialCommunityIcons } from "@expo/vector-icons"

import logo from "../assets/images/loginLogo.png";
import colors from '../config/colors';
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import { AsyncStorage } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} from 'react-native-fbsdk';
import Loadingg from 'react-native-loading-spinner-overlay';
// import GoogleSignIn from 'expo-google-sign-in';
// import * as Google from 'expo-google-app-auth';
// import * as Facebook from 'expo-facebook';
// import * as AppleAuthentication from 'expo-apple-authentication';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
function SignUp({ navigation }) {
    const isAndroid = () => Platform.OS === 'android';
    // async function logIn() {
    //     try {
    //         await Facebook.initializeAsync({
    //             appId: '132949285406045',
    //         });
    //         const {
    //             type,
    //             token,
    //             expirationDate,
    //             permissions,
    //             declinedPermissions,
    //         } = await Facebook.logInWithReadPermissionsAsync({
    //             permissions: ['public_profile'],
    //         });
    //         console.log(permissions);
    //         if (type === 'success') {
    //             // Get the user's name using Facebook's Graph API
    //             const response = await axios.get(`https://graph.facebook.com/me?fields=id,first_name,last_name,email,birthday&access_token=${token}`
    //             );
    //             //             https://graph.facebook.com/me/permissions?
    //             //   access_token=(access-token)
    //             //   &debug=all
    //             // const fbRes = await axios.get(`https://graph.facebook.com/${usr["id"]}?&access_token=${token}`,{
    //             //     "fields":"id,email"
    //             // });
    //             console.log('response of user', response.data);
    //             SocialLoginAPICall('facebook', response.data);
    //         } else {
    //             // type === 'cancel'
    //         }
    //     } catch ({ message }) {
    //         console.log(message);
    //         alert(`Facebook Login Error: ${message}`);
    //     }
    // }
    // const signInAsync = async () => {
    //     try {
    //         const { type, accessToken, user } = await Google.logInAsync({
    //             clientId: isAndroid() ? '849257950475-8ok982sie50kng2qh00snsdcp0ekn9r2.apps.googleusercontent.com' : 'host.exp.exponent.849257950475-0btjo750phj8lkl28d18tem477156cn2.apps.googleusercontent.com',
    //             scopes: ['profile', 'email'],
    //             webClientId:'849257950475-f6tge87ahim5nskau6fgrd8uqmpddjh1.apps.googleusercontent.com'
    //             // iosClientId: `849257950475-0btjo750phj8lkl28d18tem477156cn2.apps.googleusercontent.com`,
    //             // androidClientId: `849257950475-0v5ga3au0b3kurohpnt4hcnod1ke95fn.apps.googleusercontent.com`,
    //             // // iosStandaloneAppClientId: `<YOUR_IOS_CLIENT_ID>`,
    //             // androidStandaloneAppClientId: `849257950475-0v5ga3au0b3kurohpnt4hcnod1ke95fn.apps.googleusercontent.com`,
    //         });

    //         if (type === 'success') {
    //             /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
    //             // Alert.alert('Use',JSON.stringify(user.givenName));
    //             SocialLoginAPICall('google', user);
    //         }
    //     } catch ({ message }) {
    //         alert('login: Error:' + message);
    //     }
    // };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setlastname] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const SignUpFunction = async () => {
        try {
            if (email === '' || password === '' || name === '' || lastname === '' || phone === '') {
                Alert.alert('Invalid Form', 'Please enter all the fields to proceed');
                return
            }
            setLoading(true);

            const SignupAPIResponse = await axios.post(`${baseUrl}/user/signup`, {
                email: email,
                password: password,
                firstname: name,
                lastname: lastname,
                phone: phone
            });
            ToastAndroid.showWithGravity(`Welcome to Ciboh ${name}`, ToastAndroid.LONG, ToastAndroid.CENTER);
            await AsyncStorage.setItem('user', JSON.stringify(SignupAPIResponse.data));
            navigation.navigate('HomeTabs')
            setLoading(false);
        } catch (e) {
            console.log(e.response.data)
            Alert.alert('Error', JSON.stringify(e.response.data.message));
            setLoading(false);
        }
    }
    const signInAsync = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const UserToBeSent = {
                firstname: userInfo.user.givenName,
                lastname: userInfo.user.familyName,
                email: userInfo.user.email,
                id: userInfo.user.id
            }

            await SocialLoginAPICall('google', UserToBeSent);
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
                console.log(error)
                Alert.alert('e', JSON.stringify(error))
                // some other error happened
            }
        }
    };
    const FacebookLogin = async () => {
        try {

            const fbLoginResponse = await LoginManager.logInWithPermissions(['email', 'public_profile']);
            console.log('facebook response', JSON.stringify(fbLoginResponse));
            // if(fbLoginResponse.isCancelled) {
            //   return;
            // } else {
            const gettingToken = await AccessToken.getCurrentAccessToken();
            console.log("🚀 ~ file: index.js ~ line 457 ~ SigningUpWithFacebook ~ gettingToken", gettingToken)
            const accessToken = AccessToken.getCurrentAccessToken().then(async (res) => {
                const response = await axios.get(`https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${res.accessToken}`, {
                    'fields': 'email'
                }
                );
                Alert.alert('rr', JSON.stringify(response.data))
                const userr = {
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    id: response.data.id
                }
                SocialLoginAPICall('facebook', userr);
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

    const SocialLoginAPICall = async (provider, user) => {
        try {
            setLoading(true);
            const socialLoginApiResponse = await axios.post(`${baseUrl}/user/sociallogins`, {
                firstname: provider === 'facebook' ? user.first_name : user.firstname,
                lastname: provider === 'facebook' ? user.last_name : user.lastname,
                phone: '0345311234387286',
                email: user.email,
                provider: provider === 'facebook' ? 'facebook' : 'google',
                ...((provider === 'google') ? { googleId: user.id } : { facebookId: user.id }),
                flag: 'signup'
            });
            ToastAndroid.showWithGravity(`Welcome to Ciboh ${user.givenName}`, ToastAndroid.LONG, ToastAndroid.CENTER);
            await AsyncStorage.setItem('user', JSON.stringify(socialLoginApiResponse.data));
            setLoading(false);
            navigation.navigate('HomeTabs')
        } catch (e) {
            setLoading(false);
            console.log(e);
            Alert.alert('Error', JSON.stringify(e.response.data.Message));
        }
    }

    async function onAppleButtonPress() {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        Alert.alert('response', JSON.stringify(appleAuthRequestResponse));
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="#E8D5D4" />
            <Loadingg visible={loading} />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.shopingContainer}>
                    {/* logo */}
                    <View style={{ flex: 1, top: "10%", flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }} >
                        <Image source={logo} />
                    </View>

                    {/* welcome */}
                    <View style={{ marginTop: "15%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: RFPercentage(4), color: colors.primary, fontFamily: 'Zermatt-First' }} >Welcome Sarah</Text>
                        <Text style={{ maxWidth: 330, fontSize: RFPercentage(2), marginTop: 6, fontFamily: 'sofiaprolight' }} >Try out different dishes, create your own recipe and share them with others</Text>
                    </View>

                    {/* input feilds */}
                    <View style={{ marginTop: "5%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.6) }} >Firstname</Text>
                            <TextInput value={name} onChangeText={nm => setName(nm)} style={{ fontSize: 17, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <View style={{ marginTop: 14 }}>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.6) }} >Lastname</Text>
                            <TextInput value={lastname} onChangeText={(lastn) => setlastname(lastn)} style={{ fontSize: 17, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <View style={{ marginTop: "5%" }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.6) }} >Email</Text>
                            <TextInput value={email} onChangeText={em => setEmail(em)} style={{ fontSize: 17, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <View style={{ marginTop: "5%" }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.6) }} >Password</Text>
                            <TextInput value={password} onChangeText={ps => setPassword(ps)} secureTextEntry={true} style={{ fontSize: 17, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <View style={{ marginTop: "5%" }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.6) }} >Phone Number</Text>
                            <TextInput value={phone} onChangeText={ph => setPhone(ph)} style={{ fontSize: 17, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <View style={{ marginTop: "2%", flexDirection: 'row', alignSelf: 'flex-end' }} >
                            <Text numberOfLines={1} style={{ color: 'grey', fontFamily: 'sofiaprolight', fontSize: RFPercentage(1.7) }} >Already have an account?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                                <Text style={{ fontWeight: 'bold', marginLeft: RFPercentage(0.5), color: colors.primary, fontFamily: 'sofiaprolight', fontSize: RFPercentage(1.8) }} >Login</Text>

                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <TouchableOpacity onPress={SignUpFunction} style={{ backgroundColor: colors.primary, alignItems: 'center', marginTop: RFPercentage(3), marginBottom: RFPercentage(3) }} >
                            {loading ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2.1), color: 'white' }} >Signing up</Text>
                                    <ActivityIndicator size='small' color='white' style={{ left: 20 }} />
                                </View>
                                :
                                <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2.1), color: 'white' }} >Sign Up</Text>}
                        </TouchableOpacity>
                    </View>

                    {/* Sign Uo */}
                    <View style={{ marginBottom: RFPercentage(1), width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <View>
                            <Text style={{ fontSize: RFPercentage(2), color: colors.primary, fontFamily: 'Zermatt-First' }} >Sign Up With {Platform.OS === 'android' ? 'Google' : 'Apple'}/Facebook?</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: "100%" }}>
                            <TouchableOpacity onPress={FacebookLogin} style={{ marginLeft: RFPercentage(1.5), width: '45%', backgroundColor: '#3b5999', alignItems: 'center', marginTop: RFPercentage(2), marginBottom: RFPercentage(3) }} >
                                <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(1.7), color: 'white' }} >Facebook</Text>
                            </TouchableOpacity>
                            {
                                Platform.OS === 'android' ?
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
        marginBottom: 20,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
})

export default SignUp;