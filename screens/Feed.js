// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants'
// import { MaterialCommunityIcons } from "@expo/vector-icons"
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// import colors from '../config/colors';
// import img from '../assets/images/Rectangle2991.png'
// import img2 from '../assets/images/Rectangle99.png'
// import feedImg1 from "../assets/images/Rectangle8.png"
// import feedImg2 from "../assets/images/Rectangle9.png"
// import feedImg3 from "../assets/images/Rectangle18.png"
// import feedImg4 from "../assets/images/Rectangle19.png"
// import { Entypo } from '@expo/vector-icons';
// import FeedCard from '../components/FeedCard';
// import ListCard from '../components/ListCard';
// import { AntDesign } from '@expo/vector-icons';
// import FavCard from '../components/FavCard';
// import { AsyncStorage } from 'react-native';
// import axios from 'axios';
// import { Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Pressable } from 'react-native';
// import { baseUrl } from '../config/baseUrl';
// import { ImageBackground } from 'react-native';
// import { useDispatch,useSelector } from 'react-redux';
// import { ActivityIndicator } from 'react-native';
// const screenWidth = Dimensions.get('window').width;
// const { width } = Dimensions.get('window');
// const height = width * 0.45
// const SCREEN_WIDTH = Dimensions.get('window').width;
// const CAROUSEL_VERTICAL_OUTPUT = 30;
// const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;





// function Feed({ navigation }) {
//     const paymentStatus = useSelector(pay => pay.payment.status);
//     const [user, setUser] = useState(null);
//     const favorites = useSelector(state => state.favorites.favs);
//     console.log("🚀 ~ file: Feed.js ~ line 256 ~ Feed ~ favorites", favorites)
//     const favsIds = useSelector(state => state.favorites.favIds);
//     console.log("🚀 ~ file: Feed.js ~ line 258 ~ Feed ~ favsIds", favsIds)
//     const dispatch = useDispatch();
//     const [myRecipes, setMyRecipes] = useState([]);
//     const [profileOfUser,setProfileOfuser] = useState('');
//     const getUser = async () => {
//         try {
//             const user = await AsyncStorage.getItem('user');
//             const parsed = JSON.parse(user);
//             setUser(parsed);
//             console.log('My Profile',JSON.stringify(parsed.data[0].profile))
//             setProfileOfuser(parsed.data[0].profile == null || parsed.data[0].profile === '' ? '' : parsed.data[0].profile );
//         } catch (e) {
//             Alert.alert('us',JSON.stringify(e))
//             console.log('error line 60',e)
//         }
//     }
//     useEffect(() => {
//         getUser();
//     }, []);
//     const GetMyRecipes = async () => {
//         try {
//             const userId = await AsyncStorage.getItem('user');
//             const parsedUser = JSON.parse(userId);
//             const GetMyRecipes = await axios.get(`${baseUrl}/recipe/get-recipies/${parsedUser.data[0]._id}`);
//             setMyRecipes(GetMyRecipes.data.Data);

//         } catch (e) {
//             Alert.alert('Error',JSON.stringify(e.response.data))
//             console.log('eddrro',e);
//         }
//     }
//     useEffect(() => {
//         GetMyRecipes();
//     }, []);
//     const [currentCompoent, setCurrentCompoent] = useState('feedC')

//     const [feedBarBack, setFeedBarBack] = useState(colors.primary);
//     const [feedBarFont, setFeedBarFont] = useState(colors.feedBar);

//     const [tutoBarBack, setTutoBarBack] = useState(colors.feedBar);
//     const [tutoBarFont, setTutoBarFont] = useState(colors.primary);

//     const [favBarBack, setFavBarBack] = useState(colors.feedBar);
//     const [favBarFont, setFavBarFont] = useState(colors.primary);

//     const handleFeed = () => {
//         setFeedBarBack(colors.primary)
//         setFeedBarFont(colors.feedBar)

//         setTutoBarBack(colors.feedBar)
//         setTutoBarFont(colors.primary)

//         setFavBarBack(colors.feedBar)
//         setFavBarFont(colors.primary)

//         setCurrentCompoent('feedC')
//     }

//     const handleTutorial = async() => {
//         setFeedBarBack(colors.feedBar)
//         setFeedBarFont(colors.primary)

//         setTutoBarBack(colors.primary)
//         setTutoBarFont(colors.feedBar)

