export const TRIGGER = 'TRIGGER';
export const UNTRIGGER = 'UNTRIGGER';

export const callTrigger = () => {
    return({
        type:TRIGGER
    })
}
export const callUnTrigger = () => {
    return({
        type:UNTRIGGER
    })
}