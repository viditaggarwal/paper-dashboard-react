const initialState = {
    de_ratio: [],
    fcf: [],
    gross_profit: [],
    net_income: [],
    revenue: [],
    roe: []
  };
    
  export const stockFundamentalsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STOCK_FUNDAMENTALS':
        const { de_ratio, fcf, gross_profit, net_income, revenue, roe } = action.payload.fundamentals;
        return {
          ...state,
          de_ratio,
          fcf,
          gross_profit,
          net_income,
          revenue,
          roe
        };
      default:
        return state;
    }
  };