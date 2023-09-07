import { createStore } from "redux";
import { combineReducers } from "redux";
import NavReducer from "../reducer/NavReducer";

const mainReducer = combineReducers({
  NavReducer,
});

const Store = createStore(mainReducer);

export default Store;
