import { FETCH_PRODUCTS, ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS } from "../actions/types";

//Initial State
const initialState = {
  products: [],
  product: {}
};

//Reducers
export default function (state = initialState, action) {
  switch (action.type) {
    //Fetching products
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    //Adding products
    case ADD_PRODUCTS:
      return {
        ...state,
        product: action.payload
      };
    //Deleting products
    case DELETE_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    //Editing products
    case EDIT_PRODUCTS:
      return {
        ...state,
        product: action.payload
      };
    default:
      return state;
  }
}
