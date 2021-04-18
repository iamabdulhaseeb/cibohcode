import {SAVE_INGREDIENT_FILER,DELETE_INGREDIENT_FILTER,DELETE_ALL} from "../Actions/SaveIngredientFilter";

const initialState = {
    ingredientSelected:[]
}
export default IngredientsFilterReducer = (state=initialState,action) => {
    switch(action.type) {
      case SAVE_INGREDIENT_FILER:
          return {
              ...state,
              ingredientSelected:state.ingredientSelected.concat(action.data)
          }
          case DELETE_INGREDIENT_FILTER:
            return {
                ...state,
                ingredientSelected:state.ingredientSelected.filter(item => item !== action.data)
            }
            case DELETE_ALL :
                return {
                    ...state,
                    ingredientSelected:state.ingredientSelected = []
                }
        default: return state
    };
         
}
