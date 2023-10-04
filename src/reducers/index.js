// src/reducers/index.js
import { combineReducers } from 'redux';
import { stockReducer } from './stockReducer'; 
import { stockNameReducer } from './stockNameReducer';
import { stockSummaryReducer } from './stockSummaryReducer';
import { stockFundamentalsReducer } from './stockFundamentalsReducer';

const rootReducer = combineReducers({
  stock: stockReducer,
  stockName: stockNameReducer,
  summary: stockSummaryReducer,
  fundamentals: stockFundamentalsReducer
});

export default rootReducer;
