export const ADD_FAV = 'ADD_FAV';
export const DELETE_FAV = 'DELETE_FAV';

export const addFav = (data,id) => {
   return({
       type:ADD_FAV,
       data:data,
       id:id
   })
};
export const deleteFav = (id) => {
    console.log('DELETE CALLED LINE 12 __________-----------------________________-----------')
    return({
        type:DELETE_FAV,
        id:id
    })
}