//         setFavBarBack(colors.feedBar)
//         setFavBarFont(colors.primary)

//         setCurrentCompoent('tutFeed')
//     }

//     const handleFav = () => {
//         setFeedBarBack(colors.feedBar)
//         setFeedBarFont(colors.primary)

//         setTutoBarBack(colors.feedBar)
//         setTutoBarFont(colors.primary)

//         setFavBarBack(colors.primary)
//         setFavBarFont(colors.feedBar)

//         setCurrentCompoent('favFeed')
//     }

//     let dummy = [1]
//     const [userposts,setUserPosts] = useState(null);
//     const GetPostsFunction = async () => {
//         try {   
//                 const userId = await AsyncStorage.getItem('user');
//                 const parsedUser = JSON.parse(userId);
//                 const getPostsAPI = await axios.get(`${baseUrl}/post/my-posts/${parsedUser.data[0]._id}`);
//                 setUserPosts(getPostsAPI.data.Data);
//                 await GetMyRecipes();
//                 console.log(getPostsAPI.data.Data);

            
//         } catch (e) {
//             console.log(e.response);
//             Alert.alert('Error', JSON.stringify(e));
//         }
//     }
//     useEffect(() => {
//         getUser();
//         GetPostsFunction();
//     },[]);
//     // useEffect(() => {
//     //     GetPostsFunction();
//     // },[]);
//     useEffect(() => {
//         const listener = navigation.addListener('focus',GetPostsFunction);
//         return listener;
//     },[navigation]);
//     useEffect(() => {
//         GetPostsFunction();
//     },[])
//     if(user == null || userposts == null || myRecipes == null) {
   
//         return (
//             <View style={{
//                 flex:1,
//                 justifyContent:'center',
//                 alignItems:'center'
//             }}>
//                 <ActivityIndicator color={colors.primary} size='large'/>
//             </View>
//         )
//     }
//     return (
//         <SafeAreaView style={styles.container}>
          
//             <StatusBar style="auto" backgroundColor="white" />
//             <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            

//                 <View style={styles.feedContainer}>

//                     {/* MIMI */}
                   
//                     <View style={styles.feedCards3} >
//                     {profileOfUser != '' ? 
//                         <Image
//                         source={{uri:`${baseUrl}/${profileOfUser}`}}
//                         style={{width:115,height:RFPercentage(19),resizeMode:'cover',marginLeft:10,borderWidth:1,borderColor:'transparent',borderRadius:10}}
//                         />
//                         :
//                         <View >
//                         <Text style={[styles.feedM, { fontFamily: 'Zermatt-First' }]} >{user.data[0].firstname[0]}</Text>
//                     </View>
//                         }
//                         <View style={{ flexDirection: 'column', left: 25, marginTop: Platform.OS === 'ios' ? RFPercentage(2) : null }}>
//                             <View style={{ flexDirection: 'row' }}>
//                                 <Text style={{ color: colors.primary, fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2) }} >{user.data[0].firstname + " " + user.data[0].lastname}</Text>
//                                 <MaterialCommunityIcons style={{ marginLeft: RFPercentage(14) }} size={35} color={colors.primary} name="dots-horizontal" />
//                             </View>
//                             <View>
//                                 {/* <Text style={{ color: colors.tertiary, fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.5) }} >Communtiy</Text> */}
//                              <View style={{flexDirection:'row',marginVertical:10}}>
//                                  <View style={{justifyContent:'center',alignItems:'center'}}>
//                                      <Text style={{fontWeight:'bold'}}>{user.data[0].followers.length}</Text>
//                                      <Text style={{fontFamily:'sofiaprolight'}}>Followers</Text>
//                                  </View>
//                                  <View style={{justifyContent:'center',alignItems:'center',marginLeft:20}}>
//                                      <Text style={{fontWeight:'bold'}}>{user.data[0].followings.length}</Text>
//                                      <Text style={{fontFamily:'sofiaprolight'}}>Followings</Text>
//                                  </View>
//                              </View>
//                             </View>

//                             <View>
//                                 <TouchableOpacity onPress={() => navigation.navigate('Settings',{
//                                     userKey:user.data[0]._id
//                                 })} style={{ maxWidth: 120, marginTop: 10, borderWidth: 1, borderColor: colors.primary, alignItems: 'center' }}>
//                                     <Text style={{ color: colors.primary, padding: 10, fontSize: RFPercentage(1.5) }}>Settings</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Nav Bar */}

