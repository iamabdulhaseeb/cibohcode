// import { Video } from 'expo-av';
import React,{useState,useEffect} from 'react';
import {View,Text, Dimensions,TouchableOpacity, ImageBackground, Alert} from 'react-native';
// import * as VideoThumbnails from 'expo-video-thumbnails';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import { createThumbnail } from "react-native-create-thumbnail";
import Video from 'react-native-video';

import { StatusBar } from 'react-native';
export default VideoComponent = props => {
    const videoUrlparam = props.route.params.videoUrl;
    const [videoUrl,setVideoUrl] = useState(videoUrlparam);

    const thumbnail = props.route.params.thumbnail;
    useEffect(() => {
       setVideoUrl(videoUrlparam);
    },[videoUrlparam])
    const videoRef = React.useRef();
    const [image, setImage] = useState(null);
//    const generateThumbnail = async () => {
//     try {
//       const { path } = await createThumbnail(videoUrl);
//       setImage(path);
//     } catch (e) {
//       console.warn(e);
//     }
//   };
//     React.useEffect(() => {
//        generateThumbnail();
//     },[]);
    return (
        <View style={{flex:1}}>
            <StatusBar backgroundColor='black'/>
            {/* <ImageBackground source={{uri:thumbnail}} style={{
                width:Dimensions.get('screen').width,
                height:Dimensions.get('screen').height,
            }}
            imageStyle={{
                resizeMode:'stretch'
            }}
            >
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity 
                    onPress={() => {
                        videoRef.current.presentFullscreenPlayer()
                    }}
                    style={{
                        width:100,
                        height:100,
                        borderWidth:1,
                        borderColor:colors.primary,
                        backgroundColor:colors.primary,
                        borderRadius:50/2,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
<MaterialCommunityIcons name="play" size={80} color="white" />
                    </TouchableOpacity>
                    </View>
            </ImageBackground> */}
        <Video 
        ref={videoRef}
        source={{uri:videoUrl}}
        useNativeControls={true}
        fullscreen={true}
        controls={true}
        style={{
            flex:1,

        }}
        resizeMode='contain'
        >
            </Video>
        </View> 
    )
}