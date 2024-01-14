import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice"

export const store = configureStore({
    reducer: {
        theme: themeReducer
    }
})