//                 <View style={{ width: "100%", height: 65, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//                     <View style={{ width: "33.33%", backgroundColor: feedBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
//                         <MaterialCommunityIcons onPress={() => handleFeed()} color={feedBarFont} name="menu" size={17} />
//                         <Text onPress={() => handleFeed()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: feedBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Feed</Text>
//                     </View>

//                     <TouchableOpacity style={{ width: "33.33%", backgroundColor: tutoBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
//                         <MaterialCommunityIcons onPress={() => handleTutorial()} color={tutoBarFont} name="layers-triple-outline" size={17} />
//                         <Text onPress={() => handleTutorial()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: tutoBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Tutorials</Text>
//                     </TouchableOpacity>

//                     <View style={{ width: "33.33%", backgroundColor: favBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
//                         <MaterialCommunityIcons onPress={() => handleFav()} color={favBarFont} name="heart-outline" size={17} />
//                         <Text onPress={() => handleFav()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: favBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Favorites</Text>
//                     </View>
//                 </View>

//                 {/* feed Component */}
//                 {currentCompoent === 'feedC' ?
//                 //  <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'row', marginLeft: -5, marginTop: RFPercentage(3) }} >
//                 <View style={{flex:1}}>
                   
//             <Pressable
//             onPress={() => {
//                 navigation.navigate('CreatePost',{
//                     img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
//                 })
//             }}
//             style={{
//                 justifyContent:'center',
//                 alignItems:'center',
//                 borderRadius:50/2,
//                 alignSelf:'flex-end',right:10,
//                 marginTop:5
//             }}>
// <AntDesign name="plus" size={24} color={colors.primary} />
//             </Pressable>
                        
//                    {
//                        userposts == null || userposts.length === 0 ?
//                        <View style={{flex:1,alignSelf:'center',justifyContent:'center',alignItems:'center',alignContent:'center',paddingTop:'50%'}}>
//                      <Text style={{fontSize:18,fontFamily:'sofiaprolight'}}>You havent created any post yet.</Text>
//                        </View>
//                            :
//                            <FlatList
//                            data={userposts}
//                            // keyExtractor={item => item._id}
//                            contentContainerStyle={{flexGrow:1}}
//                            numColumns={2}
//                            renderItem={itemData => (
                              
//                                   <View style={{
//                                       width:'100%',
//                                       height:'100%',
//                                       flex:1
//                                   }}>
//                                        <View style={{ flexDirection: 'row' }} >
//                                    <View style={styles.feedCards} >
                                      
//                                        <View>
//                                            <ImageBackground source={{uri:`${baseUrl}/${itemData.item.videoThumbnail}`}} style={styles.background} >
//                                            {itemData.item.postedContentType === 'mp4' ? <Pressable 
//                                                onPress={() => {
//                                                navigation.navigate('Video',{
//                                                    videoUrl:`${baseUrl}/${itemData.item.postedContent}`,
//                                                    thumbnail:`${baseUrl}/${itemData.item.videoThumbnail}`
//                                                });
//                                                }}
//                                                style={{
//                                                width:40,
//                                                height:40,
//                                                borderWidth:1,
//                                                borderColor:'white',
//                                                backgroundColor:'white',
//                                                borderRadius:40/2,
//                                                justifyContent:'center',
//                                                alignItems:'center',
//                                                top:30,
//                                                right:40
//                                                }}>
//                                                <MaterialCommunityIcons name="play" size={30} color={colors.primary} />
//                                                </Pressable> : null}
//                                                <View style={styles.feedLikes} >
//                                                    <MaterialCommunityIcons name='heart' size={15} color="white" style={{top:2}} />
//                                                    <Text style={{ fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'white' }}>{itemData.item.likes.length}</Text>
//                                                </View>
//                                            </ImageBackground>
//                                        </View>
//                                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), marginTop: 5, maxWidth: 170 }} >
//                                            {itemData.item.postDescription}
//                                        </Text>
//                                    </View>
       
//                                </View>
                         
       
//        </View>
       
                                  
//                            )}
//                            />
//                    }
                          
                    
//                 </View>

