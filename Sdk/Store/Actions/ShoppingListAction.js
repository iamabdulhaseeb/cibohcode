export const ADD_SHOPPING_LIST = 'ADD_SHOPPING_LIST';
export const DELETE_SHOPPING_LIST = 'DELETE_SHOPPING_LIST';
export const DELETE_ALL = 'DELETE_ALL';
export const DELETE_ITEM = 'DELETE_ITEM';
export const addShoppingList = (data) => {
    const Data = {
        recipe:data.title,
        id:data._id,
        ingredients:data.ingredients,
        recipePhoto:data.recipePhoto
    }
   return({
       type:ADD_SHOPPING_LIST,
       data:Data,
       id:data._id
   })
};
export const deleteShoppingListItem = (id) => {
    console.log('I am called in action line 18')

    return({
        type:DELETE_ITEM,
        id:id
    })
}

export const deleteAll = () => {
    console.log('I am called in action line 25')
    return({
        type:DELETE_ALL,
    })
}