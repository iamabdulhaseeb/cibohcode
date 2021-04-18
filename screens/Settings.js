import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
// import Constants from 'expo-constants'
// import * as ImagePicker from 'expo-image-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Fontisto, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Badge } from 'react-native-elements'
// import * as DocumentPicker from 'expo-document-picker';
import diamond from "../assets/images/diamond.png"
import colors from '../config/colors';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MaterialIcons } from '@expo/vector-icons';
import { Toast } from 'native-base';
import { ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
const screenWidth = Dimensions.get('window').width;

function Settings(props) {
    const [profile,setProfile] = useState('');
    const [user,setUser] = useState({});
    const [profileOfUser,setProfileOfuser] = useState('');
    const [showUploadButton,setShowUploadButton] = useState(false);
    const userId = props.route.params.userKey;
    const [uploading,setUploading] = useState(false);
    const paymentStatus = useSelector(pay => pay.payment.status);
    const paymentPlan = useSelector(plan => plan.payment.plan);
    const uploadProfile = async() => {
        try {
            setUploading(true);
            const config = {
                name: formDataMade.name,
                type: 'img/jpg',
                uri: formDataMade.uri,
              }
            const data = new FormData();
            data.append('profile',config);
            const uploadProfileAPIResponse = await axios.post(`${baseUrl}/user/profile/${user.data[0]._id}`,data);         
            setUploading(false);
            // await AsyncStorage.setItem('user',JSON.stringify(uploadProfileAPIResponse.data));
            await GetUser();
            ToastAndroid.showWithGravity('Profile was updated',ToastAndroid.LONG,ToastAndroid.CENTER)
   
        }catch(e) {
            setUploading(false);
          Alert.alert('er',JSON.stringify(e));
          console.log(e.response);
        }
    }
    const [formDataMade,setFormDataMade] = useState(null);
    const ChooseImageLibrary = async() => {
        try {
         const img =  await DocumentPicker.getDocumentAsync({type:'image/*'});
         setProfileOfuser(img.uri);
         setProfile(img.uri);
         setFormDataMade(img);
         if(img.uri) {
            setShowUploadButton(true);
         } 
        }catch(e) {
            console.log(e);
          Alert.alert('Error',JSON.stringify(e));
        } 
    }
    // const GetUser = async() => {
    //     const user = await AsyncStorage.getItem('user');
    //     const parsingUSer = JSON.parse(user);
    //     Alert.alert('user',JSON.stringify(parsingUSer.data))
    //     setUser(user);
    //     setProfileOfuser(parsed.data.profile == null ? '' : parsed.data.profile);
    // };
    const [loading,setLoading] = useState(false);
    const GetUser = async () => {
        setLoading(true);
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        console.log("🚀 ~ file: Settings.js ~ line 61 ~ GetUser ~ parsed", parsed)
        setUser(parsed);
        setProfileOfuser(parsed.data[0].profile ? parsed.data[0].profile : '');
        setLoading(false);
        return parsed;
    }
    useEffect(() => {
        GetUser();
    },[]);
    if(user==null||user.length === 0 || loading) {
        return (
            <View style={{
                flex:1,
                backgroundColor:colors.primary,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <ActivityIndicator size='large' color='white'/>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor={'white'} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.recipeContainer}>

                    {/* header */}
                    {/* <View style={{ flexDirection: 'row', flex: 1, width: "95%", marginTop: RFPercentage(1) }} >
                        <TouchableOpacity onPress={() => props.navigation.navigate('Search')} style={{ flexDirection: 'row', width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>
                            <MaterialCommunityIcons size={20} name="chevron-left" />
                            <Text style={{ fontWeight: '700', fontSize: RFPercentage(2) }} >Search</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: 'row', flex: 1, width: "95%", marginTop: RFPercentage(2) }} >
                        <TouchableOpacity style={{ width: "60%", justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: RFPercentage(3) }} >Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack()
                        }} style={{ width: "40%", justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontSize: RFPercentage(2.3), alignSelf: 'flex-end',marginRight:30 }} >Done</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Profile */}
                    <View style={{ marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(3) }} >
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(2), fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.9) }} >Name</Text>
                        </View>
                    </View>

                    <View style={{ paddingBottom: RFPercentage(1.5), flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%" }} >
                        {profileOfUser != '' ? 
                        <ImageBackground 
                        source={{uri:profile ? profile : `${baseUrl}/${profileOfUser}`}} style={{
                            width:90,
                            height:RFPercentage(15)
                        }}
                        imageStyle={{
                            borderWidth:2.5,
                            borderColor:colors.primary,
                            borderRadius:10,
                            marginLeft:10
                        }}
                        >
                         <View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',alignSelf:'flex-end'}}>
                         {showUploadButton ? <TouchableOpacity
                         style={{
                             width:30,
                             height:30,
                             borderWidth:2.5,
                             borderColor:colors.primary,
                             backgroundColor:'white',
                             borderRadius:30/2,
                             justifyContent:'center',
                             alignItems:'center',
                             left:18,
                             bottom:5
                         }}
                         onPress={uploadProfile}>
                             {uploading ? <ActivityIndicator size='small' color={colors.primary}/> :
                            <MaterialIcons name="file-upload" size={19} color="black" />
                                                        }
                         </TouchableOpacity> : null}
                         </View> 
                        </ImageBackground>
                        // <Image
                        // source={{uri:`${baseUrl}/${profileOfUser}`}}
                        // style={{width:90,height:RFPercentage(15),resizeMode:'cover',marginLeft:10}}
                        // />
                        :<View style={{ marginLeft: RFPercentage(2), borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary }} >
                            <Text style={{ paddingLeft: RFPercentage(4), paddingRight: RFPercentage(4), padding: RFPercentage(3), fontFamily: 'Zermatt-First', fontSize: RFPercentage(6) }} >U</Text>
                        </View>}
                        <View style={{ flexDirection: 'column', marginLeft: RFPercentage(2), marginTop: RFPercentage(3) }}>
                            <Text style={{ fontWeight: '700', color: colors.tertiary, lineHeight: 25, fontSize: RFPercentage(3), maxWidth: 190, minWidth: 210, maxHeight: 42 }} >{user.data == null ? 'loading...' : user.data[0].firstname + " " + user.data[0].lastname}</Text>
                            <View style={{flexDirection:'row'}}>
                            {/* <TouchableOpacity onPress={() => {
                                props.navigation.navigate('edit')
                            }}>
                                <Text style={{ marginTop: RFPercentage(1), fontFamily: 'sofiaprolight', fontSize: RFPercentage(2), color: 'black' }} >Edit Image</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('edit')
                            }}>
                                <Text style={{ marginTop: RFPercentage(1), fontFamily: 'sofiaprolight', fontSize: RFPercentage(2), color: 'black' }} >Edit Profile</Text>
                            </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                    {/* Upgrade plan box */}
                    {paymentPlan === 'Annual 24.99$' ? null :  <View style={{ borderRadius: 5, marginTop: RFPercentage(3), marginLeft: "5%", flexDirection: 'column', width: "90%", backgroundColor: colors.feedBar, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ padding: '5%', alignItems: 'center' }} >
                            <View>
                                <Text style={{ color: colors.primary, fontSize: RFPercentage(3.7), fontFamily: 'sofiaprolight' }} >Upgrade to Premium</Text>
                            </View>

                            <View style={{ width: "90%", marginTop: RFPercentage(2) }} >
                                <Text style={{ textAlign: 'center', color: 'grey', fontSize: RFPercentage(2), fontFamily: 'sofiaprolight' }} >
                                    Search collect and save unlimted recipes
                                    from all around the web to your kitchen Stories cookbooks
                                </Text>
                            </View>

                            <View style={{ width: '100%', marginTop: RFPercentage(2) }} >
                                <TouchableOpacity
                                onPress={() => {
                                    props.navigation.navigate('pay')
                                }}
                                style={{ borderRadius: 7, backgroundColor: colors.primary, alignItems: 'center' }} >
                                    <Text style={{ fontFamily: 'sofiaprolight', padding: RFPercentage(1.5), paddingLeft: RFPercentage(3), paddingRight: RFPercentage(3), fontSize: RFPercentage(2.3), color: 'white' }} >Unlock Premium</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}

                    {/* Account */}
                    <View style={{ marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(3) }} >
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(2), fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.9) }} >Account</Text>
                        </View>
                    </View>

                    <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginLeft: RFPercentage(2), marginBottom: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Current Plan</Text>
                        </View>
                        <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end',right:20 }}>
                            <Text style={{ fontWeight: 'bold', color: '#bcb8b8', marginBottom: RFPercentage(1), fontSize: RFPercentage(2.2),marginRight:30 }} >{paymentPlan}</Text>
                        </TouchableOpacity>
                    </View>
                    {paymentPlan !== 'Annual 24.99$' ?   <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5),marginRight:20, borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                       <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Badge
                                status="warning"
                                containerStyle={{ marginRight: RFPercentage(25) }}
                                value={'Try Premium'}
                                textStyle={{ fontSize: RFPercentage(1.8) }}
                                badgeStyle={{ height: 25, width: 100 }}
                            />
                        </View>
                        <TouchableOpacity style={{ marginLeft: RFPercentage(4.3), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </TouchableOpacity>
                    </View> : null}



                    {/* System */}
                    <View style={{ marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(3) }} >
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(2), fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.9) }} >System</Text>
                        </View>
                    </View>

                    <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                            <Fontisto size={20} name="world-o" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Languages</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                            <MaterialCommunityIcons size={20} name="timer-sand" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Measurement System</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                            <MaterialCommunityIcons size={20} name="play-circle-outline" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Video Autoplay</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                            <MaterialCommunityIcons size={20} name="bell-outline" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Notifications</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </View>


                    {/* More */}
                    <View style={{ marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(3) }} >
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(2), fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.9) }} >More</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                    onPress={() => {
                        props.navigation.navigate('faq',{
                            name:user.data[0].firstname
                        })
                    }}
                    style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                            <MaterialCommunityIcons size={20} name="file-delimited-outline" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Recipe creation FAQS</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                            <AntDesign size={20} name="infocirlceo" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >About us</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </View>
                    <View style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                            <AntDesign size={20} name="like2" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Recommend App</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </View>


                    <TouchableOpacity
                    onPress={async() => {
                        setLoading(true);
                        await AsyncStorage.removeItem('user')
                        props.navigation.navigate('SignUp')
                        setLoading(false);
                    }}
                    style={{ paddingBottom: 10, marginBottom: RFPercentage(1.5), borderBottomWidth: 2, borderBottomColor: '#eae5e5', flexDirection: 'row', flex: 1, width: "100%", marginTop: RFPercentage(0.5) }} >
                        <View style={{ marginLeft: RFPercentage(2), flexDirection: 'row' }}>
                        <AntDesign name="setting" size={24} color="black" />
                        </View>
                        <View style={{ width: Platform.OS === 'ios' ? RFPercentage(45) : RFPercentage(40) }}>
                            <Text style={{ marginBottom: RFPercentage(1), marginLeft: RFPercentage(1), fontSize: RFPercentage(2.1) }} >Sign out</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons color={'#bcb8b8'} size={25} name="chevron-right" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>     
                </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    scrollView: {
        flex: 1,
    },
    recipeContainer: {
        flex: 1,
        flexDirection: 'column',
        // marginTop: 40,
        // marginBottom:30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
})

export default Settings;