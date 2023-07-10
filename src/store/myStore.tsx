import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer, {
  saveUserReducer,
  loadingReducer,
  pcRequestIdReducer,
  langReducer,
  roleReducer,
} from './reducers/reducer';
const rootReducer = combineReducers({
  token: reducer,
  user: saveUserReducer,
  loading: loadingReducer,
  pcRequestId: pcRequestIdReducer,
  langDir: langReducer,
  role: roleReducer,
});
const middlewares = [thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
export default store;
