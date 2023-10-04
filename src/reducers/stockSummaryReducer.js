const initialState = {
    business_result: '',
    competitive_advantage_result: '',
    performance_result: '',
    risk_factors_result: ''
  };
    
  export const stockSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_STOCK_SUMMARY':
        const { business_result, competitive_advantage_result, performance_result, risk_factors_result} = action.payload.summary;
        return {
            ...state,
            business_result,
            competitive_advantage_result,
            performance_result,
            risk_factors_result
        };
      default:
        return state;
    }
  };