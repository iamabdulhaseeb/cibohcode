import {CREATE_UTENSIL,DELETE_UTENSIL} from "../Actions/CreateUtensilAction";

const initialState = {
    utensils:[]
}
export default UtensilReducer = (state=initialState,action) => {
    switch(action.type) {
      case CREATE_UTENSIL:
          return {
              ...state,
              utensils:state.utensils.concat(action.utensil)
          }
          case DELETE_UTENSIL:
            return {
                ...state,
                utensils:state.utensils.filter(item => item.id !== action.data)
            }
 
        default: return state
    };
         
}
