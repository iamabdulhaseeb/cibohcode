// import React, { useEffect, useRef, useState } from 'react';
// import { StatusBar,SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
// // import { StatusBar } from 'expo-status-bar';
// // import Constants from 'expo-constants'
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// import colors from '../config/colors';
// import img from '../assets/images/Rectangle2991.png'
// import img2 from '../assets/images/Rectangle99.png'
// import feedImg1 from "../assets/images/Rectangle8.png"
// import feedImg2 from "../assets/images/Rectangle9.png"
// import feedImg3 from "../assets/images/Rectangle18.png"
// import feedImg4 from "../assets/images/Rectangle19.png"
// import Entypo from 'react-native-vector-icons/Entypo';
// // import { Entypo } from '@expo/vector-icons';
// import FeedCard from '../components/FeedCard';
// import ListCard from '../components/ListCard';
// import FavCard from '../components/FavCard';
// import { AsyncStorage } from 'react-native';
// import axios from 'axios';
// import { Alert } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// // import { MaterialIcons } from '@expo/vector-icons';
// import { Pressable } from 'react-native';
// import { baseUrl } from '../config/baseUrl';
// import { ImageBackground } from 'react-native';
// import {Camera} from 'expo-camera';
// import {useIsFocused} from '@react-navigation/native';
// // import * as ImagePicker from 'expo-image-picker';
// import DocumentPicker from 'react-native-document-picker';
// // import * as DocumentPicker from 'expo-document-picker';
// const screenWidth = Dimensions.get('window').width;
// const { width } = Dimensions.get('window');
// const height = width * 0.45
// const SCREEN_WIDTH = Dimensions.get('window').width;
// const CAROUSEL_VERTICAL_OUTPUT = 30;
// const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

// function CreateStatus({ navigation }) {
//     const IsFocused = useIsFocused();
//     console.log(Camera.Constants.Type.front);
//     const [hasPermission, setHasPermission] = useState(null);
//     const [type, setType] = useState(Camera.Constants.Type.back);
//     useEffect(() => {
//         (async () => {
//           const { status } = await Camera.requestPermissionsAsync();
//           setHasPermission(status === 'granted');
//         })();
//       }, []);
//     //   const launchImagePicker = async() => {
//     //       const picker 
//     //   }
//       const cameraRef = useRef(null);
//       const ChooseImageLibrary = async() => {
//         try {
//          const img =  await DocumentPicker.getDocumentAsync({});
//          setProfile(img.uri);
//          uploadProfile(img.name);
//          img.typ
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
//                            navigation.navigate('CreatePost',{
//                                img:cpImg.uri
//                            });
//                         Alert.alert('img',JSON.stringify(cpImg))
                       
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
//                    <TouchableOpacity 
//                 //    onPress={}
//                    style={{
//                        position:'absolute',
//                        right:'10%',
//                        bottom:'5%'
//                    }}>
//                    <Entypo name="image-inverted" size={30} color="white" />
//                    </TouchableOpacity>
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