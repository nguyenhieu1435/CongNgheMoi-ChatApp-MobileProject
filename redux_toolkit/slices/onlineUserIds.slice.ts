import { createSlice } from "@reduxjs/toolkit";

interface IOnlineUserIdsState {
    onlineUserIds: string[],
    friends: string[]
}
const initialState : IOnlineUserIdsState = {
    onlineUserIds: [],
    friends: []
};

const onlineUserIdsSlice = createSlice({
    name: "onlineUserIdsSlice",
    initialState,
    reducers: {
        updateOnlineUserIds: (state, action) => {
            state.onlineUserIds = action.payload;
        },
        updateFriends: (state, action) => {
            state.friends = action.payload;
        }
    },
})

export const { updateOnlineUserIds, updateFriends } = onlineUserIdsSlice.actions;
export default onlineUserIdsSlice.reducer;