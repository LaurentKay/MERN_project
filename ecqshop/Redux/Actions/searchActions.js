import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import { PRODUCT_LIST_ERROR, PRODUCT_LIST_PER_SUB_CAT, PRODUCT_LIST_PER_SUB_ERROR, PRODUCT_LIST_PER_SUB_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants";

export const listProducts = (
    name
) => async dispatch => {
    dispatch({type:PRODUCT_LIST_REQUEST});
    try{
        const {data} = await axios.get(
            `${baseURL}fe/search_new?name=${name}`
        ); //&category=${category}
        //console.log('The products::::::=> ', data);
        dispatch({type:PRODUCT_LIST_SUCCESS, payload: data});
    }catch(e){
        dispatch({type:PRODUCT_LIST_ERROR, payload:e.message});
    }
};
export const listProdsPerCat = (catId) => async dispatch =>{
    dispatch({type:PRODUCT_LIST_PER_SUB_CAT});
    try{
        const {data} = await axios.get(`${baseURL}fe/percategories/${catId}`);
        console.log('Prod Per Sub Car:::: => ', data);
        dispatch({type:PRODUCT_LIST_PER_SUB_SUCCESS, payload:data});
    }catch(e){
        dispatch({type:PRODUCT_LIST_PER_SUB_ERROR, payload:e.message});
    }
};