//                     /* <FlatList
//                         data={feeds}
//                         keyExtractor={item => item.id.toString()}     //has to be unique   
//                         renderItem={({ item, index }) => <FeedCard lastChild={feeds.length} id={item.id} subHeading={item.subHeading} heading={item.heading} hashTags={item.hashTags} likes={item.likes} picture={item.picture} />} //method to render the data in the way you want using styling u need
//                         horizontal={false}
//                         numColumns={2}
//                     /> */
//                     //</ScrollView>
//                 : null}

//                 {/* Tutorials */}
//                 {currentCompoent === 'tutFeed' ? <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'row', marginLeft: -5, marginTop: RFPercentage(3) }} >

//                    {myRecipes == null || myRecipes.length === 0 ? 
                   
//                    <View style={{flex:1,width:SCREEN_WIDTH,paddingBottom:'50%',alignSelf:'center',justifyContent:'center',alignItems:'center',alignContent:'center',paddingTop:'50%'}}>
//                    <Text style={{fontSize:18,fontFamily:'sofiaprolight',textAlign:'center'}}>You havent created any recipe yet.</Text>
//                      </View>
//                    :<FlatList
//                         data={myRecipes}
//                         keyExtractor={item => item._id}     //has to be unique   
//                         renderItem={({ item, index }) =>  (
//                             <FavCard 
//                             navigation={navigation}
//                             onDetailGo={() => {
//                                 if(paymentStatus == null || paymentStatus === false) {
//                                     navigation.navigate('Payment');
//                                 } else {
//                                     navigation.navigate('Detail',{
//                                         recipe:item,
//                                         id:Math.random(),
//                                         recipeId:item._id
//                                     })
//                                 }
//                             }}   
//                             recipe={item} author={item.createdBy} description={item.chefsNote} time={item.BakingTime} likes={item.likes} picture={item.videoThumbnail} realUrl={item.recipePhoto} type={item.recipePhotoType} />
//                         )
//                         } //method to render the data in the way you want using styling u need
//                         horizontal={false}
//                         numColumns={2}
//                     />}
//                     {/**  <ListCard screenWidth={screenWidth}
//                          picture={item.recipePhoto}
//                           heading={item.title} hashTags={item.hashTags} time={item.time} serve={item.serve} /> */}
//                 </ScrollView> : null}

//                 {/* Favourites */}
//                 {currentCompoent === 'favFeed' ? <ScrollView contentContainerStyle={{
//                     flexGrow:1,
                   
//                 }} showsVerticalScrollIndicator={false} style={{ flexDirection: 'row', marginLeft: -5, marginBottom: 30, marginTop: RFPercentage(3),}} >

//                    {favorites == null || favorites.length ===0 ? 
//                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//                        <Text style={{fontSize:20,fontFamily:'sofiaprolight'}}>No favorite recipe found :)</Text>
//                    </View>
//                    : <FlatList
//                         data={favorites}
//                         keyExtractor={item => item._id.toString()}     //has to be unique   
//                         renderItem={({ item, index }) => <FavCard navigation={navigation} recipe={item} author={item.createdBy} description={item.chefsNote} time={item.BakingTime} likes={item.likes} picture={item.recipePhoto} />} //method to render the data in the way you want using styling u need
//                         horizontal={false}
//                         numColumns={2}
//                     />}
//                 </ScrollView> : null}

//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: Constants.statusBarHeight + 20,
//         flexDirection: 'column',
//         // backgroundColor: 'red',
//         width: '100%'
//     },
//     scrollView: {
//         flex: 1,
//         // justifyContent: 'center',
//         width: '95%',

//         // backgroundColor: 'pink',
//         // marginHorizontal: 20,
//     },
//     feedContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         marginTop: 10,
//         marginBottom: 30,
//         // left: 10,
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start'
//     },
//     feedCards3: {
//         // flex: 1,
//         flexDirection: 'row',
//         marginTop: RFPercentage(3)

//     },
//     feedM: {
//         fontSize: RFPercentage(10),
//         color: 'white',
//         padding: RFPercentage(3), paddingLeft: RFPercentage(4), paddingRight: RFPercentage(4),
//         backgroundColor: colors.secondary,
//         maxWidth: (screenWidth / 2) - 65, maxHeight: 140,
//     },
    
   
 

//     background: {
//         width: (screenWidth / 2) - 30, height: 110, paddingLeft: 110,
//         paddingHorizontal: 25,
//         marginTop: 20
//     },
//     feedLikes: {
//         flexDirection: 'row',
//         position: 'absolute',
//         bottom: RFPercentage(1.1),
//         left: RFPercentage(1.1)
//     },
// })

