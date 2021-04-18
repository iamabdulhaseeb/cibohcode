import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ImageBackground } from 'react-native';
import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native';
import colors from '../config/colors';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import Modal from 'react-native-modal';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from '../components/StarRating';
import { AsyncStorage } from 'react-native';
export default ReviewScreen = props => {
    const recipe = props.route.params.recipe
    const [reviews,setReviews] = useState([]);
    const [showCreateReviewModal,setshowCreateReviewModal] = useState(false);
    const getReviews = async() => {
        try {
          const getReviewsAPIRESPONSE = await axios.get(`${baseUrl}/review/get-reviews/${recipe._id}`);
          setReviews(getReviewsAPIRESPONSE.data.reviews);
        }catch(e) {
          Alert.alert('Error',JSON.stringify(e));
        }
    };
    useEffect(() => {
        getReviews();
    },[]);
    useEffect(() => {
        getUser();
    }, []);
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
    }
    return (
        <View style={{flex:1,backgroundColor:'white'}}>
            <StatusBar backgroundColor={colors.primary}/>
            <View style={{flex:1}}>
                <ImageBackground
                source={{uri:`${baseUrl}/${recipe.videoThumbnail}`}}
                style={{
                    width:'100%',
                    height:350,
                }}
                imageStyle={{
                    resizeMode:'stretch'
                }}
                >
                     <View style={styles.header}>
                <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack()
                }}
                style={{
                    flexDirection:'row',
                    padding:10
                }}>
<MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{right:10}} />
                    <Text style={{color:'white',fontSize:19,marginLeft:10,fontFamily:'sofiaprolight'}}>Reviews</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('CreateReview',{
                        recipeId:recipe._id,
                        user:{
                            id:user.data[0]._id,
                            name:user.data[0].firstname + " " + user.data[0].lastname
                        }
                    });
                }}>
                <MaterialCommunityIcons name="plus" size={30} color="white" />
                </TouchableOpacity>
            </View>
                  <View style={{flexDirection:'row',flex:1}}>
                      <Text style={{color:'white',fontSize:30,fontFamily:'sofiaprolight',position:'absolute',bottom:'10%',left:10}}>{recipe.title}</Text>
                      <View style={{
                          backgroundColor:'white',
                          paddingHorizontal:15,
                          borderWidth:1,
                          borderColor:'white',
                          borderRadius:30,
                          justifyContent:'center',
                          alignItems:'center',
                          position:'absolute',
                          right:10,
                          top:'10%',
                          padding:5
                      }}>
                          <Text style={{fontFamily:'sofiaprolight'}}>{reviews.length} Reviews</Text>
                      </View>
                  </View>
                    </ImageBackground>
                    <View style={{flex:1,bottom:'2%'}}>
              {reviews == null || reviews.length === 0 ? 
              <View style={{
                  flex:1,
                  justifyContent:'center',
                  alignItems:'center'
              }}>
                  <Text style={{
                      fontSize:18,
                      fontFamily:'sofiaprolight'
                  }}>No review found on this recipe.</Text>
                  <Text style={{
                       fontSize:18,
                       fontFamily:'sofiaprolight'
                  }}>Be the first to review.</Text>
                  </View>
              :<FlatList
                data={reviews}
                keyExtractor={item => item}
                renderItem={itemData => (
                    <View style={{flexDirection:'row',margin:0.5,padding:10,borderWidth:1,borderBottomWidth:0.4,borderColor:'white',borderBottomColor:'darkgrey',backgroundColor:'white'}}>
                    <Image source={{uri:'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}}
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
                        <Text style={{fontWeight:'bold',left:5}}>{itemData.item.name}</Text>
                        <Text style={{left:5}}>{itemData.item.review}</Text>
                        <Text style={{left:5,fontWeight:'bold',color:'grey',fontSize:11}}>{moment(itemData.item.reviewedOn).fromNow()}</Text>
                        </View>
                     {1 === 1 ? 
                      <TouchableOpacity
                      onPress={() => {
                        Alert.alert('Are you sure','Do you really want to delete this comment?',
                        [
                            {text:'No'},
                            {text:'Yes',onPress:() => {
                                DeleteComment(itemData.item)
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
            </View>
            </View>
           
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:60,
        backgroundColor:colors.primary,
        padding:10,
        justifyContent:'space-between',
        top:StatusBar.currentHeight,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    }
})