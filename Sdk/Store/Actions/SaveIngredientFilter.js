export const SAVE_INGREDIENT_FILER = 'SAVE_INGREDIENT_FILER';
export const DELETE_INGREDIENT_FILTER = 'DELETE_INGREDIENT_FILTER';
export const DELETE_ALL = 'DELETE_ALL';
export const saveIngredientfilter = data => {
    return ({
        type:SAVE_INGREDIENT_FILER,
        data:data
    })
}
export const deleteIngredientFilter = id => {
    return ({
        type:DELETE_INGREDIENT_FILTER,
        data:id
    })
}
export const deleteAll = () => {
    return ({
        type:DELETE_ALL,
    })
}