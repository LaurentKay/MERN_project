import {
    ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART
} from '../constants';

const cartItemReducer = (state = [], action) =>{
    switch(action.type){
        case ADD_TO_CART:
            console.log('The current cart:::: => ', state);
            let prod = {};
            let newState=[];
            if(state.length > 0){
                prod = state.find(p => p.product === action.payload.product);
                if(prod){
                    prod.qty += action.payload.qty;
                    newState = state.map(p => p.product === prod.product ? prod : p);
                }else{
                    prod = action.payload;
                    newState = [...state, prod];
                }
            }else{
                prod = action.payload;
                newState = [...state, prod];
            }
            return [...newState]; //action.payload
        case REMOVE_FROM_CART:
            console.log('State: =>', action.payload);
            return state.filter(cartItem => cartItem.product !== action.payload.product.product_Id);
        case CLEAR_CART:
            return state = [];
        default:
            return state;
    }
};

export default cartItemReducer;