import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';
import playlistReducer from './playlistReducer';
import browseReducer from './browseReducer';
import libraryReducer from './libraryReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  tokenReducer,
  userReducer,
  playlistReducer,
  browseReducer,
  libraryReducer,
  uiReducer
});
