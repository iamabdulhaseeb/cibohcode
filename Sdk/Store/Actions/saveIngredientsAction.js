export const SAVE_INGREDIENT = 'SAVE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const DELETE_ALL = 'DELETE_ALL';
export const saveIngredient = (title,unit,amount,id) => {
    const ing = new Object({
        id:id,
        title:title,
        unit:unit,
        amount:amount
    })
    return ({
        type:SAVE_INGREDIENT,
        ingredient:ing
    })
}
export const deleteIngredient = id => {
    return ({
        type:DELETE_INGREDIENT,
        data:id
    })
}
export const deleteAll = () => {
    return ({
        type:DELETE_ALL,
    })
}