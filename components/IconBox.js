import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import colors from '../config/colors';

const screenWidth = Dimensions.get('window').width;

function IconBox({picture, title,onPress,ContainerBorderwidth}) {
   return (
       <TouchableOpacity onPress={onPress} style={[styles.container,{
           borderWidth:ContainerBorderwidth
       }]}>
           <Image source={picture} />
           <Text style={{fontFamily: 'Zermatt-First', fontSize:RFPercentage(2.2), marginTop:10}} >{title}</Text>
       </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.primary,
        width:(screenWidth/3)-25,
        height: (screenWidth/3)-25,
        marginHorizontal: 12
    }
})

export default IconBox;