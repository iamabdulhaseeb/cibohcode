import React, { useState } from 'react';
import { Platform, Image, SafeAreaView,ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
// import Constants from 'expo-constants'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import uploadCloudIcon from "../assets/images/cloudUpload.png"
import colors from '../config/colors';
import {useDispatch} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
// import { Entypo } from '@expo/vector-icons';
import * as RecipeActions from '../Sdk/Store/Actions/CreateRecipeAction'
// import * as DocumentPicker from 'expo-document-picker';
// import * as VideoThumbnails from 'expo-video-thumbnails';
import DocumentPicker from 'react-native-document-picker';
import { createThumbnail } from "react-native-create-thumbnail";
import { baseUrl } from '../config/baseUrl';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
const screenWidth = Dimensions.get('window').width;

function CreateRecipe({ navigation }) {
    const dispatch = useDispatch();
    const [uploadedPhoto,setUploadedPhoto] = useState('');
    const [nameOfRecipe,setNameOfRecipe] = useState('');
    const [Difficulty,setDifficulty] = useState('Easy');
    const [prepTime,setPrepTime] = useState('');
    const [bakingTime,setBakingTime] = useState('');
    const [RestingTime,setRestingTime] = useState('');
    
     
    const [easyFront, setEasyFront] = useState('black')
    const [easyBack, setEasyBack] = useState('white')

    const [mediumFront, setMediumFront] = useState('white')
    const [mediumBack, setMediumBack] = useState(colors.secondary)

    const [hardFront, setHardFront] = useState('white')
    const [hardBack, setHardBack] = useState(colors.secondary)

    const handleEasy = () => {
        setEasyFront('black')
        setEasyBack('white')
        setDifficulty('Easy');

        setMediumFront('white')
        setMediumBack(colors.secondary)

        setHardFront('white')
        setHardBack(colors.secondary)
    }

    const handleMedium = () => {
        setEasyFront('white')
        setEasyBack(colors.secondary)
          
        setDifficulty('Medium');

        setMediumFront('black')
        setMediumBack('white')

        setHardFront('white')
        setHardBack(colors.secondary)
    }

    const handleHard = () => {
        setEasyFront('white')
        setEasyBack(colors.secondary)

        setDifficulty('Hard')

        setMediumFront('white')
        setMediumBack(colors.secondary)

        setHardFront('black')
        setHardBack('white')
    }

    const [RecipePic,setRecipePic] = useState('');

    // const handleImage = async () => {
    //     let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    //     if (permissionResult.granted === false) {
    //         alert("Permission to access camera roll is required!");
    //         return;
    //     }

    //     let pickerResult = await ImagePicker.launchImageLibraryAsync();
    //     setRecipePic(pickerResult.uri);

    // }
    const [fileExtension,setFileExtension] = useState('');
    const [realUrl,setRealUrl] = useState('');
    const [choosedImage,setChoosedImg] = useState('');
    const ChooseImageLibrary = async() => {
        try {
         const img =  await ImagePicker.openPicker({
             mediaType:'photo',
             width:300,
             height:400
         });
         const ext =  img.path.split(/[#?]/)[0].split('.').pop().trim();
         setRealUrl(img.uri);
         setFileExtension(ext);
         setChoosedImg(img.path)
        //  if(img.uri.endsWith('mp4')) {
        //     const { path } = await createThumbnail(img.uri);
        //     setChoosedImg(path);               
        //  } else {
        //     setChoosedImg(img.uri);
        //  }
        }catch(e) {
            console.log(e);
        //   Alert.alert('Error',JSON.stringify(e));
        } 
    }
    

    // console.log(RFPercentage(3.3), screenWidth/15)
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor={colors.secondary} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* header */}
                <View style={{ backgroundColor: colors.secondary, width: "100%" }}>
                    <Text style={{ padding: 10, left: "2%", color: "white", maxWidth: "90%", fontFamily: "Zermatt-First", fontSize: RFPercentage(3) }} >We are exited to see your recipe! Lets start with basics ...</Text>
                </View>

                <View style={styles.recipeContainer}>

                    {/* Upload */}
                    {choosedImage === '' ? <View style={{ left: '5%', flexDirection: 'column', width: "100%", backgroundColor: colors.feedBar, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ padding: '5%', alignItems: 'center' }} >
                            <Image source={uploadCloudIcon} maxWidth={RFPercentage(12)} maxHeight={RFPercentage(12)} />
                            <TouchableOpacity onPress={() => ChooseImageLibrary()}>
                                <Text style={{ fontSize: RFPercentage(3), fontFamily: 'AvianoFlareRegular' }} >Upload Photo</Text>
                            </TouchableOpacity>
                            <Text style={{ opacity: 0.7, color: 'grey', fontSize: RFPercentage(2), fontFamily: 'sofiaprolight' }} >Click here for upload cover photo.</Text>
                        </View>
                    </View>
                    
                :
                <View style={{width:'100%',height:200,flexDirection:'row',borderWidth:1,alignSelf:'center',left:20}}>
{/*                
                <Image
            source={{uri:choosedImage}}
            style={{width:'100%',height:200,resizeMode:'cover',alignSelf:'center',borderWidth:1}}
            />   */}
            <ImageBackground source={{uri:choosedImage}} style={{width:'100%',height:200}}>
             <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
             {fileExtension === 'mp4' ? <TouchableOpacity 
                onPress={() => {
                navigation.navigate('Video',{
                    videoUrl:realUrl,
                    thumbnail:choosedImage
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
                </TouchableOpacity> : null}
             </View>
            </ImageBackground>
            <TouchableOpacity onPress={ChooseImageLibrary} style={{right:40,bottom:'10%',alignSelf:'flex-end',width:30,height:30,borderWidth:1,borderColor:colors.primary,borderStartColor:colors.primary,justifyContent:'center',alignItems:'center',backgroundColor:colors.primary,borderRadius:30/2}}>
            <Entypo name="edit" size={20} color="white" />
                         </TouchableOpacity>
               </View>
                }

                    {/* feild */}
                    <View style={{ left: '5%', marginTop: "10%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Name your recipe</Text>
                            <TextInput value={nameOfRecipe} onChangeText={recipeName => setNameOfRecipe(recipeName)} style={{ marginTop: 5, fontSize: 20, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={{ left: '5%', marginTop: "10%", width: "97%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Difficulty</Text>

                            <View style={{ flexDirection: 'row', marginTop: "5%" }} >
                                <TouchableOpacity onPress={() => handleEasy()} style={{ alignItems: 'center', width: "28%", backgroundColor: easyBack, borderWidth: 4, borderColor: colors.secondary }} >
                                    <Text style={{ color: easyFront, fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.2), padding: 5 }}>Easy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleMedium()} style={{ marginLeft: "8.8%", alignItems: 'center', width: "28%", backgroundColor: mediumBack, borderWidth: 4, borderColor: colors.secondary }} >
                                    <Text style={{ color: mediumFront, fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.2), padding: 5 }}>Medium</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleHard()} style={{ marginLeft: "8.8%", alignItems: 'center', width: "28%", backgroundColor: hardBack, borderWidth: 4, borderColor: colors.secondary }} >
                                    <Text style={{ color: hardFront, fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.2), padding: 5 }}>Hard</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* details */}
                    <View style={{ left: '5%', marginTop: "10%", width: "97%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View style={{ flexDirection: 'row', marginTop: "5%" }} >
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: RFPercentage(2.5), fontFamily: 'AvianoFlareRegular' }} >Prep Time</Text>
                                <Text style={{ fontSize: RFPercentage(1.7), maxWidth: "70%", minWidth: "70%", color: colors.primary, fontFamily: 'sofiaprolight' }} >How much time do you actively spend making the dish?</Text>
                            </View>
                            <View style={{ top: -10, width: "33%", borderBottomColor: "black", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-end' }} >
                                <TextInput value={prepTime} onChangeText={pt => setPrepTime(pt)} placeholderTextColor={colors.primary} placeholder="0 min" style={{ fontSize: RFPercentage(2.1), width: "50%" }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: "5%" }} >
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: RFPercentage(2.5), fontFamily: 'AvianoFlareRegular' }} >Baking Time</Text>
                                <Text style={{ fontSize: RFPercentage(1.7), maxWidth: "70%", minWidth: "70%", color: colors.primary, fontFamily: 'sofiaprolight' }} >How much time does the dish need to bake for?</Text>
                            </View>
                            <View style={{ top: -10, width: "33%", borderBottomColor: "black", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-end' }} >
                                <TextInput value={bakingTime} onChangeText={bt => setBakingTime(bt)} placeholderTextColor={colors.primary} placeholder="0 min" style={{ fontSize: RFPercentage(2.1), width: "50%" }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: "5%" }} >
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: RFPercentage(2.5), fontFamily: 'AvianoFlareRegular' }} >Resting Time</Text>
                                <Text style={{ fontSize: RFPercentage(1.7), maxWidth: "70%", minWidth: "70%", color: colors.primary, fontFamily: 'sofiaprolight' }} >Does the dish need to rest any point? e.g maintaining, chilling  , rising time</Text>
                            </View>
                            <View style={{ top: -10, width: "33%", borderBottomColor: "black", borderBottomWidth: 1, alignItems: 'center', justifyContent: 'flex-end' }} >
                                <TextInput value={RestingTime} onChangeText={rt => setRestingTime(rt)} placeholderTextColor={colors.primary} placeholder="0 min" style={{ fontSize: RFPercentage(2.1), width: "50%" }} />
                            </View>
                        </View>
                    </View>

                    {/* Next Button */}
                    <View style={{ width: '100%', left: "5%", marginBottom: RFPercentage(1.6) }} >
                        <TouchableOpacity onPress={() => {
                            if(nameOfRecipe === '') {
                                alert('please fill out the recipe name');
                                return;
                            } else if (Difficulty === '') {
                                alert('please fill out the Difficulty');
                                return;
                            }
                            else if (prepTime === '') {
                                alert('please fill out the prepTime');
                                return;
                            } else if (bakingTime === '') {
                                alert('please fill out the baking time');
                                return;
                            } else if (RestingTime === '') {
                                alert('please fill out the resting time');
                                return;
                            } else if (choosedImage === '') {
                                alert('Please choose an image for your recipe');
                                return;
                            }
                            dispatch(RecipeActions.savingRecipe1(choosedImage,realUrl,nameOfRecipe,Difficulty,prepTime,RestingTime,bakingTime))
                            navigation.navigate('AddIngrdient')
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
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight + RFPercentage(3),
        // marginTop: Platform.OS === 'ios' ? RFPercentage(8) : null,
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

export default CreateRecipe;