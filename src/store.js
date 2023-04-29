import { configureStore } from "@reduxjs/toolkit";
import { Reducer, combineReducers } from "redux";
import loginReducer from "./Reducers/loggedInSlice";

const reducer = combineReducers({
  loginReducer,
});

const store = configureStore({
  reducer,
});

export default store;
