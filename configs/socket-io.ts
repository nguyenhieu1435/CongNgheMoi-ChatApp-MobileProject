import { io } from 'socket.io-client';

export const socket = io("https://homeless-eadith-vunguyendev.koyeb.app", {
    autoConnect: false
});