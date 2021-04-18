import { ADD_FAV, DELETE_FAV } from "../Actions/AddFavoriteAction";
import {Alert} from 'react-native';
const initialState = {
    favIds:[],
    favs:[]
}
export default AddFavoriesReducer = (state=initialState,action) => {
    switch(action.type) {
      case ADD_FAV:
          return {
              ...state,
              favIds:state.favIds.concat(action.id),
              favs:state.favs.concat(action.data)
          }
          case DELETE_FAV:
            return {
                ...state,
                favIds:state.favIds.filter(item => item != action.id),
                favs:state.favs.filter(item => item._id !== action.id)
            }
 
        default: return state
    };
         
}
