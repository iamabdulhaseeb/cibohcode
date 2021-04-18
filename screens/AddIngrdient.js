import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import Constants from 'expo-constants'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors';
import {useDispatch} from 'react-redux';
import * as RecipeActions from '../Sdk/Store/Actions/CreateRecipeAction'
import axios from 'axios';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Entype from 'react-native-vector-icons/Entypo';
// import { Entypo } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import Modal from 'react-native-modal';
import { AsyncStorage } from 'react-native';
import { baseUrl } from '../config/baseUrl';
import Entypo from 'react-native-vector-icons/Entypo';
function AddIngrdient(props) {
    const params = props.route.params;
    const [showForm,setShowForm] = useState(false);
    const [data,setData] = useState(null);
    const [title,setTitle] = useState('');
    const [amount,setAmount] = useState('');
    const [unit,setUnit] = useState('');
    const [loading,setLoading] = useState(false);
    const [specialUse,setSpecialUser] = useState('');
    const [shouldEdit,setshouldEdit] = useState(false);
    const [id,setId] = useState('');
    const dispatch = useDispatch();
    const goNext = () => {
        const someIngredients = ['onion','masala']
        dispatch(RecipeActions.AddingIngrdients(someIngredients));
    props.navigation.navigate('AddStep')

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
    const addIngredient = async() => {
        try {
        setLoading(true);
        const IngredientAPIResponse = await axios.post(`${baseUrl}/ingredient/create-ingredient`,{
            title:title,
            amount:amount,
            unit:unit,
            createdBy:user.data[0]._id
        });
        getMyIngredients()
        setShowForm(false);
        setLoading(false);
        }catch(e) {
           Alert.alert('error',JSON.stringify(e.response.data));
           setLoading(false);
        }
    };

    const getMyIngredients = async() => {
        try {
        const MyIngredientAPIResponse = await axios.get(`${baseUrl}/ingredient/my-ingredients/${user.data[0]._id}`);
        setData(MyIngredientAPIResponse.data.Data);
    }catch(e) {
        console.log(e)
           Alert.alert('error',JSON.stringify(e.response.data));
        }
    };
    
    const deleteMyIngredient = async(id) => {
        try {
        const MyIngredientAPIResponse = await axios.delete(`${baseUrl}/ingredient/remove-ingredient/${id}`);
        await getMyIngredients();
    }catch(e) {
           Alert.alert('error',JSON.stringify(e.response.data));
        }
    };
    const [editLoading,setEditLoading] = useState(false);
    const editIngredient = async(id) => {
        try {
            setEditLoading(true);
        const editedIngredientResponse = await axios.patch(`${baseUrl}/ingredient/edit-ingredient/${id}`,{
            title:title,
            amount:amount,
            unit:unit,
        });
        await getMyIngredients();
        setEditLoading(false);
    }catch(e) {
           console.log(e.response);
           setEditLoading(false);
        }
    };
    useEffect(() => {
        getMyIngredients();
    },[user]);
    return (
        <SafeAreaView style={styles.container}>
            <Modal
            isVisible={showForm}
            onBackButtonPress={() => {
                setShowForm(false);
                setshouldEdit(false);
            }}
            style={{flex:1,backgroundColor:'white',height:'100%',width:'100%',margin:0,paddingTop:'20%'}}
            >
           
              <View style={{padding:20,marginTop:'30%'}}>
              <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Ingrdient</Text>
                            <TextInput value={title} onChangeText={t => setTitle(t)} style={{ top:20, fontSize: 20, minWidth: "100%", borderBottomColor: "black", borderBottomWidth: 1 }} />
                    </View>
                    <View style={{flexDirection:'row',marginTop:30,top:20,width:'95%',justifyContent:'space-around',alignSelf:'center'}}>
                        <View style={{width:'45%'}}>
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Amount</Text>

                        <TextInput value={amount} onChangeText={am => setAmount(am)} style={{top:15,fontSize:20,borderBottomColor: "black", borderBottomWidth: 1,width:'100%'}}/>
                        </View>
                        <View style={{width:'45%'}}>
                        <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(2.5) }} >Unit</Text>

                        <TextInput value={unit} onChangeText={un => setUnit(un)} style={{top:15,fontSize:20,borderBottomColor: "black", borderBottomWidth: 1,width:'100%'}}/>
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
                    <View style={{ width: '90%', height: '100%',alignSelf:'center'}} >
                        <TouchableOpacity onPress={() => {
                            if(title === '') {
                                alert('Please fill out the ingredient name')
                                return;
                            } else if (amount === ''){
                                alert('Please fill out the amount')
                                return;
                            } else if (unit === '') {
                                alert('Please fill out the unit')
                                return;
                            }
                            if(shouldEdit) {
                                editIngredient()
                            } else {
                                addIngredient()
                            }
                        }} style={{ backgroundColor: colors.primary, alignItems: 'center', marginTop: "13%" }} >
                            {
                                loading ? 
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2.5), color: 'white' }} >Saving</Text>
                                    <ActivityIndicator size='small' color='white' style={{left:20}}/>
                                </View>
                                : editLoading ? 
                                <View style={{flexDirection:'row'}}>
                                <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2.5), color: 'white' }} >Editing</Text>
                                <ActivityIndicator size='small' color='white' style={{left:20}}/>
                            </View>
                            :
                                <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >Save</Text> 
                            }
                        </TouchableOpacity>
              </View>

                            
            </Modal>
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                {/* header */}
                <View style={{ backgroundColor: colors.secondary, width: "100%" }}>
                    <Text style={{ padding: 10, left: "2%", color: "white", maxWidth: "90%", fontFamily: "Zermatt-First", fontSize: RFPercentage(3) }} >Add some Ingredients to the tasteful dish</Text>
                </View>
               <View style={{padding:10}}>
               <FlatList
                    data={data}
                    keyExtractor={item=>item._id}
                    renderItem={(itemData) => (
                        <View style={{
                            width:'95%',
                            height:50,
                            borderWidth:1,
                            borderColor:'white',
                            backgroundColor:'white',
                            elevation:2,
                            borderRadius:10,
                            alignSelf:'center',
                            margin:3,
                            paddingLeft:10,
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-between'
                        }}>
                            <View style={{flexDirection:'row'}}> 
                            <Text style={{fontSize:13,fontWeight:'300'}}>{itemData.item.amount} {itemData.item.unit}</Text>
                            <Text style={{left:20,fontSize:10,fontFamily:'AvianoFlareRegular'}}> {itemData.item.title}</Text>
                                </View>
                             <TouchableOpacity onPress={() => {
                                 Alert.alert('Choose an operation','What do you want to do with this ingredient',
                                 [
                                     {text:'Edit',onPress:() => {
                                         setId(itemData.item._id);
                                         setTitle(itemData.item.title);
                                         setAmount(itemData.item.amount);
                                         setUnit(itemData.item.unit);
                                         setshouldEdit(true);
                                         setShowForm(true);
                                     }},
                                     {text:'Delete',onPress:() => {
                                         deleteMyIngredient(itemData.item._id)
                                     }}
                                 ]
                                 );
                             }}>
                             <Entypo name="dots-three-vertical" size={19} style={{right:10}} color="black" />
                             </TouchableOpacity>
                        </View>
                    )}
                    />
                    
               </View>
               {showForm ? null :
                      <View style={{ width: '90%', height: '100%',alignSelf:'center'}} >
                      <TouchableOpacity onPress={()=>setShowForm(true)} style={{ backgroundColor: colors.primary, alignItems: 'center', marginTop: "5%" }} >
                          <Text style={{ fontFamily: 'AvianoFlareRegular', padding: 11, fontSize: RFPercentage(2), color: 'white' }} >+ Add Ingredient</Text>
                      </TouchableOpacity>
                  </View>
                    }
                <View style={styles.recipeContainer}>
                    {/* feilds */}
                    
                </View>
            </ScrollView>
            <View style={{
                width:'100%',
                flex:1,
                position:'absolute',
                bottom:0,
                right:0
            }}> 
                <TouchableOpacity 
                onPress={() => props.navigation.navigate('AddStep',{
                    ingredients:data
                })}
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
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
})

export default AddIngrdient;