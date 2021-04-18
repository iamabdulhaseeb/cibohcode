import React, { useEffect, useState } from 'react';
import { StatusBar,SafeAreaView, StyleSheet, View, ScrollView, Text,ActivityIndicator, Dimensions, TouchableOpacity, FlatList, Image, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants'
import  MaterialCommunityIcons  from "react-native-vector-icons/MaterialCommunityIcons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors';
import img from '../assets/images/Rectangle2991.png'
import img2 from '../assets/images/Rectangle99.png'
import feedImg1 from "../assets/images/Rectangle8.png"
import feedImg2 from "../assets/images/Rectangle9.png"
import feedImg3 from "../assets/images/Rectangle18.png"
import feedImg4 from "../assets/images/Rectangle19.png"
import { Entypo } from 'react-native-vector-icons';
import FeedCard from '../components/FeedCard';
import ListCard from '../components/ListCard';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import FavCard from '../components/FavCard';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
import { Pressable } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import { ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
const height = width * 0.45
const SCREEN_WIDTH = Dimensions.get('window').width;
const CAROUSEL_VERTICAL_OUTPUT = 30;
const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH - CAROUSEL_VERTICAL_OUTPUT;

function UserProfile(props) {
    const userKey = props.route.params.userId;
    const randomNum = props.route.params.code;
    console.log("🚀 ~ file: UserProfile.js ~ line 37 ~ UserProfile ~ userKey", userKey)
    const [user, setUser] = useState(null);
    const [myDetails,setMyDetails] = useState(null);
    const MyDetailsFunc = async() => {
        try {
          const me = await AsyncStorage.getItem('user');
          const parsedMe = JSON.parse(me);
          setMyDetails(parsedMe);
        }catch(e) {
            console.log(e);
        //   Alert.alert('Error',JSON.stringify(e));
        }
    }
    useEffect(() => {
        MyDetailsFunc();
    },[randomNum]);
    const [myRecipes, setMyRecipes] = useState([]);
    const [loadingUser,setLoadingUser] = useState(false);
    const getUser = async () => {
        try {
            setLoadingUser(true);
            const userAPIResponse = await axios.get(`${baseUrl}/user/users/${userKey.id}`);
            setUser(userAPIResponse.data.data);
            setLoadingUser(false);
        } catch (e) {
            setLoadingUser(false);
            // Alert.alert('us', JSON.stringify(e))
            console.log(e)
        }
    }
    useEffect(() => {
        getUser();
    }, [randomNum,userKey]);
    const GetMyRecipes = async () => {
        try {
            await getUser();
            const GetMyRecipes = await axios.get(`${baseUrl}/recipe/get-recipies/${userKey.id}`);
            setMyRecipes(GetMyRecipes.data.Data);
        } catch (e) {
            console.log('eddrro', e);
        }
    }
    // useEffect(() => {
    //     GetMyRecipes();
    // }, [user]);
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
        await GetMyRecipes();

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
    const GetPostsFunction = async () => {
        try {
            const getPostsAPI = await axios.get(`${baseUrl}/post/my-posts/${userKey.id}`);
            setUserPosts(getPostsAPI.data.Data);
            console.log(getPostsAPI.data.Data);
        } catch (e) {
            console.log(e.response);
            // Alert.alert('Error', JSON.stringify(e));
        }
    }
    useEffect(() => {
        GetPostsFunction();
    }, [randomNum]);
    const follow = async() => {
        try {
         const followAPIResponse = await axios.post(`${baseUrl}/user/follow/${user.userId}/${myDetails.data[0]._id}`);
         getUser();
        }catch(e) { 
            console.log(e);

        //  Alert.alert('Error',JSON.stringify(e))
        }
    };
    const unfollow = async() => {
        try {
         const UnfollowAPIResponse = await axios.post(`${baseUrl}/user/unfollow/${user.userId}/${myDetails.data[0]._id}`);
         getUser();
        }catch(e) { 
            console.log(e);

        //  Alert.alert('Error',JSON.stringify(e))
        }
    };
    // useEffect(() => {
    //     props.navigation.addListener('willFocus',() => {
    //         getUser();
    //         GetPostsFunction();
    //     });
    // },[userKey]);

    if(user == null || userposts == null || myRecipes == null || loadingUser) {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator color={colors.primary} size='large'/>
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
                        {user.profile == null || user.profile === '' ?  <View >
                            <Text style={[styles.feedM, { fontFamily: 'Zermatt-First' }]} >{user.firstname[0]}</Text>
                        </View>
                    :
                    <Image
                    source={{uri:`${baseUrl}/${user.profile}`}}
                    style={{
                        width:110,
                        height:150,
                        borderWidth:1,
                        borderColor:'transparent',
                        borderRadius:10,
                        top:10
                    }}
                    />    
                    }
                        <View style={{ flexDirection: 'column', left: 25, marginTop: Platform.OS === 'ios' ? RFPercentage(2) : null }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: colors.primary, fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.3) }}numberOfLines={1}>{user.firstname != null && user.lastname != null ? user.firstname + " " + user.lastname : 'loading...' } </Text>
                                <MaterialCommunityIcons style={{ marginLeft: RFPercentage(14) }} size={35} color={colors.primary} name="dots-horizontal" />
                            </View>
                            <View>
                                <Text style={{ color: colors.tertiary, fontFamily: 'sofiaprolight', fontSize: RFPercentage(2.5) }} >Communtiy</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{alignItems:'center',margin:10}}>
                                    <Text style={{fontWeight:'bold'}}>{userposts.length}</Text>
                                    <Text>Posts</Text>
                                </View>
                                <View style={{alignItems:'center',margin:10}}>
                                    <Text style={{fontWeight:'bold'}}>{user.followers != null ? user.followers.length : 'load..'}</Text>
                                    <Text>Followers</Text>
                                </View>
                                <View style={{alignItems:'center',margin:10}}>
                                    <Text style={{fontWeight:'bold'}}>{user.followings != null ? user.followings.length : 'load...'}</Text>
                                    <Text>Followings</Text>
                                </View>
                            </View>


                            <View>
                                <TouchableOpacity onPress={() =>{
                                    if(user.followers.includes(myDetails.data[0]._id)) {
                                        unfollow();
                                    } else {
                                        follow();
                                    }
                                }} style={{ maxWidth: 120, marginTop: 10, borderWidth: 1, borderColor: colors.primary, alignItems: 'center' }}>
                                    <Text style={{ color: colors.primary, padding: 10, fontSize: RFPercentage(1.5) }}>{user.followers.includes(myDetails.data[0]._id) ? 'Unfollow' : 'follow'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Nav Bar */}

                <View style={{ width: "100%", height: 65, flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: "50.33%", backgroundColor: feedBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
                        <MaterialCommunityIcons onPress={() => handleFeed()} color={feedBarFont} name="menu" size={17} />
                        <Text onPress={() => handleFeed()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: feedBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Feed</Text>
                    </View>

                    <TouchableOpacity style={{ width: "50.33%", backgroundColor: tutoBarBack, padding: RFPercentage(2.8), paddingLeft: RFPercentage(2), flexDirection: 'row' }} >
                        <MaterialCommunityIcons onPress={() => handleTutorial()} color={tutoBarFont} name="layers-triple-outline" size={17} />
                        <Text onPress={() => handleTutorial()} style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.4), color: tutoBarFont, paddingLeft: RFPercentage(0.3), marginTop: Platform.OS === 'ios' ? RFPercentage(0.8) : null }}>Tutorials</Text>
                    </TouchableOpacity>

                  
                </View>

                {/* feed Component */}
                {currentCompoent === 'feedC' ?
                    //  <ScrollView showsVerticalScrollIndicator={false} style={{ flexDirection: 'row', marginLeft: -5, marginTop: RFPercentage(3) }} >
                    <View style={{ flex: 1 }}>


                        <FlatList
                            data={userposts}
                            // keyExtractor={item => item._id}
                            contentContainerStyle={{ flexGrow: 1 }}
                            numColumns={2}
                            renderItem={itemData => (

                                <View style={{
                                    width: '100%',
                                    height: '100%',
                                    flex: 1
                                }}>
                                    <View style={{ flexDirection: 'row' }} >
                                        <View style={styles.feedCards} >

                                            <View>
                                                <ImageBackground source={{ uri: `${baseUrl}/${itemData.item.videoThumbnail}` }} style={styles.background} >
                                               {itemData.item.postedContentType === 'mp4' ?  <Pressable 
                                        onPress={() => {
                                        props.navigation.navigate('Video',{
                                            videoUrl:`${baseUrl}/${itemData.item.postedContent}`,
                                            thumbnail:itemData.item.videoThumbnail
                                        });
                                        }}
                                        style={{
                                        width:40,
                                        height:40,
                                        borderWidth:1,
                                        borderColor:'white',
                                        backgroundColor:'white',
                                        borderRadius:40/2,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        top:40,
                                        right:40
                                        }}>
                                        <MaterialCommunityIcons name="play" size={30} color={colors.primary} />
                                        </Pressable> : null }
                                                    <View style={styles.feedLikes} >
                                                        <MaterialCommunityIcons name='heart' size={15} color="white" />
                                                        <Text style={{ fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'white' }}>{itemData.item.likes.length}</Text>
                                                    </View>
                                                </ImageBackground>
                                            </View>
                                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), marginTop: 5, maxWidth: 170 }} >
                                                {itemData.item.postDescription}
                                            </Text>
                                        </View>

                                    </View>


                                </View>


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
                        renderItem={({ item, index }) => <FavCard navigation={props.navigation} recipe={item} author={item.createdBy} description={item.chefsNote} time={item.BakingTime} likes={item.likes} picture={item.recipePhoto} />
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
                            renderItem={({ item, index }) => <FavCard navigation={props.navigation} recipe={item} author={item.createdBy} description={item.chefsNote} time={item.BakingTime} likes={item.likes} picture={item.recipePhoto} />} //method to render the data in the way you want using styling u need
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
        maxWidth: (screenWidth / 2) - 65, maxHeight: 170,
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

export default UserProfile;