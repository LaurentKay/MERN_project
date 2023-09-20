import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools }  from 'redux-devtools-extension/developmentOnly';

import cartItemReducer from "./Reducers/cartItemReducer";
import {productListReducer, productListSubCatReducer} from "./Reducers/searchReducer";
import filters from "./Reducers/Filters";

const reducers = combineReducers({
    cartItems: cartItemReducer,
    productSearch: productListReducer,
    productPerSub: productListSubCatReducer,
    Filters: filters,
});

const store = createStore(
    reducers, 
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;