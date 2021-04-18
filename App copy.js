import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, LogBox, SafeAreaView,StatusBar,Alert,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { FontAwesome, MaterialCommunityIcons, SimpleLineIcons, Feather } from "@expo/vector-icons"
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
// import * as Font from 'expo-font';
import {GoogleSignin} from '@react-native-community/google-signin';
import { GooglePay } from 'react-native-google-pay';
import Feed from './screens/Feed';
import Home from './screens/Home';
import Search from './screens/Search';
import ShopingList from './screens/ShopingList';
import ShopingList_1 from './screens/ShopingList_1';
import Login from './screens/Login';
import CreateRecipe from './screens/CreateRecipe';
import CreateRecipe_1 from './screens/CreateRecipe_1';
import CreateRecipe_2 from './screens/CreateRecipe_2';
import CreateRecipe_3 from './screens/CreateRecipe_3';
import AddIngrdient from './screens/AddIngrdient';
import AddStep from './screens/AddStep';
import Payment from './screens/Payment';
import MorePlans from './screens/MorePlans';
import Settings from './screens/Settings';
import SignUp from './screens/SignUp';
import Detail from './screens/Detail';
import AddUtensils from './screens/AddUtensils';
import colors from './config/colors';
import {Provider} from 'react-redux';
import {createStore,combineReducers} from 'redux';
import createRecipeReducer from './Sdk/Store/Reducers/createRecipeReducer';
import StepsReducer from './Sdk/Store/Reducers/createStepReducer';
import saveIngredientsReducer from './Sdk/Store/Reducers/saveIngredientsReducer';
import SaveIngredientFilter from './Sdk/Store/Reducers/SaveIngredientFilter';
import CreateUtensilReducer from './Sdk/Store/Reducers/utensilReducer';
import CreatePost from './screens/CreatePost';
// import CreateStatus from './screens/AddStatus';
import CreateStatusDetails from './screens/AddStatusDetails';
import PostDetail from './screens/PostDetail';
import addFavoriteReducer from './Sdk/Store/Reducers/addFavoriteReducer';
import UserProfile from './screens/UserProfile';
import SeeAllPosts from './screens/SeeAllPosts';
import addShoppingListReducer from './Sdk/Store/Reducers/addShoppingListReducer';
// import PostCamera from './screens/PostCamera';
import SeeAllRecipies from './screens/SeeAllRecipies';
import ReviewsScreen from './screens/ReviewsScreen';
import CreateReview from './screens/CreateReview';
import paymentReducer from './Sdk/Store/Reducers/paymentReducer';
import VideoComponent from './screens/Video';
import Status from './screens/Status';
import ForgotPassword from './screens/forgotPassword';
import Otp from './screens/otp';
import ChangePassword from './screens/ChangePassword';
import Pay from './screens/Pay';
import TriggerReducer from './Sdk/Store/Reducers/trigger';
import EditProfile from './screens/EditProfile';
import FAQ from './screens/FAQScreen';
import Steps from './screens/Steps';
import Stripe from 'tipsi-stripe';
import {createThumbnail} from 'react-native-create-thumbnail';
LogBox.ignoreAllLogs()
Stripe.setOptions({
  publishableKey: 'pk_test_51IPaEECcBMJQip68344dF7r9mRCppFAcgU8MrcGzCI4y85TdoMK8sjd8IhsfnFkCqZst6RNJpipnEq19d3cddwdh00MnnmArsj',
  androidPayMode: 'test', // test || production
});
function ConfigureMyGoogle() {
  GoogleSignin.configure({
    webClientId:
      '380498237906-276tchj7plvfl7p06htuoleeo5fp8ah9.apps.googleusercontent.com',
    forceCodeForRefreshToken: true,
    scopes: [
      "profile",
      "email",
      "openid"
  ]
  });
}

const generateThumbnail = async() => {
  try {
  const link = createThumbnail({
    url: 'https://www.youtube.com/watch?v=-SpWOpdzUKw',
    timeStamp: 10000,
  });
  Alert.alert('linkk',JSON.stringify(link));
  } catch(e) {
    Alert.alert('Error',JSON.stringify(e));
  }
}
const Stack = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const customFonts = {
  'ZermattFirst': require('./assets/fonts/ZermattFirst.otf'),
  'AvianoFlareRegular': require('./assets/fonts/AvianoFlareRegular.otf'),
  'sofiaprolight': require('./assets/fonts/sofiaprolight.otf'),
}


