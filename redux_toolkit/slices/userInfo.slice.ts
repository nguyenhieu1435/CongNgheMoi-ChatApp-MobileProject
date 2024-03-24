import {createSlice} from "@reduxjs/toolkit"

interface userInfoInterfaceI{
    user: {
        __v: number,
        _id: string,
        avatar: string,
        background: string,
        createdAt: string,
        dateOfBirth: string,
        deleted: boolean,
        gender: string,
        name: string,
        password: string,
        phone: string,
        qrCode: string,
        updatedAt: string,
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
        }
    }
})

export default userInfoSlice.reducer
export const {setUserInfo} = userInfoSlice.actions