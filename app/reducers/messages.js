import {RECEIVE_MESSAGE, DISCONNECT, CONNECT} from '../constants/ActionTypes';

import Message from '../utils/message';

const initialState = {
    messages: [],
    status: false
};

export default function messages(state = initialState, action) {

    switch (action.type) {
        case RECEIVE_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    new Message(action.message)
                ]
            }

        case CONNECT:
            return {messages: [], status: true}

        case DISCONNECT:
            return {messages: [], status: false}

        default:
            return state;
    }
}