// export default Feed;


















import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image, Platform,StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from "@expo/vector-icons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors';
import img from '../assets/images/Rectangle2991.png'
import img2 from '../assets/images/Rectangle99.png'
import feedImg1 from "../assets/images/Rectangle8.png"
import feedImg2 from "../assets/images/Rectangle9.png"
import feedImg3 from "../assets/images/Rectangle18.png"
import feedImg4 from "../assets/images/Rectangle19.png"
import FeedCard from '../components/FeedCard';
import ListCard from '../components/ListCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { AntDesign } from '@expo/vector-icons';
import FavCard from '../components/FavCard';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import { ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const height = width * 0.45
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_VERTICAL_OUTPUT = 30;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;





function Feed({ navigation }) {

    const paymentStatus = useSelector(pay => pay.payment.status);
    const [user, setUser] = useState(null);
    const favorites = useSelector(state => state.favorites.favs);
    console.log("🚀 ~ file: Feed.js ~ line 256 ~ Feed ~ favorites", favorites)
    const favsIds = useSelector(state => state.favorites.favIds);
    console.log("🚀 ~ file: Feed.js ~ line 258 ~ Feed ~ favsIds", favsIds)
    const dispatch = useDispatch();
    const [myRecipes, setMyRecipes] = useState([]);
    const [profileOfUser, setProfileOfuser] = useState('');
    const getUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            const parsed = JSON.parse(user);
            setUser(parsed);
            setProfileOfuser(parsed.data[0].profile == null || parsed.data[0].profile === '' ? '' : parsed.data[0].profile);
        } catch (e) {
            Alert.alert('us', JSON.stringify(e))
            console.log('error line 60', e)
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    const GetMyRecipes = async () => {
        try {
            const userId = await AsyncStorage.getItem('user');
            const parsedUser = JSON.parse(userId);
            const GetMyRecipes = await axios.get(`${baseUrl}/recipe/get-recipies/${parsedUser.data[0]._id}`);
            setMyRecipes(GetMyRecipes.data.Data);

        } catch (e) {
            Alert.alert('Error', JSON.stringify(e.response.data))
            console.log('eddrro', e);
        }
    }
    useEffect(() => {
        GetMyRecipes();
    }, []);
    const [currentCompoent, setCurrentCompoent] = useState('feedC')

    const [feedBarBack, setFeedBarBack] = useState(colors.primary);
    const [feedBarFont, setFeedBarFont] = useState(colors.feedBar);

    const [tutoBarBack, setTutoBarBack] = useState(colors.feedBar);
    const [tutoBarFont, setTutoBarFont] = useState(colors.primary);

    const [favBarBack, setFavBarBack] = useState(colors.feedBar);
    const [favBarFont, setFavBarFont] = useState(colors.primary);

    const handleFeed = () => {
        setFeedBarBack(colors.primary)
        setFeedBarFont(colors.feedBar)

        setTutoBarBack(colors.feedBar)
        setTutoBarFont(colors.primary)

        setFavBarBack(colors.feedBar)
        setFavBarFont(colors.primary)

        setCurrentCompoent('feedC')
    }

    const handleTutorial = async () => {
        setFeedBarBack(colors.feedBar)
        setFeedBarFont(colors.primary)

        setTutoBarBack(colors.primary)
        setTutoBarFont(colors.feedBar)

        setFavBarBack(colors.feedBar)
        setFavBarFont(colors.primary)

        setCurrentCompoent('tutFeed')
    }

    const handleFav = () => {
        setFeedBarBack(colors.feedBar)
        setFeedBarFont(colors.primary)

        setTutoBarBack(colors.feedBar)
        setTutoBarFont(colors.primary)

        setFavBarBack(colors.primary)
        setFavBarFont(colors.feedBar)

        setCurrentCompoent('favFeed')
    }

    let dummy = [1]
    const [userposts, setUserPosts] = useState(null);
    const [firstPost,setFirstPost] = useState(null);
    const GetPostsFunction = async () => {
        try {
            const userId = await AsyncStorage.getItem('user');
            const parsedUser = JSON.parse(userId);
            const getPostsAPI = await axios.get(`${baseUrl}/post/my-posts/${parsedUser.data[0]._id}`);
            const firstPostInArr = [getPostsAPI.data.Data[0]];
            setFirstPost(firstPostInArr);
            const d = getPostsAPI.data.Data;
            const splicedOne = d.splice(0,1);
            setUserPosts(d);
            await GetMyRecipes();
            console.log(getPostsAPI.data.Data.length);


        } catch (e) {
            console.log(e);
            Alert.alert('Error', JSON.stringify(e));
        }
    }
    useEffect(() => {
        getUser();
        GetPostsFunction();
    }, []);
    // useEffect(() => {
    //     GetPostsFunction();
    // },[]);
    useEffect(() => {
        const listener = navigation.addListener('focus', GetPostsFunction);
        return listener;
    }, [navigation]);
    useEffect(() => {
        GetPostsFunction();
    }, [])
    if (user == null || userposts == null || myRecipes == null) {

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} size='large' />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>

            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>


                <View style={styles.feedContainer}>

                    {/* MIMI */}

                    <View style={styles.feedCards3} >
                        {profileOfUser != '' ?
                            <Image
                                source={{ uri: `${baseUrl}/${profileOfUser}` }}
                                style={{ width: 115, height: RFPercentage(21), resizeMode: 'cover', marginLeft: 10, borderWidth: 1, borderColor: 'transparent', borderRadius: 10 }}
                            />
                            :
                            <View >
                                <Text style={[styles.feedM, { fontFamily: 'Zermatt-First' }]} >{user.data[0].firstname[0]}</Text>
                            </View>
                        }
                        <View style={{ flexDirection: 'column', left: 25, marginTop: Platform.OS === 'ios' ? RFPercentage(2) : null }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: colors.primary, fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(3.3) }} >{user.data[0].firstname}</Text>
                                <MaterialCommunityIcons style={{ marginLeft: RFPercentage(14) }} size={35} color={colors.primary} name="dots-horizontal" />
                            </View>
                            {/* <View>
                                <Text style={{ color: colors.tertiary, fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.5) }} >Communtiy</Text>
                            </View> */}
                            <View>
                       {/* <Text style={{ color: colors.tertiary, fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.5) }} >Communtiy</Text> */}
                              <View style={{flexDirection:'row',marginVertical:10}}>
                                  <View style={{justifyContent:'center',alignItems:'center'}}>
                                      <Text style={{fontWeight:'bold'}}>{user.data[0].followers.length}</Text>
                                      <Text style={{fontFamily:'sofiaprolight'}}>Followers</Text>
                                  </View>
                                  <View style={{justifyContent:'center',alignItems:'center',marginLeft:20}}>
                                      <Text style={{fontWeight:'bold'}}>{user.data[0].followings.length}</Text>
                                      <Text style={{fontFamily:'sofiaprolight'}}>Followings</Text>
                                  </View>
                              </View>
                             </View>
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('Settings', {
                                    userKey: user.data[0]._id
                                })} style={{ maxWidth: 120, marginTop: 10, borderWidth: 1, borderColor: colors.primary, alignItems: 'center' }}>
                                    <Text style={{ color: colors.primary, padding: 10, fontSize: RFPercentage(1.5) }}>Settings</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Nav Bar */}

                <View style={{ width: "100%", height: 65, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: "33.33%", backgroundColor: feedBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
                        <MaterialCommunityIcons onPress={() => handleFeed()} color={feedBarFont} name="menu" size={17} />
                        <Text onPress={() => handleFeed()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: feedBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Feed</Text>
                    </View>

                    <TouchableOpacity style={{ width: "33.33%", backgroundColor: tutoBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
                        <MaterialCommunityIcons onPress={() => handleTutorial()} color={tutoBarFont} name="layers-triple-outline" size={17} />
                        <Text onPress={() => handleTutorial()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: tutoBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Tutorials</Text>
                    </TouchableOpacity>

                    <View style={{ width: "33.33%", backgroundColor: favBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
                        <MaterialCommunityIcons onPress={() => handleFav()} color={favBarFont} name="heart-outline" size={17} />
                        <Text onPress={() => handleFav()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: favBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Favorites</Text>
                    </View>
                </View>

                {/* feed Component */}
                {currentCompoent === 'feedC' ?
                    //  <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'row', marginLeft: -5, marginTop: RFPercentage(3) }} >
                    <View style={{ flex: 1 }}>

                        {/* <Pressable
            onPress={() => {
                navigation.navigate('CreatePost',{
                    img:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
                })
            }}
            style={{
                justifyContent:'center',
                alignItems:'center',
                borderRadius:50/2,
                alignSelf:'flex-end',right:10,
                marginTop:5
            }}>
                  <AntDesign name="plus" size={24} color={colors.primary} />
            </Pressable> */}

                        <View style={{ flexDirection: "row", justifyContent: "space-between" ,alignItems:"center" }}>
                            {/* <Pressable> */}
                            <TouchableOpacity onPress={() => {
                                        navigation.navigate('CreatePost', {
                                            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
                                        })
                                    }} style={{borderStyle:'dotted',borderWidth:1,borderColor:colors.primary, width: "45%", height: 110, marginRight: 10, marginTop: 25, alignItems: "center", justifyContent: "center"}}>

                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('CreatePost', {
                                            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png'
                                        })
                                    }}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50 / 2,
                                    }}>

                                    <AntDesign name="plus" size={45} color={colors.primary} />
                                    <Text style={{color:colors.primary}}>
                                    Add Photos
                           </Text>
                                </TouchableOpacity>
                                
                            </TouchableOpacity>
                            {/* </Pressable> */}
                            <View >
                                <FlatList
                                    data={firstPost}
                                    // keyExtractor={(item,index) => item._id}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    numColumns={2}
                                    renderItem={(itemData, index) => (

                                        <View style={{
                                            width: '50%',
                                            height: '100%',
                                            marginTop:10,
                                            alignItems:"center",
                                            justifyContent:"center"
                                            // alignItems: "flex-end",
                                            // backgroundColor: "yellow"
                                        }}>
                                                <View style={{ flexDirection: 'row' }} >

                                                    <View style={styles.feedCards} >

                                                        <View>
                                                            <ImageBackground source={{ uri: `${baseUrl}/${itemData.item.videoThumbnail}` }} style={styles.background} >
                                                                {

                                                                    itemData.item.postedContentType === 'mp4' ? <Pressable
                                                                        onPress={() => {
                                                                            navigation.navigate('Video', {
                                                                                videoUrl: `${baseUrl}/${itemData.item.postedContent}`,
                                                                                thumbnail: `${baseUrl}/${itemData.item.videoThumbnail}`
                                                                            });
                                                                        }}
                                                                        style={{
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderWidth: 1,
                                                                            borderColor: 'white',
                                                                            backgroundColor: 'white',
                                                                            borderRadius: 40 / 2,
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            top: 30,
                                                                            right: 40
                                                                        }}>
                                                                        <MaterialCommunityIcons name="play" size={30} color={colors.primary} />
                                                                    </Pressable> : null}
                                                                <View style={styles.feedLikes} >
                                                                    <MaterialCommunityIcons name='heart' size={15} color="white" style={{ top: 2 }} />
                                                                    <Text style={{ fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'white' }}>{itemData.item.likes.length}</Text>
                                                                </View>
                                                            </ImageBackground>
                                                        </View>

                                                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), marginTop: 5, maxWidth: 170 }} >
                                                            {/* {itemData.item.postDescription} */}
                                                           
                                                        </Text>
                                                    </View>

                                                </View>

                                        </View>

                                    )}

                                />
                            </View>
                        </View>
                        <FlatList
                            data={userposts}
                            // keyExtractor={(item,index) => item._id}
                            contentContainerStyle={{ flexGrow: 1 }}
                            numColumns={2}
                            renderItem={(itemData) => (
                                // itemData.index > 0 ?

                                    <View style={{
                                        width: '100%',
                                        height: '100%',
                                        flex: 1,
                                       // backgroundColor: "yellow"
                                    }}>

                                        <View style={{ flexDirection: 'row' }} >
                                            <View>

                                                <View>
                                                    <ImageBackground source={{ uri: `${baseUrl}/${itemData.item.videoThumbnail}` }} style={styles.background} >
                                                        {

                                                            itemData.item.postedContentType === 'mp4' ? <Pressable
                                                                onPress={() => {
                                                                    navigation.navigate('Video', {
                                                                        videoUrl: `${baseUrl}/${itemData.item.postedContent}`,
                                                                        thumbnail: `${baseUrl}/${itemData.item.videoThumbnail}`
                                                                    });
                                                                }}
                                                                style={{
                                                                    width: 40,
                                                                    height: 40,
                                                                    borderWidth: 1,
                                                                    borderColor: 'white',
                                                                    backgroundColor: 'white',
                                                                    borderRadius: 40 / 2,
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    top: 30,
                                                                    right: 40
                                                                }}>
                                                                <MaterialCommunityIcons name="play" size={30} color={colors.primary} />
                                                            </Pressable> : null}
                                                        <View style={styles.feedLikes} >
                                                            <MaterialCommunityIcons name='heart' size={15} color="white" style={{ top: 2 }} />
                                                            <Text style={{ fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'white' }}>{itemData.item.likes.length}</Text>
                                                        </View>
                                                    </ImageBackground>
                                                </View>

                                                <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), maxWidth: 170 }} >
                                                    {/* {itemData.item.postDescription} */}
                                                  
                                                </Text>
                                            </View>

                                        </View>


                                    </View>
                                    // : null

                            )}
                        />


                    </View>

                    /* <FlatList
                        data={feeds}
                        keyExtractor={item => item.id.toString()}     //has to be unique   
                        renderItem={({ item, index }) => <FeedCard lastChild={feeds.length} id={item.id} subHeading={item.subHeading} heading={item.heading} hashTags={item.hashTags} likes={item.likes} picture={item.picture} />} //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={2}
                    /> */
                    //</ScrollView>
                    : null}

                {/* Tutorials */}
                {currentCompoent === 'tutFeed' ? <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'row', marginLeft: -5, marginTop: RFPercentage(3) }} >

                    <FlatList
                        data={myRecipes}
                        keyExtractor={item => item._id}     //has to be unique   
                        renderItem={({ item, index }) => (
                            <FavCard
                                navigation={navigation}
                                onDetailGo={() => {
                                    if (paymentStatus == null || paymentStatus === false) {
                                        navigation.navigate('Payment');
                                    } else {
                                        navigation.navigate('Detail', {
                                            recipe: item,
                                            id: Math.random(),
                                            recipeId: item._id
                                        })
                                    }
                                }}
                                recipe={item} author={item.createdBy} description={item.chefsNote} time={item.BakingTime} likes={item.likes} picture={item.videoThumbnail} realUrl={item.recipePhoto} type={item.recipePhotoType} />
                        )
                        } //method to render the data in the way you want using styling u need
                        horizontal={false}
                        numColumns={2}
                    />
                    {/**  <ListCard screenWidth={screenWidth}
                         picture={item.recipePhoto}
                          heading={item.title} hashTags={item.hashTags} time={item.time} serve={item.serve} /> */}
                </ScrollView> : null}

                {/* Favourites */}
                {currentCompoent === 'favFeed' ? <ScrollView contentContainerStyle={{
                    flexGrow: 1,

                }} showsVerticalScrollIndicator={false} style={{ flexDirection: 'row', marginLeft: -5, marginBottom: 30, marginTop: RFPercentage(3), }} >

                    {favorites == null || favorites.length === 0 ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'sofiaprolight' }}>No favorite recipe found :)</Text>
                        </View>
                        : <FlatList
                            data={favorites}
                            keyExtractor={item => item._id.toString()}     //has to be unique   
                            renderItem={({ item, index }) => <FavCard navigation={navigation} recipe={item} author={item.createdBy} description={item.chefsNote} time={item.BakingTime} likes={item.likes} picture={item.recipePhoto} />} //method to render the data in the way you want using styling u need
                            horizontal={false}
                            numColumns={2}
                        />}
                </ScrollView> : null}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight + 20,
        flexDirection: 'column',
        // backgroundColor: 'red',
        width: '100%'
    },
    scrollView: {
        flex: 1,
        // justifyContent: 'center',
        width: '95%',

        // backgroundColor: 'pink',
        // marginHorizontal: 20,
    },
    feedContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    feedCards3: {
        // flex: 1,

        flexDirection: 'row',
        marginTop: RFPercentage(3)

    },
    feedM: {
        fontSize: RFPercentage(10),
        color: 'white',
        padding: RFPercentage(3), paddingLeft: RFPercentage(4), paddingRight: RFPercentage(4),
        backgroundColor: colors.secondary,
        maxWidth: (screenWidth / 2) - 65, maxHeight: 140
    },




    background: {
        width: (screenWidth / 2) - 30, height: 110, paddingLeft: 110,
        paddingHorizontal: 25,
        marginTop: 20
    },
    feedLikes: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: RFPercentage(1.1),
        left: RFPercentage(1.1)
    },
})

export default Feed;