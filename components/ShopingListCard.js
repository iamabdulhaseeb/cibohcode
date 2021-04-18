import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
// import {MaterialCommunityIcons} from "@expo/vector-icons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import { baseUrl } from '../config/baseUrl';

function ShopingListCard({deleteItem,recipeName,ingredients,screenWidth, picture, heading, subHeading, navigation}) {
   return (
       <TouchableOpacity onPress={() => navigation.navigate('ShopingList_1',{
        ingredients:ingredients,
        recipeName:recipeName
    })}>
<View style={{width: screenWidth-25, height: screenWidth/3-15, flexDirection: 'row', marginTop: 20, borderWidth: 0.3, borderColor: colors.primary}} >
            <View>
                <Image resizeMode='stretch' source={{uri:`${baseUrl}/${picture}`}} style={{width: screenWidth/3-15, height: screenWidth/3-15}} />
            </View>
            <View style={{flexDirection: 'column', left: RFPercentage(1), marginTop: 30}}>
                <Text style={{lineHeight:25, fontFamily: 'AvianoFlareRegular', fontSize:RFPercentage(1.5), maxWidth: 190, minWidth:210, maxHeight: 42}} >{heading}</Text>
                <Text style={{fontFamily: 'sofiaprolight', fontSize:RFPercentage(1.8), color: colors.primary, marginTop:10}} >{subHeading}</Text>
                
                <TouchableOpacity onPress={() => navigation.navigate('ShopingList_1',{
                    ingredients:ingredients,
                    recipeName:recipeName
                })} style={{flexDirection: 'row', alignItems: 'center', right: "-23%", top: "18%", position: 'absolute'}}>
                    <MaterialCommunityIcons style={{opacity:0.8}} name='chevron-right' color={colors.primary} size={35} />
                </TouchableOpacity>
            </View>
        </View>
        {/* <TouchableOpacity onPress={deleteItem}>
            <Text>Delete</Text>
        </TouchableOpacity> */}
       </TouchableOpacity>
       
   );
}

const styles = StyleSheet.create({
    container: {

    }
})

export default ShopingListCard;