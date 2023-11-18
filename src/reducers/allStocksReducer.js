const initialState = {
    stocks: []
};

export const allStocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_STOCKS':
        return {
            ...state,
            stocks: action.payload
        };
        default:
        return state;
    }
};