import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import { contactDetailsReducer, contactListReducer } from "./Reducers/contactReducers";

const initialState = {
}
const reducer = combineReducers({
    contactList : contactListReducer,
    contactDetails : contactDetailsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
