// import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, FlatList, ActivityIndicator,StatusBar } from 'react-native';
// import Constants from 'expo-constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { ImageBackground, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import {Camera} from 'expo-camera';
import Story from '../components/Story';
import HomeSlider from '../components/HomeSlider';
import colors from '../config/colors';
import Card from '../components/Card';
import {useIsFocused} from '@react-navigation/native';
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
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { AntDesign } from '@expo/vector-icons';
// import { Video, AVPlaybackStatus } from 'expo-av';
// import WebView from 'react-native-webview';
import { getPaymentStatus } from '../Sdk/service';
import { useDispatch, useSelector } from 'react-redux';
import * as paymentStatusActions from '../Sdk/Store/Actions/paymentAction';
import { callTrigger, callUnTrigger } from '../Sdk/Store/Actions/trigger';
import PostCard from '../components/PostCard';
const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const height = width * 0.45
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_VERTICAL_OUTPUT = 30;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;




export default function Home({ navigation }) {

    const [activeSlide, setActiveSlide] = useState(0); // current active slide card
    const [showStatus,setshowstatus] = useState(false);
    const [statusIndex,setStatusIndex] = useState(1);
    const [showAllStatusesIndex,setShowAllStatusesIndex] = useState(1);
    const paymentStatus = useSelector(pay => pay.payment.status);
    const paymentPlan = useSelector(plan => plan.payment.plan);
    const [loadingPayment,setLoadingPayment] = useState(false);
    const [recommendedRecipies,setRecommendedRecipies] = useState([]);
    const [stories,setStories] = useState([]);
    const dispatch = useDispatch();
    const trigger = useSelector(state => state.trigger.triggerVal);
    async function getstatus() {
        try {
         await getUser();
         const paymentStatusResponse = await getPaymentStatus(user.data[0]._id);
         dispatch(paymentStatusActions.setPaymentStatus(paymentStatusResponse));
        } catch(e) {
            console.log(e);
        }
   
 }
    useEffect(() => {
       (async() => {
        await getstatus();
       })()
    },[trigger,recipies,posts,user]);
    const video  = useRef(null);
    // const focused = useIsFocused();
    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    useEffect(() => {
        getUser();
        getstatus();
    }, [trigger]);
    const [userId,setUserId] = useState('');
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
        console.log('line 90 profile',parsed.data[0].profile);
        setUserId(parsed.data[0]._id);
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
    const requestPayment = async() => {
       
        try {
   
          const paymentReq = await axios.post('https://api.stripe.com/v1/tokens?card[number]=' + '5555555555554444' + '&card[exp_month]=' + '11' + '&card[exp_year]=' + '21' + '&card[cvc]=' + '123' + '&amount=' + Math.trunc(1230) + '&currency=usd',null,{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer sk_test_51IPaEECcBMJQip68UN7EYw19ie4GLdNqhoSv7DjG6MXAU28KDzZLgwxHW0HF17TFOj36fZqpdZk2Xcf30NG7CR9800g3fOca7b"
              }
          });
          const createPayment = await axios.post(`${baseUrl}/payment/`,{
              email:paymentReq.data.email,
              id:paymentReq.data.id,
              amount:300,
              paymentById:user.data[0]._id,
              paymentBy:{
                  name:user.data[0].firstname + " " + user.data[0].lastname,
                  id:user.data[0]._id,
              }
          });

        }catch(e) {
            Alert.alert('Error',JSON.stringify(e.response.data));
        }

      };
    const [posts,setPosts] = useState(null);
    const GetMyPosts = async() => {
        try {

         const postsData = await axios.get(`${baseUrl}/post/get-posts`);
         setPosts(postsData.data.Data);
        }catch(e) { 
          Alert.alert('Oops',JSON.stringify(e));
        }
    };
    const [recipies,setRecipies] = useState(null)
    const GetAllRecipies = async() => {
        try {
         const RecipeApiResponse = await axios.get(`${baseUrl}/recipe/get-every-recipe`);
         const shallowed = RecipeApiResponse.data.Data.splice(0,5);
         setRecipies(RecipeApiResponse.data.Data);
         setRecommendedRecipies(shallowed);
        }catch(e) { 
          Alert.alert('Oops',JSON.stringify(e));
        }
    };
    const LikePost = async(postId) => {
        try {
         const likePostAPIResponse = await axios.post(`${baseUrl}/post/like-post/${postId}/${user.data[0]._id}`);
         GetMyPosts();
        }catch(e) {
        Alert.alert('Error',JSON.stringify(e));
        }
    }
    const UnLikePost = async(postId) => {
        try {
         const UnlikePostAPIResponse = await axios.post(`${baseUrl}/post/dislike-post/${postId}/${user.data[0]._id}`);
         GetMyPosts();
        }catch(e) {
        Alert.alert('Error',JSON.stringify(e));
        }
    }
    const [letsTalkRecipy,setLetsTalkRecipy] = useState([]);
    const GetLetsTalkRecipies = async() => {
        try {
          const GetLetsTalkRecipiesAPIResponse = await axios.get(`${baseUrl}/feedback/get-feedback-recipies`);
          setLetsTalkRecipy(GetLetsTalkRecipiesAPIResponse.data.Data);
        } catch(e) {
            console.log(e);
           Alert.alert('ERro',JSON.stringify(e));
        }
    };
    useEffect(() => {
        GetLetsTalkRecipies();
        getstatus();
    },[trigger]);
    // useFocusEffect(() => {
    //     GetMyPosts();
    //     GetAllRecipies()
    //     return () => {
    //         console.log('cancelled')
    //     }
    // },[]);
    // if(focused) {
    //     GetMyPosts();
    //     GetAllRecipies()
    // }
    useEffect(() => {
        GetMyPosts();
        getstatus();
    },[trigger]);
    useEffect(() => {
        GetAllRecipies();
        getstatus();
    },[trigger]);
    const submitFeedback = async(feedback,id) => {
  try {
    const submitFeedbackAPIResponse = await axios.post(`${baseUrl}/feedback/submit-feedback/${id}`,{
        feedback:feedback
    });
    await GetLetsTalkRecipies();
  }catch(e) {
    Alert.alert('error',JSON.stringify(e.response.data));

  }
    }
    const likeRecipe = async(id) => {
        try {
          const likeRecipeAPIResponse = await axios.post(`${baseUrl}/recipe/like-recipe/${id}/${user.data[0]._id}`);
          await GetAllRecipies();
        }catch(e) {
          Alert.alert('error',JSON.stringify(e.response.data));
        }
     }
     const UnlikeRecipe = async(id) => {
        try {
          const UnlikeRecipeAPIResponse = await axios.post(`${baseUrl}/recipe/unlike-recipe/${id}/${user.data[0]._id}`);
          await GetAllRecipies();
        }catch(e) {
          Alert.alert('error',JSON.stringify(e.response.data));
        }
     }
     const [myStory,setMyStory] = useState(null);
     const GetStories = async() => {
         try {
             if(user) {
                const myStory = await axios.get(`${baseUrl}/stories/get-my-story/${user.data[0]._id}`);
                setMyStory(myStory.data);
                const getStoriesAPIResponse = await axios.get(`${baseUrl}/stories/get-stories/${user.data[0]._id}`);
                setStories(getStoriesAPIResponse.data.users);
                dispatch(callUnTrigger());
             } else {
                dispatch(callUnTrigger());
                 return;
             }
         
         } catch(e) {
             console.log('line 236',e);
            Alert.alert('Error in stories',JSON.stringify(e));
         }
     };
     useEffect(() => {
        const listener = navigation.addListener('focus',() => {
            getstatus();
            GetMyPosts();
            GetAllRecipies();
            GetStories();
        });
        return listener;
    },[navigation]);
     useEffect(() => {
         GetStories();
     },[userId,trigger]);
     const STATUS_DATA = {
          
            userProfile:'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
            username:'Abdul Haseeb',  
           statuses: [
             {
                 time:'3 minutes ago',
                 content:'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                 contentType:'image',
                 caption:'this is my first status on ciboh and I am going to make one recipe lorem ipsum lorem ipsum lorem ipsum'
             },
             {
                time:'10 minutes ago',
                content:'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                contentType:'image',
                caption:'this is my first status on ciboh'

            },
            {
                time:'13 minutes ago',
                content:'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                contentType:'image',
                caption:'this is my first status on ciboh'

            },
            {
                time:'33 minutes ago',
                content:'https://images.unsplash.com/photo-1510552776732-03e61cf4b144?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
                contentType:'image',
                caption:'this is my first status on ciboh'

            },
            
            ]
          
        }
        const videoUrl = 'https://static.videezy.com/system/resources/previews/000/037/666/original/12_014.mp4';
       
        const generateThumbnail = async () => {
        try {
        //   const { uri } = await VideoThumbnails.getThumbnailAsync(
        //     videoUrl,
        //     {
        //       time: 15000,
        //     }
        //   );
        //   console.log(uri);
        const img = 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540iamabdul.haseeb%252FCIBOH/VideoThumbnails/b666e5c3-aa78-4a34-a252-3f44abf9bc39.jpg'
          return img;
        } catch (e) {
          console.warn(e);
        }
      };
      if(loadingPayment) {
          return(
              <View style={{flex:1,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center'}}>
                  <ActivityIndicator size='large' color='white'/>
              </View>
          )
      }
    return (
        <SafeAreaView style={styles.container}>
         
          
           <ScrollView contentContainerStyle={{flexGrow:1}}>
           {/* <View style={{
                width:SCREEN_WIDTH,
                height:40,
                backgroundColor:'white',
                elevation:10,
                marginBottom:20,
                flexDirection:'row',
                justifyContent:'space-between',
            }}>
                <Text style={{fontSize:20,color:colors.primary,paddingLeft:10,fontFamily:'sofiaprolight'}}>Ciboh</Text>
                <Pressable 
                onPress={() => {
                    navigation.navigate('CreateStatus');
                }}
                >
                <Feather name="plus" size={25} color="black" style={{paddingRight:5}}  />

                </Pressable>
            </View> */}
            <StatusBar style="auto" backgroundColor="white" />
           

           {/** SHOW STATUUSSS */}
           <Modal
           isVisible={showStatus}
           onBackButtonPress={()=>setshowstatus(false)}
           style={{
               flex:1,
               backgroundColor:'#202020',
               margin:0
           }}
           swipeDirection={['left','right','up','down']}
           onSwipeComplete={(dr) => {
               if(dr.swipingDirection === 'left') {
                 setShowAllStatusesIndex(showAllStatusesIndex - 1);
               } else if (dr.swipingDirection === 'right') {
                 setShowAllStatusesIndex(showAllStatusesIndex + 1);
               } else if (dr.swipingDirection === 'up') {
                   setshowstatus(false);
               } else {
                   setShowAllStatusesIndex(false);
               }
           }}
           >
               
               <View style={{borderWidth:1,flex:1}}> 
              <View style={{
                  flexDirection:'row'
              }}>
              {
                   STATUS_DATA.statuses.map((bar,index) => {
                       
                       return (
                           <View style={{borderWidth:index === statusIndex ? 2 : 1,borderColor:'white',width:SCREEN_WIDTH / (STATUS_DATA.statuses.length) - 5 * STATUS_DATA.statuses.length,margin:10,borderRadius:30,padding:0,height:1}}/>
                       )
                   })
               }
              </View>
              <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                  padding:15
              }}>
              <Image
              source={{uri:STATUS_DATA.userProfile}}
              style={{
                  width:40,
                  height:40,
                  borderWidth:1,
                  borderColor:'white',
                  borderRadius:40/2,
                  resizeMode:'cover',
                  margin:4
              }}
              />
                 
              <View>
              <Text style={{fontSize:15,bottom:3,left:8,color:'white'}}>{STATUS_DATA.username}</Text>
              <Text style={{fontSize:11,bottom:3,left:8,color:'white'}}>{STATUS_DATA.statuses[0].time}</Text>
              </View>
              </View>
              <View>
             
                 {STATUS_DATA.statuses[statusIndex].contentType === 'image' ?  <ImageBackground
                   source={{
                       uri:STATUS_DATA.statuses[statusIndex].content != null ? STATUS_DATA.statuses[statusIndex].content : ''
                   }}
                   style={{
                       width:'98%',
                       height:'90%',
                       alignSelf:'center',
                       resizeMode:'cover'
                   }}
                  >
                     
                          
                       <View style={{
                           flexDirection:'row',
                           justifyContent:'space-between',
                           padding:10,
                           alignItems:'center',
                           flex:1
                       }}>
                      <Pressable
                      onPress={() => {
                        if(statusIndex === 0) {
                            setshowstatus(false);
                        } else {
                            setStatusIndex(statusIndex - 1)
                        }
                      }}
                      style={{
                          width:50,
                          height:50,
                          borderWidth:1,
                          borderColor:'white',
                          backgroundColor:'white',
                          justifyContent:'center',
                          alignItems:'center',
                          borderRadius:50/2
                      }}>
<AntDesign name="left" size={24} color="black" />
                      </Pressable>
                      <Pressable onPress={() => {
                         if(statusIndex === (STATUS_DATA.statuses.length-1)) {
                            setshowstatus(false);
                            return;
                         } else {
                            setStatusIndex(statusIndex + 1)
                         }
                        }} style={{
                          width:50,
                          height:50,
                          borderWidth:1,
                          borderColor:'white',
                          backgroundColor:'white',
                          justifyContent:'center',
                          alignItems:'center',
                          borderRadius:50/2
                      }}>
<AntDesign name="right" size={24} color="black" />
                      </Pressable>
                  </View>
                      </ImageBackground> : 
                          <View style={{ 
                            backgroundColor: '#202020',
                            borderWidth: 1,
                            borderColor: '#202020',
                            marginTop: 22,
                            height:Dimensions.get('screen').height,
                            alignItems:'center',
                            justifyContent:'center'
                            }}>
                                  <Pressable onPress={() => {
                         if(statusIndex === (STATUS_DATA.statuses.length-1)) {
                            setshowstatus(false);
                            return;
                         } else {
                            setStatusIndex(statusIndex + 1)
                         }
                        }} style={{
                          width:50,
                          height:50,
                          borderWidth:1,
                          borderColor:'white',
                          backgroundColor:'white',
                          justifyContent:'center',
                          alignItems:'center',
                          borderRadius:50/2
                      }}>
<AntDesign name="right" size={24} color="black" />
                      </Pressable>
                      {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://static.videezy.com/system/resources/previews/000/042/042/original/Ramdom_Lines_x264.mp4',
        }}
        // useNativeControls
        resizeMode='contain'
        isLooping
        controls={false}
        fullscreen={true}
        
        // onFullscreenUpdate={(rv)}
        // onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
                              {/* <WebView */}
                       <Pressable onPress={() => {
                         if(statusIndex === (STATUS_DATA.statuses.length-1)) {
                            setshowstatus(false);
                            return;
                         } else {
                            setStatusIndex(statusIndex + 1)
                         }
                        }} style={{
                          width:50,
                          height:50,
                          borderWidth:1,
                          borderColor:'white',
                          backgroundColor:'white',
                          justifyContent:'center',
                          alignItems:'center',
                          borderRadius:50/2
                      }}>
<AntDesign name="right" size={24} color="black" />
                      </Pressable>
                          </View>
                      }
              </View>
              <View style={{
                  width:'100%',
                  borderWidth:1,
                  borderColor:'black',
                  backgroundColor:'black',
                  position:'absolute',
                  bottom:-5,
                  paddingVertical:15,
                  paddingHorizontal:10,
              }}>
               <Text style={{color:'white',fontFamily:'sofiaprolight',left:5}}>{STATUS_DATA.statuses[statusIndex].caption}</Text>
              </View>
               </View>
               </Modal>
  

            {/* Stories */}
            <ScrollView horizontal style={{flexDirection:'row',alignSelf:'flex-start'}} showsHorizontalScrollIndicator={false}>
            
           {user ?  <TouchableOpacity style={styles.horizontalContainer} onPress={() => {
                navigation.navigate('CreateStatus')
            }}>
                <ImageBackground source={{
                    uri:user.data[0].profile == null || user.data[0].profile === '' ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg'
                    : `${baseUrl}/${user.data[0].profile}`
                }}
                style={{
                    width:70,
                    height:70,
                   
                }}
                imageStyle={{
                    borderWidth:1,
                    borderColor:'transparent',
                    borderRadius:70/2
                }}
                >
                    <View style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <AntDesign name="plus" size={40} color={'black'} />
                    </View>

                </ImageBackground>
                </TouchableOpacity> : null}
           
            {myStory == null || myStory.length === 0 || myStory.Data.length === 0 ?
            null: 
            <TouchableOpacity style={styles.horizontalContainer} onPress={() => {
                navigation.navigate('Status',{
                    user:myStory.user[0],
                    statuses:myStory.Data,
                    count:myStory.Data.length
                });
            }}>
                <Avatar2.Image style={{marginTop: 4, backgroundColor: 'white'}} size={70} source={{uri:myStory.user[0].profile === '' || myStory.user[0].profile == null ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' : `${baseUrl}/${myStory.user[0].profile}`}} />
              
                {/* <Text style={{marginBottom:5,fontFamily:"sofiaprolight"}} >{item.userData.lastname}</Text> */}
            </TouchableOpacity>
            }
                  
                <Story navigation={navigation} stories={stories}/>
              

            </ScrollView>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.belowStoryContainer} >

                    {/* Recomended */}
                    <HomeSlider recipe={recommendedRecipies} />
                    
                  

                    {/* Featured Stories */}
                    {/* <View style={styles.featuredContainer}>
                        <Text style={[styles.featureTitle, { fontFamily: 'Zermatt-First', }]} >
                            Featured Stories
                        </Text>
                        <View style={styles.featuredStories}>
                            <Text style={[styles.featureHeading, { fontFamily: 'AvianoFlareRegular' }]} >
                                How to make {"\n\n"}
                                home made ice-cream
                            </Text>
                            <Image style={styles.featureImg} source={featureImg} />
                            <View style={styles.subHeading} >
                                <Text style={{ fontFamily: 'sofiaprolight', color: colors.primary }} >
                                    Lisa-Krisin Erdt
                                </Text>
                                <View style={styles.likes} >
                                    <MaterialCommunityIcons name="heart" color={colors.primary} size={20} />
                                    <Text style={{ color: colors.primary, left: 7 }} >275</Text>
                                </View>
                            </View>
                        </View>
                    </View> */}

                    {/* latest Feed */}
                  
                    <View style={styles.feedContainer}>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={[styles.feedTitle, { fontFamily: 'Zermatt-First', }]} >
                                Latest Feed
                            </Text>
                            {/* <TouchableOpacity onPress={() => {
                                navigation.navigate('SeeAllPosts');
                            }}>
                            <Text>Sell</Text>
                            </TouchableOpacity> */}
                            <Pressable onPress={() => {
                                navigation.navigate('SeeAllPosts',{
                                    stories:stories,
                                    myStory:myStory
                                });
                            }} style={{ position: 'absolute', right: "1%" ,paddingHorizontal:20,justifyContent:'center',alignItems:'center',paddingVertical:5}}>
                            <Text style={{fontSize: RFPercentage(1.8), color: colors.primary,}} >
                                See All
                            </Text>
                            </Pressable>
                            
                        </View>
                        <FlatList
                    data={posts}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{flexGrow:1}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={itemData => (
                        <PostCard
                        profile={itemData.item.user != null && itemData.item.user.length !== 0 ? itemData.item.user[0].profile : 'https://bitsofco.de/content/images/2018/12/broken-1.png'}
                        LikePost={() => {
                            LikePost(itemData.item.post._id);
                        }}
                        UnLikePost={() => {
                            UnLikePost(itemData.item.post._id);
                        }}
                        data={itemData.item.post} user={user} navigation={navigation}/>
                    //     <ImageBackground
                    //     source={{
                    //         uri:`${baseUrl}/${itemData.item.videoThumbnail}`
                            
                    //         }} style={styles.background}
                    //         imageStyle={{
                    //             borderWidth:1,
                    //             borderColor:'transparent',
                    //             borderRadius:20
                    //         }}
                    //         >
                    //        <View style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%',alignSelf:'flex-start',borderWidth:4}}>
                        //    {itemData.item.postedContentType === 'mp4' ?  <Pressable 
                        //    onPress={() => {
                        //    navigation.navigate('Video',{
                        //        videoUrl:`${baseUrl}/${itemData.item.postedContent}`,
                        //        thumbnail:`${baseUrl}/${itemData.item.videoThumbnail}`
                        //    });
                        //    }}
                        //    style={{
                        //    width:50,
                        //    height:50,
                        //    borderWidth:1,
                        //    borderColor:'white',
                        //    backgroundColor:'white',
                        //    borderRadius:50/2,
                        //    justifyContent:'center',
                        //    alignItems:'center',
                        //    alignSelf:'center'
                        //    }}>
                        //    <MaterialCommunityIcons name="play" size={40} color={colors.primary} />
                        //    </Pressable> : null}
                    //            </View>
                        //    <Pressable style={styles.feedLikes} >
                        //        <TouchableOpacity 
                        //        style={{
                        //            right:10,
                        //        }}
                        //        onPress={() => {
                        //            if(itemData.item.likes.includes(user.data[0]._id)) {
                        //                UnLikePost(itemData.item._id)
                        //            } else {
                        //                LikePost(itemData.item._id);
                        //            }
                        //        }}>
                        //        {itemData.item.likes.includes(user.data[0]._id) ? <MaterialCommunityIcons name='heart' size={18} color="red" /> : 
                        //        <MaterialCommunityIcons name="heart-outline" size={18} color="black" />
                        //        }
                        //        </TouchableOpacity>
                        //        <Text style={{ zIndex:5000,fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'black',right:5}}>{itemData.item.likes.length}</Text>
                        //    </Pressable>
                    //    </ImageBackground>
                        //    <View
                          
                        //    style={{
                        //        width:'100%',
                        //        height:250,
                        //        flex:1,
                        //        marginHorizontal:5,
                        //        borderWidth:1
                               
                        //    }}>
//                                 <TouchableOpacity onPress={() => {
//                                     navigation.navigate('UserProfile',{
//                                         userId:itemData.item.postedBy,
//                                         code:Math.random()
//                                     })
//                                 }} style={{ flexDirection: 'row', marginTop: 15, marginBottom: -10 }}>
//                                     <MaterialIcons name="account-circle" color={colors.primary} size={20} />
//                                     <Text style={{ fontSize: RFPercentage(2), fontFamily: 'Zermatt-First',left:5}} >{itemData.item.postedBy.name}</Text>
//                                 </TouchableOpacity>
                            
//                                 <View style={{ flexDirection: 'row' }} >
//                             <View style={styles.feedCards} >
                                
                               
                                  
//                               {/* <TouchableOpacity  onPress={() => {
//                                navigation.navigate('PostDetail',{
//                                  description:itemData.item.postDescription,
//                                  comments:itemData.item.comments,
//                                  postId:itemData.item._id,
//                                })
//                            }}>
//                               <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), marginTop: 5, maxWidth: 170 }} >
//                                     {itemData.item.postDescription}
//                                 </Text>
//                               </TouchableOpacity> */}
//                             </View>

//                         </View>
                  

// </View>

                           
                    )}
                    />

                     
                    </View>

                    {/* Latest Recipe */}
                    <View style={styles.feedContainer}>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={[styles.feedTitle, { fontFamily: 'Zermatt-First', }]} >
                                Latest Recipe
                            </Text>
                            <Pressable onPress={() => {
                                navigation.navigate('SeeAllRecipies',{
                                    stories:stories,
                                    myStory,myStory
                                });
                            }} style={{ position: 'absolute', right: "1%" ,paddingHorizontal:20,justifyContent:'center',alignItems:'center',paddingVertical:5}}>
                            <Text style={{fontSize: RFPercentage(1.8), color: colors.primary,}} >
                                See All
                            </Text>
                            </Pressable>
                          
                        </View>

                        {/* courasel */}
                        <View style={styles.screen}>
                            <View style={{ marginBottom: -15, marginLeft: 5, paddingRight: RFPercentage(1.8) }}>
                                <FlatList style={styles.flatList}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    data={recipies}
                                    keyExtractor={item => item._id.toString()}
                                    renderItem={({ item, index }) => (
                                        <Card 
                                           navigation={navigation}
                                           onGoDetail={() => {
                                            // navigation.navigate('Detail',{
                                            //     recipe:item,
                                            //     id:Math.random(),
                                            //     recipeId:item._id
                                            // })
                                               if(paymentStatus == null || paymentStatus === false) {
                                                   navigation.navigate('Payment');
                                               } else {
                                                   navigation.navigate('Detail',{
                                                       recipe:item,
                                                       id:Math.random(),
                                                       recipeId:item._id
                                                   })
                                               }
                                           }}     
                                        recipe={item} navigation={navigation} author={item.createdBy.name} description={item.chefsNote} time={item.bakingTime} likes={20} picture={item.videoThumbnail} type={item.recipePhotoType} realUrl={item.recipePhoto} unlikeRecipe={
                                            () => {
                                                UnlikeRecipe(item._id);
                                            }
                                        } LikeRecipe={() => {
                                            likeRecipe(item._id)
                                        }} myId={user.data[0]._id} user={user.data}/>
                                    )}
                                    pagingEnabled
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={onScroll}
                                >
                                </FlatList>
                            </View>
                            <View style={styles.dotsPgae} >
                                <Pagination
                                    dotsLength={parseInt((recipies == null || recipies.length === 0 ? 1 : recipies.length) / 1.5)}
                                    activeDotIndex={index}
                                    inactiveDotStyle={{ width: 12, height: 12, borderRadius: 50 }}
                                    containerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                                    dotStyle={{ backgroundColor: 'grey', margin: -5 }}
                                />
                            </View>
                        </View>
                    </View>


                    {/* Lets Talk */}

                 {letsTalkRecipy == null || letsTalkRecipy.length === 0 ? 
                 null 
                 :
                 <View style={styles.talkContainer}>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={[styles.talkTitle, { fontFamily: 'Zermatt-First', }]} >
                                Lets Talk
                            </Text>
                        </View>

                       <FlatList
                       data={[letsTalkRecipy]}
                       keyExtractor={item => item._id}
                       renderItem={itemData => (
                        <View style={styles.feedCards3} >
                        <View>
                            <Image source={{uri:`${baseUrl}/${itemData.item.videoThumbnail}`}} style={styles.talkBackground} />
                        </View>
                        <View style={{ flexDirection: 'column', left: 15, marginTop: 1 }}>
                            <Text style={{ fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.2) }} >{itemData.item.title}</Text>

                            <TouchableOpacity
                            onPress={() => {
                                Alert.alert('Are you sure?','Do you like this recipe and want to submit yes as feedback?',[
                                    {text:'No'},
                                    {text:'Yes',onPress:() => {
                                        submitFeedback('Yes',itemData.item._id)
                                    }}
                                ])
                            }} 
                            style={{ flexDirection: 'row', marginTop: 10,marginVertical:5 }}>
                                <MaterialCommunityIcons style={{ opacity: 0.6 }} name='check-circle-outline' color={'#0bda51'} size={20} />
                                <Text style={{ color: '#0bda51', marginHorizontal: 3, opacity: 0.6 }} >Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                Alert.alert('Are you sure?','Dont you like this recipe and do you really want to submit No as feedback?',[
                                    {text:'No'},
                                    {text:'Yes',onPress:() => {
                                        submitFeedback('No',itemData.item._id)
                                    }}
                                ])
                            }}
                            style={{ flexDirection: 'row',marginVertical:5 }}>
                                <MaterialCommunityIcons style={{ opacity: 0.4 }} name='checkbox-blank-circle-outline' color={'red'} size={20} />
                                <Text style={{ color: 'red', marginHorizontal: 3, opacity: 0.4 }} >No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                Alert.alert('Are you sure?','Do you somehow like this recipe and want to submit maybe as feedback?',[
                                    {text:'No'},
                                    {text:'Yes',onPress:() => {
                                        submitFeedback('Maybe',itemData.item._id)
                                    }}
                                ])
                            }}
                            style={{ flexDirection: 'row',marginVertical:5 }}>
                                <MaterialCommunityIcons style={{ opacity: 0.4 }} name='checkbox-blank-circle-outline' color={colors.primary} size={20} />
                                <Text style={{ color: colors.primary, marginHorizontal: 3, opacity: 0.4 }} >Maybe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                       )}
                       />
                    </View>}


                </View>
            </ScrollView>
            </ScrollView>

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
        marginTop: 30
    },

    featuredContainer: {
        marginTop: '10%',
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
        marginTop:'10%'
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
        width:200,
        height:200,
        paddingLeft: 110,
        paddingHorizontal: 10,
        marginTop: 20,
        margin:5
    },
    talkBackground: {
        width: (screenWidth / 2) - 80, height: 140, paddingLeft: 110,
        borderWidth:1,
        borderColor:'transparent',
        borderRadius:10
    },

    feedLikes: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: RFPercentage(1.1),
        left: RFPercentage(1.1),
        borderWidth:1,
        borderColor:'white',
        borderRadius:30,
        backgroundColor:'white',
        paddingHorizontal:15,
        justifyContent:'flex-start'
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
        justifyContent:'center',
        alignItems:'center'
    },
    video:{
        flex:2,
        width:Dimensions.get('screen').width,
        alignSelf:'center',
        bottom:Dimensions.get('screen').height / 3,
        resizeMode:'stretch'
    }
});
