// import React, { useEffect, useRef, useState } from 'react';
// import { SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants'
// import { MaterialCommunityIcons } from "@expo/vector-icons"
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// import colors from '../config/colors';
// import img from '../assets/images/Rectangle2991.png'
// import img2 from '../assets/images/Rectangle99.png'
// import feedImg1 from "../assets/images/Rectangle8.png"
// import feedImg2 from "../assets/images/Rectangle9.png"
// import feedImg3 from "../assets/images/Rectangle18.png"
// import feedImg4 from "../assets/images/Rectangle19.png"
// import { Entypo } from '@expo/vector-icons';
// import FeedCard from '../components/FeedCard';
// import ListCard from '../components/ListCard';
// import { AntDesign } from '@expo/vector-icons';
// import FavCard from '../components/FavCard';
// import { AsyncStorage } from 'react-native';
// import axios from 'axios';
// import { Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Pressable } from 'react-native';
// import { baseUrl } from '../config/baseUrl';
// import { ImageBackground } from 'react-native';
// import {Camera} from 'expo-camera';
// import {useIsFocused} from '@react-navigation/native';
// import * as DocumentPicker from 'expo-document-picker';
// import * as VideoThumbnails from 'expo-video-thumbnails';
// import { useDispatch } from 'react-redux';
// const screenWidth = Dimensions.get('window').width;
// const { width } = Dimensions.get('window');
// const height = width * 0.45
// const SCREEN_WIDTH = Dimensions.get('window').width;
// const CAROUSEL_VERTICAL_OUTPUT = 30;
// const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

// function CreateStatus({ navigation }) {
//     const IsFocused = useIsFocused();
//     console.log(Camera.Constants.Type.front);
//     const [Img,setImg] = useState('');
//     const [hasPermission, setHasPermission] = useState(null);
//     const [type, setType] = useState(Camera.Constants.Type.back);
//     useEffect(() => {
//         (async () => {
//           const { status } = await Camera.requestPermissionsAsync();
//           setHasPermission(status === 'granted');
//         })();
//       }, []);
//       const cameraRef = useRef(null);
//       const [thumbnail,setThumbnail] = useState('')
//       const ChooseImageLibrary = async() => {
//         try {
//          const img =  await DocumentPicker.getDocumentAsync({});
//          const ext =  img.uri.split(/[#?]/)[0].split('.').pop().trim();
//          setImg(img.uri);
//          if(img.uri.endsWith('mp4')) {
//             const { uri } = await VideoThumbnails.getThumbnailAsync(
//                 img.uri,
//                 {
//                 time: 15000,
//                 }
//             );
//             setThumbnail(uri);   
//             // navigation.navigate('CreateStatusDetail',{
//             //     img:Img,
//             //     thumbnail:thumbnail
//             // });            
//          } else {
//             setImg(img.uri);
//             navigation.navigate('CreateStatusDetail',{
//                 img:Img
//             });
//          }
//         }catch(e) {
//             console.log(e);
//           Alert.alert('Error',JSON.stringify(e));
//         } 
//     }
//     return (
//             <View style={{flex:1}}>
//                 {
//                     IsFocused ? 
//                     <Camera 
                    
//                     style={[styles.camera,StyleSheet.absoluteFillObject]}  ref={cameraRef}>
//                     <TouchableOpacity
//                     onPress={() => {
//                         if(Camera.Constants.Type.back === 0) {
//                             setType(Camera.Constants.Type.front);
//                             return;
//                         } else {
//                             setType(Camera.Constants.Type.back);
//                         }
//                     }}
//                     style={{
//                         margin:10,
//                         top:'5%'
//                     }}>
//                     <MaterialIcons name="flip" size={30} color="white" />
//                     </TouchableOpacity>
//                    <TouchableOpacity
//                    style={{
//                        width:60,
//                        height:60,
//                        borderWidth:3,
//                        borderColor:'white',
//                        elevation:10,
//                        borderRadius:60/2,
//                        justifyContent:'center',
//                        alignItems:'center',
//                        alignSelf:'center',
//                        position:'absolute',
//                        bottom:20,
//                        backgroundColor:'white'
//                    }}
//                    onPress={async() => {
//                            const cpImg = await cameraRef.current.takePictureAsync({skipProcessing: true});
//                            setImg(cpImg.uri);
//                            navigation.navigate('CreateStatusDetail',{
//                                img:cpImg.uri
//                            });
                       
