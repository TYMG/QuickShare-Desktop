import {
    CONNECT,
    DISCONNECT
} from './../actions/websocket';

import io from 'socket.io-client';

export default function websocket() {
    switch (action.type) {
        case CONNECT:
            return state + 1;
        case DISCONNECT:
            return state - 1;
        default:
            return state;
    }
}
