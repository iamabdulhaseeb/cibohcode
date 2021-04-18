export const SAVE_RECIPE_1 = 'SAVE_RECIPE_1';
export const SAVE_RECIPE_2 = 'SAVE_RECIPE_2';
export const SAVE_RECIPE_3 = 'SAVE_RECIPE_3';
export const SAVE_CHEFS_NOTE = 'SAVE_CHEFS_NOTE';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const ADD_STEPS = 'ADD_STEPS';


export const savingRecipe1 = (photo,realUrl,name,difficulty,prepTime,restingTime,bakingTime) => {
   return({
       type:SAVE_RECIPE_1,
       data:{
        photo,
        realUrl,
        name,
        difficulty,
        prepTime,
        restingTime,
        bakingTime
       }
   })
   
}

export const savingRecipe2 = (servingFor) => {
    return({
        type:SAVE_RECIPE_2,
        data:{
         servingFor
        }
    })
    
 }
    
 export const savingRecipe3 = (dishType,cuisine,occasion) => {
    return({
        type:SAVE_RECIPE_3,
        data:{
         dishType,
         cuisine,
         occasion
        }
    })
    
 }

 export const savingChefsNote = (note) => {
    return({
        type:SAVE_CHEFS_NOTE,
        data:{
         note
        }
    })
    
 }

 export const AddingIngrdients = (ingredient) => {
    return({
        type:ADD_INGREDIENTS,
        data:{
         ingredient
        }
    })
    
 }

 export const addingSteps = (step) => {
    return({
        type:ADD_STEPS,
        data:{
         step
        }
    })
    
 }