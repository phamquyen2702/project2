import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./reducers/userSlice";
import categoryReducer from "./reducers/categorySlice";

const rootReducer = {
    user: useReducer,
    category: categoryReducer,
};

const store = configureStore({
    reducer: rootReducer,
});
export default store;