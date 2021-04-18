// import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StatusBar,StyleSheet, Text, View, ScrollView, SafeAreaView, Image, FlatList, Platform } from 'react-native';
// import Constants from 'expo-constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { ImageBackground, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import {Camera} from 'expo-camera';
import Story from '../components/Story';
import HomeSlider from '../components/HomeSlider';
import colors from '../config/colors';
import Card from '../components/Card';
import moment from 'moment';
import featureImg from "../assets/images/Ellipse5.png"
import feedImg1 from "../assets/images/Rectangle8.png"
import feedImg2 from "../assets/images/Rectangle9.png"
import feedImg3 from "../assets/images/Rectangle18.png"
import feedImg4 from "../assets/images/Rectangle19.png"
import feedImg5 from "../assets/images/Rectangle20.png"
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar as Avatar2 } from 'react-native-paper';
import { Avatar, Accessory } from 'react-native-elements';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import { Alert } from 'react-native';
import { Pressable } from 'react-native';
import { AsyncStorage } from 'react-native';
import {useSelector} from 'react-redux';

const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const height = width * 0.45
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_VERTICAL_OUTPUT = 30;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

const feed = [
    {
        id: 1,
        heading: "Michelle",
        likes: '10k',
        picture: feedImg1,
        description: 'Tasty Strawberry icecream'
    },
    {
        id: 2,
        heading: "Michelle",
        likes: '10k',
        picture: feedImg2,
        description: 'Fruit Salad'
    },
]



