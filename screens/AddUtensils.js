import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
// import Constants from 'expo-constants'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors';
import {useDispatch} from 'react-redux';
import * as RecipeActions from '../Sdk/Store/Actions/CreateRecipeAction'
import axios from 'axios';
import { Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import Modal from 'react-native-modal';
import * as CreateUtensilActions from '../Sdk/Store/Actions/CreateUtensilAction';
import { baseUrl } from '../config/baseUrl';
function AddUtensils(props) {
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
    const addIngredient = async() => {
        try {
        setLoading(true);
        const IngredientAPIResponse = await axios.post(`${baseUrl}/ingredient/create-ingredient`,{
            title:title,
            amount:amount,
            unit:unit,
            createdBy:'60225d686f58290ef33b1022'
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
        const MyIngredientAPIResponse = await axios.get(`${baseUrl}/ingredient/my-ingredients/60225d686f58290ef33b1022`);
        setData(MyIngredientAPIResponse.data.Data);
    }catch(e) {
           Alert.alert('error',JSON.stringify(e.response.data));
        }
    };
    
    const deleteMyIngredient = async(id) => {
        try {
        const MyIngredientAPIResponse = await axios.delete(`http://192.168.10.7:3002/ingredient/remove-ingredient/${id}`);
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
    },[]);
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow:1}}>
          <View style={{padding:20,marginTop:'30%'}}>
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
                            props.navigation.goBack();
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
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
})

export default AddUtensils;