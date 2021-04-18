import { TRIGGER,UNTRIGGER } from "../Actions/trigger";

const initialState = {
    triggerVal:false
}
export default TriggerReducer = (state=initialState,action) => {
    switch(action.type) {
      case TRIGGER:
          return {
              ...state,
              triggerVal:state.triggerVal = true
          }
      case UNTRIGGER:
          return {
              ...state,
              triggerVal:state.triggerVal = false
          }    
        default: return state
    };
         
}
