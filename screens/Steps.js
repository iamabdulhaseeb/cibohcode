import React,{useState} from 'react';
import { Dimensions } from 'react-native';
import {View,Text,ToastAndroid,Image,ScrollView,TouchableOpacity,Pressable} from 'react-native';
import { baseUrl } from '../config/baseUrl';
import colors from '../config/colors';
export default Steps = props => {
    const stepss = props.route.params.recievedSteps;
    const count = stepss.length;
    const SCREEN_WIDTH = Dimensions.get('screen').width;
    const [stepsIndex,setStepsIndex] = useState(0);
    const thresholt = (count+1) + stepsIndex;
    const recipeName = props.route.params.recipeName;
    const [barProgress,setBarProgress] = useState();
    return (
            <View style={{flex:1}}>
         
            <ScrollView style={{flex:1}}>
            <View
            style={{
                width:barProgress,
                // borderWidth:5,
                borderColor:colors.primary,marginTop:30
            }}
            />
            <Text style={{alignSelf:'center',fontSize:20,margin:15,fontFamily:'sofiaprolight'}}>{recipeName}</Text>
            <Image
            source={{uri:`${baseUrl}/${stepss[stepsIndex].recievedThumbnail}`}}
            style={{
                width:'90%',
                height:400,
                alignSelf:'center',
                borderWidth:1,
                borderColor:'transparent',
                borderRadius:30,
            }}
            />
            <Text style={{fontFamily:'sofiaprolight',left:15,margin:10}}>Step {stepsIndex+1} of {count}</Text>
            <Text style={{fontFamily:'sofiaprolight',left:15,margin:10,fontSize:25}}>{stepss[stepsIndex].description}</Text>
           
        </ScrollView>
        <TouchableOpacity onPress={() => {
            if((stepsIndex+1) === count) {
                setStepsIndex(0)
                ToastAndroid.showWithGravity('You have completed all the steps',ToastAndroid.CENTER,ToastAndroid.LONG);
                props.navigation.navigate('HomeTabs');
            } else {
                const vl = (SCREEN_WIDTH/(count*10))*(stepsIndex*10)
                setBarProgress(vl)
                setStepsIndex(stepsIndex + 1);
            }
        }} style={{position:'absolute',bottom:20,alignSelf:'center',width:'50%',height:50,borderWidth:1,borderColor:colors.primary,borderRadius:30,justifyContent:'center',alignItems:'center',backgroundColor:colors.primary}}>
                <Text style={{color:'white',fontSize:20,fontFamily:'sofiaprolight'}}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}