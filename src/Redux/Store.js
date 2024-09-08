import { configureStore } from "@reduxjs/toolkit";
import mama from "./slices/Todoslice";

const store = configureStore({
    reducer:{
        mama:mama.reducer
    }
})


export default  store;
