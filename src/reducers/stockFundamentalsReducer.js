const initialState = {
    data: {}
  };
    
  export const stockFundamentalsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STOCK_FUNDAMENTALS':
        const data = action.payload.fundamentals;
        return {
          ...state,
          data
        };
      default:
        return state;
    }
  };