import React, { Component } from 'react';
import { StatusBar,SafeAreaView, StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Constants from 'expo-constants';
import  MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


import feedImg1 from "../assets/images/Rectangle8.png"
import feedImg2 from "../assets/images/Rectangle9.png"
import feedImg3 from "../assets/images/Rectangle18.png"
import feedImg4 from "../assets/images/Rectangle19.png"
import ShopingList_1Card from '../components/ShopingList_1Card';

const screenWidth = Dimensions.get('window').width;



class ShopingList_1 extends Component {

    state = {
        shopingData: [
            {
                id: 1,
                picture: feedImg3,
                heading: 'Fresh Asparagus',
                quantity: 0,
            },
            {
                id: 2,
                picture: feedImg3,
                heading: 'Banana (5 items)',
                quantity: 0,
            },
            {
                id: 3,
                picture: feedImg1,
                heading: 'noodles',
                quantity: 0,
            },
            {
                id: 4,
                picture: feedImg3,
                heading: 'Frech Toast With Omlette',
                quantity: 0,
            },
            {
                id: 5,
                picture: feedImg2,
                heading: 'Frech Toast With Omlette',
                quantity: 0,
            },
            {
                id: 6,
                picture: feedImg4,
                heading: 'Frech Toast With Omlette',
                quantity: 0,
            },
            {
                id: 7,
                picture: feedImg4,
                heading: 'Frech Toast With Omlette',
                quantity: 0,
            },
            {
                id: 8,
                picture: feedImg4,
                heading: 'Frech Toast With Omlette',
                quantity: 0,
            },
        ]
    }

    handleIncrement = (id) => {
        const shopingData = [...this.state.shopingData]
        shopingData.map(data => {
            if (id === data.id) {
                data.quantity = data.quantity + 1
                console.log(id)
            }
        })
        this.setState({ shopingData })
    }

    handleDecrement = (id) => {
        const shopingData = [...this.state.shopingData]
        shopingData.map(data => {
            if (id === data.id) {
                if (data.quantity != 0) {
                    data.quantity = data.quantity - 1
                }

            }
        })
        this.setState({ shopingData })
    }

    render(props) {
        const ingredients = this.props.route.params.ingredients;
        const title = this.props.route.params.recipeName;
        console.log("???? ~ file: ShopingList_1.js ~ line 101 ~ ShopingList_1 ~ render ~ title", title)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" backgroundColor="white" />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.shopingContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ShopingList')} >
                                <MaterialCommunityIcons style={{ opacity: 0.8 }} name='chevron-left' color='black' size={RFPercentage(4)} />
                            </TouchableOpacity>
                            <Text style={{ fontFamily: 'Zermatt-First', fontSize: RFPercentage(3.5), left: 20 }} >{title}</Text>
                        </View>

                        <ScrollView style={{ flexDirection: 'row', marginLeft: -5, marginTop: 20 }} >
                            <FlatList
                                data={ingredients}
                                keyExtractor={item => item.id.toString()}     //has to be unique   
                                renderItem={({ item, index }) => (
                                   <View style={{flex:1,borderWidth:0,width:screenWidth,paddingHorizontal:10,marginVertical:10,flexDirection:'row',alignItems:'center'}}>
                                        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',flex:1,padding:10}}>
                                        <Text style={{fontSize:20,fontFamily:'sofiaprolight'}}>{index+1}.{item.title}</Text>
                                        <Text style={{fontSize:20,fontFamily:'sofiaprolight'}}>{item.amount} {item.unit}</Text>
                                    </View>
                                    {/* <View>
                                    <MaterialIcons name="delete" size={24} color="black" />
                                    </View> */}

                                   </View>
                                    //<ShopingList_1Card navigation={this.props.navigation} onHandleDecrement={this.handleDecrement} onHandleIncrement={this.handleIncrement} screenWidth={screenWidth} id={item.id} quantity={item.quantity} heading={item.heading} picture={item.recipePhoto} /> //method to render the data in the way you want using styling u need
                                )}
                                horizontal={false}
                                numColumns={1}
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

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

export default ShopingList_1;