import React, { useState,useEffect } from 'react';
import { StyleSheet, View, SafeAreaView,Pressable, ScrollView, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
// import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"
import ProgressCircle from 'react-native-progress-circle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import StarRating from '../components/StarRating';
import colors from '../config/colors';

import rectangleDetail1 from "../assets/images/rectangleDetail1.png"
import rectangleDetail2 from "../assets/images/rectangleDetail2.png"
import rectangleDetail3 from "../assets/images/rectangleDetail3.png"
import rectangleDetail4 from "../assets/images/rectangleDetail4.png"
import rectangleDetail5 from "../assets/images/rectangleDetail5.png"
import Oval from "../assets/images/Oval.png"
import { Alert } from 'react-native';
import * as FavoriteActions from '../Sdk/Store/Actions/AddFavoriteAction';
import { ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as StoreShoppingListActions from '../Sdk/Store/Actions/ShoppingListAction';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import Pulse from 'react-native-pulse';
import { AsyncStorage } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
// import {Entypo} from '@expo/vector-icons';
function Detail(props) {
    const dispatch = useDispatch();
    const [showSteps,setShowSteps] = useState(false);
    const [currentRating, setCurrentRating] = useState(2)
    const [recipe,setRecipe] = useState(props.route.params.recipe);
    const recipedId = props.route.params.recipeId;
    console.log("🚀 ~ file: Detail.js ~ line 29 ~ Detail ~ recipe", recipe)
    const randomCode = props.route.params.id;
    const StoredShoppingList = useSelector(list => list.shoppingList.shoppingList);
   const StoredShoppingListIds = useSelector(listIDs => listIDs.shoppingList.ShoppingListIds);
   const favListIds = useSelector(state => state.favorites.favIds);
   console.log("🚀 ~ file: Detail.js ~ line 27 ~ Detail ~ StoredShoppingListIds", StoredShoppingListIds)
    // console.log("🚀 ~ file: Detail.js ~ line 26 ~ Detail ~ StoredShoppingList", StoredShoppingList)
    
    const [backgroundIngrButton1, setBackgroundIngrButton1] = useState(colors.primary)
    const [textIngreColor1, setTextIngreColor1] = useState('white')

    const [backgroundIngrButton2, setBackgroundIngrButton2] = useState('#eeeeee')
    const [textIngreColor2, setTextIngreColor2] = useState('black')

    // only five allow
    const [reviewImages, setReviewImages] = useState([
        {
            image: rectangleDetail2
        },
        {
            image: rectangleDetail2
        },
        {
            image: rectangleDetail2
        },
        {
            image: rectangleDetail2
        },
        {
            image: rectangleDetail2
        }
    ])

    const [ingredients, setIngredients] = useState([
        {
            title: 'Flour',
            tableSpoon: '4 tablespoons'
        },
        {
            title: 'Sugar',
            tableSpoon: '3 tablespoons'
        },
        {
            title: 'Cocoa powder',
            tableSpoon: '2 tablespoons'
        },
        {
            title: 'Baking powder',
            tableSpoon: '1/2 tablespoons'
        },
        {
            title: 'Milk',
            tableSpoon: '3 tablespoons'
        },
        {
            title: 'Oil, vegetable  or canola',
            tableSpoon: '1 tablespoon'
        },
        {
            title: 'Vanilla extract',
            tableSpoon: '1 tablespoon'
        },
        {
            title: 'Chocolate hazelnut spread, plus more for topping',
            tableSpoon: '1 tablespoon'
        },
        {
            title: 'Powdered sugar, for topping, optional',
            tableSpoon: '1 tablespoon'
        }
    ]);
    useEffect(() => {
        getUser();
    }, []);
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
    }
    const likeRecipe = async(id) => {
        try {
          const likeRecipeAPIResponse = await axios.post(`${baseUrl}/recipe/like-recipe/${id}/${user.data[0]._id}`);
          await GetRecipy();
        }catch(e) {
          Alert.alert('error in like',JSON.stringify(e.response.data));
        }
     }
     const UnlikeRecipe = async(id) => {
        try {
          const UnlikeRecipeAPIResponse = await axios.post(`${baseUrl}/recipe/unlike-recipe/${id}/${user.data[0]._id}`);
          await GetRecipy();
        }catch(e) {
          Alert.alert('error in unlike',JSON.stringify(e.response.data));
        }
     }
     const [loading,setloading] = useState(false);
     const [recievedUser,setRecievedUser] = useState([]);
     const [loadingRecipe,setLoadingRecipe] = useState(false);
     const GetRecipy = async() => {
         try {
             setloading()
             setShowSteps(false);
          const getRecipyAPIResponse = await axios.get(`${baseUrl}/recipe/get-recipy/${recipedId}`);
          setRecipe(getRecipyAPIResponse.data.Data[0]); 
          setRecievedUser(getRecipyAPIResponse.data.user);
        }catch(e) {
            setloading(false);
           Alert.alert('Error In Recipe',JSON.stringify(e.response.data));
         }
     }
     useEffect(() => {
         GetRecipy();
     },[randomCode,recipedId]);


    const handleRating = (rating) => {
        setCurrentRating(rating)
    }
    const [reviewsCount,setReviewsCount] = useState(0);
    const getReviews = async() => {
        try {
         const getReviews = await axios.get(`${baseUrl}/review/get-reviews/${recipedId}`);
         setReviewsCount(getReviews.data.reviews.length);
        }catch(e) {
            Alert.alert('Error',JSON.stringify(e.response.data));
        }
    }
    useEffect(() => {
        getReviews();
    },[]);
    if(user == null || user.length === 0 || loading) {
        return (
            <View style={{
                flex:1,
                backgroundColor:colors.primary,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <ActivityIndicator color='white' size='large'/>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>

                {/* header background image */}
                <ImageBackground resizeMode="stretch" style={{ alignItems: 'center', justifyContent: 'flex-end', width: "100%", height: RFPercentage(27) }} source={{uri:`${baseUrl}/${recipe.videoThumbnail}`}} >
                    <View style={styles.topImageShade} ></View>
                    <View style={{ width: "90%", marginBottom: RFPercentage(2) }} >
                        <Text style={{ fontSize: RFPercentage(2.6), color: 'white', fontFamily: 'AvianoFlareRegular' }} >{recipe.title}</Text>
                    </View>
                </ImageBackground>

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                    {/* custom component */}
                    <StarRating onHandleRating={handleRating} onCurrentRating={currentRating} maxRating={5} />

                    <Text style={{ marginTop: RFPercentage(2.9), fontSize: RFPercentage(3.5), color: 'black', fontFamily: "Zermatt-First" }} >19 Ratings</Text>

                    <View style={{ marginTop: RFPercentage(3.5), width: '90%', marginRight: '5%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
             
                                            <TouchableOpacity 
                                            // style={{
                                            //     right:10,
                                            // }}
                                            onPress={() => {
                                                if(recipe.likes.includes(user.data[0]._id)) {
                                                    UnlikeRecipe(recipe._id)
                                                } else {
                                                    likeRecipe(recipe._id);
                                                }
                                            }}>
                                            {recipe.likes.includes(user.data[0]._id) ? <MaterialCommunityIcons name='heart' size={30} color="red" /> : 
                                            <MaterialCommunityIcons name="heart-outline" size={30} color={colors.primary} />
                                            }
                                            </TouchableOpacity>
                                            <Text style={{ zIndex:5000,fontSize: RFPercentage(3), fontFamily: 'Roboto', color: colors.primary,bottom:2,left:5}}>{recipe.likes.length}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                            <TouchableOpacity onPress={() => {
                                if(favListIds.includes(recipe._id)) {
                                    Alert.alert('Delete called',JSON.stringify(favListIds))
                                    dispatch(FavoriteActions.deleteFav(recipe._id));
                                ToastAndroid.showWithGravity('This Recipe was removed from favorites',ToastAndroid.LONG,ToastAndroid.BOTTOM)
                                } else {
                                    Alert.alert('Add called',JSON.stringify(recipe._id))
                                    dispatch(FavoriteActions.addFav(recipe,recipe._id));
                                ToastAndroid.showWithGravity('This Recipe was added to favorites',ToastAndroid.LONG,ToastAndroid.BOTTOM)
                                }
                            }}>
                                <MaterialCommunityIcons size={RFPercentage(3.5)} color={colors.primary} name={favListIds.includes(recipe._id) ? "bookmark" : "bookmark-outline"} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: RFPercentage(1), color: colors.primary, fontSize: RFPercentage(3) }} >Save</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                            <TouchableOpacity>
                                <MaterialCommunityIcons size={RFPercentage(3.5)} color={colors.primary} name="share-variant" />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: RFPercentage(1), color: colors.primary, fontSize: RFPercentage(3) }} >Share</Text>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: RFPercentage(5), flexDirection: 'row', borderColor: '#1E2022', borderTopWidth: 0.2, borderBottomWidth: 0.2 }} >
                    <View style={{ margin: RFPercentage(3) }} >
                        <Image source={{uri:`${baseUrl}/${recievedUser.profile}`}} style={{ borderRadius: RFPercentage(5), width: RFPercentage(10), height: RFPercentage(10),resizeMode:'cover'}} />
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }} >
                        <View>
                            <Text style={{ fontSize: RFPercentage(2), fontFamily: 'AvianoFlareRegular', color: 'blacks' }} >{recievedUser.firstname + " " + recievedUser.lastname}</Text>
                        </View>
                        <View style={{ marginTop: RFPercentage(1) }} >
                            <Text style={{ fontSize: RFPercentage(2.5), fontFamily: 'sofiaprolight', color: colors.primary }} >Chef at Ciboh</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '95%', padding: RFPercentage(3), flexDirection: 'column', borderColor: '#1E2022', borderBottomWidth: 0.2 }} >
                    <View style={{ marginLeft: '1.7%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} >
                            <Text style={{ fontSize: RFPercentage(3.4), fontFamily: 'Zermatt-First' }} >Reviews ( {reviewsCount} )</Text>
                        </View>
                        <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('Reviews',{
                                recipe:recipe
                            });
                        }}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                            <Text style={{ fontSize: RFPercentage(2), fontWeight: 'bold', fontFamily: "sofiaprolight" }} >Read  {'>'}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ marginTop: RFPercentage(1), marginLeft: '1.7%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'sofiaprolight', color: colors.primary, fontSize: RFPercentage(2.5) }} >18 images {'&'} 36 comments</Text>
                    </View>

                    <View style={{ marginTop: RFPercentage(2), marginLeft: '1.7%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                        {reviewImages.map((revImg, index) => (
                            <Image key={index} source={revImg.image} style={{ marginRight: RFPercentage(0.6), width: RFPercentage(7.8), height: RFPercentage(7.8) }} />
                        ))}
                    </View> */}

                </View>

                {/* Difficulty */}
                <View style={{ width: '95%', padding: RFPercentage(3), paddingBottom: RFPercentage(5), paddingTop: RFPercentage(5), flexDirection: 'column', borderColor: '#1E2022', borderBottomWidth: 0.2 }} >
                    <View style={{ marginLeft: '1.7%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'Zermatt-First', color: 'black', fontSize: RFPercentage(3.4) }} >Difficulty : </Text>
                        <Text style={{ fontFamily: 'Zermatt-First', color: colors.primary, fontSize: RFPercentage(3.4) }} >{recipe.difficulty}</Text>
                    </View>
                </View>

                {/* steps timing */}
                <View style={{ width: '95%', padding: RFPercentage(3), paddingBottom: RFPercentage(4), paddingTop: RFPercentage(4), flexDirection: 'column', borderColor: '#1E2022', borderBottomWidth: 0.2 }} >
                    <View style={{ marginLeft: '1.7%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <ProgressCircle
                                percent={recipe.prepTime}
                                radius={40}
                                borderWidth={RFPercentage(1.3)}
                                color={colors.primary}
                                shadowColor={'#d3d3d3'}
                                bgColor="#fff"
                            >
                                <Text style={{ color: colors.primary, fontSize: RFPercentage(1.5), fontFamily: 'sofiaprolight' }}>{recipe.prepTime} mint</Text>
                            </ProgressCircle>
                            <Text style={{ marginTop: RFPercentage(2.4), fontSize: RFPercentage(3), fontFamily: 'Zermatt-First', color: 'black' }} >Cooking</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <ProgressCircle
                                percent={recipe.BakingTime}
                                radius={40}
                                borderWidth={RFPercentage(1.3)}
                                color={colors.primary}
                                shadowColor={'#d3d3d3'}
                                bgColor="#fff"
                            >
                                <Text style={{ color: colors.primary, fontSize: RFPercentage(1.5), fontFamily: 'sofiaprolight' }}>{recipe.BakingTime} mint</Text>
                            </ProgressCircle>
                            <Text style={{ marginTop: RFPercentage(2.4), fontSize: RFPercentage(3), fontFamily: 'Zermatt-First', color: 'black' }} >Baking</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <ProgressCircle
                                percent={recipe.RestingTime}
                                radius={40}
                                borderWidth={RFPercentage(1.3)}
                                color={colors.primary}
                                shadowColor={'#d3d3d3'}
                                bgColor="#fff"
                            >
                                <Text style={{ color: colors.primary, fontSize: RFPercentage(1.5), fontFamily: 'sofiaprolight' }}>{recipe.RestingTime} mint</Text>
                            </ProgressCircle>
                            <Text style={{ marginTop: RFPercentage(2.4), fontSize: RFPercentage(3), fontFamily: 'Zermatt-First', color: 'black' }} >Resting</Text>
                        </View>
                    </View>
                </View>

                <View style={{ width: '95%', padding: RFPercentage(3), flexDirection: 'column', borderColor: '#1E2022', borderBottomWidth: 0.2 }} >
                    <View style={{ marginLeft: '1.7%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} >
                            <Text numberOfLines={1} style={{ minWidth: "120%", fontSize: RFPercentage(3.4), fontFamily: 'Zermatt-First' }} >Ingredients</Text>
                            <Text style={{ color: 'grey', fontSize: RFPercentage(2), fontFamily: 'sofiaprolight' }} >for 1 servings</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                            <TouchableOpacity onPress={() => {
                                setBackgroundIngrButton1(colors.primary)
                                setTextIngreColor1('white')
                                setBackgroundIngrButton2('#eeeeee')
                                setTextIngreColor2('black')
                            }} style={{ padding: 2, backgroundColor: backgroundIngrButton1 }} >
                                <MaterialCommunityIcons color={textIngreColor1} size={20} name="plus" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setBackgroundIngrButton1('#eeeeee')
                                setTextIngreColor1('black')
                                setBackgroundIngrButton2(colors.primary)
                                setTextIngreColor2('white')
                            }} style={{ padding: 2, backgroundColor: backgroundIngrButton2 }} >
                                <MaterialCommunityIcons color={textIngreColor2} size={20} name="minus" />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'column', marginTop: RFPercentage(1) }} >
                        {recipe.ingredients.map((ingred, index) => (
                            <View style={{ borderBottomWidth: 0.2, paddingTop: RFPercentage(1.7), paddingBottom: RFPercentage(1.7), marginLeft: '1.7%', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} >
                                    <Text style={{ lineHeight: RFPercentage(3), color: 'grey', fontSize: RFPercentage(2.1), fontFamily: 'sofiaprolight' }} >{ingred.title}</Text>
                                </View>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                                    <Text style={{ color: 'black', fontSize: RFPercentage(1.8), fontFamily: "sofiaprolight" }} >{ingred.amount} {ingred.unit}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}

                        <TouchableOpacity 
                        onPress={() => {
                            if(StoredShoppingListIds != null && StoredShoppingListIds.length != 0 &&  StoredShoppingListIds.includes(recipe._id)) {
                                dispatch(StoreShoppingListActions.deleteShoppingListItem(recipe._id))
                            } else {
                                dispatch(StoreShoppingListActions.addShoppingList(recipe))

                            }
                        }}
                        style={{ marginTop: RFPercentage(2), marginLeft: '3%', flex: 1, paddingBottom: RFPercentage(1), paddingTop: RFPercentage(1), backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.3), color: 'white' }} >{StoredShoppingListIds != null && StoredShoppingListIds.length != 0 &&  StoredShoppingListIds.includes(recipe._id) ? 'Remove from list' : 'Add to ingrdients list'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ marginLeft: '1.7%', flex: 1, width: '95%', padding: RFPercentage(3), flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                        <Text style={{ fontSize: RFPercentage(3.4), fontFamily: 'Zermatt-First' }} >Nutritional value</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: RFPercentage(1.5) }} >
                        <View style={{ flex: 1, flexDirection: 'column' }} >
                            <Text style={{ color: 'black', fontSize: RFPercentage(2.2), fontFamily: 'sofiaprolight' }} >Cal</Text>
                            <Text style={{ marginTop: RFPercentage(1), fontSize: RFPercentage(1.8), color: 'grey', fontFamily: 'sofiaprolight' }} >1045</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }} >
                            <Text style={{ color: 'black', fontSize: RFPercentage(2.2), fontFamily: 'sofiaprolight' }} >Protein</Text>
                            <Text style={{ marginTop: RFPercentage(1), fontSize: RFPercentage(1.8), color: 'grey', fontFamily: 'sofiaprolight' }} >40 g</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }} >
                            <Text style={{ color: 'black', fontSize: RFPercentage(2.2), fontFamily: 'sofiaprolight' }} >Fat</Text>
                            <Text style={{ marginTop: RFPercentage(1), fontSize: RFPercentage(1.8), color: 'grey', fontFamily: 'sofiaprolight' }} >34 g</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }} >
                            <Text style={{ color: 'black', fontSize: RFPercentage(2.2), fontFamily: 'sofiaprolight' }} >Carb</Text>
                            <Text style={{ marginTop: RFPercentage(1), fontSize: RFPercentage(1.8), color: 'grey', fontFamily: 'sofiaprolight' }} >146 g</Text>
                        </View>
                    </View>
                </View>


                <View style={{ marginLeft: '1.7%', flex: 1, width: '95%', padding: RFPercentage(3), flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                    <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                       {recipe.utensils == null || recipe.utensils.length === 0 ? null : <Text style={{ fontSize: RFPercentage(3.4), fontFamily: 'Zermatt-First' }} >Utensils</Text>}
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        {recipe.utensils == null || recipe.utensils.length === 0 ? null
                        : recipe.utensils.map(item => {
                            return (
                                <Text style={{ lineHeight: RFPercentage(3), marginTop: RFPercentage(1), fontSize: RFPercentage(1.8), color: 'grey', fontFamily: 'sofiaprolight' }} >Oven, 2 knife, 1 cutting board, 2 bowls, spatula, food processor, springform pan, citrus press, rubber spatula</Text>
                            )
                        })}
                    </View>
                </View>
               
               
                   <View>
                   {recipe.steps.map((step,index) => {
                       return (
                           <View style={{marginBottom:'5%'}}>
                       <View style={{ backgroundColor: "#F5F5F5", marginLeft: '1.7%', flex: 1, width: '100%', padding: RFPercentage(2), paddingLeft: RFPercentage(3), flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',margin:10}} >
                           <Text style={{ fontSize: RFPercentage(3.4), fontFamily: 'Zermatt-First' }} >Step {index+1}/{recipe.steps.length}</Text>
                       </View>
   
                       <View style={{ marginLeft: '1.7%', flex: 1, width: '96%', padding: RFPercentage(3), flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                           <ImageBackground resizeMode='cover' style={{ width: "100%", height: RFPercentage(23) }} source={{uri:`${baseUrl}/${step.recievedThumbnail}`}} >
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            {
                                step.ext === 'mp4' ? 
                                <TouchableOpacity
                            onPress={() => {
                                Alert.alert('s',JSON.stringify(step))
                                props.navigation.navigate('Video',{
                                    videoUrl:`${baseUrl}/${step.recievedPreview}`,
                                    thumbnail:`${baseUrl}/${step.recievedThumbnail}`
                                })
                            }}
                            style={{
                                width:45,
                                height:45,
                                borderWidth:1,
                                borderColor:colors.primary,
                                backgroundColor:colors.primary,
                                borderRadius:10,
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
   <Entypo name="controller-play" size={30} color="white" />
                            </TouchableOpacity> 
                                : 
                                null
                            }   
                            </View>
                            </ImageBackground>
                       </View>
   
                       <View style={{ marginLeft: '1.7%', flex: 1, width: '96%', paddingRight: RFPercentage(3), paddingLeft: RFPercentage(3), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }} >
                           <FontAwesome name="book" size={RFPercentage(2.5)} color={colors.primary} />
                           <Text style={{ maxWidth: "90%", marginLeft: RFPercentage(1), lineHeight: RFPercentage(3), fontSize: RFPercentage(1.8), color: 'grey', fontFamily: 'sofiaprolight' }} >{step.description}</Text>
                       </View>
                    
                   </View>
                       )
                   })}
                   </View>
                 
               
               



            </ScrollView>
            {recipe.steps != null && recipe.steps.length !== 0 ? <TouchableOpacity onPress={() => {
                props.navigation.navigate('Steps',{
                    recievedSteps:recipe.steps,
                    recipeName:recipe.title
                })
            }} style={{margin:15,width:'50%',height:45,borderWidth:1,borderColor:colors.primary,borderRadius:15,backgroundColor:colors.primary,justifyContent:'center',alignItems:'center',alignSelf:'center',position:'absolute',bottom:10}}>
                       <Text style={{color:'white',fontFamily:'sofiaprolight',fontSize:16}}>Start Cooking</Text>
                   </TouchableOpacity>:null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight + 20,
        flexDirection: 'column',
        width: '100%'
    },
    scrollView: {
        // backgroundColor: 'red',
        flex: 1,

        width: '100%',
    },
    topImageShade: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
})

export default Detail;