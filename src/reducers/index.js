import { combineReducers } from 'redux';
import productReducer from './productReducer';

//Root Reducer
export default combineReducers({
    products: productReducer
})