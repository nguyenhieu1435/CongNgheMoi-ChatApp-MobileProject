import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice"
import userInfoReducer from "./slices/userInfo.slice"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        userInfo: userInfoReducer
    }
})
export type IRootState = ReturnType<typeof store.getState>
