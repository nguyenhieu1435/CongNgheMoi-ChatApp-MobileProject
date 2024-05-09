import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice"
import userInfoReducer from "./slices/userInfo.slice"
import onlineUserIdsReducer from "./slices/onlineUserIds.slice"
import socketIoReducer from "./slices/socketIo.slice"

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        userInfo: userInfoReducer,
        onlineUserIds: onlineUserIdsReducer,
        socketIo: socketIoReducer,
    }
})
export type IRootState = ReturnType<typeof store.getState>
