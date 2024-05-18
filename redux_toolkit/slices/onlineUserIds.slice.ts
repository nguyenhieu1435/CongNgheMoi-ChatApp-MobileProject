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
        },
        removeFriendById: (state, action)=>{
            state.onlineUserIds = state.onlineUserIds.filter(friend => friend !== action.payload);
            state.friends = state.friends.filter(friend => friend !== action.payload);
        }
    },
})

export const { updateOnlineUserIds, updateFriends, removeFriendById } = onlineUserIdsSlice.actions;
export default onlineUserIdsSlice.reducer;