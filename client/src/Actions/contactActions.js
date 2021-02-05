import Axios from "axios";
import { CONTACT_DETAILS_FAIL, CONTACT_DETAILS_REQUEST, CONTACT_DETAILS_SUCCESS, CONTACT_LIST_FAIL, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESS } from "../Constants/contactConstants";

export const listContacts = ()  => async (dispatch) => {
    dispatch ( {
        type: CONTACT_LIST_REQUEST
    });
    try {
        const {data} = await Axios.get('http://127.0.0.1:5000/api/contacts');
        dispatch({type: CONTACT_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({type: CONTACT_LIST_FAIL, payload: error.message })
    }
}

export const detailsContact = (id) => async(dispatch) =>{
    dispatch({type: CONTACT_DETAILS_REQUEST, payload: id});
    try {
         const {data} = await Axios.get(`http://127.0.0.1:5000/api/contacts/${id}`);
         dispatch({type: CONTACT_DETAILS_SUCCESS, payload: data}); 
    } catch (error) {
        dispatch({
            type : CONTACT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message
            : error.message,
        })
    }
}