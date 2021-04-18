import React, { useState,useEffect } from 'react';
import {View,Text,ScrollView,TouchableOpacity,TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
// import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import colors from '../config/colors';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
import { ImageBackground } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
// import * as DocumentPicker from 'expo-document-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
export default EditProfile = props => {
    const [userProfile,setUserProfile] = useState('');
    const [firstname,setFirstname] = useState('');
    const [lastname,setlastname] = useState('');
    const [email,setemail] = useState('');
    const [user,setUser] = useState(false);
    const [initialUrl,setInitialUrl] = useState('');
    const [changedUrl,setChangedUrl] = useState('');
    const GetUser = async () => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        console.log("🚀 ~ file: Settings.js ~ line 61 ~ GetUser ~ parsed", parsed)
        setUser(parsed);
        setUserProfile(parsed.data[0].profile ? parsed.data[0].profile : '');
        setFirstname(parsed.data[0].firstname);
        setlastname(parsed.data[0].lastname);
        setemail(parsed.data[0].email);
        setInitialUrl(parsed.data[0].profile ? parsed.data[0].profile : '');
        
        return parsed;
    }
    useEffect(() => {
        GetUser();
    },[]);
    const [loading,setLoading] = useState(false);
    const EditProfile = async() => {
        try {
            setLoading(true);
            const uploadProfileAPIResponse = await axios.patch(`${baseUrl}/user/edit-profile/${user.data[0]._id}`,{
                firstname:firstname,
                lastname:lastname,
            });         
            setLoading(false);
          setShowUploadButton(false);
          if(initialUrl !== userProfile) {
              await uploadProfile();
          }
            await AsyncStorage.setItem('user',JSON.stringify(uploadProfileAPIResponse.data));
            await GetUser();
            ToastAndroid.showWithGravity('Profile was updated',ToastAndroid.LONG,ToastAndroid.CENTER)
   
        }catch(e) {
            setLoading(false);
            console.log(e);
            setLoading(false);
          Alert.alert('er',JSON.stringify(e.response.data));
        }
    }
    const uploadProfile = async() => {
        try {
            setLoading(true);
            const config = {
                name: `selectedimages`,
                type: 'img/jpg',
                uri: userProfile,
              }
            const data = new FormData();
            data.append('profile',config);
            const uploadProfileAPIResponse = await axios.post(`${baseUrl}/user/profile/${user.data[0]._id}`,data);         
            setLoading(false);
          setShowUploadButton(false);
            await AsyncStorage.setItem('user',JSON.stringify(uploadProfileAPIResponse.data));
            await GetUser();
            ToastAndroid.showWithGravity('Profile was updated',ToastAndroid.LONG,ToastAndroid.CENTER)
   
        }catch(e) {
            setLoading(false);
          Alert.alert('er',JSON.stringify(e));
          console.log(e);
        }
    }
    const [showUploadButton,setShowUploadButton] = useState(false);
    const [formDataMade,setFormDataMade] = useState(null);
    const [selectedProfile,setSelectedProfile] = useState('');
    const ChooseImageLibrary = async() => {
        try {
         const img =  await ImagePicker.openPicker({
             mediaType:'photo',
             width:300,
             height:400
         })
         setUserProfile(img.path);
         setSelectedProfile(img.path);
        //  setProfile(img.path);
         setFormDataMade(img);
         
         if(img.path) {
            setShowUploadButton(true);
         } 
        }catch(e) {
            console.log(e);
          Alert.alert('Error',JSON.stringify(e));
        } 
    }
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Spinner visible={loading}/>
            <View style={{width:'100%',elevation:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,height:50,backgroundColor:'white'}}>
           <TouchableOpacity
           onPress={() => {
               props.navigation.goBack();
           }}
           style={{flexDirection:'row',alignItems:'center'}}>
           <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
                <Text style={{left:10,fontSize:15,fontFamily:'sofiaprolight'}}>Edit Profile</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={EditProfile}>
               <Text style={{color:'indigo',fontWeight:'bold'}}>Save</Text>
           </TouchableOpacity>
            </View>

                {userProfile !== '' ? 
                
                <View style={{alignSelf:'center',top:'15%'}}> 
                    <ImageBackground
                    source={{uri:selectedProfile !== '' ? selectedProfile : `${baseUrl}/${userProfile}`}}
                    style={{width:200,height:200}}
                    imageStyle={{borderWidth:1,borderColor:'transparent',borderRadius:30}}
                    >
                        <View style={{position:'absolute',bottom:10,right:0}}>
                        <TouchableOpacity 
                        onPress={ChooseImageLibrary}
                        style={{alignSelf:'flex-end',borderWidth:1,width:35,height:35,borderRadius:35/2,top:15,left:5,padding:7,backgroundColor:'#202020',justifyContent:'center',alignItems:'center'}}>
           <MaterialIcons name="edit" size={15} color="white" />
                          </TouchableOpacity>
                        </View>
                        </ImageBackground>

             
             </View> : null}
             {userProfile === '' ? 
                
                <View style={{alignSelf:'center',top:'15%'}}> 
                   <View style={{width:200,height:200,backgroundColor:colors.primary,borderWidth:1,borderColor:colors.primary,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
                       <Text style={{fontSize:100,color:'white',fontFamily:'sofiaprolight'}}>{firstname[0]}</Text>
                   </View>
                        <View style={{position:'absolute',bottom:10,right:0}}>
                        <TouchableOpacity 
                        onPress={ChooseImageLibrary}
                        style={{alignSelf:'flex-end',borderWidth:1,width:35,height:35,borderRadius:35/2,top:15,left:5,padding:7,backgroundColor:'#202020',justifyContent:'center',alignItems:'center'}}>
              <Entypo name="edit" size={15} color="white" />
                          </TouchableOpacity>
                        </View>
             
             </View> : null}
             <View style={{top:'20%'}}>
                 <TextInput
                 value={firstname}
                 onChangeText={fn => setFirstname(fn)}
                 placeholder='First name'
                 style={{
                     width:'90%',
                     height:50,borderWidth:1,borderColor:'white',elevation:4,backgroundColor:'white',alignSelf:'center',
                     paddingLeft:10,borderRadius:10,margin:10,fontFamily:'sofiaprolight'
                 }}
                 />
                   <TextInput
                   value={lastname}
                   onChangeText={ln => setlastname(ln)}
                 placeholder='Last name'
                 style={{
                     width:'90%',
                     height:50,borderWidth:1,borderColor:'white',elevation:4,backgroundColor:'white',alignSelf:'center',
                     paddingLeft:10,borderRadius:10,margin:5,fontFamily:'sofiaprolight'
                 }}
                 />
                   <TextInput
                   value={email}
                   onChangeText={em => setemail(em)}
                 placeholder='Email'
                 style={{
                     width:'90%',
                     height:50,borderWidth:1,borderColor:'white',elevation:4,backgroundColor:'white',alignSelf:'center',
                     paddingLeft:10,borderRadius:10,margin:10,fontFamily:'sofiaprolight'
                 }}
                 />
             </View>
            {/* <View>
                <Image/>
            </View> */}
        </ScrollView>
        </SafeAreaView>
    )
}