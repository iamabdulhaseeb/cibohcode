import React from 'react';
import { StatusBar,SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useFonts } from 'expo-font'
// import Constants from 'expo-constants';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import feedImg1 from "../assets/images/Rectangle8.png"
import feedImg2 from "../assets/images/Rectangle9.png"
import feedImg3 from "../assets/images/Rectangle18.png"
import feedImg4 from "../assets/images/Rectangle19.png"
import ShopingListCard from '../components/ShopingListCard';
import { useSelector,useDispatch } from 'react-redux';
import * as ShoppingListActions from '../Sdk/Store/Actions/ShoppingListAction';
import AntDesign from 'react-native-vector-icons/AntDesign';
const screenWidth = Dimensions.get('window').width;

function ShopingList({ navigation }) {
    const dispatch = useDispatch();
    const StoredShoppingList = useSelector(list => list.shoppingList.shoppingList);
    console.log("🚀 ~ file: ShopingList.js ~ line 71 ~ ShopingList ~ StoredShoppingList", StoredShoppingList)
    const StoredShoppingListIds = useSelector(listIDs => listIDs.shoppingList.ShoppingListIds);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" backgroundColor="white" />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
             <View style={{
                 flexDirection:"row",
                 justifyContent:'space-between',
                 padding:10,
                 alignItems:'center'
             }}>
             <Text style={{ fontFamily: 'Zermatt-First', fontSize: RFPercentage(3.5),marginTop:10 }} >Shopping List</Text>
            {StoredShoppingList != null && StoredShoppingList.length != 0 ? <TouchableOpacity onPress={() => {
              dispatch(ShoppingListActions.deleteAll())
            }}>
                <AntDesign name='delete' size={30}/>
            </TouchableOpacity> : null}
             </View>
               {StoredShoppingList == null || StoredShoppingList.length === 0 ?
               <View style={{
                   flex:1,
                   height:Dimensions.get('screen').height/1.2,
                   justifyContent:'center',
                   alignItems:'center'
               }}>
                   <Text style={{fontSize:18,fontFamily:'sofiaprolight'}}>Nothing found in your shopping list.</Text>
               </View>
               :<View style={styles.shopingContainer}>
                    <ScrollView>
                     {/* <Text>{JSON.stringify(StoredShoppingList[0])}</Text> 
                    <Text>{JSON.stringify(StoredShoppingListIds)}</Text>  */}

                      <FlatList
                            data={StoredShoppingList}
                            keyExtractor={item => item._id}     //has to be unique   
                            renderItem={({ item, index }) => <ShopingListCard recipeName={item.recipe} ingredients={item.ingredients} navigation={navigation} screenWidth={screenWidth} id={index} heading={item.recipe} subHeading={item.ingredients.length + " " + "Ingredients"} picture={item.recievedPreview} deleteItem={() => {
                                dispatch(ShoppingListActions.deleteShoppingListItem(item.id))
                            }}/>} //method to render the data in the way you want using styling u need
                            horizontal={false}
                            numColumns={1}
                        />
                    </ScrollView>
                </View>}
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
    shopingContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 40,
        marginBottom: 30,
        // left: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
})

export default ShopingList;