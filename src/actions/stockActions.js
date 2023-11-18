import { fetchStockDetails, fetchStockFundamentals, fetchStockSecSummary, validateToken, getAllStocks } from '../api/stocky';

export const getStockDetails = (ticker) => async (dispatch) => {
  const data = await fetchStockDetails(ticker);
  dispatch({ type: 'SET_STOCK_DETAILS', payload: data });
};

export const getSecSummary = (ticker) => async (dispatch) => {
  const data = await fetchStockSecSummary(ticker);
  dispatch({ type: 'SET_STOCK_SUMMARY', payload: data });
};

export const getStockFundamentals = (ticker) => async (dispatch) => {
  const data = await fetchStockFundamentals(ticker);
  dispatch({ type: 'SET_STOCK_FUNDAMENTALS', payload: data });
};

export const updateStockName = (stockName) => {
  return {
    type: 'UPDATE_STOCK_NAME',
    payload: stockName,
  };
};

export const validate = () => async (dispatch) => {
  const data = await validateToken();
  dispatch({ type: 'VALIDATE_TOKEN', payload: data });
}

export const fetchAllStocks = () => async (dispatch) => {
  const data = await getAllStocks();
  dispatch({ type: 'SET_ALL_STOCKS', payload: data });
};