import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, Pressable,Image } from 'react-native';
// import { useFonts } from 'expo-font'
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from 'react-native';
import { baseUrl } from '../config/baseUrl';

const screenWidth = Dimensions.get('window').width;

function Card({ navigation, myId, picture, description, author, onGoDetail,recipe,LikeRecipe,unlikeRecipe,type,realUrl }) {

    // let [fontsLoaded] = useFonts({
    //     'ZermattFirst': require('../assets/fonts/ZermattFirst.otf'),
    //     'AvianoFlareRegular': require('../assets/fonts/AvianoFlareRegular.otf'),
    //     'sofiaprolight': require('../assets/fonts/sofiaprolight.otf'),
    // });

    // if (!fontsLoaded) {
    //     return null
    // }
    // console.log('picture',JSON.stringify(picture));

    return (
        <TouchableOpacity activeOpacity={0.3} onPress={onGoDetail}  style={{ flexDirection: 'row', marginLeft: 5, marginRight: 5 }} >
            <View style={styles.feedCards} >
                
                    <ImageBackground source={{uri:`${baseUrl}/${picture}`}} style={styles.backgroundRecipt} imageStyle={{
                        borderWidth:1,
                        borderColor:'transparent',
                        borderRadius:10
                    }}>
                    {/* {type === 'mp4' ? <Pressable 
                                        onPress={() => {
                                        navigation.navigate('Video',{
                                            videoUrl:`${baseUrl}/${realUrl}`,
                                            thumbnail:`${baseUrl}/${picture}`
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
                                        top:30,
                                        right:30
                                        }}>
                                        <MaterialCommunityIcons name="play" size={40} color={colors.primary} />
                                        </Pressable> : null} */}
                    <Pressable style={styles.feedLikes} >
                                           
                                            <TouchableOpacity 
                                            // style={{
                                            //     right:10,
                                            // }}
                                            onPress={() => {
                                                if(recipe.likes.includes(myId)) {
                                                    unlikeRecipe()
                                                } else {
                                                    LikeRecipe();
                                                }
                                            }}>
                                            {recipe.likes.includes(myId) ? <MaterialCommunityIcons name='heart' size={18} color="red" /> : 
                                            <MaterialCommunityIcons name="heart-outline" size={18} color="white" />
                                            }
                                            </TouchableOpacity>
                                            <Text style={{ zIndex:5000,fontSize: RFPercentage(1.7), fontFamily: 'Roboto', color: 'white',bottom:2,left:5}}>{recipe.likes.length}</Text>
                                        </Pressable>
                    </ImageBackground>
                <TouchableOpacity>
                <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), marginTop: 5, maxWidth: RFPercentage(23) }} >
                    {description}
                </Text>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), maxWidth: RFPercentage(23) }} >
                        by
                    </Text>
                    <Text style={{ fontFamily: 'AvianoFlareRegular', fontSize: RFPercentage(1.1), maxWidth: RFPercentage(23), color: colors.primary }} >
                        {' '} {author}
                    </Text>

                </View>
                </TouchableOpacity>

            </View>

        </TouchableOpacity>
  
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
        width: RFPercentage(30), height: RFPercentage(20), paddingLeft: RFPercentage(13),
        paddingHorizontal: 15,
        marginTop: 20
    },
    feedLikes: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: RFPercentage(0.1),
        left: RFPercentage(0.6)
    },
    reciptTime: {
        flexDirection: 'row',
        position: 'absolute',
        minWidth: RFPercentage(6),
        bottom: RFPercentage(0.8),
        right: -3,
    },
})

export default Card;