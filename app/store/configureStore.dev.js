import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import * as counterActions from '../actions/counter';
import * as WebsocketActions from '../actions/websocket';
import type { counterStateType } from '../reducers/counter';
import WSInstance from '../utils/QS-Websocket';
import * as ActionTypes from '../constants/ActionTypes';

const history = createHashHistory();

const configureStore = (initialState?: counterStateType) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Thunk Middleware
  middleware.push(thunk);

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...counterActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }


  const sock = {
    ws: null,
    URL: '//localhost:8080/',
    wsDispatch: (msg) => {
      return store.dispatch(WebsocketActions.receiveMessage(msg));
    },
    wsListner: () => {
      const { lastAction } = store.getState();

      switch (lastAction.type) {
        case ActionTypes.POST_MESSAGE:
          return sock.ws.postMessage(lastAction.text);
        case ActionTypes.CONNECT:
          return sock.startWS();
        case ActionTypes.DISCONNECT:
          return sock.stopWS();
        default:
          return;
      }
    },
    stopWS: () => {
      sock.ws.close();
      sock.ws = null;
    },
    startWS: () => {
      //  If the sock is already opened, close it
      if (sock.ws) sock.ws.close();

      sock.ws = new WSInstance(sock.URL, sock.wsDispatch);
    }

  }

  return store;
};

export default { configureStore, history };
