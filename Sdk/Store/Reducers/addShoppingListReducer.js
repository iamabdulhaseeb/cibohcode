import { ADD_SHOPPING_LIST, DELETE_SHOPPING_LIST,DELETE_ALL,DELETE_ITEM } from "../Actions/ShoppingListAction";

const initialState = {
    ShoppingListIds:[],
    shoppingList:[]
}
export default AddShoppingListReducer = (state=initialState,action) => {
    switch(action.type) {
      case ADD_SHOPPING_LIST:
          return {
              ...state,
              ShoppingListIds:state.ShoppingListIds.concat(action.id),
              shoppingList:state.shoppingList.concat(action.data)
          }
          case DELETE_SHOPPING_LIST:
            return {
                ...state,
                ShoppingListIds:state.ShoppingListIds.filter(item => item !== action.id),
                ShopingList: state.shoppingList.filter(item => item.id !== action.id)
            }
       
            case DELETE_ITEM:
             console.log('line 23 reducer',initialState);
                return {
                    ...state,
                    ShoppingListIds:state.ShoppingListIds.filter(id => id != action.id),
                    ShopingList: state.shoppingList.filter(item => item._id != action.id)
                }
          
      case DELETE_ALL:

              return {
                  ShoppingListIds:state.ShoppingListIds = [],
                  shoppingList:state.shoppingList = []
              }  
 
        default: 
           return state
    };
         
}
