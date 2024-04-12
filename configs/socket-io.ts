import { LINK_SOCKET_IO } from '@env';
import io from 'socket.io-client';

const socket = io(LINK_SOCKET_IO)

export default socket;