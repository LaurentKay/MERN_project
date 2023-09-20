import { PRODUCT_LIST_ERROR, PRODUCT_LIST_PER_SUB_CAT, PRODUCT_LIST_PER_SUB_ERROR, PRODUCT_LIST_PER_SUB_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants";

export const productListReducer = (state = { loading:true, products: [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading:true
            };
        case PRODUCT_LIST_SUCCESS:
            return{
                ...state,
                loading:false,
                products: action.payload.products,
                depsub: action.payload.depsub,
                brands: action.payload.brands,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case PRODUCT_LIST_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    };
};
export const productListSubCatReducer = (state = { loading:true, products: [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_PER_SUB_CAT:
            return {
                ...state,
                loading:true
            };
        case PRODUCT_LIST_PER_SUB_SUCCESS:
            return{
                ...state,
                loading:false,
                products: action.payload.products,
                depsub: action.payload.depsub,
                brands: action.payload.brands,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case PRODUCT_LIST_PER_SUB_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        default:
            return state;
    };
};