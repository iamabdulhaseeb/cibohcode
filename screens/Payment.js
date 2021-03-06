import React, { useState,useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Alert, TouchableOpacity,ToastAndroid } from 'react-native';
// import Constants from 'expo-constants'
// import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from "@expo/vector-icons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


import diamond from "../assets/images/diamond.png"
import colors from '../config/colors';
import { AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';

const screenWidth = Dimensions.get('window').width;

function Payment({ navigation }) {
    const [user,setUser] = useState(null);
    const [userId,setUserId] = useState('');
    const [loading,setloading] = useState(false);
    const startTrial = async () => {
           try {
               setloading(true);
               if(user.data == null || user.data.length === 0) {
                   getUser();
                   alert('error occured, try again please');
                   return;
               }
            const trialResponse = await axios.post(`${baseUrl}/trial/start-trial`,{
                userId:userId,
                trialStartedOn:new Date()
            })
            Alert.alert('Trial Response',JSON.stringify(trialResponse.data));
            await AsyncStorage.setItem('user',JSON.stringify(trialResponse.data));
            ToastAndroid.showWithGravity('Your 14 days free trial has been started',ToastAndroid.LONG,ToastAndroid.CENTER);
           setloading(false);
            navigation.navigate('HomeTabs');
           } catch(e) {
               setloading(false);
            Alert.alert('Error',JSON.stringify(e.response.data))
           }
        
    }
    const getUser = async() =>{
        setloading(true);
        const user = await AsyncStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser.data[0]._id);
        setUser(parsedUser);
        setloading(false);
    }
    useEffect(() => {
        getUser();
    },[]);
    const [easyFront, setEasyFront] = useState('black')
    const [easyBack, setEasyBack] = useState('white')

    const [mediumFront, setMediumFront] = useState('white')
    const [mediumBack, setMediumBack] = useState(colors.secondary)

    const [hardFront, setHardFront] = useState('white')
    const [hardBack, setHardBack] = useState(colors.secondary)

    const handleEasy = () => {
        setEasyFront('black')
        setEasyBack('white')

        setMediumFront('white')
        setMediumBack(colors.secondary)

        setHardFront('white')
        setHardBack(colors.secondary)
    }

    const handleMedium = () => {
        setEasyFront('white')
        setEasyBack(colors.secondary)

        setMediumFront('black')
        setMediumBack('white')

        setHardFront('white')
        setHardBack(colors.secondary)
    }

    const handleHard = () => {
        setEasyFront('white')
        setEasyBack(colors.secondary)

        setMediumFront('white')
        setMediumBack(colors.secondary)

        setHardFront('black')
        setHardBack('white')
    }


    // const handleImage = async () => {
    //     let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    //     if (permissionResult.granted === false) {
    //         alert("Permission to access camera roll is required!");
    //         return;
    //     }

    //     let pickerResult = await ImagePicker.launchImageLibraryAsync();
    //     console.log(pickerResult);

    // }
     if(user == null || loading) {
         return (
             <View style={{
                 flex:1,
                 justifyContent:'center',
                 alignItems:'center',
                 backgroundColor:colors.primary
             }}>
                 <ActivityIndicator
                 size='large'
                 color={'white'}
                 />
             </View>
         )
     }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.recipeContainer}>

                    {/* Upload */}
                    <View style={{ flexDirection: 'column', width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ padding: 20, backgroundColor: 'rgba(249, 242, 222, 0.3)', borderRadius: 80 }} >
                            <View style={{ alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 80, padding: 30, paddingLeft: 25, paddingRight: 25 }} >
                                <Image source={diamond} width={(screenWidth / 6) + 18} height={screenWidth / 6 + 18} maxWidth={(screenWidth / 6) + 18} maxHeight={screenWidth / 6} />
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', marginTop: 50 }} >
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.2) }} >one Place for all your recipes</Text>
                    </View>

                    <View style={{ flexDirection: 'column', left: "5%", marginTop: 40 }} >
                        <View style={{ flexDirection: 'row' }} >
                            <MaterialCommunityIcons color={colors.primary} name="star" size={15} style={{ marginTop: 3 }} />
                            <Text style={{ marginLeft: 15, fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.1) }} >Collect unlimited recipes from the web</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row' }} >
                            <MaterialCommunityIcons color={colors.primary} name="star" size={15} style={{ marginTop: 3 }} />
                            <Text style={{ marginLeft: 15, fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.1) }} >Cook recipes in optimized cooking mood</Text>
                        </View>
                        <View style={{ marginTop: 10, flexDirection: 'row' }} >
                            <MaterialCommunityIcons color={colors.primary} name="star" size={15} style={{ marginTop: 3 }} />
                            <Text style={{ marginLeft: 15, fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.1) }} >Access recipes across all your devices</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', marginTop: "7%", alignItems: 'center' }} >
                        <Text style={{ color: colors.primary, fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2) }} >Start your 14 days free trail</Text>
                    </View>

                    {/* Subcribe Button */}
                    <View style={{ width: '100%', marginTop: "5%" }} >
                        <TouchableOpacity
                        onPress={async() => {
                              Alert.alert('Are you sure?','Do you want to start your 14 days free trial?',
                              [{text:'No'},{
                                  text:'Yes',onPress:() => {
                                      startTrial()
                                  }
                              }]
                              )
                            }
                        }
                        style={{ backgroundColor: colors.primary, alignItems: 'center',borderWidth:1,borderColor:'transparent',borderRadius:5 }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >{'Start 80 days trial'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={async() => {
                              navigation.navigate('pay');
                            
                            
                        }} 
                        style={{ backgroundColor: colors.primary, alignItems: 'center',marginTop:10,borderWidth:1,borderColor:'transparent',borderRadius:5 }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >{'subscribe for $24.99 / year'}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ width: '100%', marginTop: "5%", alignItems: 'center' }} >
                        <TouchableOpacity onPress={() => navigation.navigate('MorePlans')} >
                            <Text style={{ color: colors.primary, fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2) }} >Show more plans</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={{ width: '100%', marginTop: "7%", alignItems: 'center' }} >
                        <Text style={{ color: 'black', fontFamily: 'sofiaprolight', fontSize: RFPercentage(2) }} >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum augue sed leo semper tristique. Sed dapibus ultrices eros cursus porttitor. Donec molestie nunc eget justo sodales feugiat.
                            </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight + 20,
        flexDirection: 'column',
        // backgroundColor: 'red',
        width: '100%'
    },
    scrollView: {
        flex: 1,
        width: '90%',
        // justifyContent: 'center',

        // marginHorizontal: 20,
        // backgroundColor: 'pink',
    },
    recipeContainer: {
        // backgroundColor: 'pink',
        // width:'90%',
        flex: 1,
        flexDirection: 'column',
        marginTop: 40,
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
})

export default Payment;