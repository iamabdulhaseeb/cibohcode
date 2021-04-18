// import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StatusBar,StyleSheet, Text, View, ScrollView, SafeAreaView, Image, FlatList, Platform } from 'react-native';
// import Constants from 'expo-constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
// import { MaterialCommunityIcons, MaterialIcons,Feather } from "@expo/vector-icons"
import { ImageBackground, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {Camera} from 'expo-camera';
import Story from '../components/Story';
import HomeSlider from '../components/HomeSlider';
import colors from '../config/colors';
import Card from '../components/Card';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
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


const recipeData = [
    {
        id: 1,
        picture: feedImg3,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
    {
        id: 2,
        picture: feedImg4,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
    {
        id: 3,
        picture: feedImg1,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
    {
        id: 4,
        picture: feedImg3,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
    {
        id: 5,
        picture: feedImg2,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
    {
        id: 6,
        picture: feedImg4,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
    {
        id: 7,
        picture: feedImg4,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
    {
        id: 8,
        picture: feedImg4,
        likes: '100k',
        time: '40mins',
        description: 'Tasty Strawberry icecream',
        author: 'Christy Obioha'

    },
]


export default function SeeAllPosts(props) {

    const [activeSlide, setActiveSlide] = useState(0); // current active slide card
    const myStory = props.route.params.myStory;
    

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
        await GetStories()
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
         setRecipies(RecipeApiResponse.data.Data);
         console.log(RecipeApiResponse.data.Data);
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

    const [stories,setStories] = useState(props.route.params.stories);
    const GetStories = async() => {
        try {
            await getUser();
         const getStoriesAPIResponse = await axios.get(`${baseUrl}/stories/get-stories/${user.data[0]._id}`);
         setStories(getStoriesAPIResponse.data.users);
        } catch(e) {
            console.log('line 236',e);
           Alert.alert('Error',JSON.stringify(e));
        }
    };
    // useEffect(() => {
    //     GetStories();
    // },[]);
    const UnLikePost = async(postId) => {
        try {
         const UnlikePostAPIResponse = await axios.post(`${baseUrl}/post/dislike-post/${postId}/${user.data[0]._id}`);
         GetMyPosts();
        }catch(e) {
        Alert.alert('Error',JSON.stringify(e));
        }
    }
   
    useEffect(() => {
        GetMyPosts();
    },[]);
    useEffect(() => {
        GetAllRecipies();
    },[]);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="white" />
            
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
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
                <Feather name="plus" size={25} color="black" style={{paddingRight:5}}  />
            </View> */}
            {/* Stories */}
            <ScrollView style={{flexDirection:'row',padding:5,alignSelf:'flex-start'}}>
            <View style={{flexDirection:'row'}}>
            
            {user ?  <TouchableOpacity style={styles.horizontalContainer} onPress={() => {
                props.navigation.navigate('CreateStatus')
            }}>
                <ImageBackground source={{
                    uri: user.data !== null && user.data.length !== 0 ?  user.data[0].profile == null || user.data[0].profile === '' ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' : ''
                    : `${baseUrl}/${user != null & user.length !== 0 ? user.data[0].profile : ''}`
                }}
                style={{
                    width:70,
                    height:70,
                    top:3.9
                   
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
                props.navigation.navigate('Status',{
                    user:myStory.user[0],
                    statuses:myStory.Data,
                    count:myStory.Data.length
                });
            }}>
                <Avatar2.Image style={{marginTop: 4, backgroundColor: 'white'}} size={70} source={{uri:myStory.user[0].profile === '' || myStory.user[0].profile == null ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' : `${baseUrl}/${myStory.user[0].profile}`}} />
              
                {/* <Text style={{marginBottom:5,fontFamily:"sofiaprolight"}} >{item.userData.lastname}</Text> */}
            </TouchableOpacity>
            }    
                <Story stories={stories} navigation={props.navigation}/>
            </View>


            </ScrollView>
                <View style={styles.belowStoryContainer} >

                    {/* Recomended */}

                    {/* Featured Stories */}
                    
                    {/* latest Feed */}

                    <View style={styles.feedContainer}>
                        
                        <FlatList
                    data={posts}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{flexGrow:1}}
                    renderItem={itemData => (
                        <View style={{
                            width:'100%',
                            marginVertical:15,
                            borderWidth:1,
                            borderColor:'transparent',
                            backgroundColor:'white',
                            alignSelf:'center',
                            padding:0
                        }}>
                           <View style={{
                               flexDirection:'row',
                               marginLeft:10
                           }}>
                           <TouchableOpacity onPress={() => {
                                if(itemData.item.post.postedBy.id === user.data[0]._id) {
                                    props.navigation.navigate('Feed');
                                } else {
                                    props.navigation.navigate('UserProfile',{
                                        userId:itemData.item.post.postedBy,
                                        code:Math.random()
                                    })
                                }
                                    // props.navigation.navigate('UserProfile',{
                                    //     userId:itemData.item.post.postedBy
                                    // })
                                }} style={{flexDirection:'row',paddingBottom:10,alignItems:'center' }}>
                                    <Image
                                    source={{
                                    //     != null && itemData.item.user.profile !== '' ? 
                                    //    `${baseUrl}/${itemData.item.user.profile}`:
                                    //     'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'
                                        uri: itemData.item.user != null && itemData.item.user.length !== 0 ?  itemData.item.user[0].profile != null && itemData.item.user[0].profile !== '' ? 
                                        `${baseUrl}/${itemData.item.user[0].profile}`:
                                         'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg' : 'https://bitsofco.de/content/images/2018/12/broken-1.png'
                                    }}
                                    style={{
                                        width:35,
                                        height:35,
                                        borderWidth:1,
                                        borderColor:'transparent',
                                        borderRadius:35/2,
                                        marginTop:15
                                    }}
                                    />
                            </TouchableOpacity>
                             <View style={{marginTop:10}}>
                             <Text style={{left:5,top:5,fontWeight:'bold'}}>{itemData.item.post.postedBy.name}</Text>
                             <Text style={{paddingHorizontal:5,marginTop:5,marginBottom:10,fontSize:11,fontWeight:'500',color:'grey'}}>{moment(itemData.item.post.postedOn).fromNow()}</Text>

                                 </View>
                               </View>

                             <ImageBackground
                             source={{
                                 uri:`${baseUrl}/${itemData.item.post.videoThumbnail}`
                             }}
                             style={{width:'100%',height:500,resizeMode:'cover'}}
                             imageStyle={{
                                 borderWidth:4,
                                 borderColor:'transparent',
                             }}
                             >
                                 {itemData.item.post.postedContentType === 'mp4' ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                 <Pressable 
                                        onPress={() => {
                                        props.navigation.navigate('Video',{
                                            videoUrl:`${baseUrl}/${itemData.item.post.postedContent}`,
                                            thumbnail:`${baseUrl}/${itemData.item.post.videoThumbnail}`
                                        });
                                        }}
                                        style={{
                                        width:50,
                                        height:50,
                                        borderWidth:1,
                                        borderColor:'white',
                                        backgroundColor:'white',
                                        borderRadius:50/2,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        }}>
                                        <MaterialCommunityIcons name="play" size={40} color={colors.primary} />
                                        </Pressable>
                                 </View> : null}
                                 
                                 </ImageBackground>

                                 <View style={{flexDirection:'row',marginTop:5,width:'90%',alignItems:"center"}}>
                             <Pressable style={{
                                 flexDirection:'row',
                                 marginLeft:10,
                                 alignItems:'center'
                                 
                             }}>
                                            <TouchableOpacity 
                                            // style={{
                                            //     right:10,
                                            // }}
                                            onPress={() => {
                                                if(itemData.item.post.likes.includes(user.data[0]._id)) {
                                                    UnLikePost(itemData.item.post._id)
                                                } else {
                                                    LikePost(itemData.item.post._id);
                                                }
                                            }}>
                                            {itemData.item.post.likes.includes(user.data[0]._id) ? <MaterialCommunityIcons name='heart' size={32} color="red" /> : 
                                            <MaterialCommunityIcons name="heart-outline" size={32} color={colors.primary} />
                                            }
                                            </TouchableOpacity>
                                            {/* <Text style={{ fontSize: RFPercentage(3) ,fontWeight:'bold',padding:2,fontFamily: 'Roboto', color: 'black'}}>{itemData.item.likes.length}</Text> */}
                                        </Pressable>
                                        <Pressable style={{
                                 flexDirection:'row',
                             }}>
                                            <TouchableOpacity 
                                            style={{marginLeft:5,bottom:2}}
                                            onPress={() => {
                                                props.navigation.navigate('PostDetail',{
                                                    description:itemData.item.post.postDescription,
                                                    comments:itemData.item.post.comments,
                                                    postId:itemData.item.post._id,
                                                    user:itemData.item.user[0]
                                                  })
                                            }}
                                            >
                        <Feather name="message-circle" size={30} color={colors.primary} />

                                            </TouchableOpacity>
                                            {/* <Text style={{ fontSize: RFPercentage(2) ,fontWeight:'bold',padding:2,fontFamily: 'Roboto', color: 'black',left:3}}>{itemData.item.comments.length}</Text> */}
                                        </Pressable>
                                 </View>
                                 <Text style={{marginLeft:12,margin:3,fontSize:17,fontFamily:'sofiaprolight'}}>{itemData.item.post.likes.length} {itemData.item.post.likes.length > 1 ? 'likes' : 'like'}</Text>
                                 <View style={{
                                     flexDirection:'row',
                                     alignItems:'center'
                                 }}>
                                 <Text style={{marginLeft:12,fontSize:17,fontFamily:'sofiaprolight',fontWeight:'bold'}}>{itemData.item.post.postedBy.name} <Text style={{fontFamily:'sofiaprolight',fontWeight:'normal'}}> {itemData.item.post.postDescription}</Text></Text>
 
                                     </View>
                            </View>   
                    )}
                    />

                     
                    </View>

                    {/* Latest Recipe */}
                   

                </View>
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
        width: "100%",

        marginHorizontal: 20,
    },

    belowStoryContainer: {
        marginBottom: 35
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
        marginBottom: 15,
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