// const rootReducers = {
//   recipe:createRecipeReducer
// },
// const store = createStore(rootReducers);
export default function App() {
  
   useEffect(() => {
     ConfigureMyGoogle();
   },[]);
  
  // Stripe.setOptions({
  //   publishableKey:'pk_test_51IPaEECcBMJQip68344dF7r9mRCppFAcgU8MrcGzCI4y85TdoMK8sjd8IhsfnFkCqZst6RNJpipnEq19d3cddwdh00MnnmArsj'
  // });
  const rootReducers = combineReducers({
    recipe:createRecipeReducer,
    steps:StepsReducer,
    ingredients:saveIngredientsReducer,
    ingredientsFilter:SaveIngredientFilter,
    utensils:CreateUtensilReducer,
    favorites:addFavoriteReducer,
    shoppingList:addShoppingListReducer,
    payment:paymentReducer,
    trigger:TriggerReducer
  })
  const store = createStore(rootReducers);
  const [fontLoaded, setFoantLoaded] = useState(true)

  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFoantLoaded(true);
  }

  useEffect(() => {
    loadFontsAsync();
  })



  function HomeTabs() {
    return (
      <Tab.Navigator initialRouteName="Home" tabBarOptions={{
        style: { height: 75, fontSize: 40 },
        labelStyle: { fontSize: 14, fontWeight: '500', marginBottom: 14 },
        activeTintColor: colors.primary, inactiveTintColor: '#C3C3C3', tabStyle: { backgroundColor: "white", fontSize: 40 },
      }
      }>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                style={{ marginTop: 13 }}
                name="home"
                color={color}
                size={size + 10}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <SimpleLineIcons
                style={{ marginTop: 13 }}
                name="magnifier"
                color={color}
                size={size + 4}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreateRecipe"
          component={CreateRecipe}
          options={{
            tabBarLabel: 'Create',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                style={{ marginTop: 13 }}
                name="file-document-edit-outline"
                color={color}
                size={size + 4}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ShopingList"
          component={ShopingList}
          options={{
            tabBarLabel: 'Shoping',
            tabBarIcon: ({ color, size }) => (
              <Feather
                style={{ marginTop: 13 }}
                name="shopping-bag"
                color={color}
                size={size + 4}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome
                style={{ marginTop: 13 }}
                name="user-o"
                color={color}
                size={size + 4}
              />
            ),
          }}
        />
 
      </Tab.Navigator>
    );
  }

  if (!fontLoaded) {
    return null
  }

   const manage = async() => {
    const allowedCardNetworks = ['VISA', 'MASTERCARD'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
     
    const requestData = {
      cardPaymentMethod: {
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // stripe (see Example):
          gateway: 'stripe',
          gatewayMerchantId: '',
          stripe: {
            publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
            version: '2018-11-08',
          },
          // other:
          gateway: 'example',
          gatewayMerchantId: 'exampleGatewayMerchantId',
        },
        allowedCardNetworks,
        allowedCardAuthMethods,
      },
      transaction: {
        totalPrice: '10',
        totalPriceStatus: 'FINAL',
        currencyCode: 'USD',
      },
      merchantName: 'Example Merchant',
    };
     
    // Set the environment before the payment request
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);
     
    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
      .then((ready) => {
        if (ready) {
          // Request payment token
          GooglePay.requestPayment(requestData)
            .then((token) => {
              // Send a token to your payment gateway
            })
            .catch((error) => console.log(error.code, error.message));
        }
      })
   }

  return (

      <Provider store={store}>
       <StatusBar backgroundColor={colors.primary}/>
     <NavigationContainer >
        <Stack.Navigator
          drawerStyle={{
            width: "0%"
          }} initialRouteName="SignUp">
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="ShopingList_1" component={ShopingList_1} />
          <Stack.Screen name="CreateRecipe_1" component={CreateRecipe_1} />
          <Stack.Screen name="CreateRecipe_2" component={CreateRecipe_2} />
          <Stack.Screen name="CreateRecipe_3" component={CreateRecipe_3} />
          <Stack.Screen name="AddIngrdient" component={AddIngrdient} />
          <Stack.Screen name="AddUtensil" component={AddUtensils} />
          <Stack.Screen name="AddStep" component={AddStep} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="MorePlans" component={MorePlans} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="CreatePost" component={CreatePost} />
          {/* <Stack.Screen name='CreateStatus' component={CreateStatus}/> */}
          <Stack.Screen name='CreateStatusDetail' component={CreateStatusDetails}/>
          <Stack.Screen name='PostDetail' component={PostDetail}/>
          <Stack.Screen name='UserProfile' component={UserProfile}/>
          {/* <Stack.Screen name='PostCamera' component={PostCamera}/> */}
          <Stack.Screen name='SeeAllPosts' component={SeeAllPosts}/>
          <Stack.Screen name='SeeAllRecipies' component={SeeAllRecipies}/>
          <Stack.Screen name='Reviews' component={ReviewsScreen}/>
          <Stack.Screen name='CreateReview' component={CreateReview}/>
          <Stack.Screen name='Video' component={VideoComponent}/>
          <Stack.Screen name='Status' component={Status}/>
          <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
          <Stack.Screen name='otp' component={Otp}/>
          <Stack.Screen name='changePassword' component={ChangePassword}/>
          <Stack.Screen name='pay' component={Pay}/>
          <Stack.Screen name='edit' component={EditProfile}/>
          <Stack.Screen name='faq' component={FAQ}/>
          <Stack.Screen name='Steps' component={Steps}/>
        </Stack.Navigator>
      </NavigationContainer>
     </Provider> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


