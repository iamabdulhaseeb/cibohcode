import React from 'react';
import {View,Text,TouchableOpacity,ImageBackground,Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../config/colors';
import { StatusBar } from 'react-native';
export default FAQ = props => {
    const name = props.route.params.name;
    return (
        <View>
            <View style={{width:'100%',elevation:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,height:50,top:StatusBar.currentHeight,backgroundColor:'white'}}>
           <View style={{flexDirection:'row'}}>
           <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
                <Text style={{left:10,fontSize:15,fontFamily:'sofiaprolight'}}>FAQ</Text>
           </View>
           {/* <TouchableOpacity onPress={EditProfile}>
               <Text style={{color:'indigo',fontWeight:'bold'}}>Save</Text>
           </TouchableOpacity> */}
            </View>
            <View>
                <Text style={{fontSize:17,fontFamily:'sofiaprolight',top:'20%',width:'95%',alignSelf:'center'}}>Hey {name}, In this FAQ section you are going to learn that how to create recipe on ciboh If you are new play the video and learn. </Text>
                <ImageBackground
                source={{uri:'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}}
                style={{width:'95%',height:300}}
                imageStyle={{alignSelf:'center',left:20,top:'35%',borderWidth:1,borderColor:'white',borderRadius:30}}
                >
                <View style={{top:'40%',justifyContent: "center", alignItems: 'center', flex: 1, alignSelf: 'center' }}>
                            <Pressable
                                onPress={() => {
                                    const url = require('../assets/faq.mp4');
                                    alert(JSON.stringify(url))
                                    props.navigation.navigate('Video', {
                                        videoUrl: 'https://player.vimeo.com/external/271611326.sd.mp4?s=3c5d20003a97a14d38832283944cc78da3d60082&profile_id=164&oauth2_token_id=57447761',
                                        thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
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
                        </View>
                </ImageBackground>
            </View>
        </View>
    )
}