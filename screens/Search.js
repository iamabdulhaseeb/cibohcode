import React, { useState } from 'react';
import { StatusBar,Platform, SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font'
// import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from "@expo/vector-icons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import breakfast from "../assets/images/breakfast.png"
import dessert from "../assets/images/dessert.png"
import dinner from "../assets/images/dinner.png"
import drink from "../assets/images/drink.png"
import lunch from "../assets/images/lunch.png"
import quizk from "../assets/images/quizk.png"


import colors from '../config/colors';
import IconBox from '../components/IconBox';
import axios from 'axios';
import { baseUrl } from '../config/baseUrl';
import { Alert } from 'react-native';
import Pulse from 'react-native-pulse';
import Card from '../components/Card';
import Entypo from 'react-native-vector-icons/Entypo';
// import { Entypo } from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;


function Search(props) {
    const [value, setValue] = React.useState('');
    const [valueStatus, setValueStauts] = React.useState('');
    const [recipies,setRecipies] = useState(null);
    const [loading,setLoading] = useState(false);
    const [load,setload] = useState(false)
    const [bakingTimeGreaterThan30,setBakingTimeGreaterThan30] = useState(false);
    const [cookingLeve,setCookingLevel] = useState('Medium');
    const GetAllRecipies = async() => {
        try {
            setLoading(true);
         const RecipeApiResponse = await axios.get(`${baseUrl}/recipe/get-every-recipe`);
         const filteredRecipies = RecipeApiResponse.data.Data.filter(recipe => recipe.dishType.includes(value) && recipe.difficulty === cookingLeve);
         if(filteredRecipies != null && filteredRecipies.length !== 0) {
             if(bakingTimeGreaterThan30) {
                const filterAccToTime = filteredRecipies.filter(recipe => recipe.BakingTime > 30 );
                setRecipies(filterAccToTime); 
            } else {
                 const againFilter = filteredRecipies.filter(recipe => recipe.BakingTime < 30);
                 setRecipies(againFilter)
                }
         }
         setRecipies(filteredRecipies);
         console.log(RecipeApiResponse.data.Data);
         setLoading(false);
        }catch(e) { 
            setLoading(false);
          Alert.alert('Oops',JSON.stringify(e));
        }
    };
  if(loading) {
    <View style={{
        flex:1,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
    }}>
                <Pulse color='orange' numPulses={10} diameter={200} speed={30} duration={2000} />
        </View>
  }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.shopingContainer}>

                    {/* search Feild */}
                    <View style={{ borderColor: colors.primary, alignItems: 'center', height: RFPercentage(7), borderWidth: 0.7, flexDirection: 'row', maxWidth: '100%', minWidth: '100%' }} >
                        <View style={{ padding: 14 }}>
                            <TextInput
                                secureTextEntry={(value.length <= 0 && valueStatus != 'onFocus') ? true : false}
                                style={{ fontFamily: 'Zermatt-First', height: 40, fontSize: RFPercentage(2.8), maxWidth: '87%', minWidth: '87%' }}
                                placeholderStyle={{ fontFamily: 'Zermatt-First' }}
                                onChangeText={(value) => {
                                    setValue(value)
                                    setValueStauts('onFocus')
                                }}
                                value={value}
                                placeholder={'Type here to find some recipe'}
                                placeholderTextColor="#D8D8D8" />
                        </View>
                        <TouchableOpacity onPress={() => {
                            setLoading(true)
                            setload(true);
                            GetAllRecipies();
                        }} style={{ width: 40, height: 40, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }} >
                            <MaterialCommunityIcons style={{ opacity: 0.9 }} size={30} color="white" name="magnify" />
                        </TouchableOpacity>
                    </View>

                    {/* what do you want to eat 1*/}
                    {load?
                    <TouchableOpacity onPress={() => {
                        setload(false);
                        setRecipies(null);
                    }} style={{alignSelf:'flex-end',padding:10,top:5}}>
                        <Entypo name="cross" size={35} color="black" />
                        </TouchableOpacity>
                    :<View>
                        <Text style={{ fontFamily: 'Zermatt-First', fontSize: RFPercentage(3.5), marginTop: 30 }} >What do you want to eat?</Text>
                    </View>}
                    
                {
                    load ? 
                    <View>
                    {
                        recipies == null || recipies.length === 0 ? 
                        <View style={{flex:1,alignSelf:'center',paddingTop:'70%',paddingBottom:'70%',width:Dimensions.get('screen').width - 20}}>
                            {loading ? 
                        <View>
                            <Pulse color='orange' numPulses={10} diameter={200} speed={30} duration={2000} />
                            </View>    
                    :
                    <Text style={{fontSize:20,fontFamily:'sofiaprolight',textAlign:'center'}}>{loading ? 'loading....':'Sorry, Couldnt find any related recipy for you!'}</Text>  
                    }
                        </View>
                            :
                            <FlatList style={styles.flatList}
                            data={recipies}
                            numColumns={2}
                            // keyExtractor={item => item._id.toString()}
                            renderItem={({ item, index }) => 
                            <View>
                                <Image
                                source={{uri:`${baseUrl}/${item.videoThumbnail}`}}
                                style={{
                                    width:Dimensions.get('screen').width/2.1,
                                    height:120,
                                    borderWidth:1,
                                    borderColor:'white',
                                    borderRadius:10
                                }}
                                />
                                <Text style={{fontSize:18,fontFamily:'Zermatt-First',marginTop:5}}>{item.title}</Text>
                            </View>
                            // <Card recipe={item} navigation={props.navigation} author={item.createdBy.name} description={item.chefsNote} time={item.bakingTime} likes={20} picture={item.videoThumbnail} />
                        }
                        >
                        </FlatList>   
                    }
                     </View>
                     :
                     <View>
                          <View style={{ flexDirection: 'column', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', marginLeft: -10 }}>
                        <IconBox ContainerBorderwidth={value === 'Drinks' ? 4 : 1} picture={drink} title={'Drinks'} onPress={() => setValue('Drinks')} />
                        <IconBox ContainerBorderwidth={value === 'Quick Bites' ? 4 : 1} picture={quizk} title={'Quick Bites'} onPress={() => setValue('Quick Bites')} />
                        <IconBox ContainerBorderwidth={value === 'Breakfast' ? 4 : 1} picture={breakfast} title={'Breakfast'} onPress={() => setValue('Breakfast')} />
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: -10, marginTop: 20 }}>
                        <IconBox ContainerBorderwidth={value === 'Lunch' ? 4 : 1} picture={lunch} title={'Lunch'} onPress={() => setValue('Lunch')}/>
                        <IconBox ContainerBorderwidth={value === 'Dinner' ? 4 : 1} picture={dinner} title={'Dinner'} onPress={() => setValue('Dinner')}/>
                        <IconBox ContainerBorderwidth={value === 'Dessert' ? 4 : 1} picture={dessert} title={'Dessert'} onPress={() => setValue('Dessert')}/>
                    </View>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Zermatt-First', fontSize: RFPercentage(3.5), marginTop: 30 }} >What do you want to eat?</Text>
                </View>

                <View style={{ flexDirection: 'row' }} >
                    <View style={[styles.background,{borderWidth:bakingTimeGreaterThan30 ? 1 : 3,borderColor:colors.primary}]} >
                        <View style={{ right: 10, }} >
                            <MaterialCommunityIcons size={RFPercentage(5)} color={colors.primary} name="clock-outline" />
                        </View>
                        <TouchableOpacity 
                        onPress={() => {
                            setBakingTimeGreaterThan30(false);
                        }}
                        style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Zermatt-First', color: colors.primary }} >30 min</Text>
                            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Zermatt-First', color: colors.primary }} >or less</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.background, { left: 15,borderWidth:bakingTimeGreaterThan30 ? 3 : 1,borderColor:colors.primary }]} >
                        <View style={{ right: 10, }} >
                            <MaterialCommunityIcons size={RFPercentage(5)} color={colors.primary} name="clock-outline" />
                        </View>
                        <TouchableOpacity
                        onPress={() => {
                            setBakingTimeGreaterThan30(true);
                        }}
                        style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Zermatt-First', color: colors.primary }} >More than</Text>
                            <Text style={{ fontSize: RFPercentage(3), fontFamily: 'Zermatt-First', color: colors.primary }} >30 min</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{ fontFamily: 'Zermatt-First', fontSize: RFPercentage(3.5), marginTop: 30 }} >Select your cooking level</Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={[styles.background2,{borderWidth:cookingLeve === 'Child Friendly' ? 3 : 0,borderColor:colors.primary}]} >
                            <TouchableOpacity
                            onPress={() => {
                                setCookingLevel('Child Friendly');
                            }}
                            style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Child Friendly</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.background2, {borderWidth:cookingLeve === 'easy' ? 3 : 0,borderColor:colors.primary,marginLeft:10}]} >
                            <TouchableOpacity onPress={()=>{
                                setCookingLevel('easy');
                            }} style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Easy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.background2, {borderWidth:cookingLeve === 'moderate' ? 3 : 0,borderColor:colors.primary,marginLeft:10}]} >
                            <TouchableOpacity onPress={() => {
                                setCookingLevel('moderate');
                            }} style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Moderate</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={[styles.background2, {borderWidth:cookingLeve === 'advance' ? 3 : 0,borderColor:colors.primary,marginTop:10}]} >
                        <TouchableOpacity onPress={() => setCookingLevel('advance')} style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Advance</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    </View>
                }









                    {/* Select your health goal*/}
                    {/* <View>
                        <Text style={{ fontFamily: 'Zermatt-First', fontSize: RFPercentage(3.5), marginTop: 30 }} >Select your health goal</Text>
                    </View> */}

                    {/* <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={styles.background3} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >No Preference</Text>
                                </View>
                            </View>
                            <View style={[styles.background3, { marginLeft: 10 }]} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >500 cals or less</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: -10 }} >
                            <View style={styles.background2} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Dairy Free</Text>
                                </View>
                            </View>
                            <View style={[styles.background2, { marginLeft: 10 }]} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Gluten Free</Text>
                                </View>
                            </View>
                            <View style={[styles.background2, { marginLeft: 10 }]} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Low Carb</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: -10 }} >
                            <View style={[styles.background2]} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Plant Based</Text>
                                </View>
                            </View>
                            <View style={[styles.background2, { marginLeft: 10 }]} >
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'Zermatt-First', color: colors.primary }} >Vegetarian</Text>
                                </View>
                            </View>

                        </View>
                    </View> */}

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
        // paddingTop: Constants.statusBarHeight + 20,
        // marginTop: Platform.OS === 'ios' ? RFPercentage(8) : null,
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
    shopingContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 40,
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    background: {
        width: (screenWidth / 2) - 25, height: 110,
        // paddingHorizontal: 15,
        marginTop: 20,
        flexDirection: 'row', backgroundColor: 'rgba(232, 213, 212, 0.7);',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background2: {
        width: (screenWidth / 3) - 20, height: 80,
        // paddingHorizontal: 15,
        marginTop: 20,
        flexDirection: 'row', backgroundColor: 'rgba(232, 213, 212, 0.7);',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background3: {
        width: (screenWidth / 2) - 60, height: 80,
        // paddingHorizontal: 15,
        marginTop: 20,
        flexDirection: 'row', backgroundColor: 'rgba(232, 213, 212, 0.7);',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Search;