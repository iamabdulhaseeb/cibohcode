export const CREATE_UTENSIL = 'CREATE_UTENSIL';
export const DELETE_UTENSIL = 'DELETE_UTENSIL';
export const DELETE_ALL = 'DELETE_ALL';
export const createUtensil = (name,id,amount) => {
    const ut = new Object({
        id:id,
        name:name,
        amount:amount,
    })
    return ({
        type:CREATE_UTENSIL,
        utensil:ut
    })
}
export const deleteIngredient = id => {
    return ({
        type:DELETE_UTENSIL,
        data:id
    })
}
export const deleteAll = () => {
    return ({
        type:DELETE_ALL,
    })
}