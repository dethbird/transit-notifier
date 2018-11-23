import { combineReducers } from "redux";
import { default as tripInfoReducer } from "reducers/trip-info";
import { default as settingsReducer } from "reducers/settings";

export default combineReducers({ 
    tripInfoReducer,
    settingsReducer,
});
