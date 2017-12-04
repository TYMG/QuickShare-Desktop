import io from 'socket.io-client';
import * as actions from './../actions/websocket';

let socket = null;

export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (socket && action.type === actions.ADD_MESSAGE) {
      const messages = store.getState().messages;
      socket.emit('message', messages[messages.length - 1]);
    }

    return result;
  };
}

export default function (store) {
  socket = io.connect('http://localhost:8080', { reconnect: true });
  console.log('is connected?', socket.connected);

  socket.on('connect', function () {
    console.log('Connection made', socket.connected);
  });

  socket.on('start', data => {
    //store.dispatch(actions.setUserId(data.userId));
    console.log("Active Connection: " + data);
  });

  socket.on('message', data => {
    store.dispatch(actions.addResponse(data));
  });
}
