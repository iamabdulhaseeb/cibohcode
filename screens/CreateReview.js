import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ImageBackground } from 'react-native';
import {View,Text,StyleSheet,TouchableOpacity,Image,ScrollView} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import { ActivityIndicator } from 'react-native';
export default CreateReview = props => {
    const recipeId = props.route.params.recipeId;
    const user = props.route.params.user;
    const [loading,setLoading] = useState(false);
    const [reviewText,setReviewText] = useState('');
    const SubmitReview = async() => {
        try {
            setLoading(true);
        const submitReviewAPIResponse = await axios.post(`${baseUrl}/review//create-review/${recipeId}`,{
            review:reviewText,
            // reviewImages:req.body.reviewImages,
            reviewdById:user.id,
            name:user.name,
            reviewedOn:new Date(),
            recipeId:recipeId
        });
        props.navigation.navigate('Reviews');
        setLoading(false);
        }catch(e) {
           Alert.alert('Error',JSON.stringify(e.response.data));
        }
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={{
              width:'100%',
              height:60,
              backgroundColor:colors.primary,
              padding:10,
              justifyContent:'space-between',
              top:StatusBar.currentHeight,
              flexDirection:'row',
              alignItems:'center',
              marginBottom:10
        }}>
                <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack()
                }}
                style={{
                    flexDirection:'row',
                    padding:10
                }}>
<MaterialCommunityIcons name="keyboard-backspace" size={30} color="white" style={{right:10}} />
                    <Text style={{color:'white',fontSize:19,marginLeft:10,fontFamily:'sofiaprolight'}}>Create Review</Text>
                </TouchableOpacity>
               
            </View>
       
       <View style={{
           marginVertical:'10%'
       }}>
           <Text style={{
               fontSize:19,
               fontFamily:'sofiaprolight',
               marginLeft:'5%',
               marginTop:10,
               marginBottom:10
           }}>Review</Text>
          <View style={{
               width:'90%',
               height:200,
               borderWidth:1,
               borderColor:'grey',
               borderRadius:30,
               alignSelf:'center',
               padding:10
           }}>
          <TextInput
           placeholder='Type your review here'
           value={reviewText}
           onChangeText={rt => setReviewText(rt)}
           style={{
               fontSize:19,
               fontFamily:'sofiaprolight',
               padding:10,
               width:'98%',
               height:'90%',
              textAlignVertical:'top'
           }}
           multiline={true}
           maxLength={200}
           />
           <Text style={{fontSize:14,fontWeight:'bold',alignSelf:'flex-end'}}>Max:200 </Text>
          </View>
          <TouchableOpacity
          onPress={SubmitReview}
          style={{
              width:'87%',
              height:45,
              borderWidth:1,
              borderColor:colors.primary,
              backgroundColor:colors.primary,
              justifyContent:'center',
              alignItems:'center',
              borderRadius:20,
              alignSelf:'center',
              marginVertical:'4%'
          }}>
              {
                  loading ? 
                  <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
                      <ActivityIndicator color='white' style='small'/>
                  </View>
                  :
                  <Text style={{color:'white',fontFamily:'sofiaprolight',fontSize:19}}>Submit</Text>

              }
          </TouchableOpacity>
       </View>
       </ScrollView>
    )
}