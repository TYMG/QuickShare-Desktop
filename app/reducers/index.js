// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import messages from './messages';

const rootReducer = combineReducers({
  counter,
  messages,
  router,
});

export default rootReducer;
