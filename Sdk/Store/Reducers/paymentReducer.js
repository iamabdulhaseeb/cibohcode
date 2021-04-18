import { paymentStatus } from "../Actions/paymentAction";

const initialState = {
    status:false,
    plan:''
}
export default PaymentReducer = (state=initialState,action) => {
console.log("🚀 ~ file: paymentReducer.js ~ line 7 ~ action", action)
    switch(action.type) {
      case paymentStatus:
          return {
              ...state,
              status:state.status = action.status.status,
              plan:state.plan = action.status.plan
          }
        default: return state
    };
         
}
