import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk,logger));

export default store;