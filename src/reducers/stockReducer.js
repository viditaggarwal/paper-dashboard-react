const initialState = {
  name: '',
  ticker: '',
  description: '',
  price: '',
  fair_value: '',
  score: '',
  industry: '',
  logo: ''
};
  
export const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STOCK_DETAILS':
      const { name, ticker, description, price, fair_value, score, industry, logo } = action.payload.stock_details;
      return {
        ...state,
        name,
        ticker,
        description,
        price,
        fair_value,
        score,
        industry,
        logo
      };
    default:
      return state;
  }
};