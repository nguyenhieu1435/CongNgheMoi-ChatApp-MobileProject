import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isInCall: false

}

const isInCallSlice = createSlice({
    name: 'isInCall',
    initialState,
    reducers: {
        setIsInCall(state, action) {
            state.isInCall = action.payload
        }
    }
})

export const { setIsInCall } = isInCallSlice.actions
export default isInCallSlice.reducer