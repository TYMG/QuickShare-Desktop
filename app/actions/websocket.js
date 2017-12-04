import {
  ADD_RESPONSE,
  ADD_MESSAGE,
  UPDATE_MESSAGE,
  CONNECT,
  DISCONNECT
} from '../constants/ActionTypes';

export function connect() {
  return {
    type: CONNECT
  }
}

export function disconnect() {
  return {
    type: DISCONNECT
  }
}

export function updateMessage(message) {
  return {
    type: UPDATE_MESSAGE,
    message
  };
}

export function addMessage() {
  return {
    type: ADD_MESSAGE
  };
}

export function addResponse(message) {
  return {
    type: ADD_RESPONSE,
    message
  };
}
