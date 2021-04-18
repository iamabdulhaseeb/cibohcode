import React from 'react';
import { Dimensions, Pressable, TouchableOpacity,Image } from 'react-native';
import { ImageBackground } from 'react-native';
import { View, Text } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
// import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import colors from '../config/colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
export default PostCard = props => {
    const post = props.data;
    const user = props.user;
    return (
        <View style={{
            width: Dimensions.get('screen').width / 2,
            height: 150,
            borderWidth: 1,
            borderColor: 'white',
            elevation: 10,
            backgroundColor: 'white',
            margin: 5
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
                    borderRadius: 20,
                    resizeMode: 'cover'
                }}
            >
                <View style={{ flex: 1 }}>
                    <View style={{flexDirection:'row',padding:10}}> 
                        <Image
                        source={{uri:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'}}
                        style={{
                            width:30,
                            height:30,
                            borderWidth:1,
                            borderColor:'transparent',
                            borderRadius:30/2
                        }}
                        />
                        <View style={{left:5,bottom:3}}>
                        <Text style={{color:'white'}}>{post.postedBy.name}</Text>
                        <Text style={{color:'white',fontSize:9}}>{moment(post.postedOn).startOf('hour').fromNow()}</Text>
                        </View>
                    </View>
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
                            borderWidth:1,
                            borderColor:'white',
                            borderRadius:30,
                            backgroundColor:'white',
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
                                        UnLikePost(post._id)
                                    } else {
                                        LikePost(post._id);
                                    }
                                }}>
                                {post.likes.includes(user.data[0]._id) ?
                                    <MaterialCommunityIcons name='heart' size={18} color="red" /> :
                                    <MaterialCommunityIcons name="heart-outline" size={18} color="black" />
                                }
                            </TouchableOpacity>
                            <Text style={{ zIndex: 5000, fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'black', right: 3,fontWeight:'bold',bottom:1 }}>{post.likes.length}</Text>
                        </Pressable>
                        <Pressable style={{alignSelf:'flex-end',bottom:6}}>
                        <Feather name="message-circle" size={24} color="white" />
                        </Pressable>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}