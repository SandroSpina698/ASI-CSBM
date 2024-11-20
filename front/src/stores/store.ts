import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./core.ts";

const store = configureStore({
    reducer: globalReducer
})

export default store;