//                    }}
//                    onLongPress={async() => {
//                        const cpVideo = await cameraRef.current.recordAsync();
//                        Alert.alert('recorded',JSON.stringify(cpVideo))
                       
//                    }}
//                    onPressOut={async() => {
//                      const stRecording =  await cameraRef.current.stopRecording();
//                    }}
//                    >
//                    </TouchableOpacity>
//                    {/* <TouchableOpacity 
//                    onPress={ChooseImageLibrary}
//                    style={{
//                        position:'absolute',
//                        right:'10%',
//                        bottom:'5%'
//                    }}>
//                    <Entypo name="image-inverted" size={30} color="white" />
//                    </TouchableOpacity> */}
//              </Camera>
//              : null
//                 }
//             </View>
//     );
// }
// const styles = StyleSheet.create({
//     camera:{
//         flex:1
//     }
// })


// export default CreateStatus;



import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants'
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Pressable } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import { ImageBackground } from 'react-native';
import {useIsFocused} from '@react-navigation/native';
// import * as DocumentPicker from 'expo-document-picker';
import DocumentPicker from 'react-native-document-picker';
// import * as VideoThumbnails from 'expo-video-thumbnails';
import { createThumbnail } from "react-native-create-thumbnail";
import { useDispatch } from 'react-redux';
import {RNCamera} from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import VideoThumbnail from 'react-native-video-thumbnail';

const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
// import * as Permissions from 'expo-permissions';
const height = width * 0.45
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_VERTICAL_OUTPUT = 30;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

