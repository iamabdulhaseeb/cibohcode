import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
// import Constants from 'expo-constants'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors';
import {useDispatch, useSelector} from 'react-redux';
import * as RecipeActions from '../Sdk/Store/Actions/CreateRecipeAction'
import { Toast } from 'native-base';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as IngredientActions from '../Sdk/Store/Actions/saveIngredientsAction';
import * as AddStepActions from '../Sdk/Store/Actions/CreateSteps';
import * as IngredientFilterActions from '../Sdk/Store/Actions/SaveIngredientFilter';
import * as CreateUtensilActions from '../Sdk/Store/Actions/CreateUtensilAction';
import { baseUrl } from '../config/baseUrl';
import Spinner from 'react-native-loading-spinner-overlay';
function CreateRecipe_3(props) {
    const mySteps = useSelector(state => state.steps.steps);
    const savedIngredients = useSelector(state => state.ingredients.ingredientSelected);
     const params = props.route.params;
     const recipe = useSelector(state => state.recipe.recipe);
     const [chefsNote,setchefsnote] = useState('');
     const [loading,setloading] = useState(false);
    
    const dispatch = useDispatch();
    const goNext = () => {
        dispatch(RecipeActions.savingChefsNote(chefsNote));
    props.navigation.navigate('AddIngrdient')
    
    }
    useEffect(() => {
        getUser();
    },[]);
    const [user,setUser] = useState(null);
    const getUser = async() => {
        const user = await AsyncStorage.getItem('user');
        const parsed = JSON.parse(user);
        setUser(parsed);
    }
   
    const CreateRecipe = async() => {
        try {
            if(chefsNote === ''){
                alert('Please fill out the chefs home');
                return;
            }
            setloading(true);
            dispatch(RecipeActions.savingChefsNote(chefsNote));
           const createRecipeApiResponse = await axios.post(`${baseUrl}/recipe/create-recipe`,{
               title:recipe.recipeName,
               recipePhoto:recipe.recipePhoto,
               difficulty:recipe.difficulty,
               prepTime:recipe.prepTime,
               BakingTime:recipe.bakingTime,
               RestingTime:recipe.restingTime,
               ingredients:savedIngredients,
               steps:mySteps,
               dishType:recipe.dishType,
               cuisine:recipe.cuisine,
               occasion:recipe.occasion,
               chefsNote:recipe.chefsNote,
               createdBy:{
                    name:user.data[0].firstname + " " + user.data[0].lastname,
                    id:user.data[0]._id
                },
            status:'Active',
            recipePhotoType:recipe.recipePhoto.endsWith('mp4') ? 'mp4' : 'jpg',
            feedback:'NO_FEEDBACK'   
        });
           await UploadRecipeContent(createRecipeApiResponse.data.recipe._id);
           dispatch(AddStepActions.DeleteSteps());
           dispatch(IngredientActions.deleteAll());
           dispatch(IngredientFilterActions.deleteAll());
           dispatch(CreateUtensilActions.deleteAll());
           ToastAndroid.showWithGravity('Recipe was created',ToastAndroid.LONG,ToastAndroid.BOTTOM);
           setloading(false);
           props.navigation.navigate('HomeTabs');
        }catch(e) {
            console.log(e)
            setloading(false);
            console.log(e)
           Alert.alert('Error',JSON.stringify(e));
        }
       }

       const UploadRecipeContent = async(recipeId) => {
           try {
            const files = [
                {
                    uri: recipe.recipePhoto,
                     type: recipe.recipePhoto.endsWith('mp4') ? 'video/mp4' : `Image/jpg`,
                     name: `selectedImage.${recipe.realRecipeUrl.endsWith('mp4') ? 'mp4' : 'jpg'}`,
                   },
                { 
                    uri:recipe.recipePhoto,
                    type:'image/jpg',
                    name:'thumbnail.jpg'
                }   
             ]
             const data = new FormData();
             for (var i = 0; i < files.length; i++) {
                 data.append('image',files[i])
             }
            const uploadRecipeContentAPiResponse = await axios.post(`${baseUrl}/recipe/upload-recipe-page/${recipeId}`,data);
           }catch(e) {
               console.log(e);
            //  Alert.alert('Oops an error occured',JSON.stringify(e))
           }
       }
   
     return (
        <SafeAreaView style={styles.container}>
            <Spinner visible={loading} textContent='Creating Recipe...'/>
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* header */}
                <View style={{ backgroundColor: colors.secondary, width: "100%" }}>
                    <Text style={{ padding: 10, left: "2%", color: "white", maxWidth: "90%", fontFamily: "Zermatt-First", fontSize: RFPercentage(3) }} >Almost done. Chef! Tell us story behind your dish </Text>
                </View>

                <View style={styles.recipeContainer}>


                    {/* feilds */}
                    <View style={{ left: '5%', marginTop: "10%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Chef’s Note</Text>
                            <TextInput value={chefsNote} onChangeText={cn => setchefsnote(cn)} style={{ marginTop: 5, fontSize: 20, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                    </View>

                    {/* Next Button */}
                    <View style={{ width: '100%', height: '100%', left: "5%", marginTop: RFPercentage(50) }} >
                        <TouchableOpacity onPress={CreateRecipe} style={{ backgroundColor: colors.primary, alignItems: 'center', marginTop: "13%" }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >Post your recipe</Text>
                        </TouchableOpacity>
                    </View>

                </View>
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
        width: '100%',
        // justifyContent: 'center',

        // marginHorizontal: 20,
        // backgroundColor: 'pink',
    },
    recipeContainer: {
        // backgroundColor: 'pink',
        width: '90%',
        flex: 1,
        flexDirection: 'column',
        marginTop: 40,
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
})

export default CreateRecipe_3;