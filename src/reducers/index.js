// src/reducers/index.js
import { combineReducers } from 'redux';
import { stockReducer } from './stockReducer'; 
import { stockNameReducer } from './stockNameReducer';
import { stockSummaryReducer } from './stockSummaryReducer';
import { stockFundamentalsReducer } from './stockFundamentalsReducer';
import { allStocksReducer } from './allStocksReducer';

const rootReducer = combineReducers({
  stock: stockReducer,
  stockName: stockNameReducer,
  summary: stockSummaryReducer,
  fundamentals: stockFundamentalsReducer,
  stocks: allStocksReducer
});

export default rootReducer;
