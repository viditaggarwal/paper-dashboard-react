// src/reducers/index.js
import { combineReducers } from 'redux';
import { stockReducer } from './stockReducer'; 
import { stockNameReducer } from './stockNameReducer';

const rootReducer = combineReducers({
  stock: stockReducer,
  stockName: stockNameReducer
});

export default rootReducer;
