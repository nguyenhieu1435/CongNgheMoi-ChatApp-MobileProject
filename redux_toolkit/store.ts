import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme.slice"
import userInfoReducer from "./slices/userInfo.slice"
import onlineUserIdsReducer from "./slices/onlineUserIds.slice"
import socketIoReducer from "./slices/socketIo.slice"
import isInCallSlice from "./slices/isInCall.slice";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        userInfo: userInfoReducer,
        onlineUserIds: onlineUserIdsReducer,
        socketIo: socketIoReducer,
        isInCall: isInCallSlice
    }
})
export type IRootState = ReturnType<typeof store.getState>
