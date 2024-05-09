import { createSlice } from "@reduxjs/toolkit";
import { socket as socketSingleTon} from "../../configs/socket-io";

interface initialStateProps{
    socket: any  | null;
}

const initialState: initialStateProps = {
    socket: null,
};

const socketIoSlice = createSlice({
    name: "socketIo",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            if (state.socket && state.socket.connected) {
                return;
            }
            state.socket = socketSingleTon
            state.socket.connect()

            state.socket.emit("online", {
                userId: action.payload.userId,
                friendIds: action.payload.friendIds,
            });

            // state.socket.on("disconnect", () => {
            //     console.log("disconnect");
            //     state.socket = null;
            // })
        }
    },
});

export const { setSocket } = socketIoSlice.actions;
export default socketIoSlice.reducer;