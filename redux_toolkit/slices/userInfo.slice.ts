import {createSlice} from "@reduxjs/toolkit"

interface userInfoInterfaceI{
    user: {
        __v: number,
        // _id is phone number or email
        _id: string,
        avatar: string,
        background: string,
        createdAt: string,
        dateOfBirth: string,
        deleted: boolean,
        gender: string,
        name: string,
        password: string,
        qrCode: string,
        updatedAt: string,
        status: string,
        friends ?: string[] | [],
    } | undefined,
    accessToken?: string | undefined,
    refreshToken?: string | undefined
} 

const initialState : userInfoInterfaceI = {
    user: undefined,
    accessToken: undefined,
    refreshToken: undefined
}

const userInfoSlice = createSlice({
    name: "user-info",
    initialState: initialState,
    reducers: {
        setUserInfo : (state, action)=>{
            state.user = action.payload.user
            state.accessToken = action.payload.accessToken,
            state.refreshToken = action.payload.refreshToken
        },
        updateAvatarImage : (state, action)=>{
            if (state.user) {
                state.user.avatar = action.payload
            }
        }
    }
})

export default userInfoSlice.reducer
export const {setUserInfo, updateAvatarImage} = userInfoSlice.actions