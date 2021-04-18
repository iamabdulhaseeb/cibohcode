import { Alert } from "react-native";
import {SAVE_STEP, DELETE_STEP,DELETE_ONE_STEP} from "../Actions/CreateSteps";

const initialState = {
    steps:[]
}
export default StepsReducer = (state=initialState,action) => {
    switch(action.type) {
      case SAVE_STEP:
          return {
              ...state,
              steps:state.steps.concat(action.step)
          }
          case DELETE_STEP:
            return {
                ...state,
                steps:state.steps.filter(step => step.recievedThumbnail === action.id)
            }
      case DELETE_ONE_STEP:
          console.log(state.steps);
          return {
              ...state,
              steps:state.steps.filter(step => Alert.alert('triggered'))
          }      
        default: return state
    };
         
}
