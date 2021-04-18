import React, { useState,useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
// import Constants from 'expo-constants'
// import * as DocumentPicker from 'expo-document-picker';
import DocumentPicker from 'react-native-document-picker';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import uploadCloudIcon from "../assets/images/cloudUpload.png"
import colors from '../config/colors';
import axios from 'axios';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { MaterialIcons } from '@expo/vector-icons';
import {useDispatch,useSelector} from 'react-redux';
import * as RecipeActions from '../Sdk/Store/Actions/CreateRecipeAction'
import { CheckBox, Toast } from 'native-base';
import { ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { AntDesign } from '@expo/vector-icons';
import * as IngredientActions from '../Sdk/Store/Actions/saveIngredientsAction';
import * as AddStepActions from '../Sdk/Store/Actions/CreateSteps';
import * as IngredientFilterActions from '../Sdk/Store/Actions/SaveIngredientFilter';
import Entypo from 'react-native-vector-icons/Entypo';
// import { Entypo } from '@expo/vector-icons';

import { baseUrl } from '../config/baseUrl';
// import * as VideoThumbnails from 'expo-video-thumbnails';
import VideoThumbnail from 'react-native-video-thumbnail';
import { ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import * as CreateUtensilActions from '../Sdk/Store/Actions/CreateUtensilAction';
function AddStep(props) {
    const steps = useSelector(state => state.steps.steps)
    const [showUtensilModal,setShowUtensilModal] = useState(false);
    const utensils = useSelector(state => state.utensils.utensils);
    const params = props.route.params;
    const [myIng,setMyIng] = useState(savedIngredients);
    const recipe = useSelector(recipe => recipe.recipe.recipe);
    const selectedIngredients = useSelector(state => state.ingredientsFilter.ingredientSelected);
    const savedIngredients = useSelector(state => state.ingredients.ingredientSelected);
    useEffect(() => {
        setMyIng(savedIngredients);   
    },[savedIngredients]);
    const dispatch = useDispatch();
    const goNext = () => {
        const someSteps = ['make','bake']
        dispatch(RecipeActions.addingSteps(someSteps));
        console.log(recipe);
        CreateRecipe();
    }
    const [loading,setloading] = useState(false);
    const CreateRecipe = async() => {
     try {
        setloading(true);
        const createRecipeApiResponse = await axios.post(`${baseUrl}/recipe/create-recipe`,{
            title:'recipe.recipeName',
            recipePhoto:'https:/fjjf.com',
            difficulty:'recipe.difficulty',
            prepTime:0,
            BakingTime:0,
            RestingTime:0,
            ingredients:savedIngredients,
            steps:'recipe.steps',
            dishType:'recipe.dishType',
            cuisine:'recipe.cuisine',
            occasion:'recipe.occasion',
            chefsNote:'recipe.chefsNote',
            createdBy:'60225d686f58290ef33b1022'
        });
        Alert.alert('r',JSON.stringify(createRecipeApiResponse.data))
        ToastAndroid.showWithGravity('Recipe was created',ToastAndroid.LONG,ToastAndroid.BOTTOM)
        setloading(false);
     }catch(e) {
        Alert.alert('Error',JSON.stringify(e.response.data));
        setloading(false);
     }
    }
    const [stepPic,setStepPic] = useState('');
    const [fileExtension,setFileExtension] = useState('');
    const [realUrl,setRealUrl] = useState('');
    const [recievedThumbnail,setRecievedThumbnail] = useState('');
    const [recievedPreview,setRecievedPreview] = useState('');
    const [showUploadButton,setShowUploadButton] = useState(false);
    const [title,setTitle] = useState('');
    const [amount,setAmount] = useState('');
    const [unit,setUnit] = useState('');
    const handleImage = async () => {
       try {
        const img =  await ImagePicker.openPicker({
            mediaType:'any',
            width:300,
            height:400
        });
        const ext =  img.path.split(/[#?]/)[0].split('.').pop().trim();
        setRealUrl(img.path);
        setFileExtension(ext);
        if(img.path.endsWith('mp4')) {
           const op = await VideoThumbnail.get(img.path);
           setStepPic(op.data);               
        } else {
           setStepPic(img.path);
        }
        if(img.path) {
            setShowUploadButton(true);
        }
       
       } catch(e) {
           Alert.alert('Erro',JSON.stringify(e));
        console.log(e);
       }
    }
    const [loadingUpload,setloadingUpload] = useState(false);
    const uploadStepPic = async() => {
        try {
            setloadingUpload(true);
            const files = [
                {
                    uri: realUrl,
                     type: fileExtension === 'mp4' ? 'video/mp4' : `Image/${fileExtension}`,
                     name: `selectedImage.${fileExtension}`,
                   },
                { 
                    uri:stepPic,
                    type:'image/jpg',
                    name:'thumbnail.jpg'
                }   
             ]
             const data = new FormData();
             for (var i = 0; i < files.length; i++) {
                 data.append('image',files[i])
             }
            const response =  await axios.post(`${baseUrl}/recipe/upload-step-content`,data);
               setRecievedThumbnail(response.data.videoThumbnail);
               setRecievedPreview(response.data.preview);
               setShowUploadButton(false);
               setloadingUpload(false);
        } catch(e) {
            setloadingUpload(false);
         Alert.alert('Error',JSON.stringify(e));
        }
    }
    const ingredients = async () => {
        const result = await DocumentPicker.getDocumentAsync({});
        console.log('result', result);
        if (!result.cancelled) {
            this.setState({
                image: result,
            });
        }

    }
    const untensil = async () => {
        const result = await DocumentPicker.getDocumentAsync({});
        console.log('result', result);
        if (!result.cancelled) {
            this.setState({
                image: result,
            });
        }

    }
    const [showForm,setShowForm] = useState(false);
    const [showCreateStep,setshowCreateStep] = useState(false);
    const [description,setdescription] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <Modal
            isVisible={showUtensilModal}
            onBackButtonPress={()=>{
                setShowUtensilModal(false);
            }}
            style={{
                flex:1,
                backgroundColor:'white',
                margin:0
            }}
            >
            <View style={{padding:20,marginTop:'90%'}}>
              <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Utensil</Text>
                            <TextInput value={title} onChangeText={t => setTitle(t)} style={{ top:20, fontSize: 20, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                    </View>
                    <View style={{flexDirection:'row',marginTop:30,top:20,width:'95%',justifyContent:'space-around',alignSelf:'center'}}>
                        <View style={{width:'95%'}}>
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Amount</Text>

                        <TextInput value={amount} onChangeText={am => setAmount(am)} style={{top:15,fontSize:20,borderBottomColor: "black", borderBottomWidth: 1,width:'100%'}}/>
                        </View>
                       
                    </View>

                    <View style={{ left: '3%', marginTop: "15%", width: "45%", flexDirection: 'row', flex: 1, alignItems: 'flex-start' }} >
                        {/* <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Amount</Text>
                            <TextInput value={amount} onChangeText={am => setAmount(am)} style={{ marginTop: 20,fontSize: 20, minWidth: "40%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                        <View style={{ marginLeft: "12%" }} >
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Unit</Text>
                            <TextInput value={unit} onChangeText={un => setUnit(un)} style={{ marginTop: 10, fontSize: 20,paddingTop:19, minWidth: "45%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View> */}
                    </View>

                    {/* <View style={{ left: '5%', marginTop: "10%", width: "95%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Special Use</Text>
                            <TextInput style={{ marginTop: 5, fontSize: 20, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                    </View> */}



                    {/* Next Button */}
                    <View style={{ width: '100%', height: '100%',alignSelf:'center'}} >
                        <TouchableOpacity 
                        onPress={() => {
                            dispatch(CreateUtensilActions.createUtensil(title,amount));
                            setShowUtensilModal(false);
                        }}
                        style={{
                            width:'95%',
                            height:50,
                            borderWidth:1,
                            borderColor:colors.primary,
                            backgroundColor:colors.primary,
                            justifyContent:'center',
                            alignItems:'center',
                            borderRadius:10,
                            alignSelf:'center'
                        }}>
                            <Text style={{color:'white',fontSize:20,fontFamily:'sofiaprolight'}}>Create</Text>
                        </TouchableOpacity>
              </View>

            </Modal>


            <Modal
            isVisible={showCreateStep}
            onBackButtonPress={() => {
                setshowCreateStep(false);
            }}
            style={{flex:1,backgroundColor:'white',height:'100%',width:'100%',margin:0}}
            >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <TouchableOpacity style={{position:'absolute',flex:1}}/>
                {/* header */}
                <View style={{ backgroundColor: colors.secondary, width: "100%" }}>
                    <Text style={{ padding: 10, left: "2%", color: "white", maxWidth: "90%", fontFamily: "Zermatt-First", fontSize: RFPercentage(3) }} >Add step to help us out in your recipe</Text>
                </View>

                <View style={styles.recipeContainer}>

                    {/* Upload */}
                   {stepPic === '' ? 
                 <View style={{ left: '5%', flexDirection: 'column', width: "100%", backgroundColor: colors.feedBar, justifyContent: 'center', alignItems: 'center' }}>
                 <View style={{ padding: '5%', alignItems: 'center' }} >
                     <Image source={uploadCloudIcon} maxWidth={100} maxHeight={100} />
                     <TouchableOpacity onPress={() => handleImage()}>
                         <Text style={{ fontSize: RFPercentage(2.3), fontFamily: 'AvianoFlareRegular' }} >Upload Photo</Text>
                     </TouchableOpacity>
                     <Text style={{ opacity: 0.7, color: 'grey', fontSize: RFPercentage(2), fontFamily: 'sofiaprolight' }} >Upload Photo of step</Text>
                 </View>
             </View>
             : 
            <View style={{width:'100%',height:200,flexDirection:'row',borderWidth:1,alignSelf:'center',left:20}}>
                 <ImageBackground
             source={{uri:realUrl}}
             style={{width:'100%',height:200,resizeMode:'cover',alignSelf:'center',borderWidth:1}}
             >
                 <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                 {fileExtension === 'mp4' ? <TouchableOpacity
                         onPress={() => {
                             props.navigation.navigate('Video',{
                                 videoUrl:realUrl,
                                 thumbnail:stepPic
                             })
                         }}
                         style={{
                             width:70,
                             height:70,
                             borderWidth:1,
                             borderColor:colors.primary,
                             backgroundColor:colors.primary,
                             borderRadius:70/2,
                             justifyContent:'center',
                             alignItems:'center',
                             top:15
                         }}>
<Entypo name="controller-play" size={30} color="white" />
                         </TouchableOpacity> : null}
                         
                        
                 </View>
                 <View>
                 {showUploadButton ? <View>
                             <TouchableOpacity
                             onPress={uploadStepPic}
                             style={{
                                 width:35,
                                 height:35,
                                 borderWidth:2,
                                 borderColor:colors.primary,
                                 backgroundColor:'white',
                                 justifyContent:'center',
                                 alignItems:'center',
                                 alignSelf:'flex-end',
                                 marginBottom:10,
                                 marginRight:10,
                                 borderRadius:35/2
                             }}>
                                 {loadingUpload ? <ActivityIndicator size='small' color={colors.primary}/> :  <MaterialIcons name="file-upload" size={19} color="black" />}
                             </TouchableOpacity>
                         </View>:null}
                 </View>
                 </ImageBackground>  
             <TouchableOpacity onPress={handleImage} style={{right:40,bottom:'10%',alignSelf:'flex-end',width:30,height:30,borderWidth:1,borderColor:colors.primary,borderStartColor:colors.primary,justifyContent:'center',alignItems:'center',backgroundColor:colors.primary,borderRadius:30/2,marginBottom:showUploadButton ? 25 : 0}}>
             <Entypo name="edit" size={20} color="white" />
                          </TouchableOpacity>
                         
                </View>
                }

                    {/* feild */}
                    <View style={{ left: '5%', marginTop: "10%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <View>
                            <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Step Description</Text>
                            <TextInput value={description} onChangeText={d => setdescription(d)} style={{ marginTop: 25, fontSize: 20, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                        </View>
                    </View>


                   
                   
                   {/* <FlatList
                   data={savedIngredients}
                   keyExtractor={item => item}
                   renderItem={itemData => (
                       <View>
                           <Text>{JSON.stringify(itemData.item)}</Text>
                           </View>

                   )}
                   /> */}
                  <View style={{ left: '5%', marginTop: "5%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Ingrdients Used</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setShowForm(true)} style={{ alignItems: 'center', borderColor: colors.tertiary, borderWidth: 2, borderStyle: 'dashed', borderRadius: 2, marginTop: 25, width: '100%', backgroundColor: 'rgba(249, 242, 222, 0.3)' }} >
                            {savedIngredients.length >= 1 ?  
                            <FlatList
                            data={myIng}
                            horizontal
                            keyExtractor={item => item}
                            contentContainerStyle={{flexGrow:1,alignSelf:'flex-start'}}
                            renderItem={({item}) => (
                                <View style={{paddingHorizontal:10,borderWidth:1,
                                borderColor:'white',backgroundColor:'white',justifyContent:'center',alignItems:'center',elevation:2,borderRadius:10,margin:5,flexDirection:'row'}}>
                                    <View style={{flexDirection:'row',margin:10}}>
                                    <Text style={{fontFamily:'sofiaprolight'}}>{item.amount}</Text>
                                    <Text style={{fontFamily:'sofiaprolight'}}> {item.unit}</Text>
                                    </View>
                                    <View>
                                    <Text style={{fontFamily:'sofiaprolight',fontSize:16}}>{item.title}</Text>
                                    </View>
                                </View>
                            )}
                            />   
                            :
                            <Text style={{ opacity: 1, padding: 20, fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.5), color: colors.primary }}>Add Ingredients</Text>
                        }
                        </TouchableOpacity>
                    </View>

                    {/* Steps */}
                    <View style={{ left: '5%', marginTop: "5%", width: "100%", flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }} >
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Utensils Used</Text>
                        <FlatList
                        data={utensils}
                        keyExtractor={item => item}
                        renderItem={({item,index}) => (
                            <View style={{flexDirection:'row',justifyContent:'space-between',paddimg:2,width:'100%'}}>
                               <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                               <Text style={{fontFamily:'sofiaprolight',fontSize:20}}>{index + 1}. {item.name}</Text>

                                   </View>

                                </View>
                        )}
                        />
                        <TouchableOpacity onPress={() => {
                            setShowUtensilModal(true);
                        }} style={{ alignItems: 'center', borderColor: colors.tertiary, borderWidth: 2, borderStyle: 'dashed', borderRadius: 2, marginTop: 25, width: '100%', backgroundColor: 'rgba(249, 242, 222, 0.3)' }} >
                            <Text style={{ opacity: 1, padding: 20, fontFamily: 'Zermatt-First', fontSize: RFPercentage(2.5), color: colors.primary }}>Add a Untensil</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Next Button */}
                    <View style={{ width: '100%', left: "5%", marginBottom: 20 }} >
                        <TouchableOpacity onPress={
                            () => {
                                if(description === '') {
                                    alert('Please fill out the description');
                                    return;
                                }  else if(selectedIngredients.length === 0) {
                                    Alert.alert('Choose some ingredients','Make it easy for fans, by adding some ingredients');
                                    return;
                                } else if(showUploadButton) {
                                    Alert.alert('Upload Image','Please upload the selected step image by pressing the upload icon in right bottom corner of selected image to continue');
                                    return;
                                }
                                // const createStepApiResponse = await axios.post(`${baseUrl}/steps/create-step/fkjef03`,{
                                    
                                // })
                                const stepp = {
                                    description,
                                    recievedThumbnail,
                                    selectedIngredients,
                                    utensils,
                                    recievedPreview,
                                    fileExtension
                                }
                                dispatch(AddStepActions.saveStep(stepp))
                                setRealUrl('');
                                setRecievedPreview('');
                                setRecievedThumbnail('');
                                setStepPic('');
                                setdescription('');
                                setshowCreateStep(false);
                            }
                        } style={{ backgroundColor: colors.primary, alignItems: 'center', marginTop: "13%" }} >
                            {
                                loading ? 
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >Creating</Text>
                                    <ActivityIndicator color='white' size='small' style={{left:20}}/>
                                </View>
                                :
                                <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >Save</Text>
                            }
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>     
            </Modal>
              <Modal
            isVisible={showForm}
            onBackButtonPress={() => {
                setShowForm(false);
            }}
            style={{flex:1,backgroundColor:'white',height:'100%',width:'100%',margin:0}}
            >
                <View style={{
                    width:'100%',
                    height:50,
                    backgroundColor:'white',
                    elevation:10,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    padding:5
                }}> 
                  <View style={{flexDirection:'row',alignItems:'center',flex:1,paddingLeft:10}}>
                  <TouchableOpacity onPress={() => setShowForm(false)}>
                  <AntDesign name="close" size={24} color="black" style={{top:2}} />
                  </TouchableOpacity>
                  <Text style={{left:5,fontSize:17,fontFamily:'sofiaprolight'}}>Ingredients</Text>
                  </View>
                  <TouchableOpacity
                  onPress={() => {
                    setShowForm(false)
                  }}
                  style={{
                      padding:10,
                  }}>
                      <Text style={{fontSize:20,fontWeight:'bold',fontFamily:'sofiaprolight',bottom:4,color:colors.primary}}>Save</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize:25,fontFamily:'sofiaprolight',padding:10}}>Choose Ingredients</Text>
             <FlatList
             data={params.ingredients}
             keyExtractor={item => item._id}
             renderItem={(itemData) => (
                 <View style={{flexDirection:'row',marginVertical:10,alignItems:'center'}}>
                <CheckBox
                checked={selectedIngredients.includes(itemData.item._id) ? true : false}
                 onPress={() => {
                     if(selectedIngredients.includes(itemData.item._id)) {
                        dispatch(IngredientFilterActions.deleteIngredientFilter(itemData.item._id))
                        dispatch(IngredientActions.deleteIngredient(itemData.item._id))
                     } else {
                        dispatch(IngredientFilterActions.saveIngredientfilter(itemData.item._id))
                        dispatch(IngredientActions.saveIngredient(itemData.item.title,itemData.item.unit,itemData.item.amount,itemData.item._id));
                    }
                 }}
                />
                <View style={{
                    flexDirection:'row',
                    paddingLeft:20,
                    justifyContent:'center'
                }}>
                <Text style={{fontSize:20,fontWeight:'300',fontFamily:'sofiaprolight'}}>{itemData.item.amount} {itemData.item.unit} </Text>
                <Text style={{fontSize:20,fontWeight:'300',fontFamily:'sofiaprolight'}}>{itemData.item.title}</Text>
                </View>
                 </View>
             )}
             />
            </Modal>
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* header */}
                <View style={{ backgroundColor: colors.secondary, width: "100%" }}>
                    <Text style={{ padding: 10, left: "2%", color: "white", maxWidth: "90%", fontFamily: "Zermatt-First", fontSize: RFPercentage(3) }} >Add step to help us out in your recipe</Text>
                </View>

                <View>
                    <FlatList
                    data={steps}
                    keyExtractor={item => item}
                    renderItem={itemData => (
                        <View style={{
                            width:'100%',
                            padding:10,
                            backgroundColor:'white',
                            elevation:2,
                            borderWidth:1,
                            borderColor:'white',
                            borderRadius:3,
                            margin:3,
                            alignSelf:'center',
                            paddingVertical:20
                        }}>
                            <View style={{flexDirection:'row'}}>
                            <View style={{
                                width:80,
                                height:80,
                            }}>
                                <Image
                                source={{uri:`${baseUrl}/${itemData.item.recievedThumbnail}`}}
                                style={{
                                    width:80,
                                    height:80,
                                    borderWidth:1,
                                    borderRadius:10,
                                    resizeMode:'cover'
                                }}
                                />
                                </View> 
                            <View style={{left:20,width:'70%'}}>
                            <Text style={{fontSize:16,fontFamily:'sofiaprolight',fontWeight:'bold'}}>Step #{itemData.index + 1}</Text>                            
                                <Text style={{fontSize:20,fontFamily:'sofiaprolight',bottom:4}}>{itemData.item.description}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    dispatch(AddStepActions.DeleteSteps('itemData.item.recievedThumbnail'))
                                }}>
                                <MaterialIcons name="delete" size={24} color="black" />
                                    </TouchableOpacity>

                            </View>
                            </View>
                    )}
                    />
                </View>
                <TouchableOpacity onPress={()=>setshowCreateStep(true)} style={{ width:'90%',alignSelf:'center',backgroundColor: colors.primary, alignItems: 'center', marginTop: "15%" }} >
                          <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >+ Add Step</Text>
                      </TouchableOpacity>
                </ScrollView>
                <View style={{
                width:'100%',
                flex:1,
                position:'absolute',
                bottom:0,
                right:0
            }}> 
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('CreateRecipe_2')}
                style={{
                    width:'35%',
                    height:40,
                    borderWidth:1,
                    borderColor:colors.primary,
                    backgroundColor:colors.primary,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center',
                    alignSelf:'flex-end',
                    margin:20
                }}> 
                    <Text style={{color:'white',fontFamily:'AvianoFlareRegular'}}>Next</Text>
                </TouchableOpacity>
            </View>
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

export default AddStep;