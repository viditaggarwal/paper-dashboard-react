import { fetchStockDetails } from '../api/stocky';

export const getStockDetails = (ticker) => async (dispatch) => {
  const data = await fetchStockDetails(ticker);
  dispatch({ type: 'SET_STOCK_DETAILS', payload: data });
};

export const updateStockName = (stockName) => {
  return {
    type: 'UPDATE_STOCK_NAME',
    payload: stockName,
  };
};