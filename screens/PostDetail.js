// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import {View,Text,StyleSheet,Image} from 'react-native';
import colors from '../config/colors';
// import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import moment from 'moment';
import { AsyncStorage,StatusBar } from 'react-native';
import { Alert } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { ToastAndroid } from 'react-native';
import { BackHandler } from 'react-native';
import { ActivityIndicator } from 'react-native';
export default PostDetail = props => {
    const [comments,setComments] = useState(null)
    const desc = props.route.params.description;
    const userRecieved = props.route.params.user;
    const postId = props.route.params.postId;
    console.log("🚀 ~ file: PostDetail.js ~ line 17 ~ postId", postId)
    useEffect(() => {
        getUser();
    },[]);
    const [user,setUser] = useState(null);
    const getUser = async() => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
    }
    const [commentVal,setCommentVal] = useState('');
    const CreateComment = async() => {
        try{
         const commentAPIResponse =  await axios.post(`${baseUrl}/comments/create-comment/${postId}`,{
             comment:commentVal,
             commentedOn:new Date(),
             commentedBy:user.data[0]._id,
             userProfile:user != null && user.data !== 0 ? user.data[0].profile != null && user.data[0].profile !== '' ? user.data[0].profile : '' : ''
         });
         setCommentVal('');
         setComments(commentAPIResponse.data.comments);
        }catch(e) { 
            setCommentVal('');
            Alert.alert('error',JSON.stringify(e))
           Alert.alert('Error',JSON.stringify(e.response));
        }
    }
    const [loading,setLoading] = useState(false);
    const GetComments = async() => {
        try{
            console.log(postId);
            setLoading(true);
         const GetCommentsAPIResponse =  await axios.get(`${baseUrl}/comments/get-comments/${postId}`);
         setComments(GetCommentsAPIResponse.data.Data);
         setLoading(false);
        }catch(e) { 
            setLoading(false);
            console.log(e)
           Alert.alert('Error',JSON.stringify(e.response.data));
        }
    }
    const DeleteComment = async(id) => {
        try {
         const DeleteCommentAPIResponse = await axios.delete(`${baseUrl}/comments/delete-comment/${id}`);
         ToastAndroid.showWithGravity('You comment was deleted!',ToastAndroid.LONG,ToastAndroid.BOTTOM);
         await GetComments();
        }catch(e) {
            console.log(e);
          Alert.alert('An Error Occured',JSON.stringify(e.response.data));
        }
    };
    useEffect(() => {
        GetComments();
    },[postId]);
    useEffect(() => {
         props.navigation.addListener('willFocus',() => {
            GetComments();
        });
        return () => {
            console.log('removed');
        }
    },[]);
    // useEffect(() => {
    //     BackHandler.addEventListener('hardwareBackPress',() => {
    //         setComments(null);
    //         props.navigation.navigate('HomeTabs');
    //     });
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress',() => {
    //             console.log('removed');
    //         });
    //     }
    // })
    if(loading || user == null || user.length === 0) {
        return (
            <View style={{
                flex:1,
                backgroundColor:colors.primary,
                justifyContent:'center',
                alignItems:'center'
            }}>
            <ActivityIndicator
            color={'white'}
            size='large'
            />
            </View>
        )
    }
    return (
       <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
           <StatusBar backgroundColor={colors.primary}/>
            <View style={{flex:1}}>
            <View style={{
                width:'100%',
                height:60,
                borderWidth:1,
                borderColor:colors.primary,
                backgroundColor:colors.primary,
                justifyContent:'center',

            }}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{marginRight:10,marginLeft:10 }} />
            <Text style={{color:'white',margin:5,fontSize:19,fontFamily:'sofiaprolight'}}>Comments</Text>
            </View>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'white'}}>
                <Image 
                source={{uri:userRecieved != null  ? userRecieved.profile != null || userRecieved.profile !== '' ? `${baseUrl}/${userRecieved.profile}` : 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg' : 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'}}
                style={{
                    width:50,
                    height:50,
                    borderWidth:4,
                    borderColor:colors.primary,
                    borderRadius:50/2,
                    margin:10
                }}
                />
                <View style={{width:'90%',margin:5}}>
                    <Text style={{fontWeight:'bold',fontFamily:'sofiaprolight',fontSize:17}}>{userRecieved.firstname && userRecieved.lastname ? userRecieved.firstname + " " + userRecieved.lastname : 'loading...'}</Text>
                    <Text style={{width:'85%',fontFamily:'sofiaprolight'}}>{desc}</Text>
                </View>
            </View>
            <View style={{
                width:'100%',
                borderWidth:0.4,
                borderColor:'darkgrey'
            }}/>
        {comments == null || comments.length === 0 ? 
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <Text style={{fontSize:18,fontFamily:'sofiaprolight'}}>Be a first to comment on this post.</Text>
             </View>
 
       
        :<FlatList
            data={comments}
            keyExtractor={item => item}
            renderItem={itemData => (
                <View style={{flexDirection:'row',margin:0.5,padding:10,borderWidth:1,borderBottomWidth:0.4,borderColor:'white',borderBottomColor:'darkgrey',backgroundColor:'white'}}>
                    <Image source={{uri:itemData.item.userProfile != null && itemData.item.userProfile !== '' ? `${baseUrl}/${itemData.item.userProfile}`:'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'}}
                style={{
                    width:40,
                    height:40,
                    borderWidth:1,
                    borderColor:colors.primary,
                    borderRadius:40/2,
                    margin:4,
                    bottom:2
                }}
                />
                    <View style={{width:'80%',left:6}}>
                        <Text style={{fontWeight:'bold',left:5}}>{itemData.item.commentedBy.name}</Text>
                        <Text style={{left:5}}>{itemData.item.comment}</Text>
                        <Text style={{left:5,fontWeight:'bold',color:'grey',fontSize:11}}>{moment(itemData.item.commentedOn).fromNow()}</Text>
                        </View>
                     {itemData.item.commentedBy.id === user.data[0]._id ? 
                      <TouchableOpacity
                      onPress={() => {
                        Alert.alert('Are you sure','Do you really want to delete this comment?',
                        [
                            {text:'No'},
                            {text:'Yes',onPress:() => {
                                DeleteComment(itemData.item._id)
                            }}
                        ]
                        )
                    }}
                      style={{
                          left:10,
                          top:10
                      }}>
                          <MaterialIcons name="delete" size={18} color="black" />
                      </TouchableOpacity> : null }
                    </View> 
            )}
            />}
           
           
           <View style={{
                position:'absolute',
                bottom:0,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                width:'100%',
                elevation:10,
                backgroundColor:'white',
                borderWidth:1,
                borderColor:'white',
                borderTopColor:'darkgrey',
                borderTopWidth:0.4
            }}>
                
               <View style={{flexDirection:'row',alignItems:'center'}}>
               <Image source={{
                   uri:user.data[0].profile == null || user.profile === '' ?
                   'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg':
                   `${baseUrl}/${user.data[0].profile}`
               }}
                style={{
                    width:50,
                    height:50,
                    borderWidth:1,
                    borderColor:colors.primary,
                    borderRadius:50/2,
                    margin:10
                }}
                />
                <TextInput
                value={commentVal}
                onChangeText={vl => setCommentVal(vl)}
                placeholder='Write comment here'
                style={{
                    fontFamily:'sofiaprolight',
                    width:'70%'
                }}
                multiline={true}

                />
               </View>
                <TouchableOpacity 
                onPress={CreateComment}
                style={{
                    padding:10
                }}>
                    <Text style={{color:colors.primary,fontSize:15,fontWeight:'bold'}}>Post</Text>
                </TouchableOpacity>
            </View>
        </View>
       </SafeAreaView>
    )
}