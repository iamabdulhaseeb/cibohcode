import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar, Text, Dimensions, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from "@expo/vector-icons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors';
import img from '../assets/images/Rectangle2991.png'
import img2 from '../assets/images/Rectangle99.png'
import feedImg1 from "../assets/images/Rectangle8.png"
import feedImg2 from "../assets/images/Rectangle9.png"
import feedImg3 from "../assets/images/Rectangle18.png"
import feedImg4 from "../assets/images/Rectangle19.png"
// import { Entypo } from '@expo/vector-icons';
import FeedCard from '../components/FeedCard';
import ListCard from '../components/ListCard';
// import { AntDesign } from '@expo/vector-icons';
import FavCard from '../components/FavCard';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import { ImageBackground } from 'react-native';
import {RNCamera} from 'react-native-camera';
import { TextInput } from 'react-native-gesture-handler';
// import { Fontisto } from '@expo/vector-icons';
import { ToastAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import * as TriggerActions from '../Sdk/Store/Actions/trigger';
import Spinner from 'react-native-loading-spinner-overlay';
import Fontisto from 'react-native-vector-icons/Fontisto';
const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const height = width * 0.45
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_VERTICAL_OUTPUT = 30;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

function CreateStatusDetails(props) {
    const [caption,setCaption] = useState('');
    const dispatch = useDispatch();
    const extt = props.route.params.extt;
    const img  = props.route.params.img;
    const video = props.route.params.video;
    console.log(img);
    const [hasPermission, setHasPermission] = useState(null);
    // const [type, setType] = useState(Camera.Constants.Type.back);
    const [loadingStatus,setLoadingStatus] = useState(false);
    // useEffect(() => {
    //     (async () => {
    //       const { status } = await Camera.requestPermissionsAsync();
    //       setHasPermission(status === 'granted');
    //     })();
    //   }, []);
      useEffect(() => {
        getUser();
    },[]);
    const [user,setUser] = useState(null);
    const getUser = async() => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
    }
      const CreateStory = async() => {
          try {
              setLoadingStatus(true)
            const files = [
                {
                    uri: img,
                     type: img.endsWith('mp4') ? 'video/mp4' : `Image/jpg`,
                     name: `selectedImage.${img.endsWith('mp4') ? 'mp4' : 'jpg'}`,
                   },
                { 
                    uri:img,
                    type:'image/jpg',
                    name:'thumbnail.jpg'
                }   
             ]
             const data = new FormData();
             for (var i = 0; i < files.length; i++) {
                 data.append('image',files[i])
             }
           const createStoryResponse = await axios.post(`${baseUrl}/stories/create-story`,{
            StoryDescription:caption,
            StoryContent:'loading....',
            postedBy:user.data[0]._id,
            postedOn: new Date(),
            postedById:user.data[0]._id
           })
           UploadStatusContent(createStoryResponse.data.post._id);
           setCaption('');
           dispatch(TriggerActions.callTrigger());
           setLoadingStatus(false);
           props.navigation.navigate('HomeTabs');
           ToastAndroid.showWithGravity('Status was updated!',ToastAndroid.LONG,ToastAndroid.BOTTOM);
          }catch(e) {
              setLoadingStatus(false);
              Alert.alert('Oops An Error Occured',JSON.stringify(e));
          }
      }
      const UploadStatusContent = async(id) => {
        try {
          const files = [
              {
                  uri: img,
                   type: img.endsWith('mp4') ? 'video/mp4' : `Image/jpg`,
                   name: `selectedImage.${img.endsWith('mp4') ? 'mp4' : 'jpg'}`,
                 },
              { 
                  uri:img,
                  type:'image/jpg',
                  name:'thumbnail.jpg'
              }   
           ]
           const data = new FormData();
           for (var i = 0; i < files.length; i++) {
               data.append('image',files[i])
           }
         const uploadStoryContent = await axios.post(`${baseUrl}/stories/upload-story-content/${id}`,data);

        }catch(e) {
            Alert.alert('Oops An Error Occured',JSON.stringify(e.response.data));
        }
    }
      const cameraRef = useRef();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Spinner visible={loadingStatus}/>
        <StatusBar backgroundColor={colors.primary} />
                  <View style={{
                    width: '100%',
                    height: 100,
                    backgroundColor: colors.primary,
                    borderWidth: 1,
                    borderColor: colors.primary,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center',
                }}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{ top: 10 }} />
                    <Text style={{ fontSize: 19, fontFamily: 'sofiaprolight', color: 'white', top: 10 }}>Add Status</Text>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'white',
                            backgroundColor: 'white',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: 10
                        }}>
                        <Text style={{ color: colors.primary }}>Done</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{
                    flex:1
                }}>
<ImageBackground
                    source={{
                        uri:img,
                    }}
                    style={{
                        width:'100%',
                        height:'100%',
                        
                    }}
                    // imageStyle={{
                    //     resizeMode:'contain'
                    // }}
                    >
                        <View style={{flex:1,borderColor:'white',justifyContent:'center',alignItems:'center'}}>
                        {extt==='mp4'? <Pressable 
                                        onPress={() => {
                                            alert('hey')
                                       props.navigation.navigate('Video',{
                                            videoUrl:video,
                                            thumbnail:img
                                        });
                                        }}
                                        style={{
                                        width:50,
                                        height:50,
                                        borderWidth:1,
                                        borderColor:'white',
                                        backgroundColor:'white',
                                        borderRadius:50/2,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        }}>
                                        <MaterialCommunityIcons name="play" size={40} color={colors.primary} />
                                        </Pressable> : null}
                        </View>
                    <View style={{
                        backgroundColor:'#202020',
                        position:'absolute',
                        bottom:0,
                        height:70,
                        flexDirection:'row',
                        width:'100%'
                    }}>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                       <TextInput
                       value={caption}
                       onChangeText={cp => setCaption(cp)}
                       placeholder='Write your caption...'
                        placeholderTextColor='white'
                        style={{
                            color:'white',
                            width:'85%',
                            fontSize:17,
                            paddingLeft:10
                        }}
                        />
                        <TouchableOpacity 
                        onPress={CreateStory}
                        style={{
                            width:40,
                            height:40,
                            borderWidth:1,
                            borderColor:colors.primary,
                            backgroundColor:colors.primary,
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:40/2,
                            marginLeft:15
                        }}>
                        <Fontisto name="navigate" size={18} style={{textAlign:'center',right:2,top:2}} color="white" />               
                                </TouchableOpacity>
                       </View>
                    </View>
                    </ImageBackground>
                </View>
             </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    camera:{
        flex:1
    }
})


export default CreateStatusDetails;