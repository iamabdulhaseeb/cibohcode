import React from 'react';
import { Dimensions, Pressable, TouchableOpacity,Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { View, Text } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import colors from '../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import axios from 'axios';
import { Alert } from 'react-native';
export default PostCard = props => {
    const post = props.data;
    const user = props.user;
    const navigation = props.navigation;
    const userProfile = props.profile;
  
    return (
        <View>
            <TouchableOpacity
            onPress={() => {
                if(post.postedBy .id === user.data[0]._id) {
                    navigation.navigate('Feed');
                } else {
                    navigation.navigate('UserProfile',{
                        userId:post.postedBy,
                        code:'94fjdkfhj293'
                    })
                }
            
            }}
            style={{flexDirection:'row',padding:10,top:2}}> 
                        <Image
                        source={{uri:userProfile == null || userProfile === '' ? 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg' : `${baseUrl}/${userProfile}`}}
                        style={{
                            width:25,
                            height:25,
                            borderWidth:1,
                            borderColor:'transparent',
                            borderRadius:25/2
                        }}
                        />
                        <View style={{left:5,top:3}}>
                        <Text style={{color:'black',fontSize:12}}>{post.postedBy.name}</Text>
                        </View>
              </TouchableOpacity>
            <View style={{
            width: Dimensions.get('screen').width / 1.7,
            height: 150,
            borderWidth: 1,
            borderColor: 'white',
            elevation: 10,
            backgroundColor: 'white',
            margin: 5,
            borderRadius:10
        }}>

            <ImageBackground
                source={{ uri: `${baseUrl}/${post.videoThumbnail}` }}
                style={{
                    width: '100%',
                    height: '100%'
                }}
                imageStyle={{
                    borderWidth: 1,
                    borderColor: 'transparent',
                    resizeMode: 'cover',
                    borderRadius:10
                }}
            >
                <View style={{ flex: 1 }}>
                    
                    {post.postedContentType === 'mp4' ?
                        <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, alignSelf: 'center' }}>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Video', {
                                        videoUrl: `${baseUrl}/${post.postedContent}`,
                                        thumbnail: `${baseUrl}/${post.videoThumbnail}`
                                    });
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderWidth: 1,
                                    borderColor: 'white',
                                    backgroundColor: 'white',
                                    borderRadius: 50 / 2,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                    bottom:10
                                }}>
                                <MaterialCommunityIcons name="play" size={40} color={colors.primary} />
                            </Pressable>
                        </View> : 
                        <View style={{ justifyContent: "center", alignItems: 'center', flex: 1, alignSelf: 'center' }}>
                        
                    </View>
                        }

                    <View style={{flexDirection:'column',justifyContent:'space-between',paddingHorizontal:10,bottom:5}}>
                        <Pressable style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            bottom: RFPercentage(1.1),
                            left: RFPercentage(1.1),
                            borderRadius:30,
                            paddingHorizontal:10,
                            justifyContent:'flex-start',
                            alignItems:'center'
                        }}>
                            <TouchableOpacity
                                style={{
                                    right: 7,
                                }}
                                onPress={() => {
                                    if (post.likes.includes(user.data[0]._id)) {
                                        props.UnLikePost();
                                        // UnLikePost(post._id)
                                    } else {
                                        props.LikePost();
                                        // LikePost(post._id);
                                    }
                                }}>
                                {post.likes.includes(user.data[0]._id) ?
                                    <MaterialCommunityIcons name='heart' size={18} color="red" /> :
                                    <MaterialCommunityIcons name="heart-outline" size={18} color="white" />
                                }
                            </TouchableOpacity>
                            <Text style={{ zIndex: 5000, fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'white', right: 3,fontWeight:'bold',bottom:1 }}>{post.likes.length}</Text>
                        </Pressable>
                        {/* <Pressable style={{alignSelf:'flex-end',bottom:6}}>
                        <Feather name="message-circle" size={24} color="white" />
                        </Pressable> */}
                    </View>
                    
                </View>

            </ImageBackground>
            </View>
            <Text style={{
                padding:5,left:4,top:5,fontFamily:'sofiaprolight'
            }}>{post.postDescription}</Text>

        </View>
    )
}