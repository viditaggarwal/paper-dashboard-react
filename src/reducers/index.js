// src/reducers/index.js
import { combineReducers } from 'redux';
import { stockReducer } from './stockReducer'; 
import { stockNameReducer } from './stockNameReducer';
import { stockSummaryReducer } from './stockSummaryReducer';
import { stockFundamentalsReducer } from './stockFundamentalsReducer';
import { allStocksReducer } from './allStocksReducer';
import { undervaluedStocksReducer } from './undervaluedStocksReducer';
import { stocksByScoreReducer } from './stocksByScoreReducer';

const rootReducer = combineReducers({
  stock: stockReducer,
  stockName: stockNameReducer,
  summary: stockSummaryReducer,
  fundamentals: stockFundamentalsReducer,
  stocks: allStocksReducer,
  undervaluedStocks: undervaluedStocksReducer,
  stocksByScore: stocksByScoreReducer
});

export default rootReducer;
