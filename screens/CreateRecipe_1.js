import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
// import Constants from 'expo-constants'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// import * as ImagePicker from 'expo-image-picker';
import ImagePicker from 'react-native-image-picker';
import colors from '../config/colors';
import {useDispatch} from 'react-redux';
import * as RecipeActions from '../Sdk/Store/Actions/CreateRecipeAction'
function CreateRecipe_1(props) {
    const dispatch = useDispatch();
    // const uploadedPhoto = props.route.params.uploadedPhoto;
    // const nameOfRecipe = props.route.params.nameOfRecipe;
    // const Difficulty = props.route.params.Difficulty
    // const prepTime = props.route.params.prepTime;
    // const RestingTime = props.route.params.RestingTime
    // const bakingTime = props.route.params.bakingTime
    const params = props.route.params;

    //States;
    const [servingFor,setServingFor] = useState('');
     

    const handleIngredients = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

    }

    const handleSteps = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* header */}
                <View style={{ backgroundColor: colors.secondary, width: "100%" }}>
                    <Text style={{ padding: 10, left: "2%", color: "white", maxWidth: "90%", fontFamily: "Zermatt-First", fontSize: RFPercentage(3) }} >Something’s Cooking Lets add a few more details</Text>
                </View>

                <View style={styles.recipeContainer}>


                    {/* feild */}
                    <View style={{ left: '5%', marginTop: "10%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Serving For</Text>
                            <TextInput style={{ marginTop: 5, fontSize: 20, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                    </View>

                    {/* Add ingredients */}
                    <View style={{ left: '5%', marginTop: "10%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Ingredients</Text>
                        <TouchableOpacity onPress={() => handleIngredients()} style={{ alignItems: 'center', borderColor: colors.tertiary, borderWidth: 2, borderStyle: 'dashed', borderRadius: 2, marginTop: 20, width: '100%', backgroundColor: 'rgba(249, 242, 222, 0.3)' }} >
                            <Text style={{ opacity: 1, padding: RFPercentage(2.1), fontFamily: 'Zermatt-First', fontSize: 23, color: colors.primary }}>Add Ingredients</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Steps */}
                    <View style={{ left: '5%', marginTop: "10%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Steps</Text>
                        <TouchableOpacity onPress={() => handleSteps()} style={{ alignItems: 'center', borderColor: colors.tertiary, borderWidth: 2, borderStyle: 'dashed', borderRadius: 2, marginTop: 20, width: '100%', backgroundColor: 'rgba(249, 242, 222, 0.3)' }} >
                            <Text style={{ opacity: 1, padding: RFPercentage(2.1), fontFamily: 'Zermatt-First', fontSize: 23, color: colors.primary }}>Add Steps</Text>
                        </TouchableOpacity>
                    </View>


                    {/* Next Button */}
                    <View style={{ width: '100%', height: '100%', left: "5%", marginTop: RFPercentage(8.5) }} >
                        <TouchableOpacity onPress={() => {
                            dispatch(RecipeActions.savingRecipe2(servingFor))
                            props.navigation.navigate('CreateRecipe_2')
                        }} style={{ backgroundColor: colors.primary, alignItems: 'center', marginTop: "13%" }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >Next</Text>
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

export default CreateRecipe_1;