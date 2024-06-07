import { LINK_SOCKET } from '@env';
import { io } from 'socket.io-client';

export const socket = io(LINK_SOCKET, {
    autoConnect: false
});