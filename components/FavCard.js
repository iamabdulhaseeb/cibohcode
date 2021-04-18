import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, ColorPropType } from 'react-native';
// import { useFonts } from 'expo-font'
import colors from '../config/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl } from '../config/baseUrl';

const screenWidth = Dimensions.get('window').width;

function FavCard({time, likes, picture, description, author,onDetailGo,navigation,type,realUrl}) {

    // let [fontsLoaded] = useFonts({
    //     'ZermattFirst': require('../assets/fonts/ZermattFirst.otf'),
    //     'AvianoFlareRegular': require('../assets/fonts/AvianoFlareRegular.otf'),
    //     'sofiaprolight': require('../assets/fonts/sofiaprolight.otf'),
    //     });
    
    // if(!fontsLoaded) {
    //     return null 
    //     }

    return (            
            <View style={{
                width:screenWidth/2.4,
                height:140,
                margin:10,
                backgroundColor:'white'
            }}>
            <ImageBackground
            source={{uri:`${baseUrl}/${picture}`}}
            style={{
                width:'100%',
                height:"90%"
            }}
            imageStyle={{
                resizeMode:'cover',
            }}
            >
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                   {type === 'mp4' ? 
                    <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Video',{
                            videoUrl:`${baseUrl}/${realUrl}`,
                            thumbnail:`${baseUrl}/${picture}`
                        })
                    }}
                    style={{
                        width:40,
                        height:40,
                        borderWidth:1,
                        borderColor:'white',
                        backgroundColor:'white',
                        borderRadius:40/2,
                        justifyContent:'center',
                        alignItems:'center',
                        elevation:10
                    }}>
                        <MaterialCommunityIcons name='play' size={30} color={colors.primary}/>
                    </TouchableOpacity> : null}
                    <View style={{
                        alignSelf:'flex-start',
                        position:'absolute',
                        bottom:20,
                        left:10,
                        flexDirection:'row'
                    }}>
                        <MaterialCommunityIcons name='heart' size={18} color="red" />
                        <Text style={{left:3,bottom:2,fontWeight:'bold',color:'red'}}>{likes.length}</Text>
                    </View>
                </View>
      
            </ImageBackground>
            {/* <View style={{flexDirection:'row'}}>
                <Text>icon</Text>
                <Text>likes</Text>
            </View> */}
            <View>
                <Text style={{fontFamily:'sofiaprolight'}}>By: <Text style={{fontFamily:'sofiaprolight'}}>{author.name}</Text></Text>
            </View>
            </View>
   );
}

const styles = StyleSheet.create({
   feedTitle: {
        fontSize: 27,
        fontWeight: '600',
        lineHeight: 22,
        letterSpacing: -0.5,
        textAlign: 'left',
        marginBottom: 10
    },
    feedCards: {
        flexDirection: 'column',
    },
    backgroundRecipt: {
        width:RFPercentage(20),
         height: 110, paddingLeft: 110,
        paddingHorizontal: 15,
        marginTop: 20,
        borderWidth:5,
    },
    feedLikes: {
        flexDirection: 'row',
        position: 'absolute',
        bottom:5,
        left:5
    },
    reciptTime: {
        flexDirection: 'row',
        position: 'absolute',
        minWidth: 50,
        bottom:5,
        right:-3,
    },
})

export default FavCard;