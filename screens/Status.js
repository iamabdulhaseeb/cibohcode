// import { Video } from 'expo-av';
import React,{useState} from 'react';
import Video from 'react-native-video';

import {View,Text, Dimensions,TouchableOpacity, ImageBackground, Image,StyleSheet} from 'react-native';
// import * as VideoThumbnails from 'expo-video-thumbnails';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../config/colors';
import { StatusBar } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../config/baseUrl';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Alert } from 'react-native';
export default Status = props => {
    const [videoUrl,setVideoUrl] = useState('');
    const videoRef = React.useRef();
    const user = props.route.params.user;
    const statuses = props.route.params.statuses;
    const count = props.route.params.count;
    const [statusIndex,setStatusIndex] = useState(0)
    const [statusContent,setStatusContent] = useState(statuses[0].videoThumbnail);
    const [image, setImage] = useState(null);
    const [showVideo,setShowVideo] = useState(false);

  //  const generateThumbnail = async () => {
  //   try {
  //     const { uri } = await VideoThumbnails.getThumbnailAsync(
  //       videoUrl,
  //       {
  //         time: 15000,
  //       }
  //     );
  //     setImage(uri);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };
  //   React.useEffect(() => {
  //      generateThumbnail();
  //   },[]);
    const SCREEN_WIDTH = Dimensions.get('screen').width;
    const [images,setImages] = useState([]);
    console.log('line 37 pic',`${baseUrl}/${statusContent}`)
    // for (var a=0;a<statuses.length;a++) {
    //    setImages(images.concat(statuses[a].videoThumbnail));
    // }
    return (
        <ScrollView style={{flex:1}}>
            <StatusBar backgroundColor='black'/>
            <ImageBackground source={{uri:`${baseUrl}/${statuses[statusIndex].videoThumbnail}` }} style={{
                width:Dimensions.get('screen').width,
                height:Dimensions.get('screen').height,
            }}
            imageStyle={{
                resizeMode:'cover',
           
            }}
            
            >
        
              

                
                <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:10}}>
                {/* <FlatList
              data={statuses}
              keyExtractor={item => item}
              renderItem={({item,index}) => (
                <View style={{borderWidth:index === statusIndex ? 2 : 1,borderColor:'white',width:SCREEN_WIDTH / (statuses.length) - 5 * statuses.length,margin:10,borderRadius:30,padding:0,height:1}}/>

              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              /> */}
                <View style={{alignItems:'center',borderWidth:1,borderColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:30,backgroundColor:'white',alignSelf:'flex-start',position:'absolute',top:'8%',left:10,flexDirection:'row'}}> 
                <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black" />
                <Image
            source={{uri:user.profile === '' || user.profile == null ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' : `${baseUrl}/${user.profile}`}}
            style={{width:35,marginLeft:5,height:35,borderWidth:1,borderColor:'transparent',borderRadius:35/2}}
            />
                            <Text style={{color:'black',marginLeft:10,fontSize:15,fontFamily:'sofiaprolight'}}>{user.firstname + " " + user.lastname}</Text>
                                </View>
                   <View style={{
                     flexDirection:'row',
                     justifyContent:'space-between',
                     width:'100%',
                     alignItems:'center'
                   }}>
                      <TouchableOpacity 
                     onPress={() => {
                       if(statusIndex === 0) {
                         setStatusIndex(0);
                        props.navigation.navigate('HomeTabs');
                       } else {
                        setStatusIndex(statusIndex - 1);
                       }
                     }}
                     style={{
                      width:40,
                      height:40,
                      borderWidth:1,
                      borderColor:'white',
                      backgroundColor:'white',
                      borderRadius:40/2,
                      justifyContent:'center',
                      alignItems:'center',
                      elevation:10,
                      margin:8
                    }}>
                     <AntDesign name="left" size={24} color="black" />
                      </TouchableOpacity>
                     {statuses[statusIndex].StoryContent.endsWith('mp4') ?  <TouchableOpacity 
                    onPress={() => {
                         setVideoUrl(statuses[statusIndex].StoryContent)
                         setShowVideo(true);
                        videoRef.current.presentFullscreenPlayer()
                    }}
                    style={{
                        width:100,
                        height:100,
                        borderWidth:1,
                        borderColor:'#202020',
                        backgroundColor:'#202020',
                        borderRadius:100/2,
                        justifyContent:'center',
                        alignItems:'center',
                        opacity:0.4
                    }}>
<MaterialCommunityIcons name="play" size={80} color="white" />
                    </TouchableOpacity> : null}
                    {statusIndex+1 !== count ?  <TouchableOpacity
                    onPress={() => {
                      setStatusIndex(statusIndex + 1)
                    }}
                    style={{
                      width:40,
                      height:40,
                      borderWidth:1,
                      borderColor:'white',
                      backgroundColor:'white',
                      borderRadius:40/2,
                      justifyContent:'center',
                      alignItems:'center',
                      elevation:10,
                      margin:8
                    }}>
                    <AntDesign name="right" size={24} color="black" />
                    </TouchableOpacity> : <View style={{width:40,height:40,margin:8}}/>}
                   </View>
                    </View>
                    <Text style={{width:'80%',alignSelf:'center',textAlign:'center',fontSize:20,bottom:'7%',color:'white',fontFamily:'sofiaprolight'}}>{statuses[statusIndex].StoryDescription}</Text>
            </ImageBackground>

            <View style={{width:'100%',top:4}}/>
            <View style={{
              flexDirection:'row',
              alignItems:'center',
              padding:10,
            }}>
           {/* <View style={{
             width:'25%',
             padding:10,
           }}>
           <Image
            source={{uri:user.profile === '' || user.profile == null ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' : `${baseUrl}/${user.profile}`}}
            style={{width:100,height:100,borderWidth:1,borderColor:'transparent',borderRadius:30/2}}
            />
           </View>
            <View style={{marginLeft:'10%'}}> 
              <Text style={{color:colors.primary,fontSize:20,fontFamily:'sofiaprolight'}}>{user.firstname + " " + user.lastname}</Text>
              <Text style={{color:'#202020',fontSize:20,fontFamily:'sofiaprolight'}}>Chef at Ciboh</Text>
              <Text style={{color:colors.primary,fontSize:20,fontFamily:'sofiaprolight'}}>Pro Chef</Text>
            </View> */}
            </View>

        <Video 
        ref={videoRef}
        source={{uri:`${baseUrl}/${videoUrl}`}}
        useNativeControls={true}

        style={{
            flex:1,

        }}
        resizeMode='contain'
        /> 
        </ScrollView> 
    )
}