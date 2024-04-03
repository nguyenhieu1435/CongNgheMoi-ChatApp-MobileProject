
import {createSlice} from '@reduxjs/toolkit';

export const lightMode = "light"
export const darkMode = "dark"

interface initialThemeStateI {
    theme: "light" | "dark",
}

const initialState : initialThemeStateI  = {
    theme: lightMode,
}

const themeSlice = createSlice({
    name: 'theme',
    initialState : initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export default themeSlice.reducer
export const {setTheme} = themeSlice.actions