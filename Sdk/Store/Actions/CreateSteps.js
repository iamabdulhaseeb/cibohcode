export const SAVE_STEP = 'SAVE_STEP';
export const DELETE_STEP = 'DELETE_STEP';
export const DELETE_ONE_STEP = 'DELETE_ONE_STEP';

export const saveStep = (step) => {
    // const stp = new Object({
    //     id:id,
    //     url:url,
    //     Description:Description,
    //     photo:{
    //         photo:photo,
    //         realUrl:url
    //     },
    //     ingredients:ingredients,
    //     utensils:utensils,
    //     ext:ext
    // })
    return ({
        type:SAVE_STEP,
        step:step
    })
}
export const DeleteSteps = (id) => {
    return ({
        type:DELETE_STEP,
        id
    })
}
export const deleteStep = (id) => {
    return({
        type:DELETE_ONE_STEP,
        id
    })
}