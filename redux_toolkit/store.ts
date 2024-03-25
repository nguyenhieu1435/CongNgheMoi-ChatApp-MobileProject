import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/theme.slice';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});
export type IRootState = ReturnType<typeof store.getState>;