export default function SeeAllRecipies(props) {

    const [activeSlide, setActiveSlide] = useState(0); // current active slide card
    
    const paymentStatus = useSelector(pay => pay.payment.status);

    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    useEffect(() => {
        getUser();
    }, []);
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
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

    const [recipies,setRecipies] = useState(null)
    const GetAllRecipies = async() => {
        try {
         const RecipeApiResponse = await axios.get(`${baseUrl}/recipe/get-every-recipe`);
         setRecipies(RecipeApiResponse.data.Data);
         console.log(RecipeApiResponse.data.Data);
        }catch(e) { 
          Alert.alert('Oops',JSON.stringify(e));
        }
    };

    useEffect(() => {
        GetAllRecipies();
    },[]);

    const likeRecipe = async(id) => {
        try {
          const likeRecipeAPIResponse = await axios.post(`${baseUrl}/recipe/like-recipe/${id}/${user.data[0]._id}`);
          await GetAllRecipies();
        }catch(e) {
          Alert.alert('error in like',JSON.stringify(e.response.data));
        }
     }
     const UnlikeRecipe = async(id) => {
        try {
          const UnlikeRecipeAPIResponse = await axios.post(`${baseUrl}/recipe/unlike-recipe/${id}/${user.data[0]._id}`);
          await GetAllRecipies();
        }catch(e) {
          Alert.alert('error in unlike',JSON.stringify(e.response.data));
        }
     }
     const [stories,setStories] = useState(props.route.params.stories);
     const GetStories = async() => {
         try {
             await getUser();
          const getStoriesAPIResponse = await axios.get(`${baseUrl}/stories/get-stories/${user.data[0]._id}`);
          setStories(getStoriesAPIResponse.data.users);
         } catch(e) {
             console.log('line 236',e);
         }
     };
     useEffect(() => {
         GetStories();
     },[]);
     const myStory = props.route.params.myStory;
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="white" />

            {/* Stories */}
            <ScrollView style={{flexDirection:'row',padding:5,alignSelf:'flex-start'}}>
           <View style={{width:'100%',height:50,flexDirection:'row',alignItems:'center',padding:10}}>
           <MaterialCommunityIcons onPress={() => {
               props.navigation.goBack()
           }} name="keyboard-backspace" size={24} color="black" />
               <Text style={{marginLeft:10,fontFamily:'Zermatt-First',fontSize:20}}>Latest Recipe</Text>
               </View>


            </ScrollView>

                    {/* Recomended */}

                    {/* Featured Stories */}
                    
                    {/* latest Feed */}

                        
                        <FlatList
                    data={recipies}
                    numColumns={3}
                    contentContainerStyle={{flexGrow:1}}
                    renderItem={itemData => (
                            <TouchableOpacity 
                            onPress={() => {
                                   if(paymentStatus == null || paymentStatus === false) {
                                       props.navigation.navigate('Payment');
                                   } else {
                                       props.navigation.navigate('Detail',{
                                           recipe:itemData.item,
                                           id:Math.random(),
                                           recipeId:itemData.item._id
                                       })
                                   }
                               }} 
                            style={{
                            width:SCREEN_WIDTH/3,
                            height:100,
                            margin:2
                        }}>
                            <Image source={{uri:`${baseUrl}/${itemData.item.videoThumbnail}`}} style={{width:SCREEN_WIDTH / 3,height:100}}/>
                        </TouchableOpacity> 
                        // <View style={{
                        //     width:'50%',
                        //     paddingBottom:10,
                        //     marginVertical:15,
                        // }}>
                        //    <View style={{
                        //        flexDirection:'row',
                               
                        //    }}>
                        //    <TouchableOpacity onPress={() => {
                        //             props.navigate('UserProfile',{
                        //                 userId:itemData.item.createdBy.id
                        //             })
                        //         }} style={{flexDirection:'row',paddingBottom:10,alignItems:'center' }}>
                        //     <MaterialIcons name="account-circle" color={colors.primary} size={40} style={{marginTop:4,right:1}} />
                        //      <View style={{marginTop:10}}>
                        //      <Text style={{left:5,top:5,fontWeight:'bold'}}>{itemData.item.createdBy.name}</Text>
                             
                        //      <Text style={{paddingHorizontal:5,marginTop:5,marginBottom:10,fontSize:15,fontWeight:'500',color:'grey'}}>{moment(itemData.item.postedOn).fromNow()}</Text>

                        //          </View>
                        //          </TouchableOpacity>
                        //        </View>

                             
                        //      <ImageBackground
                        //      source={{
                        //         uri:`${baseUrl}/${itemData.item.videoThumbnail}`
                        //      }}
                        //      style={{
                        //          width:'100%',
                        //          height:250
                        //      }}
                        //      imageStyle={{
                        //          resizeMode:'cover'
                        //      }}
                        //      >
                        //          <View style={{
                        //              flex:1,
                        //              justifyContent:'center',
                        //              alignItems:'center'
                        //          }}>
                        //          {itemData.item.recipePhotoType === 'mp4' ? 
                        //           <Pressable 
                        //           onPress={() => {
                        //           props.navigation.navigate('Video',{
                        //               videoUrl:`${baseUrl}/${itemData.item.recipePhoto}`,
                        //               thumbnail:`${baseUrl}/${itemData.item.videoThumbnail}`
                        //           });
                        //           }}
                        //           style={{
                        //           width:50,
                        //           height:50,
                        //           borderWidth:1,
                        //           borderColor:'white',
                        //           backgroundColor:'white',
                        //           borderRadius:50/2,
                        //           justifyContent:'center',
                        //           alignItems:'center',
                        //           }}>
                        //           <MaterialCommunityIcons name="play" size={40} color={colors.primary} />
                        //           </Pressable>
                        //         : null}
                        //          </View>
                        //      </ImageBackground>
                        //      <View style={{flexDirection:'row',marginTop:5}}>
                        //      <Pressable style={{
                        //          flexDirection:'row',
                                 
                        //      }}>
                        //                     <TouchableOpacity 
                        //                     // style={{
                        //                     //     right:10,
                        //                     // }}
                        //                     onPress={() => {
                        //                         if(itemData.item.likes.includes(user.data[0]._id)) {
                        //                             UnlikeRecipe(itemData.item._id)
                        //                         } else {
                        //                             likeRecipe(itemData.item._id);
                        //                         }
                        //                     }}>
                        //                     {itemData.item.likes.includes(user.data[0]._id) ? <MaterialCommunityIcons name='heart' size={24} color="red" /> : 
                        //                     <MaterialCommunityIcons name="heart-outline" size={25} color="black" />
                        //                     }
                        //                     </TouchableOpacity>
                        //                     <Text style={{ fontSize: RFPercentage(2) ,fontWeight:'bold',padding:2,fontFamily: 'Roboto', color: 'black'}}>{itemData.item.likes.length}</Text>
                        //                 </Pressable>
                        //                 {/* <Pressable style={{
                        //          flexDirection:'row',
                        //         left:10
                        //      }}>
                        //                     <TouchableOpacity 
                        //                     onPress={() => {
                        //                         props.navigate('PostDetail',{
                        //                             description:itemData.item.postDescription,
                        //                             comments:itemData.item.comments,
                        //                             postId:itemData.item._id
                        //                           })
                        //                     }}
                        //                     >
                        //                     <FontAwesome name="comment-o" size={24} color="black" />
                        //                     </TouchableOpacity>
                        //                     <Text style={{ fontSize: RFPercentage(2) ,fontWeight:'bold',padding:2,fontFamily: 'Roboto', color: 'black',left:3}}>{itemData.item.comments.length}</Text>
                        //                 </Pressable> */}
                        //          </View>
                        //          <Text style={{paddingHorizontal:5,fontSize:15,fontWeight:'bold'}}>{itemData.item.createdBy.name}</Text>
                        //          <Text style={{paddingHorizontal:5,marginTop:2,marginBottom:10,fontSize:15,fontWeight:'bold'}}>{itemData.item.chefsNote}</Text>

                        //     </View>   
                    )}
                    />

                     
                   
                  
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight + RFPercentage(2),
        // marginTop: Platform.OS === 'ios' ? RFPercentage(5) : null,
        flexDirection: 'column'
    },
    scrollView: {
        // flex: 15,
        // justifyContent: 'center',
        // backgroundColor: 'pink',
        width: "90%",

        marginHorizontal: 20,
    },

    belowStoryContainer: {
        marginTop: 5
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
        width: screenWidth, height: 250, paddingLeft: 110,
        paddingHorizontal: 25,
        marginTop: 20
    },
    talkBackground: {
        width: (screenWidth / 2) - 80, height: 140, paddingLeft: 110,
    },

    feedLikes: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        borderWidth:1,
        borderColor:'white',
        borderRadius:30,
        backgroundColor:'white',
        paddingHorizontal:15,
        justifyContent:'center',
        paddingBottom:10,
        paddingVertical:0,
        alignItems:'center',
        height:30
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
    horizontalContainer: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderColor: colors.primary,
        borderStyle: 'dashed',
        borderRadius: 40,
        borderWidth: 1,
        margin: 4,
    },
});
