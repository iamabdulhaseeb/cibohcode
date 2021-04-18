import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Button, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { ImageBackground, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Story from '../components/Story';
import HomeSlider from '../components/HomeSlider';
import colors from '../config/colors';
import Card from '../components/Card';
import featureImg from "../assets/images/Ellipse5.png"
import feedImg1 from "../assets/images/Rectangle8.png"
import feedImg2 from "../assets/images/Rectangle9.png"
import feedImg3 from "../assets/images/Rectangle18.png"
import feedImg4 from "../assets/images/Rectangle19.png"
import feedImg5 from "../assets/images/Rectangle20.png"
import { Pressable } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import Spinner from 'react-native-loading-spinner-overlay';
import DocumentPicker from 'react-native-document-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import RNMediaThumbnail from 'react-native-media-thumbnail';
import RNThumbnail from 'react-native-thumbnail';
import VideoThumbnail from 'react-native-video-thumbnail';
import {encode,decode} from 'base-64';
import base64 from 'react-native-base64'

// import { createThumbnail } from "react-native-thumbnail-generator";
global.Buffer = global.Buffer || require('buffer').Buffer;

const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const height = width * 0.45
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_VERTICAL_OUTPUT = 30;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

export default function CreatePost(props) {
    const [activeSlide, setActiveSlide] = useState(0); // current active slide card
    const [myLocation, setMyLocation] = useState('');
    const [loading,setloading] = useState(false);
    const imgUrl = props.route.params.img;
    const [description,setDescription] = useState('');
    const [generatedThumbnail,setGeneratedThumbnail] = useState('');
   
       // const GetMyLocation = async () => {
    //     try {
    //         const location = await Location.getCurrentPositionAsync();
    //         const geocodedLocation = await Location.reverseGeocodeAsync({
    //             latitude: location.coords.latitude,
    //             longitude: location.coords.longitude
    //         });
    //         setMyLocation(`${geocodedLocation[0].name} ${geocodedLocation[0].region} ${geocodedLocation[0].country}`);
    //     } catch (e) {
    //         console.log(e);
    //         Alert.alert('An error occured');
    //     }
    // }
    // useEffect(() => {
    //     getPermission();
    // }, []);
  
    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    useEffect(() => {
        getUser();
    }, []);
    const [user, setUser] = useState(null);
    const [AddToStatus, setAddToStatus] = useState(false);
    const getUser = async () => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
    }
    const CreatePostFunction = async () => {
        try {
            setloading(true);
            await getUser();
         
            const createPostAPiResponse = await axios.post(`${baseUrl}/post/create-post`, {
                postDescription: description,
                postedContent:imgUrl,
                postedBy: {
                    name:user.data[0].firstname + " " + user.data[0].lastname,
                    id:user.data[0]._id
                  },
                  createdById:user.data[0]._id,
                postedOn: new Date(),
                postedContentType:fileExtension,
                videoThumbnail:choosedImage,
                
            });
            await uploadPostContent(createPostAPiResponse.data.post._id);
            setDescription('');
            setAddToStatus(false);
            setMyLocation('');
            setChoosedImg('');
            setFileExtension('');
            setRealUrl('');
            setloading(false);
            props.navigation.navigate('Home');
        } catch (e) {
            setloading(false);
            console.log(e);
            Alert.alert('Error', JSON.stringify(e.response.data));
        }
    }
    
    function DataURIToBlob(dataURI) {
        if (typeof btoa === 'undefined') {
            global.btoa = function (str) {
              return new Buffer.from(str, 'binary').toString('base64');
            };
          }
          
          if (typeof atob === 'undefined') {
            global.atob = function (b64Encoded) {
              return new Buffer.from(b64Encoded, 'base64').toString('binary');
            };
          }
          alert(typeof atob);
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? global.atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
      }
    const uploadPostContent = async(id) => {
        try {
            // const preview = {
            //     uri: realUrl,
            //      type: fileExtension === 'mp4' ? 'video/mp4' : `Image/${fileExtension}`,
            //      name: `selectedImage.${fileExtension}`,
            //    }
            //  const thumbnail = { 
            //      uri:choosedImage,
            //      type:'image/jpg',
            //      name:'thumbnail'
            //  }   
            alert(fileExtension);
             const files = [
                {
                    uri: realUrl,
                     type: fileExtension === 'mp4' ? 'video/mp4' : `Image/${fileExtension}`,
                     name: `selectedImage.${fileExtension}`,
                   },
                { 
                    uri:choosedImage,
                    type:'image/jpg',
                    name:'thumbnail.jpg'
                }   
             ]
             const data = new FormData();
             for (var i = 0; i < files.length; i++) {
                 data.append('image',files[i])
             }

            const uploadPostContent = await axios.post(`${baseUrl}/post/create-post-content/${id}`,data);
             
        }catch(e) {
            console.log(e)
        //    Alert.alert('Error',JSON.stringify(e));
        }
    }
    const onScroll = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);
    const [choosedImage,setChoosedImg] = useState('');
    const [fileExtension,setFileExtension] = useState('');
    const [realUrl,setRealUrl] = useState('');
    const ChooseImageLibrary = async() => {
        try {
           const {path} =  await ImagePicker.openPicker({
                width: 300,
                height: 400,
                mediaType:'any',
                includeBase64:true
              });
  
              console.log(path);
              const ext =  path.split(/[#?]/)[0].split('.').pop().trim();
              setRealUrl(path);
              setFileExtension(ext);
              if(ext === 'mp4') {
                  console.log(typeof path);
                 const op = await createThumbnail({
                     url:path,
                     timeStamp:10000
                 })
                 console.log(op.path);
                 setGeneratedThumbnail(op.path);
                 setChoosedImg(op.path);               
              } else {
                 setChoosedImg(path);
              }
        } catch(e) {
            console.log(e)
        }
        const checkkk = async() => {
            VideoThumbnail.get('file:///data/user/0/com.finalcode/cache/react-native-image-crop-picker/VID-20210331-WA0010.mp4')
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
        }
        // try {
        //  const img =   await DocumentPicker.pick({
        //     type: [DocumentPicker.types.images,DocumentPicker.types.video],
        //   });
        //  const ext =  img.uri.split(/[#?]/)[0].split('.').pop().trim();
        //  setRealUrl(img.uri);
        //  setFileExtension(img.type === 'video/mp4' ? 'mp4' : 'jpg');
        //  console.log(img);
        //  if(img.type === 'video/mp4') {
        //      const str = JSON.stringify(img.uri);
        //     const op = await createThumbnail(str);
        //     console.log(op);
        //     setChoosedImg(op.path);               
        //  } else {
        //     setChoosedImg(img.uri);
        //  }
        // }catch(e) {
        //     console.log(e);
        //   Alert.alert('Error',JSON.stringify(e));
        // } 
    }
    // const checkkk = async() => {

    //     const path = await createThumbnail('file:///data/user/0/com.finalcode/cache/react-native-image-crop-picker/VID-20210331-WA0010.mp4');
    //     console.log(path);
    // }
    const checkkk = async() => {
       
            RNThumbnail.get('file:///data/user/0/com.finalcode/cache/react-native-image-crop-picker/VID-20210331-WA0010.mp4').then((result) => {
                console.log(result.path); // thumbnail path
              })
    }
    return (
        <View style={styles.container}>
            {/* <Button
            title='press me pls'
            onPress={checkkk}
            />
            <Image
            source={{uri:'file:///data/user/0/com.finalcode/cache/react-native-image-crop-picker/VID-20210331-WA0010.png'}}
            style={{
                width:200,
                height:200
            }}
            /> */}
            <Spinner visible={loading} textContent='creating post...'/>
            {/* <ImageBrowser
          max={4}
          onChange={count => {
              console.log(count)
          }}
          callback={ImagesCallback}
        /> */}
            <SafeAreaView style={{ flex: 1 }}>
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
                    <Text style={{ fontSize: 19, fontFamily: 'sofiaprolight', color: 'white', top: 10 }}>Add Post</Text>
                    <TouchableOpacity
                        onPress={CreatePostFunction}
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
                    width: '100%',
                    height: 130,
                    backgroundColor: 'white',
                    borderWidth: 0.4,
                    borderColor: 'white',
                    borderBottomColor: 'darkgrey'
                }}>
                    <Text style={{ fontSize: 16, padding: 5, left: 5, fontFamily: 'sofiaprolight' }}>Description</Text>
                    <TextInput value={description} onChangeText={d => setDescription(d)} maxLength={500} multiline={true} style={{ paddingLeft: 10 }} placeholder='Tell us bit more about your post please' />
                    <View>
                        <Text style={{ fontSize: 10, color: 'grey', textAlign: 'right', alignSelf: 'flex-end', top: 10, right: 10, fontFamily: 'sofiaprolight' }}>Max:500</Text>
                    </View>
                </View>
                {/* <Pressable onPress={GetMyLocation} style={{
                    flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: 'white', borderWidth: 0.4, borderColor: 'white', borderBottomColor: 'darkgrey', height: 60
                }}>
                    <Entypo name="location-pin" size={30} color={colors.primary} style={{left:5}}/>
                    {
                        myLocation ?
                        <View style={{flexDirection:'row',justifyContent:'space-between',width:'91%'}}>
                            <Text style={{ fontSize: 17, bottom: 3, left: 10, fontFamily: 'sofiaprolight' }}>{myLocation}</Text>
                            <TouchableOpacity onPress={() => setMyLocation('')}>
                            <MaterialIcons name="delete-forever" size={24} color="red" />
                            </TouchableOpacity>
                           </View>
                            :
                            <Text style={{ fontSize: 17, bottom: 3, left: 10, fontFamily: 'sofiaprolight' }}>Add a Place</Text>
                    }            
                      </Pressable> */}
                {/* <Pressable onPress={() => setAddToStatus(prev => !prev)} style={{
                    flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: 'white', borderWidth: 1, borderColor: 'white', height: 60, justifyContent: 'space-between', paddingHorizontal: 10
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name="history" size={28} color={colors.primary} />
                        <Text style={{ fontSize: 17, left: 10, fontFamily: 'sofiaprolight' }}>Add to Status</Text>
                    </View>

                    {
                        AddToStatus ?
                            <MaterialIcons name="done" size={24} color="black" />
                            : null
                    }
                </Pressable> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25,marginTop:'10%' }}>
                    <Text style={{ fontSize: 20, fontFamily: 'sofiaprolight' }}>Preview</Text>
                    <TouchableOpacity onPress={ChooseImageLibrary}>
                        <Text style={{ fontSize: 14, fontFamily: 'sofiaprolight', color: colors.primary, top: 10, fontWeight: 'bold' }}>Change</Text>
                    </TouchableOpacity>
                </View>
                {choosedImage === '' ? 
                <View>
                <TouchableOpacity 
                onPress={ChooseImageLibrary}
                style={{
                    width:'95%',
                    height:'50%',
                    borderWidth:1,
                    margin:10,
                    alignSelf:'center',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:30,
                    marginTop:10,
                    backgroundColor:'darkgrey',
                    borderColor:'darkgrey',
                    flexDirection:'row'
                }}>
                    <Entypo name="folder-images" size={28} color="white" />
                    <Text style={{fontSize:20,marginLeft:10,color:'white',fontFamily:'sofiaprolight',bottom:2}}>Upload Image/Video</Text>
                </TouchableOpacity>
                </View>
                :
                <View style={{
                    width:'100%',
                    height:'30%'
                }}>
                 {fileExtension === 'mp4' ?
                 <ImageBackground
                 source={{uri:choosedImage}}
                 style={{
                     width:'95%',
                     height:'100%',
                     alignSelf:'center',
                     margin:10,
                     left:10
                 }}
                 imageStyle={{
                     resizeMode:'cover',
                     borderWidth:1,
                     borderColor:'transparent',
                     borderRadius:20
                 }}
                 >
                     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <TouchableOpacity
                         onPress={() => {
                             props.navigation.navigate('Video',{
                                 videoUrl:realUrl,
                                 thumbnail:choosedImage,
                             })
                         }}
                         style={{
                             width:45,
                             height:45,
                             borderWidth:1,
                             borderColor:colors.primary,
                             backgroundColor:colors.primary,
                             borderRadius:10,
                             justifyContent:'center',
                             alignItems:'center'
                         }}>
<Entypo name="controller-play" size={30} color="white" />
                         </TouchableOpacity>
                     </View>
                </ImageBackground>
                 :
                 <View style={{
                     width:'100%',
                     height:'100%'
                 }}>
                     <Image
                    source={{ uri: choosedImage }}
                    style={{ width: '95%', height: 250, alignSelf: 'center', top: 5, borderWidth: 1, borderColor: 'white', borderRadius: 10, margin: 4 }}
                />
                     </View>
                 }
                </View>
                }
         
            
            </SafeAreaView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    scrollView: {
        // flex: 15,
        // justifyContent: 'center',
        // backgroundColor: 'pink',
        width: "90%",

        marginHorizontal: 20,
    },

    belowStoryContainer: {
        marginTop: 30
    },

    featuredContainer: {
        marginTop: 15,
        // width: "100%"
    },

    featuredStories: {
        flex: 1,
        backgroundColor: colors.secondary,
        flexDirection: 'row',
    },
    featureHeading: {
        // fontWeight: '900',
        padding: 25,
        fontSize: RFPercentage(1.7),
        maxWidth: "70%"
    },

    featureImg: {
        left: 17,
        alignSelf: 'flex-end',
        top: -35
    },
    featureTitle: {
        fontSize: RFPercentage(3.3),
        fontWeight: '600',
        lineHeight: 27,
        letterSpacing: -0.5,
        textAlign: 'left',
        marginBottom: 10
    },
    subHeading: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'center',
        bottom: 23,
        alignItems: 'center',
        left: 25
    },
    likes: {
        flexDirection: 'row',
        left: 60,
    },


    feedContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 25,
        // justifyContent: 'center',
        // alignItems: 'flex-start'
    },
    talkContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: -10,
        marginBottom: 30
        // justifyContent: 'center',
        // alignItems: 'flex-start'
    },
    feedTitle: {
        fontSize: RFPercentage(3.3),
        fontWeight: '600',
        lineHeight: 27,
        letterSpacing: -0.5,
        textAlign: 'left',
        marginBottom: 10
    },
    talkTitle: {
        fontSize: RFPercentage(3.3),
        fontWeight: '600',
        lineHeight: 27,
        letterSpacing: -0.5,
        textAlign: 'left',
        marginBottom: 1
    },
    feedCards: {
        flexDirection: 'column',
    },
    feedCards3: {
        // flex: 1,
        flexDirection: 'row',
        marginTop: 20

    },
    feedCards2: {
        flexDirection: 'column',
        left: 10
    },

    background: {
        width: (screenWidth / 2) - 30, height: 110, paddingLeft: 110,
        paddingHorizontal: 25,
        marginTop: 20
    },
    talkBackground: {
        width: (screenWidth / 2) - 80, height: 140, paddingLeft: 110,
    },

    feedLikes: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: RFPercentage(1.1),
        left: RFPercentage(1.1)
    },

    screen: {
        // backgroundColor: "red",
        // width: SCREEN_WIDTH
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    dotsPgae: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: -5,
        marginRight: '5%'
    },
});