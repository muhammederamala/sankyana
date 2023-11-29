import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./Loginreducers";
const rootReducers = combineReducers({
  // this is user here the state which will handle all the logic of storeLoginUser reducers
  userLogin: UserReducer,
});
export default rootReducers;
