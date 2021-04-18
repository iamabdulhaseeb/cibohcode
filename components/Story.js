import React, {Component} from 'react';
import {AppRegistry, FlatList, Text, View, Image, ImageBackground, 
    Alert, Platform, TouchableOpacity, TouchableHighlight, StyleSheet} from 'react-native';
import { Avatar as Avatar2 } from 'react-native-paper';
import { Avatar, Accessory } from 'react-native-elements';
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imgSample from "../assets/images/Oval.png"
import colors from '../config/colors';
import { baseUrl } from '../config/baseUrl';

const data = [
    {
        id: 1,
        name: "Thomas",
        picture: imgSample
    },
    {
        id: 2,
        name: "Thomas",
        picture: imgSample
    },
    {
        id: 3,
        name: "Thomas",
        picture: imgSample
    },
    {
        id: 4,
        name: "Thomas",
        picture: imgSample
    },
    {
        id: 5,
        name: "Thomas",
        picture: imgSample
    },
    {
        id: 6,
        name: "Thomas",
        picture: imgSample
    },
]

// class HorizontalFlatListItem extends Component {
//     render(props){
//         // console.log(this.props)
//         return(
           
            
               
//                 <TouchableOpacity style={styles.horizontalContainer} >
//                     <Avatar2.Image style={{marginTop: 4, backgroundColor: 'white'}} size={70} source={this.props.item.picture} />
//                     <MaterialCommunityIcons
//                         name="youtube"
//                         size={30}
//                         color={colors.primary}
//                         style={{marginTop: -12, height: 25, marginBottom: -12}}
//                     />
//                     <Text style={{marginTop: 10}} >{this.props.item.name}</Text>
//                 </TouchableOpacity>
          

//             // <TouchableOpacity style={styles.horizontalContainer} >
//             //     <Avatar2.Image style={{marginTop: 4, backgroundColor: 'white'}} size={70} source={this.props.item.picture} />
//             //     <Text style={{marginTop: 10}} >{this.props.item.name}</Text>
//             // </TouchableOpacity>
//         );
//     }
// }


export default Story = ({navigation,stories}) => {
        return(
            <View style={styles.container} >
                <View style={{height: 110}} >
                    
                    <FlatList style={styles.flatList} 
                        showsHorizontalScrollIndicator={false}
                        horizontal={true} 
                        data={stories}
                        keyExtractor={item => item.id}
                        renderItem={({item, index}) => {
                            return(
                           <View>
                                  {/* <TouchableOpacity style={styles.horizontalContainer} >
                    <Avatar size={70} rounded icon={{ name: 'add' }} containerStyle={{marginTop: 4,backgroundColor: colors.primary, color: 'red'}} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.horizontalContainer} onPress={() => {
                    navigation.navigate('Status',{
                        user:item.userData,
                        statuses:item.Stories,
                        count:item.Stories.length
                    });
                }}>
                    <Avatar2.Image style={{marginTop: 4, backgroundColor: 'white'}} size={70} source={{uri:item.userData.profile === '' || item.userData.profile == null ? 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg' : `${baseUrl}/${item.userData.profile}`}} />
                  
                    {/* <Text style={{marginBottom:5,fontFamily:"sofiaprolight"}} >{item.userData.lastname}</Text> */}
                </TouchableOpacity>
          

            {/* <TouchableOpacity style={styles.horizontalContainer} >
                <Avatar2.Image style={{marginTop: 4, backgroundColor: 'white'}} size={70} source={item.picture} />
                <Text style={{marginTop: 10}} >{item.name}</Text>
            </TouchableOpacity> */}
                           </View>
                            );
                        }}
                    >

                    </FlatList>
                </View>
            </View>
        );
    }


const styles = StyleSheet.create({
    horizontalContainer: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        height: 80,
        width: 80,
        borderColor: colors.primary,
        borderStyle: 'dashed',
        borderRadius: 40,
        borderWidth: 1,
        margin: 4,
    },
    container: {
        // flex: 1,
        flexDirection: 'column',
        alignSelf:'flex-start'
        // left:-20,
    },
    flatList: {
        // backgroundColor: "black",
    }
})