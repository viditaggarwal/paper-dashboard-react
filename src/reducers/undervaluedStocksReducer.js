const initialState = {
    undervaluedStocks: []
};

export const undervaluedStocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_UNDERVALUED_STOCKS':
        return {
            ...state,
            undervaluedStocks: action.payload
        };
        default:
        return state;
    }
};