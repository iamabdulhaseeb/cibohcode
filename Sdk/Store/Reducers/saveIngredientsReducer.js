import {SAVE_INGREDIENT, DELETE_INGREDIENT,DELETE_ALL} from "../Actions/saveIngredientsAction";

const initialState = {
    ingredientSelected:[]
}
export default IngredientsFilterReducer = (state=initialState,action) => {
    switch(action.type) {
      case SAVE_INGREDIENT:
          return {
              ...state,
              ingredientSelected:state.ingredientSelected.concat(action.ingredient)
          }
          case DELETE_INGREDIENT:
            return {
                ...state,
                ingredientSelected:state.ingredientSelected.filter(item => item.id !== action.data)
            }
           case DELETE_ALL:
               return {
                   ...state,
                   ingredientSelected:state.ingredientSelected = []
               } 
        default: return state
    };
         
}