function CreateStatus({ navigation }) {
    const IsFocused = useIsFocused();
    const [Img,setImg] = useState('');
    const [hasPermission, setHasPermission] = useState(null);
    const [recording,setRecording]=useState(false);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(RNCamera.Constants.Type.back);
    const [videoUrl,setVideoUrl] = useState('');
    // useEffect(() => {
    //     (async () => {
    //       const { status } = await Camera.requestPermissionsAsync();
    //       setHasPermission(status === 'granted');
    //     })();
    //     (async () => {
    //         const { status, permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    //       })();
    //     // const { status, permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    //     // alert(status);
    //   }, []);

      useEffect(()=>{
        return () => {
            setThumbnail('');
          }
      })
      
    //   const cameraRef = useRef(null);
      const [thumbnail,setThumbnail] = useState('')
      const ChooseImageLibrary = async() => {
        try {
         const img =  await ImagePicker.openPicker({
             mediaType:'any',
             width:300,
             height:400
         });
        
         const ext =  img.path.split(/[#?]/)[0].split('.').pop().trim();
         setImg(img.path);
         console.log(img.path);
         if(img.path.endsWith('mp4')) {
        
            const op = await createThumbnail({
                url:img.path,
                timeStamp:10000
            });
            setThumbnail(op.data);   
                navigation.navigate('CreateStatusDetail',{
                    img:op.data,
                    thumbnail:thumbnail,
                    extt:'mp4',
                    video:img.path
                });
            setThumbnail('');            
         } else {
            setImg(img.path);
            navigation.navigate('CreateStatusDetail',{
                img:img.path,
                thumbnail:img.uri,
                extt:'image',
                video:''
            });
         }
        }catch(e) {
            console.log(e);
          Alert.alert('Error',JSON.stringify(e));
        } 
    }

    // const ChooseImageLibrary = async() => {
    //     try {
    //        const {path} =  await ImagePicker.openPicker({
    //             width: 300,
    //             height: 400,
    //             mediaType:'any'
    //           });
    //           const ext =  path.split(/[#?]/)[0].split('.').pop().trim();
    //           setImg(path);

    //           if(ext === 'mp4') {
    //               console.log(typeof path);
    //              const op = await createThumbnail(JSON.stringify(path));
    //              console.log(op);
    //              setThumbnail(op.path);               
    //           } else {
    //              setImg(path);
    //           }
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }
    
    return (
            <View style={{flex:1}}>
                {
                    IsFocused ? 
                    <RNCamera 
                    type={type}
                    style={[styles.camera,StyleSheet.absoluteFillObject]}  ref={ref => {
                        setCameraRef(ref);
                  }}>
                    <TouchableOpacity
                    onPress={() => {
                        setType(
                          type === RNCamera.Constants.Type.back
                            ? RNCamera.Constants.Type.front
                            : RNCamera.Constants.Type.back
                        )}}
                    // onPress={() => {   
                    //     if(Camera.Constants.Type.back === 0) {
                    //         setType(Camera.Constants.Type.front);
                    //         return;
                    //     } else {
                    //         setType(Camera.Constants.Type.back);
                    //     }
                    // }}
                    style={{
                        margin:10,
                        top:'5%'
                    }}>
                    <MaterialIcons name="flip" size={30} color="white" />
                    </TouchableOpacity>
                   
                   <TouchableOpacity
                   style={{
                       width:60,
                       height:60,
                       borderWidth:recording ? 5 : 3,
                       borderColor:recording?'red':'white',
                       elevation:10,
                       borderRadius:60/2,
                       justifyContent:'center',
                       alignItems:'center',
                       alignSelf:'center',
                       position:'absolute',
                       bottom:20,
                       backgroundColor:"white"
                   }}
                   onPress={async() => {
                    if(cameraRef){
                      let photo = await cameraRef.takePictureAsync({skipProcessing: true});
                
                                 setImg(photo.uri);
                           navigation.navigate('CreateStatusDetail',{
                               img:photo.uri,
                               extt:'jpg'
                           });
                    }
                  }}
                  
                //    onPress={async() => {
                //     if(cameraRef){
                //         let cpImg = await cameraRef.takePictureAsync({skipProcessing: true});
                //         console.log('photo', photo);
                //         alert(JSON.stringify(cpImg));
                //         //    const cpImg = await cameraRef.current.takePictureAsync({skipProcessing: true});

                //            setImg(cpImg.uri);
                //            navigation.navigate('CreateStatusDetail',{
                //                img:cpImg.uri
                //            });
                //    }}}
                //    onPress={async() => {
                //     if(!recording){
                //       setRecording(true)
                //     let video = await cameraRef.recordAsync();
                //     console.log('video', video);
                //   } else {
                //       setRecording(false)
                //       cameraRef.stopRecording()
                //   }

                // onPress={async() => {
                //     if(!recording){
                //       setRecording(true)
                //     let video = await cameraRef.recordAsync();
                //     console.log('video', video);
                //   } else {
                //       setRecording(false)
                //       cameraRef.stopRecording()
                //   }
                // }}

                   onLongPress={
            
                    async() => {
                        try{
                            if(cameraRef){
                                setRecording(true);
                                let cpVideo = await cameraRef.recordAsync();
                                setVideoUrl(cpVideo.uri);
                                alert(videoUrl)
                               
                                // console.log(cpVideo.uri);
                                // alert(cpVideo.uri)
                                // const thumm = await VideoThumbnail.get(cpVideo.uri);
                                // console.log(thumm);
                                // const rs = await createThumbnail({
                                //     url:cpVideo.uri,
                                //     timeStamp:10000
                                // })
                                //    if(rs.data != null && rs.data.length !== 0) {
                                    
                                //    } else {
                                //        alert('an error occured');
                                //    }
                                }

                        }catch(e){
                            alert(e);
                        }
                       
                   }}
                   onPressOut={async() => {
                     setRecording(false);
                     const stRecording = await cameraRef.stopRecording();
                        let photo = await cameraRef.takePictureAsync({skipProcessing: true});
                        navigation.navigate('CreateStatusDetail',{
                            img:photo.uri,
                            thumbnail:photo.uri,
                            video:videoUrl,
                            extt:'mp4'
                        });
                    
                     
                   }}
                   >
                   </TouchableOpacity>
                   <TouchableOpacity 
                   onPress={ChooseImageLibrary}
                   style={{
                       position:'absolute',
                       right:'10%',
                       bottom:'5%'
                   }}>
                   <Entypo name="image-inverted" size={30} color="white" />
                   </TouchableOpacity>
             </RNCamera>
             : null
                }
            </View>
    );
}
const styles = StyleSheet.create({
    camera:{
        flex:1
    }
})


export default CreateStatus;