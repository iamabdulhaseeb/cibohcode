import { ADD_INGREDIENTS, ADD_STEPS, SAVE_CHEFS_NOTE, SAVE_RECIPE_1, SAVE_RECIPE_2, SAVE_RECIPE_3 } from "../Actions/CreateRecipeAction";

const initialState = {
     recipe:{
    ecipeName:'',
    difficulty:'',
    prepTime:'',
    bakingTime:'',
    restingTime:'',
    servingFor:'',
    dishType:'',
    cuisine:'',
    occasion:'',
    chefsNote:'',
    ingredients:[],
    steps:[],
    recipePhoto:'',
    realRecipeUrl:''
    }
}
export default RecipeReducer = (state=initialState,action) => {
    switch(action.type) {
      case SAVE_RECIPE_1:
          return {
              ...state,
              recipeName:state.recipe.recipeName = action.data.name,
              difficulty:state.recipe.difficulty = action.data.difficulty,
              prepTime:state.recipe.prepTime = action.data.prepTime,
              bakingTime:state.recipe.bakingTime = action.data.bakingTime,
              restingTime:state.recipe.restingTime = action.data.restingTime,
              recipePhoto:state.recipe.recipePhoto = action.data.photo,
              realRecipeUrl:state.recipe.realRecipeUrl = action.data.realUrl
          }
     case SAVE_RECIPE_2:
          return {
            ...state,
            servingFor:state.recipe.servingFor = action.data.servingFor
          } ;
     case SAVE_RECIPE_3:
         return {
             ...state,
             dishType:state.recipe.dishType = action.data.dishType,
             cuisine:state.recipe.cuisine = action.data.cuisine,
             occasion:state.recipe.occasion = action.data.occasion
         }
      case SAVE_CHEFS_NOTE:
          return {
              ...state,
              chefsNote:state.recipe.chefsNote = action.data.note
          }
      case ADD_INGREDIENTS:
          return {
              ...state,
              ingredients:state.recipe.ingredients.concat(action.data.ingredient)
          }    
       case ADD_STEPS:
           return {
               ...state,
               steps:state.recipe.steps.concat(action.data.step)
           }   
        default: return state
    };
         
}
